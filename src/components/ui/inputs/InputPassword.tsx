import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";


interface InputTextProps {
  value: string;
  setValue: any;
  label: string;
  error?: boolean;
  helperText?: string | false | undefined;
}

const InputPassword = ({
  value,
  setValue,
  label,
  error,
  helperText,
}: InputTextProps) => {

    const [showPassword, setShowPassword] = useState(false);


  const handleClickShowPassword = (e: any) => {
    e.preventDefault();
    setShowPassword((show) => !show);
  }



  return (
    <div className="password w-full">
      <div className="w-full relative">
        <div
          className={`absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 ${
            error ? "text-red-500" : "text-gray-400"
          }`}
          onClick={handleClickShowPassword}
        >
          {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
        </div>
        <input
          type={showPassword ? "text" : "password"}
          className={`w-full border rounded-lg p-3 pr-10 focus:ring-2 transition outline-none ${
            error
              ? "border-red-500 focus:ring-red-400 focus:border-red-400"
              : "border-gray-300 focus:ring-rose-300 focus:border-rose-300"
          }`}
          placeholder={label}
          // required
          value={value}
          onChange={setValue}
        />
      </div>
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

export default InputPassword;
