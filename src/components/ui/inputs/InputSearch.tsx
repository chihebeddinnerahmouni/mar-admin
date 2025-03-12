import { IoSearchSharp } from 'react-icons/io5';

interface Props {
    value: string;
    setValue: any;
    label: string;
    onClick: any;
    i18n: any;
}

const InputSearch = ({value, setValue, label, onClick, i18n}: Props) => {
  return (
    <div className="search relative w-full">
      <input
        type="text"
        value={value}
        onChange={setValue}
        placeholder={label}
        className={`p-2 h-[50px] w-full border rounded-40 outline-main font-semibold bg-emptyInput ${
          i18n.language === "ar" ? "pl-[60px]" : "pr-7"
        }`}
      />
      <button
        onClick={onClick}
        className={`absolute top-1/2 transform -translate-y-1/2 bg-main h-[80%] w-[40px] flex items-center justify-center rounded-50 hover:bg-mainHover ${
          i18n.language === "ar" ? "left-2" : "right-1"
        }`}
      >
        <IoSearchSharp className={`text-white text-[18px] `} />
      </button>
    </div>
  );
}

export default InputSearch
