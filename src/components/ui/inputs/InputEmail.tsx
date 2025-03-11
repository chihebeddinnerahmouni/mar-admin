import { FaEnvelope } from "react-icons/fa";

interface InputTextProps {
  value: string;
  setValue: any;
  label: string;
  error?: boolean;
  helperText?: string | false | undefined;
  bgColor?: string;
  readOnly?: boolean;
}

const InputEmail = ({
  value,
  setValue,
  label,
  error,
  helperText,
  bgColor = "",
  readOnly = false,
}: InputTextProps) => {
  return (
    <div className="email w-full">
      <div className="w-full relative">
        <FaEnvelope
          className={`absolute left-3 top-1/2 -translate-y-1/2 ${
            error ? "text-red-500" : "text-gray-400"
          }`}
        />
        <input
          type="email"
          className={`w-full border rounded-lg p-3 pl-10 focus:ring-2 transition outline-none ${bgColor} ${
            error
              ? "border-red-500 focus:ring-red-400 focus:border-red-400"
              : "border-gray-300 focus:ring-rose-300 focus:border-rose-300"
          }`}
          placeholder={label}
          value={value}
          onChange={setValue}
          readOnly={readOnly}
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

export default InputEmail;
