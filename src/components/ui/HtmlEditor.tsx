// import { useCallback, useMemo, useRef } from "react";
// import JoditEditor from "jodit-react";
// import parse from "html-react-parser";

// interface Props {
//   desc: string;
//   setDesc: (desc: string) => void;
//   bg?: string;
// }

// const DescCont = ({ desc, setDesc, bg }: Props) => {
//   const editor = useRef<typeof JoditEditor>(null);

//   const handleEditorChange = useCallback(
//     (newContent: string) => {
//       if (desc !== newContent) {
//         setDesc(newContent);
//       }
//     },
//     [desc, setDesc]
//   );

//   const config = useMemo(
//     () => ({
//       buttons: [
//         "bold",
//         "italic",
//         "underline",
//         "strikethrough",
//         "eraser",
//         "ul",
//         "ol",
//         "outdent",
//         "indent",
//         "font",
//         "fontsize",
//         "brush",
//         "paragraph",
//         "image",
//         "link",
//         "align",
//         "undo",
//         "redo",
//       ],
//       toolbarAdaptive: false,
//       toolbarSticky: false,
//       showCharsCounter: false,
//       showWordsCounter: false,
//       showXPathInStatusbar: false,
//       askBeforePasteHTML: false,
//       askBeforePasteFromWord: false,
//       defaultFontSizePoints: "px",
//       defaultFontSize: "14px",
//       fontSize: "8,9,10,11,12,14,16,18,20,22,24,26,28,30,32,36,48,60,72,96",
//     }),
//     []
//   );

//   return (
//     <div>
//       <JoditEditor
//         ref={editor}
//         value={desc}
//         config={config}
//         onBlur={handleEditorChange} // Triggers only when the user finishes typing (better UX)
//       />
//       <div className={`mt-5 ${bg === "black" ? "text-white" : ""}`}>
//         <h3>Preview:</h3>
//         {parse(desc)}
//       </div>
//     </div>
//   );
// };

// export default DescCont;


import { Editor } from "@tinymce/tinymce-react";

interface Props {
    value?: string;
  setValue: any;
  initielValue: string;
}

const HtmlEditor = ({setValue, initielValue}: Props) => {
  return (
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
      // initialValue={`${t("answer_in_english")}...`}
      initialValue={initielValue}
  onEditorChange={setValue}
/>
  )
}

export default HtmlEditor
