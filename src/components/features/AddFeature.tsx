// import ReactModal from "react-modal";
// import { useTranslation } from "react-i18next";
// import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
// import axios from "axios";
// import Swal from "sweetalert2";


// interface UpdatePricesProps {
//     setClose: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const AddFeature: React.FC<UpdatePricesProps> = ({ setClose }) => {
//     const { t } = useTranslation();
//     const [engName, setEngName] = useState("");
//   const [arName, setArName] = useState("");
//   const [image, setImage] = useState<any>();
  
//   const mainColor = "#FF385C";
//   const url = import.meta.env.VITE_SERVER_URL_LISTING;


//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setImage(e.target.files[0]);
//     } else {
//       // Handle the case where no file is selected or e.target.files is null
//       console.error("No file selected or files is null");
//     }
//   };


//     const handleContinue = () => {
//         const formData = new FormData();
//       formData.append("name", engName);
//       formData.append("image", image);
      
//         axios
//           .put(`${url}/admin/listing/features`, formData, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//             },
//           })
//           .then((res) => {
//             console.log(res.data);
//             Swal.fire({
//               title: t("great"),
//               text: t("prices_updated_successfully"),
//               icon: "success",
//               timer: 2000,
//               showConfirmButton: false,
//               timerProgressBar: true,
//               customClass: {
//                 confirmButton: "custom-confirm-button",
//               },
//             });
//             setClose(false);
//             window.location.reload();
//           })
//           .catch(() => {
//             Swal.fire({
//               title: t("oops"),
//               text: t("something_went_wrong_try_again"),
//               icon: "error",
//               timer: 2000,
//               timerProgressBar: true,
//               customClass: {
//                 confirmButton: "custom-confirm-button",
//               },
//             });
//           });
//     };

  
//     return (
//       <ReactModal
//         isOpen={true}
//         onRequestClose={() => setClose(false)}
//         className="flex flex-col items-center justify-center w-full bg-white p-3 rounded-10 shadow-hardShadow md:w-[500px]"
//         overlayClassName="fixed inset-0 backdrop-blur-[7px] bg-opacity-20 bg-black z-20 flex items-center justify-center px-4"
//       >
//         <p className="mb-5 text-[25px] font-bold">{t("add_feature")}</p>

//         <input type="file" onChange={handleImageChange} accept="image/*" />

//         <TextField
//           label={t("feature_name_in_english")}
//           value={engName}
//           onChange={(e) => setEngName(e.target.value)}
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": {
//                 borderColor: "grey",
//               },
//               "&:hover fieldset": {
//                 borderColor: "grey",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: mainColor,
//               },
//             },
//             "& .MuiInputLabel-root": {
//               color: "gray",
//             },
//             "& .MuiInputLabel-root.Mui-focused": {
//               color: mainColor,
//             },
//           }}
//         />

//         <TextField
//           label={t("feature_name_in_arabic")}
//           value={arName}
//           onChange={(e) => setArName(e.target.value)}
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           sx={{
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": {
//                 borderColor: "grey",
//               },
//               "&:hover fieldset": {
//                 borderColor: "grey",
//               },
//               "&.Mui-focused fieldset": {
//                 borderColor: mainColor,
//               },
//             },
//             "& .MuiInputLabel-root": {
//               color: "gray",
//             },
//             "& .MuiInputLabel-root.Mui-focused": {
//               color: mainColor,
//             },
//           }}
//         />

//         <button
//           onClick={handleContinue}
//           className="w-full py-2 bg-main text-white rounded-lg shadow-md hover:bg-mainHover transition duration-200 ease-in-out mt-5"
//         >
//           {t("save")}
//         </button>
//       </ReactModal>
//     );
// };

// export default AddFeature;



import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import LoadingButton from "../ui/LoadingButton";


interface UpdatePricesProps {
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFeature: React.FC<UpdatePricesProps> = ({ setClose }) => {
    const { t } = useTranslation();
    const [engName, setEngName] = useState("");
  const [arName, setArName] = useState("");
  const [image, setImage] = useState<any>();
  const [imagePreview, setImagePreview] = useState<any>();
  const [loading, setLoading] = useState(false);
  
  const mainColor = "#FF385C";
  const url = import.meta.env.VITE_SERVER_URL_LISTING;


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };



  const handleContinue = () => {
    
    const check = !engName || !image || !arName;
    if (check) return;

    setLoading(true);

        const formData = new FormData();
      formData.append("name", engName);
      formData.append("arabic_name", arName);
      formData.append("image", image);
      
        axios
          .post(`${url}/admin/listing/features`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          })
          .then(() => {
            // console.log(res.data);
            setLoading(false);
            Swal.fire({
              title: t("great"),
              text: t("prices_updated_successfully"),
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
              timerProgressBar: true,
              customClass: {
                confirmButton: "custom-confirm-button",
              },
            });
            setClose(false);
            window.location.reload();
          })
          .catch((err) => {
            setLoading(false);
            // console.log(err.response.data);
            Swal.fire({
              title: t("oops"),
              text: t(err.response.data),
              icon: "error",
              timer: 2000,
              timerProgressBar: true,
              customClass: {
                confirmButton: "custom-confirm-button",
              },
            });
          });  
    };

  
    return (
      <div className="mb-5 bg-white p-5 rounded-[10px] shadow-md relative flex flex-col items-center">
        <div className="cancel absolute top-2 right-2">
          <IconButton
            size="small"
            sx={{ color: "red" }}
            onClick={() => setClose(false)}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <p className="mb-5 text-[25px] font-bold">{t("add_feature")}</p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="icon-button-file"
        />
        <label htmlFor="icon-button-file" className="">
          <IconButton component="span">
            {imagePreview ? (
              <Avatar src={imagePreview} sx={{ width: 106, height: 106 }} />
            ) : (
              <Avatar sx={{ width: 106, height: 106 }}>
                <PhotoCamera />
              </Avatar>
            )}
          </IconButton>
        </label>

        <TextField
          label={t("feature_name_in_english")}
          value={engName}
          onChange={(e) => setEngName(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
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
          label={t("feature_name_in_arabic")}
          value={arName}
          onChange={(e) => setArName(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
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

        <button
          onClick={handleContinue}
          disabled={loading}
          className="w-full h-10 bg-main text-white rounded-lg shadow-md hover:bg-mainHover transition duration-200 ease-in-out mt-5"
        >
          {loading ? <LoadingButton /> : t("save")}
        </button>
      </div>
    );
};

export default AddFeature;