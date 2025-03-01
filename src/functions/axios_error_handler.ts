import swal from 'sweetalert2'

export const axios_error_handler = (error: any, t: any) => { 


    const message =
      error.message === "Network Error"
        ? t("network_error")
            : error.response?.data.message || t("something_went_wrong");
    
    swal.fire({
        icon: "error",
        title: t("ops"),
        text: message,
        showConfirmButton: false,
    });
    }