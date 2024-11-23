import React from "react";
import ReactModal from "react-modal";
import { Button, Box, Typography } from "@mui/material";

interface UpdateModalProps {
  setClose: (isOpen: boolean) => void;
}

ReactModal.setAppElement("#root");

const UpdateQsts: React.FC<UpdateModalProps> = ({ setClose }) => {


  
    
    // not used
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
    </ReactModal>
  );
};


export default UpdateQsts;
