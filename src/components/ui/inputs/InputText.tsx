// import TextField from "@mui/material/TextField";

// interface InputTextProps {
//   value: string;
//   setValue: (value: string) => void;
//   label: string;
//   error?: boolean;
//   helperText?: string | false | undefined;
// }

// const InputText = ({ value, setValue, label, error, helperText }: InputTextProps) => {
//   const mainColor = "#199B8A";

//   return (
//     <TextField
//       label={label}
//       value={value}
//       onChange={(e: any) => setValue(e.target.value)}
//       variant="standard"
//       fullWidth
//       error={error}
//       helperText={helperText}
//       sx={{
//         "& input": {
//           color: "black",
//         },
//         "& label.Mui-focused": {
//           color: mainColor,
//         },
//         "& label": {
//           color: "gray",
//         },
//         "& .MuiInput-underline:before": {
//           borderBottomColor: "gray",
//         },
//         "& .MuiInput-underline:hover:before": {
//           borderBottomColor: mainColor,
//         },
//         "& .MuiInput-underline:after": {
//           borderBottomColor: mainColor,
//         },
//       }}
//     />
//   );
// };

// export default InputText;

interface InputTextProps {
  value: string;
  setValue: any;
  label: string;
  error?: boolean;
  helperText?: string | false | undefined;
}

const InputText = ({ value, setValue, label, error, helperText }: InputTextProps) => {

  return (
    <div className="w-full">
      <input
        type="text"
        // className={`w-full border border-gray-300 rounded-lg p-3 pl-10 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition`}
        className={`w-full border rounded-lg p-3 pl10 focus:ring-2 transition outline-none ${
          error
            ? "border-red-500 focus:ring-red-400 focus:border-red-400"
            : "border-gray-300 focus:ring-pink-300 focus:border-pink-300"
        }`}
        placeholder={label}
        // required
        value={value}
        onChange={setValue}
      />
      {helperText && (
        <span
          className={`text-sm mt-1 ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default InputText;