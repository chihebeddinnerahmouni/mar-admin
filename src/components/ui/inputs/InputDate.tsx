interface InputDateProps {
  value: string;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | false | undefined;
  minDate?: string;
}

const InputDate = ({
  value,
  setValue,
  error,
  helperText,
  minDate,
}: InputDateProps) => {
  return (
    <div className="w-full">
      <input
        min={minDate}
        type="date"
        className={`w-full border rounded-lg p-3 focus:ring-2 transition outline-none ${
          error
            ? "border-red-500 focus:ring-red-400 focus:border-red-400"
            : "border-gray-300 focus:ring-pink-500 focus:border-pink-500"
        }`}
        value={value || ""}
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

export default InputDate;
