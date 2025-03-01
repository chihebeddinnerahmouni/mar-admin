import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface InputTelProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
  error?: boolean;
  helperText?: string | false | undefined;
}

const InputTel: React.FC<InputTelProps> = ({
  value,
  setValue,
  label,
  error,
  helperText,
}) => {
  return (
    <div className="w-full bg-white rounded-lg">
      <PhoneInput
        country={"sa"}
        value={value}
        onChange={(phone) => setValue(phone)}
        inputClass={`w-full border-none rounded-lg px-3 py-2 focus:outline-none ${
          error
            ? "border-red-400 border-[2px]"
            : "border-gray-300 focus:border-pink-300"
        }`}
        buttonClass="border border-gray-300 rounded-l-lg px-2"
        dropdownClass="bg-white border border-gray-300 rounded-lg"
        placeholder={label}
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

export default InputTel;

// import React from "react";
// import { MuiTelInput } from "mui-tel-input";

// interface InputTelProps {
//   value: string;
//   setValue: (value: string) => void;
//   label: string;
//   error?: boolean;
//   helperText?: string | false | undefined;
// }

// const InputTel: React.FC<InputTelProps> = ({
//   value,
//   setValue,
//   label,
//   error,
//   helperText,
// }) => {
//   return (
//     <div className="w-full">
//       <MuiTelInput
//         value={value}
//         onChange={setValue}
//         defaultCountry="DZ" // Default to Algeria, change if needed
//         label={label}
//         variant="outlined"
//         fullWidth
//         error={error}
//         helperText={helperText}
//         sx={{
//           "& .MuiOutlinedInput-root": {
//             borderRadius: "8px",
//             borderColor: error ? "#f87171" : "#d1d5db",
//             "&:hover": { borderColor: error ? "#ef4444" : "#9ca3af" },
//             "&.Mui-focused": { borderColor: "#ec4899", borderWidth: "2px" },
//           },
//           "& .MuiFormLabel-root": {
//             color: error ? "#ef4444" : "#6b7280",
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default InputTel;

