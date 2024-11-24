import { Outlet } from "react-router-dom";
import TopBar from "./components/ui/TopBar";
import axios from "axios";
import { useEffect, createContext, useState } from "react";
import Swal from "sweetalert2";
import LoadingLine from "./components/ui/LoadingLine";
import { useTranslation } from "react-i18next";
import isLoggedIn from "./lib/isLogedin";
import { useNavigate } from "react-router-dom";



export const AppContext = createContext<any>(null);

function App() {
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const url = import.meta.env.VITE_SERVER_URL_USERS as string;

  useEffect(() => {


     if (!isLoggedIn()) {
       navigate("/login");
       return;
      }

    axios
      .get(url + "/api/user/auth-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setName(res.data.name);
        setSurname(res.data.surname);
        setProfilePicture(res.data.profilePicture);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          Swal.fire({
            icon: "error",
            title: t("network_error"),
            text: t("please_try_again"),
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          }).then(() => {
            window.location.reload();
          });
        }
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }

  return (
    <>
      <AppContext.Provider value={{ profilePicture, setProfilePicture, name, surname }}>
        <TopBar />
        <div className="mt-[60px] lg:mt-[80px]">
          <Outlet />
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
