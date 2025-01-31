import RequestsTable from "../../components/documents/RequestsTable";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingLine from "../../components/ui/LoadingLine";
import Swal from "sweetalert2";
import StatusCont from "../../containers/documents/documents/StatusCont";



const Documents = () => {

  const { t } = useTranslation();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("pending");
  const url = import.meta.env.VITE_SERVER_URL_LISTING;

  useEffect(() => { 
    axios
      .get(
        `${url}/api/submit/submissions-with-pending-documents?status=${status}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((response) => {
        setRequests(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        if (
          err.response.data.message === "No users with pending documents found"
        ) {
          setLoading(false);
          setRequests([]);
        } else if (err.message === "Network Error") {
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
  }, [status]);




  if (loading) {
    return <div className="w-full h-screen">
      <LoadingLine />
    </div>
  }

  // console.log(status);

  return (
    <div className="p-4 md:p-8 lg:max-w-[1000px] mx-auto px-4 md:px-[40px]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        {t("Documents_management")}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t("Documents_management_description")}
      </p>
      <StatusCont status={status} setStatus={setStatus} />
      <RequestsTable rows={requests} />
    </div>
  );
}

export default Documents

