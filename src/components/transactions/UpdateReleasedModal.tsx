import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { Button, Box, Typography, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import LoadingButton from "../ui/LoadingButton";
import axios from "axios";
import Swal from "sweetalert2";
import { InputAdornment, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoadingLine from "../ui/LoadingLine";
import { useParams } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

interface DeleteModalProps {
  setClose: (isOpen: boolean) => void;
}

ReactModal.setAppElement("#root");

const UpdateReleasedModal: React.FC<DeleteModalProps> = ({ setClose }) => {
  const { i18n, t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [balance, setBalance] = useState(0);
  const [releaseDate, setReleaseDate] = useState("");
  const [releaseOption, setReleaseOption] = useState("release");
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { userId } = useParams<{ userId: string }>();
  const mainColor = "#FF385C";

  useEffect(() => {
    axios
      .get(url + "/api/transactions/balances/14", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        // setBalance(res.data.balance);
        // setReleaseDate(res.data.releaseDate);
        // setLoadingData(false);
      })
      .catch((err) => {
        console.log(err);
        setBalance(2156467);
        setReleaseDate("");
        setLoadingData(false);
      });
    //   .catch((err) => {
    //     if (err.message === "Network Error") {
    //       Swal.fire({
    //         title: t("network_error"),
    //         text: t("please_try_again"),
    //         customClass: {
    //           confirmButton: "custom-confirm-button",
    //         },
    //       }).then(() => {
    //         window.location.reload();
    //       });
    //     }
    //     window.location.reload();
    //   });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
    //   console.log(balance);
    //   console.log(releaseDate);
      //     console.log(releaseOption);
      
      const data = {
        balance: balance,
        releaseDate: releaseDate,
        releaseOption: releaseOption,
      }

    // setLoading(true);
    // axios
    //   .delete(url + "/admin/categories/" + category.id, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //     },
    //   })
    //   .then(() => {
    //     window.location.reload();
    //   })
    //   .catch((err) => {
    //     if (err.message === "Network Error") {
    //       Swal.fire({
    //         title: t("network_error"),
    //         text: t("please_try_again"),
    //         customClass: {
    //           confirmButton: "custom-confirm-button",
    //         },
    //       }).then(() => {
    //         window.location.reload();
    //       });
    //     }
    //     setLoading(false);
    //   });
  };

  if (loadingData) {
    return (
      <ReactModal
        isOpen={true}
        onRequestClose={() => setClose(false)}
        className={
          "bg-white w-full rounded-lg p-6 shadow-lg max-w-[500px] mx-auto h-[400px] overflow-auto"
        }
        overlayClassName={
          "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center p-4 z-10 mt-[60px] lg:mt-[80px]"
        }
      >
        <LoadingLine />
      </ReactModal>
    );
  }

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setClose(false)}
      className={
        "bg-white w-full rounded-lg p-6 shadow-lg max-w-[500px] mx-auto overflow-auto"
      }
      overlayClassName={
        "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center p-4 z-10 mt-[60px] lg:mt-[80px]"
      }
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{
          textAlign: "center",
        }}
      >
        {t("update_balance")}
      </Typography>
      <Box mt={4}>
        <TextField
          label={t("balance")}
          type="number"
          value={balance}
          onChange={(e) => setBalance(Number(e.target.value))}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "grey",
              },
              "&:hover fieldset": {
                borderColor: "grey",
              },
              "&.Mui-focused fieldset": {
                borderColor: mainColor,
              },
            },
            "& .MuiInputLabel-root": {
              color: "gray",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: mainColor,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setBalance(0)} edge="end">
                  <CloseIcon className="text-red-500" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label={t("release_date")}
          type="date"
          inputProps={{
            min: new Date().toISOString().split("T")[0],
          }}
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          fullWidth
          sx={{
            mt: 2,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "grey",
              },
              "&:hover fieldset": {
                borderColor: "grey",
              },
              "&.Mui-focused fieldset": {
                borderColor: mainColor,
              },
            },
            "& .MuiInputLabel-root": {
              color: "gray",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: mainColor,
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <RadioGroup
          row
          value={releaseOption}
          onChange={(e) => setReleaseOption(e.target.value)}
        >
          <FormControlLabel
            value="release"
            control={
              <Radio
                sx={{
                  color: mainColor,
                  "&.Mui-checked": {
                    color: mainColor,
                  },
                }}
              />
            }
            label={t("release")}
          />
          <FormControlLabel
            value="unrelease"
            control={
              <Radio
                sx={{
                  color: mainColor,
                  "&.Mui-checked": {
                    color: mainColor,
                  },
                }}
              />
            }
            label={t("unrelease")}
          />
        </RadioGroup>
      </FormControl>

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
            {loading ? <LoadingButton /> : t("update")}
          </Button>
        </Box>
      </form>
    </ReactModal>
  );
};

export default UpdateReleasedModal;
