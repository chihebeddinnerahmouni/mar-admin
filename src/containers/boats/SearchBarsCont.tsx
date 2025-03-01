import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useState, useCallback } from 'react'
import { axios_error_handler } from '../../functions/axios_error_handler'
import InputSearch from '../../components/ui/inputs/InputSearch'


interface Props {
  setLoading: any;
  setShipsArray: any;
  setTotalPages: any;
}


const SearchBarsCont = ({
  setLoading,
  setShipsArray,
  setTotalPages

}: Props) => {


  const { t, i18n } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
    const [boatSearch, setBoatSearch] = useState("");
    const [ownerSearch, setOwnerSearch] = useState("");


  const search_by_boat_name = useCallback(() => {
    // console.log("boat");
    if (boatSearch === "") return;
    setLoading(true);
    // /api/listing/listings/search?boatName=Ocean&ownerName=sssss&page=2&limit=5
    axios
      .get(`${url}/api/listing/listings?boatName=${boatSearch}`)
      .then((response) => {
        setShipsArray(response.data.listings);
        setTotalPages(response.data.pagination.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        axios_error_handler(error, t);
      });
  }, [boatSearch]);

  const search_by_owner_name = useCallback(() => {
    console.log(ownerSearch);
  }, [ownerSearch]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 max-w-[1000px] mx-auto">
      <InputSearch
        value={boatSearch}
        setValue={(e: any) => setBoatSearch(e.target.value)}
        label={t("search_by_boat_name") + "..."}
        onClick={search_by_boat_name}
        i18n={i18n}
      />
      <InputSearch
        value={ownerSearch}
        setValue={(e: any) => setOwnerSearch(e.target.value)}
        label={t("search_by_owner_name") + "..."}
        onClick={search_by_owner_name}
        i18n={i18n}
      />
    </div>
  );
};

export default SearchBarsCont
