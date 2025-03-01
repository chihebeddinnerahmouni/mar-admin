// import TextField from "@mui/material/TextField";

// interface InputTextProps {
//     value: string;
//     setValue: (value: string) => void;
//     label: string;
//     error?: boolean;
//     helperText?: string | false | undefined;
// }

// const MultiLine = ({
//     value,
//     setValue,
//     label,
//     error,
//     helperText,
// }: InputTextProps) => {
//     const mainColor = "#199B8A";

//     return (
//         <TextField
//             label={label}
//             value={value}
//             onChange={(e: any) => setValue(e.target.value)}
//             variant="standard"
//             fullWidth
//             error={error}
//             helperText={helperText}
//             multiline
//             rows={6}
//             sx={{
//                 "& textarea": {
//                     color: "black",
//                 },
//                 "& label.Mui-focused": {
//                     color: mainColor,
//                 },
//                 "& label": {
//                     color: "gray",
//                 },
//                 "& .MuiInput-underline:before": {
//                     borderBottomColor: "gray",
//                 },
//                 "& .MuiInput-underline:hover:before": {
//                     borderBottomColor: mainColor,
//                 },
//                 "& .MuiInput-underline:after": {
//                     borderBottomColor: mainColor,
//                 },
//             }}
//         />
//     );
// };

// export default MultiLine;

interface InputTextProps {
    value: string;
    setValue: (value: string) => void;
    label: string;
    error?: boolean;
    helperText?: string | false | undefined;
}

const MultiLine = ({
    value,
    setValue,
    label,
    error,
    helperText,
}: InputTextProps) => {

    return (
      <div className="w-full">
        <textarea
          className={`w-full max-h-[200px] border border-gray300 rounded-lg p-3 transition ${
            error
              ? "border-red-500 focus:ring-red-400 focus:border-red-400"
              : "border-gray-300 focus:ring-teal-400 focus:border-teal-400"
          }`}
          rows={4}
          placeholder={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
        {helperText && (
          <span
            className={`text-sm mt-1 ${
              error ? "text-red-500" : "text-gray-500"
            }`}
          >
            {helperText}
          </span>
        )}
      </div>
    );
};

export default MultiLine;