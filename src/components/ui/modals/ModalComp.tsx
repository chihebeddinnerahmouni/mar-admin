import { Modal, Box } from "@mui/material";

interface AddCategoryModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalComp = ({ onClose, children }: AddCategoryModalProps) => {
  return (
    <Modal
      open={true}
      onClose={onClose}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(5px)",
        },
      }}
    >
      <Box
        sx={{
          maxHeight: "90vh",
          overflowY: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", md: "40%", lg: 600 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 1,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComp;
