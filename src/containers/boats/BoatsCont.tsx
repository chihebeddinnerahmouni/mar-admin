import ShipDetails from "../../components/boats/ShipDetailsComp";
import { useEffect, useState } from "react";
import LoadingLine from "../../components/ui/LoadingLine";
import axios from "axios";
import { useTranslation } from "react-i18next";
import SearchBarsCont from "./SearchBarsCont";
import { Pagination } from "@mui/material";
import { axios_error_handler } from "../../functions/axios_error_handler";
import { useQuery } from "@tanstack/react-query";

const fetchShips = async (
  currentPage: number,
  boatName: string,
  ownerName: string
) => {
  const params = new URLSearchParams();
  params.append("page", currentPage.toString());
  if (boatName) params.append("boatName", boatName);
  if (ownerName) params.append("ownerName", ownerName);

  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const response = await axios.get(`${url}/api/listing/listings?${params}`);
  return response.data;
};

const BoatsCont = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const [boatName, setBoatName] = useState("");
  const [ownerName, setOwnerName] = useState("");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["ships", currentPage],
    queryFn: () => fetchShips(currentPage, boatName, ownerName),
  });

  useEffect(() => {
    if (error) axios_error_handler(error, t);
  }, [error]);
  if (error) return null;

  if (isLoading) return <LoadingLine />;

  return (
    <>
      <SearchBarsCont
        boatName={boatName}
        setBoatName={setBoatName}
        ownerName={ownerName}
        setOwnerName={setOwnerName}
        refetch={refetch}
      />
      <div className="w-full grid mt-[65px] grid-cols-1 justify-items-center gap-y-16 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-y-16 lg:gap-x-4 2xl:grid-cols-4">
        {isLoading ? (
          <div className="col-span-1 w-[100%] h-40 justify-center items-center md:col-span-2 lg:col-span-3 xl:col-span-4">
            <LoadingLine />
          </div>
        ) : (
          data.listings.map((ship: any, index: number) => (
            <ShipDetails key={index} ship={ship} />
          ))
        )}
      </div>
      <div className="pagination w-full mt-10 flex justify-center">
        <Pagination
          count={data.pagination.totalPages}
          page={currentPage}
          onChange={(_event, value) => {
            setCurrentPage(value);
          }}
        />
      </div>
    </>
  );
};

export default BoatsCont;
