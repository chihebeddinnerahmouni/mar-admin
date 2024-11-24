import React, { useState } from "react";
import ReactModal from "react-modal";
import { TextField, Button, Box, Typography } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import LoadingButton from "../ui/LoadingButton";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

interface UpdateModalProps {
  setClose: (isOpen: boolean) => void;
}

ReactModal.setAppElement("#root");

const AddRegionModal: React.FC<UpdateModalProps> = ({ setClose }) => {
  const [loading, setLoading] = useState(false);
  const [enName, setEnName] = useState("");
  const [description, setDescription] = useState("");
  const [arName, setArName] = useState("");
  const [photo, setPhoto] = useState("");
  const [_newPhoto, setNewPhoto] = useState<File | null>(null);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const { t } = useTranslation();
  const mainColor = "#FF385C";

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhoto(e.target.files[0]);
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    const check = enName && arName && description;
    if (!check) return alert(t("please_fill_all_the_fields"));

    e.preventDefault();
    // setClose(false);
    setLoading(true);

    axios
      .post(
        `${url}/api/region/regions`,
        {
          name: enName,
          arabic_name: arName,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then(() => {
        Swal.fire({
          icon: "success",
          title: t("greate"),
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
    <div className="bg-white p-4 rounded-[5px] mb-10">
      <Typography variant="h4" component="h2" gutterBottom>
        {t("add_region")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" flexDirection="row" gap={2}>
            <TextField
              label={t("english_name")}
              value={enName}
              onChange={(e) => setEnName(e.target.value)}
              variant="outlined"
              fullWidth
              required
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
            />
            <TextField
              label={t("arabic_name")}
              value={arName}
              onChange={(e) => setArName(e.target.value)}
              variant="outlined"
              fullWidth
              required
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
            />
          </Box>

          <TextField
            label={t("description")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
            fullWidth
            required
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
          />

          <label htmlFor="icon-button-file" className="cursor-pointer">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
            >
              {photo ? (
                <img
                  src={photo}
                  alt={enName}
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  width="100%"
                  height="200px"
                  border="2px dashed grey"
                  borderRadius="8px"
                >
                  <PhotoCamera fontSize="large" className="" />
                  <Typography variant="body2" color="textSecondary">
                    {t("upload_photo")}
                  </Typography>
                </Box>
              )}

              <input
                accept="image/*"
                style={{ display: "none" }}
                id="icon-button-file"
                type="file"
                onChange={handlePhotoChange}
              />
            </Box>
          </label>
          <Box display="flex" justifyContent="flex-end" gap={2}>
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
              disabled={loading}
              variant="contained"
              sx={{ color: "white", backgroundColor: mainColor }}
              type="submit"
            >
              {loading ? <LoadingButton /> : t("save")}
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default AddRegionModal;

// import React, { useState } from "react";
// import ReactModal from "react-modal";
// import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
// import { PhotoCamera } from "@mui/icons-material";

// interface UpdateModalProps {
//     setClose: (isOpen: boolean) => void;
// }

// ReactModal.setAppElement("#root");

// const AddRegionModal: React.FC<UpdateModalProps> = ({ setClose }) => {
//     const [name, setName] = useState("");
//     const [photo, setPhoto] = useState("");
//     const [_newPhoto, setNewPhoto] = useState<File | null>(null);

//     const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files && e.target.files[0]) {
//             setNewPhoto(e.target.files[0]);
//             setPhoto(URL.createObjectURL(e.target.files[0]));
//         }
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         setClose(false);
//     };

//     return (
//         <ReactModal
//             isOpen={true}
//             onRequestClose={() => setClose(false)}
//             className={"bg-white rounded-lg p-4 shadow-hardShadow my-10 lg:p-6"}
//             overlayClassName={
//                 "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center px-4 py-20 mt-[60px]"
//             }
//         >
//             <Typography variant="h4" component="h2" gutterBottom>
//                 Add Region
//             </Typography>
//             <form onSubmit={handleSubmit}>
//                 <Box display="flex" flexDirection="column" gap={2}>
//                     <TextField
//                         label="Region Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         variant="outlined"
//                         fullWidth
//                         required
//                         sx={{
//                             "& .MuiOutlinedInput-root": {
//                                 "& fieldset": {
//                                     borderColor: "grey",
//                                 },
//                                 "&:hover fieldset": {
//                                     borderColor: "grey",
//                                 },
//                                 "&.Mui-focused fieldset": {
//                                     borderColor: mainColor,
//                                 },
//                             },
//                             "& .MuiInputLabel-root": {
//                                 color: "gray",
//                             },
//                             "& .MuiInputLabel-root.Mui-focused": {
//                                 color: mainColor,
//                             },
//                         }}
//                     />
//                     <Box
//                         display="flex"
//                         flexDirection="column"
//                         alignItems="center"
//                         gap={2}
//                     >
//                         {photo ? (
//                             <img
//                                 src={photo}
//                                 alt={name}
//                                 style={{
//                                     width: "100%",
//                                     maxHeight: "300px",
//                                     objectFit: "cover",
//                                     borderRadius: "8px",
//                                 }}
//                             />
//                         ) : (
//                             <Box
//                                 display="flex"
//                                 flexDirection="column"
//                                 alignItems="center"
//                                 justifyContent="center"
//                                 width="100%"
//                                 height="200px"
//                                 border="2px dashed grey"
//                                 borderRadius="8px"
//                             >
//                                 <PhotoCamera fontSize="large" className=""/>
//                                 <Typography variant="body2" color="textSecondary">
//                                     Upload Photo
//                                 </Typography>
//                             </Box>
//                         )}
//                         <input
//                             accept="image/*"
//                             style={{ display: "none" }}
//                             id="icon-button-file"
//                             type="file"
//                             onChange={handlePhotoChange}
//                         />
//                         <label htmlFor="icon-button-file">
//                             <IconButton
//                                 aria-label="upload picture"
//                                 component="span"
//                                 sx={{ color: "grey" }}
//                             >
//                                 <PhotoCamera />
//                             </IconButton>
//                         </label>
//                     </Box>
//                     <Box display="flex" justifyContent="flex-end" gap={2}>
//                         <Button
//                             variant="outlined"
//                             onClick={() => setClose(false)}
//                             sx={{
//                                 color: mainColor,
//                                 backgroundColor: "white",
//                                 borderColor: mainColor,
//                             }}
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             variant="contained"
//                             sx={{ color: "white", backgroundColor: mainColor }}
//                             type="submit"
//                         >
//                             Add
//                         </Button>
//                     </Box>
//                 </Box>
//             </form>
//         </ReactModal>
//     );
// };

// export default AddRegionModal;
