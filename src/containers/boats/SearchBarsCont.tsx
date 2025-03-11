import { useTranslation } from 'react-i18next'
import InputSearch from '../../components/ui/inputs/InputSearch'


interface Props {
  boatName: string;
  setBoatName: any;
  ownerName: string;
  setOwnerName: any;
  refetch: any;
}


const SearchBarsCont = ({
  boatName,
  setBoatName,
  ownerName,
  setOwnerName,
refetch
}: Props) => {


  const { t, i18n } = useTranslation();


  return (
    <div className="w-full flex flex-col md:flex-row gap-4 max-w-[1000px] mx-auto">
      <InputSearch
        value={boatName}
        setValue={(e: any) => setBoatName(e.target.value)}
        label={t("search_by_boat_name") + "..."}
        onClick={refetch}
        // onClick={() => console.log("search_by_boat_name")}
        i18n={i18n}
      />
      <InputSearch
        value={ownerName}
        setValue={(e: any) => setOwnerName(e.target.value)}
        label={t("search_by_owner_name") + "..."}
        onClick={refetch}
        // onClick={() => console.log("search_by_owner_name")}
        i18n={i18n}
      />
    </div>
  );
};

export default SearchBarsCont
