import React, { useState} from "react";
import ReactModal from "react-modal";
import { Button, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import LoadingButton from "../ui/LoadingButton";
import axios from "axios";

interface DeleteModalProps {
  setClose: (isOpen: boolean) => void;
  category: {
    id: number;
    arName: string;
    enName: string;
  };
}

ReactModal.setAppElement("#root");

const DeleteCategoryModal: React.FC<DeleteModalProps> = ({
  setClose,
  category
}) => {

  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_SERVER_URL_CATEGORY;

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
          console.log(err);
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
        Delete Category
      </Typography>
      <Typography variant="body1" gutterBottom>
        Are you sure you want to delete the region{" "}
        <strong>
          {i18n.language === "ar" ? category.arName : category.enName}
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
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant="contained"
            sx={{
              color: "white",
              width: "90px",
              height: "40px",
              backgroundColor: "#FF385C",
              "&:hover": {
                backgroundColor: "#FF1E3C",
              },
            }}
            type="submit"
          >
            {/* Delete */}
            {loading ? <LoadingButton /> : "Delete"}
          </Button>
        </Box>
      </form>
    </ReactModal>
  );
};

export default DeleteCategoryModal;
