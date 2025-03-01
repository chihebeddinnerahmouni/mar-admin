import ShipDetails from "../../components/boats/ShipDetailsComp";
import { useEffect, useState } from "react";
import LoadingLine from "../../components/ui/LoadingLine";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SearchBarsCont from "./SearchBarsCont";
import { Pagination } from "@mui/material";
import {
  axios_error_handler
} from "../../functions/axios_error_handler";


const BoatsCont = () => {
  const [shipsArray, setShipsArray] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const fetchData = (currentPage: number) => {
    axios
      .get(`${url}/api/listing/listings?page=${currentPage}`)
      .then((response) => {
        setShipsArray(response.data.listings);
        setTotalPages(response.data.pagination.totalPages);
        setLoading(false);
      })
      .catch((error: any) => {
        setLoading(false);
        axios_error_handler(error, t);
      });
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = query.get("page");
    if (page) {
      const pageNumber = Number(page);
      if (pageNumber > 0 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      } else {
        navigate(`?page=1`, { replace: true });
      }
    } else {
      navigate(`?page=${currentPage}`, { replace: true });
    }
  }, [location.search, totalPages, navigate]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  return (
    <>
      <SearchBarsCont
        setLoading={setLoading}
        setShipsArray={setShipsArray}
        setTotalPages={setTotalPages}
      />
      <div className="w-full grid mt-[65px] grid-cols-1 justify-items-center gap-y-16 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-y-16 lg:gap-x-4 2xl:grid-cols-4">
        {loading ? (
          <div className="col-span-1 w-[100%] h-40 justify-center items-center md:col-span-2 lg:col-span-3 xl:col-span-4">
            <LoadingLine />
          </div>
        ) : (
          shipsArray.map((ship: any, index: number) => (
            <ShipDetails key={index} ship={ship} />
          ))
        )}
      </div>
      <div className="pagination w-full mt-10 flex justify-center">
        <Pagination
          count={totalPages}
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

