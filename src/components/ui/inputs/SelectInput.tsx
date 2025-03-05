import { useTranslation } from "react-i18next";

interface Option {
  name: string;
  id: number;
  arabic_name?: string;
}

interface SelectProps {
  options: Option[];
  value: number;
  setValue: (id: number) => void;
  label?: string;
  error?: boolean;
  helperText?: string;
}

const SelectComp = ({
  options,
  value,
  setValue,
  label,
  error,
  helperText,
}: SelectProps) => {

    const { t, i18n } = useTranslation();

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <select
        className={`w-full border rounded-lg p-3 focus:ring-2 transition outline-none ${
          error
            ? "border-red-500 focus:ring-red-400 focus:border-red-400"
            : "border-gray-300 focus:ring-pink-300 focus:border-pink-300"
        }`}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      >
        {/* Empty Default Option */}
        <option value={0}>{t("select_an_option")}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {i18n.language === "ar" ? option.arabic_name : option.name}
          </option>
        ))}
      </select>
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

export default SelectComp;

