import DocumentComp from "../../components/documents/DocumentComp";
import LoadingLine from "../../components/ui/LoadingLine";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingButton from "../../components/ui/LoadingButton";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";



const CheckDocuments = () => {


  const [docs, setDocs] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { userId } = useParams<{ userId: string }>();
  const { t } = useTranslation();


  useEffect(() => {
    axios.get(`${url}/api/submit/documents/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    })
      .then((res) => {
      setDocs(res.data);
      // console.log(res.data);
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


  const accept = () => { 
    if (buttonLoading) return;
    setButtonLoading(true);
    axios
      .put(
        `${url}/api/submit/user-submissions/${userId}/accept/document`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then(() => {
        // console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Accepted",
          text: "The documents have been accepted",
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        })
        setButtonLoading(false);
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
  }




  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    )
  }


  return (
    <div className="p-4 md:p-8 lg:max-w-[1000px] mx-auto px-4 md:px-[40px]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        Documents for {docs.name}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        This is what Chiheb uploaded as documents, you can view the documents
        below.
      </p>

      <div className="buttons bg-creme h-[60px] flex justify-end items-center gap-4 mb-8 sticky top-[60px] lg:top-[80px] z-10">
        <button
          className="bg-green-500 text-white w-[80px] h-10 rounded hover:bg-green-600"
          onClick={accept}
        >
          {buttonLoading ? <LoadingButton /> : "Accept"}
        </button>
        <button className="bg-main text-white w-[80px] h-10 rounded hover:bg-mainHover">
          Refuse
        </button>
      </div>

      <div className="docs flex flex-col gap-5 pb-20">
        {docs.map((document: any, index: number) => (
          <DocumentComp key={index} document={document} />
        ))}
      </div>
    </div>
  );
};

export default CheckDocuments;

// const docs = {
//   id: 1,
//   name: "chiheb rahmouni",
//   image: "hirbae.jpg",
//   email: "chihebrahmouni30@gmail.com",
//   phone: "0773781669",
//   documents: [
//     {
//       title: "License",
//       document: "https://www.example.com/license.pdf",
//     },
//     {
//       title: "Carte Grise",
//       document: "/hirbae.jpg",
//     },
//     {
//       title: "Carte W Say",
//       document: "/hirbae.jpg",
//     },
//   ],
// };
