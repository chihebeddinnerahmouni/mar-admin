import React, { useState } from "react";
import ReactModal from "react-modal";
import { TextField, Button, Box, IconButton, Avatar } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface DeleteModalProps {
    setClose: (isOpen: number) => void;
}
ReactModal.setAppElement("#root");

const AddUserModal: React.FC<DeleteModalProps> = ({ setClose }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const mainColor = "#FF385C";
  const { t } = useTranslation();

  const handleAddUser = () => {
    const check = !firstName || !lastName || !email || !phone || !password || !confirmPassword;
        if (check) {
            alert("Please fill in all fields");
        }
  };
  


    const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setProfilePic(event.target.files[0]);
        }
    };

    return (
      <ReactModal
        isOpen={true}
        onRequestClose={() => setClose(0)}
        className={"bg-white rounded-lg p-4 shadow-hardShadow lg:p-6"}
        overlayClassName={
          "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center p-4"
        }
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <IconButton component="label">
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleProfilePicChange}
            />
            <Avatar
              src={profilePic ? URL.createObjectURL(profilePic) : undefined}
              sx={{
                width: 80,
                height: 80,
                backgroundColor: profilePic ? "transparent" : "#ECECEE",
              }}
            >
              {!profilePic && (
                <CameraAlt fontSize="medium" className="text-main" />
              )}
            </Avatar>
          </IconButton>

          <Box display="flex" gap={2} mt={2}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: mainColor,
                  },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: mainColor,
                },
              }}
              label={t("first_name")}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: mainColor,
                  },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: mainColor,
                },
              }}
              label={t("last_name")}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Box>

          <Box display="flex" gap={2} mt={2}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: mainColor,
                  },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: mainColor,
                },
              }}
              label={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: mainColor,
                  },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: mainColor,
                },
              }}
              label={t("phone")}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Box>

          <Box display="flex" gap={2} mt={2}>
            <TextField
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: mainColor,
                  },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: mainColor,
                },
              }}
              label={t("password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: mainColor,
                  },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: mainColor,
                },
              }}
              label={t("confirm_password")}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>

          <Button
            variant="contained"
            onClick={handleAddUser}
            sx={{
              mt: 3,
              backgroundColor: mainColor,
              color: "white",
              width: "100%",
              height: 40,
            }}
          >
            {t("save")}
          </Button>
        </Box>
      </ReactModal>
    );
};

export default AddUserModal;