import React, { useState } from "react";
import ReactModal from "react-modal";
import { TextField, Button, Box, Typography } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import LoadingButton from "../ui/LoadingButton";
import axios from "axios";

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

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewPhoto(e.target.files[0]);
            setPhoto(URL.createObjectURL(e.target.files[0]));
        }
    };

  const handleSubmit = (e: React.FormEvent) => {

    const check = enName && arName && description 
    if (!check) return alert("Please fill all the fields"); 
      
    
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
          }
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

    return (
      <div className="bg-white p-4 rounded-[5px] mb-10">
        <Typography variant="h4" component="h2" gutterBottom>
          Add Region
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Box display="flex" flexDirection="row" gap={2}>
              <TextField
                label="Region Name in english"
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
                      borderColor: "#FF385C",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#FF385C",
                  },
                }}
              />
              <TextField
                label="Region Name in arabic"
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
                      borderColor: "#FF385C",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#FF385C",
                  },
                }}
              />
            </Box>

            <TextField
              label="description"
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
                    borderColor: "#FF385C",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "gray",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FF385C",
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
                      Upload Photo
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
                sx={{ color: "white", backgroundColor: "#FF385C" }}
                type="submit"
              >
                {/* Add */}
                {loading ? <LoadingButton /> : "Add"}
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
//                                     borderColor: "#FF385C",
//                                 },
//                             },
//                             "& .MuiInputLabel-root": {
//                                 color: "gray",
//                             },
//                             "& .MuiInputLabel-root.Mui-focused": {
//                                 color: "#FF385C",
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
//                                 color: "#FF385C",
//                                 backgroundColor: "white",
//                                 borderColor: "#FF385C",
//                             }}
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             variant="contained"
//                             sx={{ color: "white", backgroundColor: "#FF385C" }}
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

