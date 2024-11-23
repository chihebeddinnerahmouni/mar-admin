import React, { useState } from "react";
import ReactModal from "react-modal";
import { Button, Box, Typography } from "@mui/material";
import LoadingButton from "../ui/LoadingButton";
import axios from "axios";
import { useTranslation } from "react-i18next";

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
    const {i18n} = useTranslation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);   
        axios.delete(`${url}/api/region/regions/${region.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }
        })
        .then(() => {
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    };

    return (
        <ReactModal
            isOpen={true}
            onRequestClose={() => setClose(false)}
            className={"bg-white rounded-lg p-6 shadow-lg max-w-md mx-auto"}
            overlayClassName={
                "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center p-4"
            }
        >
            <Typography variant="h4" component="h2" gutterBottom>
                Delete Region
            </Typography>
            <Typography variant="body1" gutterBottom>
                Are you sure you want to delete the region <strong>{i18n.language === "ar" ? region.arabic_name : region.name}</strong>?
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
                        variant="contained"
                        disabled={loading}
                        sx={{
                            color: "white",
                            width: "90px",
                            backgroundColor: "#FF385C",
                            '&:hover': {
                                backgroundColor: "#FF1E3C",
                            },
                        }}
                        type="submit"
                    >
                        {loading ? <LoadingButton /> : "Delete"}
                    </Button>
                </Box>
            </form>
        </ReactModal>
    );
};

export default DeleteRegionModal;