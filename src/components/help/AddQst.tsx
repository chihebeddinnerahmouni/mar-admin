import React, { useState } from "react";
import ReactModal from "react-modal";
import { TextField, Button, Typography, Select, MenuItem } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useTranslation } from "react-i18next";


interface AddQstProps {
  setClose: (isOpen: boolean) => void;
  categoriesArray: any;
}

ReactModal.setAppElement("#root");


const AddQst: React.FC<AddQstProps> = ({ setClose, categoriesArray }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [arabic_question, setArabicQuestion] = useState("");
  const [arabic_answer, setArabicAnswer] = useState("");
  const [category, setCategory] = useState<any>([]);
  const [step, setStep] = useState(1);
  const mainColor = "#FF385C";
  const { i18n, t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_HELP;

  // console.log(question);
  // console.log(answer);
  // console.log(categoriesArray);
  // console.log(category);

  const handleSubmit = () => {
    axios
      .post(
        `${url}/categories/${category.id}/questions`,
        {
          question,
          answer,
          arabic_question,
          arabic_answer,
        }
      )
      .then(() => {
        // console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    setClose(false);
  };

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setClose(false)}
      className={
        "bg-white min-w-[300px] rounded-lg p-4 shadow-hardShadow lg:p-6 xl:max-w-[1000px] xl:mx-auto"
      }
      overlayClassName={
        "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center p-4 mt-[60px] md:px-20 lg:mt-[80px] "
      }
    >
      {step === 1 && (
        <>
          <Typography variant="h4" component="h2" gutterBottom>
            {t("wich_category")}?
          </Typography>
          <Select
            label="Question"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: mainColor,
                },
                "&:hover fieldset": {
                  borderColor: mainColor,
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
              "& .MuiSelect-select": {
                color: "black",
              },
            }}
            variant="outlined"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: "200px",
                  overflow: "auto",
                },
              },
            }}
          >
            <MenuItem value="" disabled>
              {t("select_category")}
            </MenuItem>
            {categoriesArray.map((category: any, index: number) => (
              <MenuItem key={index} value={category}>
                {i18n.language === "en" ? category.name : category.arabic_name}
              </MenuItem>
            ))}
          </Select>

          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: mainColor,
              marginTop: "20px",
              width: "100%",
            }}
            onClick={() => {
              if (category === "") {
                alert(t("select_category"));
                return;
              }
              setStep(2);
            }}
          >
            {t("next")}
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <Typography variant="h4" component="h2" gutterBottom>
            {t("set_the_qst_and_answer_in_english")}
          </Typography>
          <TextField
            label={t("question-in_english")}
            variant="outlined"
            fullWidth
            value={question}
            sx={{
              marginBottom: "20px",
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
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Editor
            apiKey="trrkyoh7hvt1k7rolyktoalj3j8u1234p1e3isyk9mdfuj4j"
            init={{
              plugins: [
                "anchor",
                "autolink",
                "charmap",
                "codesample",
                "emoticons",
                "image",
                "link",
                "lists",
                "media",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
              ],
              menubar: false,
              height: 250,
              toolbar:
                "undo redo | blocks fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (respondWith: any) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
              exportpdf_converter_options: {
                format: "Letter",
                margin_top: "1in",
                margin_right: "1in",
                margin_bottom: "1in",
                margin_left: "1in",
              },
              exportword_converter_options: { document: { size: "Letter" } },
              importword_converter_options: {
                formatting: {
                  styles: "inline",
                  resets: "inline",
                  defaults: "inline",
                },
              },
            }}
            initialValue={`${t("answer_in_english")}...`}
            onEditorChange={(content) => setAnswer(content)}
          />

          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: mainColor,
              marginTop: "20px",
              width: "100%",
            }}
            onClick={() => {
              if (question === "" || answer === "") {
                alert(t("please_fill_all_fields"));
                return;
              }
              setStep(3);
            }}
          >
            {t("next")}
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <Typography variant="h4" component="h2" gutterBottom>
            {t("set_the_qst_and_answer_in_arabic")}
          </Typography>
          <TextField
            label={t("question-in_arabic")}
            variant="outlined"
            fullWidth
            value={arabic_question}
            sx={{
              marginBottom: "20px",
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
            onChange={(e) => setArabicQuestion(e.target.value)}
          />
          <Editor
            apiKey="trrkyoh7hvt1k7rolyktoalj3j8u1234p1e3isyk9mdfuj4j"
            init={{
              plugins: [
                "anchor",
                "autolink",
                "charmap",
                "codesample",
                "emoticons",
                "image",
                "link",
                "lists",
                "media",
                "searchreplace",
                "table",
                "visualblocks",
                "wordcount",
              ],
              menubar: false,
              height: 250,
              toolbar:
                "undo redo | blocks fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              mergetags_list: [
                { value: "First.Name", title: "First Name" },
                { value: "Email", title: "Email" },
              ],
              ai_request: (respondWith: any) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
              exportpdf_converter_options: {
                format: "Letter",
                margin_top: "1in",
                margin_right: "1in",
                margin_bottom: "1in",
                margin_left: "1in",
              },
              exportword_converter_options: { document: { size: "Letter" } },
              importword_converter_options: {
                formatting: {
                  styles: "inline",
                  resets: "inline",
                  defaults: "inline",
                },
              },
            }}
            initialValue={`${t("answer_in_arabic")}...`}
            onEditorChange={(content) => setArabicAnswer(content)}
          />

          <Button
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: mainColor,
              marginTop: "20px",
              width: "100%",
            }}
            onClick={() => {
              if (question === "" || answer === "") {
                alert("Please fill all fields");
                return;
              }
              handleSubmit();
            }}
          >
            {t("save")}
          </Button>
        </>
      )}
    </ReactModal>
  );
};

export default AddQst;
// import React, { useState } from "react";
// import ReactModal from "react-modal";
// import { TextField, Button, Box, Typography, Select, MenuItem } from "@mui/material";
// import { Editor } from "@tinymce/tinymce-react";
// import axios from "axios";
// import { useTranslation } from "react-i18next";


// interface AddQstProps {
//   setClose: (isOpen: boolean) => void;
//   categoriesArray: any;
// }

// ReactModal.setAppElement("#root");


// const AddQst: React.FC<AddQstProps> = ({ setClose, categoriesArray }) => {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [category, setCategory] = useState("");
//   const mainColor = "#FF385C";
//   const { i18n } = useTranslation();
//   const url = import.meta.env.VITE_SERVER_URL_HELP;

//   // console.log(question);
//   // console.log(answer);
//   // console.log(categoriesArray);
//   console.log(category);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     axios
//       .post(
//         `${url}/categories/1/questions`,
//         {
//           question,
//           answer,
//         }
//       )
//       .then(() => {
//         // console.log(response);
//         window.location.reload();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     setClose(false);
//   };

//   return (
//     <ReactModal
//       isOpen={true}
//       onRequestClose={() => setClose(false)}
//       className={
//         "bg-white rounded-lg p-4 shadow-hardShadow lg:p-6 xl:max-w-[1000px] xl:mx-auto"
//       }
//       overlayClassName={
//         "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center p-4 mt-[60px] md:px-20 lg:mt-[80px] "
//       }
//     >
//       <Typography variant="h4" component="h2" gutterBottom>
//         Add Question
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4 flex gap-2">
//           <TextField
//             label="Question"
//             variant="outlined"
//             fullWidth
//             value={question}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: "grey",
//                 },
//                 "&:hover fieldset": {
//                   borderColor: "grey",
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: mainColor,
//                 },
//               },
//               "& .MuiInputLabel-root": {
//                 color: "gray",
//               },
//               "& .MuiInputLabel-root.Mui-focused": {
//                 color: mainColor,
//               },
//             }}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//           <Select
//             label="Question"
//             sx={{
//               width: 120,
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: mainColor,
//                 },
//                 "&:hover fieldset": {
//                   borderColor: mainColor,
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: mainColor,
//                 },
//               },
//               "& .MuiInputLabel-root": {
//                 color: "gray",
//               },
//               "& .MuiInputLabel-root.Mui-focused": {
//                 color: mainColor,
//               },
//               "& .MuiSelect-select": {
//                 color: "black",
//               },
//             }}
//             variant="outlined"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             displayEmpty
//           >
//             <MenuItem value="" disabled>
//               Select Question category
//             </MenuItem>
//             {categoriesArray.map((category: any, index: number) => (
//               <MenuItem key={index} value={category}>
//                 {i18n.language === "en" ? category.name : category.arabic_name}
//               </MenuItem>
//             ))}
//           </Select>
//         </div>
//         <Box mb={2} className="ckeditor-container">
//           <Editor
//             apiKey="trrkyoh7hvt1k7rolyktoalj3j8u1234p1e3isyk9mdfuj4j"
//             init={{
//               plugins: [
//                 "anchor",
//                 "autolink",
//                 "charmap",
//                 "codesample",
//                 "emoticons",
//                 "image",
//                 "link",
//                 "lists",
//                 "media",
//                 "searchreplace",
//                 "table",
//                 "visualblocks",
//                 "wordcount",
//               ],
//               toolbar:
//                 "undo redo | blocks fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
//               tinycomments_mode: "embedded",
//               tinycomments_author: "Author name",
//               mergetags_list: [
//                 { value: "First.Name", title: "First Name" },
//                 { value: "Email", title: "Email" },
//               ],
//               ai_request: (respondWith: any) =>
//                 respondWith.string(() =>
//                   Promise.reject("See docs to implement AI Assistant")
//                 ),
//               exportpdf_converter_options: {
//                 format: "Letter",
//                 margin_top: "1in",
//                 margin_right: "1in",
//                 margin_bottom: "1in",
//                 margin_left: "1in",
//               },
//               exportword_converter_options: { document: { size: "Letter" } },
//               importword_converter_options: {
//                 formatting: {
//                   styles: "inline",
//                   resets: "inline",
//                   defaults: "inline",
//                 },
//               },
//             }}
//             initialValue="Answer..."
//             onEditorChange={(content) => setAnswer(content)}
//             // value={answer}
//           />
//         </Box>
//         <Box display="flex" justifyContent="flex-end" gap={2}>
//           <Button
//             variant="outlined"
//             onClick={() => setClose(false)}
//             sx={{
//               color: mainColor,
//               backgroundColor: "white",
//               borderColor: "#FF385C",
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             sx={{ color: "white", backgroundColor: mainColor }}
//             type="submit"
//           >
//             Add
//           </Button>
//         </Box>
//       </form>
//     </ReactModal>
//   );
// };

// export default AddQst;