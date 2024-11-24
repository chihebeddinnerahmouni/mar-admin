import React, {useState} from "react";
import ReactModal from "react-modal";
import { Button, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LodaingButton from "../../components/ui/LoadingButton";
import axios from "axios";
import Swal from "sweetalert2";


interface DeleteModalProps {
  setClose: (isOpen: boolean) => void;
  feature: {
    name: string;
    arabic_name: string;
      id: number
  };
}

ReactModal.setAppElement("#root");

const DeleteFeatureModal: React.FC<DeleteModalProps> = ({
  setClose,
  feature,
}) => {

  const { i18n, t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;

  console.log(feature);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .delete(`${url}/admin/listing/features/${feature.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          title: t("ops"),
          text: error.response.data.message,
        });
        setLoading(false);
      });
  };

    // console.log(feature);
    
  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setClose(false)}
      className={"bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto"}
      overlayClassName={
        "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center p-4 z-10"
      }
    >
      <Typography variant="h4" component="h2" gutterBottom>
        {t("delete_feature")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t("are_you_sure_you_want_to")} <span className="text-red-500 font-semibold">{t("delete")}</span> {" "}
        <strong>
          {i18n.language === "ar" ? feature.arabic_name : feature.name}
        </strong>
        ?
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
          <Button
            variant="outlined"
            onClick={() => setClose(false)}
            sx={{
              color: "#FF385C",
              backgroundColor: "white",
              borderColor: "#FF385C",
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            variant="contained"
            disabled={loading}
            sx={{
              width: "90px",
              color: "white",
              backgroundColor: "#FF385C",
              "&:hover": {
                backgroundColor: "#FF1E3C",
              },
            }}
            type="submit"
          >
            {loading ? <LodaingButton /> : t("delete")}
          </Button>
        </Box>
      </form>
    </ReactModal>
  );
};


export default DeleteFeatureModal;
