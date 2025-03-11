import {toast} from "react-hot-toast";

export const axios_toast_error = (error: any, t: any) => {
  const axiosError = error as any;
  const message =
    axiosError.message === "Network Error"
      ? t("network_error")
      : axiosError.response.data.message || t("something_went_wrong");
    toast.error(message);   
};
