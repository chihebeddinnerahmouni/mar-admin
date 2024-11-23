import React, { useState } from "react";
import ReactModal from "react-modal";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

interface UpdateModalProps {
  setClose: (isOpen: boolean) => void;
  region: {
    id: number;
    name: string;
    photo: string;
  };
}

// not used

ReactModal.setAppElement("#root");

const UpdateRegionModal: React.FC<UpdateModalProps> = ({ setClose, region }) => {
  const [name, setName] = useState(region.name);
  const [photo, setPhoto] = useState(region.photo);
  const [_newPhoto, setNewPhoto] = useState<File | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewPhoto(e.target.files[0]);
      setPhoto(URL.createObjectURL(e.target.files[0]));
      // console.log(newPhoto);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated region:", { id: region.id, name, photo });
    setClose(false);
  };

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setClose(false)}
      className={"bg-white rounded-lg p-4 shadow-hardShadow lg:p-6"}
      overlayClassName={
        "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center p-4 mt-[60px] lg:mt-[80px]"
      }
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Update Region
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Region Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
          >
            <img
              src={photo}
              alt={name}
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={handlePhotoChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
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
              variant="contained"
              sx={{ color: "white", backgroundColor: "#FF385C" }}
              type="submit"
            >
              Update
            </Button>
          </Box>
        </Box>
      </form>
    </ReactModal>
  );
};

export default UpdateRegionModal;