import { useTranslation } from 'react-i18next'
import { IoSearchSharp } from 'react-icons/io5'

interface Props {
  setOwnerSearch: any;
  ownerSearch: any;
  setBoatSearch: any;
  boatSearch: any;
  search_by_owner_name: any;
  search_by_boat_name: any;
}


const SearchBarsCont = ({
  setOwnerSearch,
  ownerSearch,
  setBoatSearch,
  boatSearch,
  search_by_owner_name,
  search_by_boat_name
}: Props) => {


  const { t, i18n } = useTranslation();

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 max-w-[1000px] mx-auto">
      <div className="search relative w-full">
        <input
          type="text"
          value={boatSearch}
          onChange={(e) => setBoatSearch(e.target.value)}
          placeholder={t("search_by_boat_name") + "..."}
          className={`p-2 h-[50px] w-full border rounded-40 outline-main font-semibold bg-emptyInput ${
            i18n.language === "ar" ? "pl-7" : "pr-7"
          }`}
        />
        <button
          onClick={search_by_boat_name}
          className={`absolute top-1/2 transform -translate-y-1/2 bg-main h-[80%] w-[40px] flex items-center justify-center rounded-50 hover:bg-mainHover ${
            i18n.language === "ar" ? "left-4" : "right-1"
          }`}
        >
          <IoSearchSharp className={`text-white text-[18px] `} />
        </button>
      </div>
      <div className="search relative w-full">
        <input
          type="text"
          value={ownerSearch}
          onChange={(e) => setOwnerSearch(e.target.value)}
          placeholder={t("search_by_owner_name") + "..."}
          className={`p-2 h-[50px] w-full border rounded-40 outline-main font-semibold bg-emptyInput ${
            i18n.language === "ar" ? "pl-7" : "pr-7"
          }`}
        />
        <button
          onClick={search_by_owner_name}
          className={`absolute top-1/2 transform -translate-y-1/2 bg-main h-[80%] w-[40px] flex items-center justify-center rounded-50 hover:bg-mainHover ${
            i18n.language === "ar" ? "left-4" : "right-1"
          }`}
        >
          <IoSearchSharp className={`text-white text-[18px] `} />
        </button>
      </div>
    </div>
  );
};

export default SearchBarsCont
