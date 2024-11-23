const base64UrlDecode = (str: string): string => {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
};

const isLoggedIn = (): boolean => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return false;
  }

  try {
    const payloadBase64Url = token.split(".")[1];
    const decodedPayload = JSON.parse(base64UrlDecode(payloadBase64Url));
    const currentTime = Date.now() / 1000;

    // Check if the token is expired
    if (decodedPayload.exp < currentTime) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("hasSubmissions");
      localStorage.removeItem("isBoatOwner");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      return false;
    }

    return true;
  } catch (error) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("hasSubmissions");
    localStorage.removeItem("isBoatOwner");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    return false;
  }
};

export default isLoggedIn;
