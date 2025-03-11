import React, { useState} from "react";
import ReactModal from "react-modal";
import { Button, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LoadingButton from "../ui/LoadingButton";
import axios from "axios";
import { axios_error_handler } from "../../functions/axios_error_handler";

interface DeleteModalProps {
  setClose: (isOpen: boolean) => void;
  category: {
    id: number;
    name: string;
    arabic_name: string;
  };
}

ReactModal.setAppElement("#root");

const DeleteCategoryModal: React.FC<DeleteModalProps> = ({
  setClose,
  category
}) => {

  const { i18n, t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_CATEGORY;
  const mainColor = "#FF385C";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
      axios
        .delete(url + "/admin/categories/" + category.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          axios_error_handler(err, t);
          setLoading(false);
        });
  };

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
        {t("delete_category")}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t("are_you_sure_you_want_to_delete_the_category")}{" "}
        <strong>
          {i18n.language === "ar" ? category.arabic_name : category.name}
        </strong>
        ?
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
          <Button
            variant="outlined"
            onClick={() => setClose(false)}
            sx={{
              color: mainColor,
              backgroundColor: "white",
              borderColor: mainColor,
              width: "90px",
              height: "40px",
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            disabled={loading}
            variant="contained"
            sx={{
              color: "white",
              width: "90px",
              height: "40px",
              backgroundColor: mainColor,
              "&:hover": {
                backgroundColor: mainColor,
              },
            }}
            type="submit"
          >
            {loading ? <LoadingButton /> : t("delete")}
          </Button>
        </Box>
      </form>
    </ReactModal>
  );
};

export default DeleteCategoryModal;
