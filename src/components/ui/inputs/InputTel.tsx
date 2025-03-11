// import React from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// interface InputTelProps {
//   value: string;
//   setValue: any;
//   label: string;
//   error?: boolean;
//   helperText?: string | false | undefined;
//   bgColor?: string;
// }

// const InputTel: React.FC<InputTelProps> = ({
//   value,
//   setValue,
//   label,
//   error,
//   helperText,
//   bgColor,
// }) => {
//   return (
//     <div className="w-full bgwhite rounded-lg">
//       <PhoneInput
//         country={"sa"}
//         value={value}
//         onChange={setValue}
//         containerClass="!w-full"
//         inputClass={`!w-full border-none rounded-lg px-3 py-2 focus:outline-none ${bgColor} ${
//           error
//             ? "border-red-400 border-[2px]"
//             : "border-gray-300 focus:border-pink-300"
//         }`}
//         buttonClass="border border-gray-300 rounded-l-lg px-2"
//         dropdownClass="bg-white border border-gray-300 rounded-lg"
//         placeholder={label}
//       />
//       {helperText && (
//         <span
//           className={`text-sm mt-1 ${error ? "text-red-500" : "text-gray-500"}`}
//         >
//           {helperText}
//         </span>
//       )}
//     </div>
//   );
// };

// export default InputTel;

import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from "react-i18next";

interface InputTelProps {
  value: string;
  setValue: any;
  label: string;
  error?: boolean;
  helperText?: string | false | undefined;
  bgColor?: string;
}

const InputTel: React.FC<InputTelProps> = ({
  value,
  setValue,
  label,
  error,
  helperText,
  bgColor = "",
}) => {
  const { i18n } = useTranslation();

  return (
    <div className="w-full">
      <PhoneInput
        country={"sa"}
        value={value}
        onChange={setValue}
        containerClass="w-full"
        inputClass={`!w-full border !rounded-lg !h-[50px] focus:ring-2 transition outline-none ${bgColor} ${
          error
            ? "!border-red-500 focus:ring-red-400 focus:border-red-400"
            : "border-gray-300 focus:ring-red-300 focus:border-red-300"
        }`}
        buttonClass={`border-r border-gray-300 px2
        ${i18n.language === "ar" ? "!rounded-r-lg" : "!rounded-l-lg"}
        `}
        dropdownClass="bg-white border border-gray-300 !rounded-lg"
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
