import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { FaDownload } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import LoadingButton from "../ui/LoadingButton";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";

const DocumentComp = ({ document }: any) => {


  // console.log(document.id);
  const mainColor = "#FF385C";
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { t } = useTranslation();
  const [buttonLoading, setButtonLoading] = useState(false);


  if (!document || !document.document_path) {
    return <div>Document path is not available</div>;
  }
  const isPdf = document.document_path.endsWith(".pdf");

 const accept = () => {
   if (buttonLoading) return;
   setButtonLoading(true);
   axios
     .put(
       `${url}/api/submit/user-submissions/${document.id}/accept/document`,
       {},
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
         },
       }
     )
     .then(() => {
      //  console.log(res.data);
       Swal.fire({
         icon: "success",
         title: t("greate"),
         showConfirmButton: false,
       });
       setButtonLoading(false);
     })
     .catch((err) => {
      //  console.log(err);
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
 };



  return (
    <Card className="shadow-lg rounded-lg overflow-hidden relative">
      <div className="buttons h-[60px] flex justify-end items-center gap-4 mx-2">
        <button
          className="bg-green-500 text-white w-[80px] h-10 rounded hover:bg-green-600"
          onClick={accept}
        >
          {/* {buttonLoading ? <LoadingButton /> : t("accept")} */}
          {buttonLoading ? <LoadingButton /> : document.status === "approved" ? <CheckIcon /> : t("accept")}
        </button>
        <button className="bg-main text-white w-[80px] h-10 rounded hover:bg-mainHover">
          {t("refuse")}
        </button>
      </div>
      <CardContent>
        <Typography variant="h5" component="h2">
          {document.document_type}
        </Typography>
        {isPdf ? (
          <p className="mt-1">{t("pdf_documents")}</p>
        ) : (
          <Typography variant="body2" color="textSecondary">
            {t("image")}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          href={url + "/" + document.document_path}
          target="_blank"
          sx={{ color: mainColor }}
        >
          {t("view")} {isPdf ? t("document") : t("image")}
        </Button>
        <Button
          size="small"
          href={document.document || "#"}
          download
          sx={{ color: mainColor }}
        >
          <FaDownload />
        </Button>
      </CardActions>
    </Card>
  );
};

export default DocumentComp;