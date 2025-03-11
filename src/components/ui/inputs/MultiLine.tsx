interface InputTextProps {
  value: string;
  setValue: any;
  label: string;
  error?: boolean;
  helperText?: string | false | undefined;
  bgColor?: string;
}

const MultiLine = ({
  value,
  setValue,
  label,
  error,
  helperText,
  bgColor = "",
}: InputTextProps) => {
  return (
    <div className="w-full">
      <textarea
        className={`w-full max-h-[200px] border-2 border-gray300 rounded-lg p-3 transition outline-none ${bgColor} ${
          error
            ? "border-red-500 focus:ring-red-400 focus:border-red-400"
            : "border-gray-300 focus:ring-pink-300 focus:border-pink-300"
        }`}
        rows={4}
        placeholder={label}
        value={value}
        onChange={setValue}
      ></textarea>
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

export default MultiLine;
