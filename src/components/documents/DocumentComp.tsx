import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { FaDownload } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const DocumentComp = ({ document }: any) => {


  // console.log(document.id);
  const mainColor = "#FF385C";
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { t } = useTranslation();


  if (!document || !document.document_path) {
    return <div>Document path is not available</div>;
  }
  const isPdf = document.document_path.endsWith(".pdf");



  return (
    <Card className="shadow-lg rounded-lg overflow-hidden relative">
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