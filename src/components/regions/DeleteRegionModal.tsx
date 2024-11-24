import React, { useState } from "react";
import ReactModal from "react-modal";
import { Button, Box, Typography } from "@mui/material";
import LoadingButton from "../ui/LoadingButton";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

interface DeleteModalProps {
    setClose: (isOpen: boolean) => void;
    region: {
        id: number;
        name: string;
        arabic_name: string;
    };
}

ReactModal.setAppElement("#root");

const DeleteRegionModal: React.FC<DeleteModalProps> = ({
    setClose,
    region,
}) => {


    // console.log(region);
    const [loading, setLoading] = useState(false);
    const url = import.meta.env.VITE_SERVER_URL_LISTING;
    const { i18n, t } = useTranslation();
    const mainColor = "#FF385C";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);   
        axios.delete(`${url}/api/region/regions/${region.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
        })
            .then(() => {
                Swal.fire({
                    title: t("greate"),
                    icon: "success",
                });
            window.location.reload();
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
            setLoading(false);
        });
    };

    return (
        <ReactModal
            isOpen={true}
            onRequestClose={() => setClose(false)}
            className={"bg-white w-full rounded-lg p-6 shadow-lg max-w-md mx-auto md:w-[400px]"}
            overlayClassName={
                "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center p-4"
            }
        >
            <Typography variant="h4" component="h2" gutterBottom>
                {t("delete_region")}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {t("are_you_sure_you_want_to")} <span className="text-red-500 font-semibold">{t("delete")}</span> <strong>{i18n.language === "ar" ? region.arabic_name : region.name}</strong>?
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
                        }}
                    >
                        {t("cancel")}
                    </Button>
                    <Button
                        variant="contained"
                        disabled={loading}
                        sx={{
                            color: "white",
                            width: "90px",
                            backgroundColor: mainColor,
                            '&:hover': {
                                backgroundColor: "#FF1E3C",
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

export default DeleteRegionModal;