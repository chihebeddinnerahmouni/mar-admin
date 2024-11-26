import RequestsTable from "../../components/documents/RequestsTable";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingLine from "../../components/ui/LoadingLine";
import Swal from "sweetalert2";



const Documents = () => {

  const { t } = useTranslation();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;

  useEffect(() => { 
    axios
      //       {{ListingService}}/api/submit/user-submissions?status=pending
      // params status = {Pending, Accepted, refused}
      .get(`${url}/api/submit/users/pending-documents`,
        {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setRequests(response.data.users);
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
    return <div className="w-full h-screen">
      <LoadingLine />
    </div>
  }

  return (
    <div className="p-4 md:p-8 lg:max-w-[1000px] mx-auto px-4 md:px-[40px]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        {t("Documents_management")}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t("Documents_management_description")}
      </p>
      <RequestsTable rows={requests} />
    </div>
  );
}

export default Documents


// const requests = [
//   {
//     id: 1,
//     name: "kiheb rahmouni",
//     image: "https://",
//     email: "chihebrahmouni30@gmail.com",
//     phone: "0773781669",
//     documents: [
//       {
//         title: "lience",
//         document: "https://",
//       },
//       {
//         title: "carte grise",
//         document: "https://",
//       },
//       {
//         title: "carte w say",
//         document: "https://",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "chiheb rahmouni",
//     image: "https://",
//     email: "chihebrahmouni30@gmail.com",
//     phone: "0773781669",
//     documents: [
//       {
//         title: "lience",
//         document: "https://",
//       },
//       {
//         title: "carte grise",
//         document: "https://",
//       },
//       {
//         title: "carte w say",
//         document: "https://",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "chiheb rahmouni",
//     image: "https://",
//     email: "chihebrahmouni30@gmail.com",
//     phone: "0773781669",
//     documents: [
//       {
//         title: "lience",
//         document: "https://",
//       },
//       {
//         title: "carte grise",
//         document: "https://",
//       },
//       {
//         title: "carte w say",
//         document: "https://",
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "chiheb rahmouni",
//     image: "https://",
//     email: "chihebrahmouni30@gmail.com",
//     phone: "0773781669",
//     documents: [
//       {
//         title: "lience",
//         document: "https://",
//       },
//       {
//         title: "carte grise",
//         document: "https://",
//       },
//       {
//         title: "carte w say",
//         document: "https://",
//       },
//     ],
//   },
// ];