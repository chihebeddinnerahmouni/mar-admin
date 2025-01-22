import ShipDetails from "../../components/boats/ShipDetailsComp";
import { useEffect, useState } from "react";
import LoadingLine from "../../components/ui/LoadingLine";
import axios from "axios";
import Pagination from "../../components/ui/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
// import boats_array from "../../assets/files/boats_array";
import SearchBarsCont from "./SearchBarsCont";


const BoatsCont = () => {
  const [shipsArray, setShipsArray] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [boatSearch, setBoatSearch] = useState("");
  const [ownerSearch, setOwnerSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  // useEffect(() => {
  //     setShipsArray(boats_array.listings);
  //   setLoading(false);
  //   setTotalPages(boats_array.pagination.totalPages);
  // }, []);

  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const fetchData = (currentPage: number) => {
    axios
      .get(`${url}/api/listing/listings?page=${currentPage}`)
      .then((response) => {
        setShipsArray(response.data.listings);
        setTotalPages(response.data.pagination.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.message === "Error") {
          Swal.fire({
            icon: "error",
            title: t("network_error"),
            text: t("please_try_again"),
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          }).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: t("please_try_again"),
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          });
        }
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
    // setLoading(true);
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  if (loading)
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );

  
  const search_by_boat_name = () => {
    // console.log("boat");
    if (boatSearch === "") return 
    setLoading(true);
    // /api/listing/listings/search?boatName=Ocean&ownerName=sssss&page=2&limit=5
    axios.get(`${url}/api/listing/listings?boatName=${boatSearch}`)
      .then((response) => {
      console.log(response.data);
      setShipsArray(response.data.listings);
      setTotalPages(response.data.pagination.totalPages);
      setLoading(false);
    })
      .catch((error) => {
      console.log(error);
      setLoading(false);
      if (error.message === "Error") {
        Swal.fire({
          icon: "error",
          title: t("network_error"),
          text: t("please_try_again"),
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: t("please_try_again"),
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
      }
    });
  }


  const search_by_owner_name = () => {
// console.log("owner");
  }
  
  
  
  
  return (
    <>
      <SearchBarsCont
        boatSearch={boatSearch}
        ownerSearch={ownerSearch}
        setBoatSearch={setBoatSearch}
        setOwnerSearch={setOwnerSearch}
        search_by_owner_name={search_by_owner_name}
        search_by_boat_name={search_by_boat_name}
      />
      <div className="w-full mt-[65px] flex justify-center items-center">
        <div className="w-full grid grid-cols-1 justify-items-center gap-y-16 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-y-16 lg:gap-x-4 2xl:grid-cols-4">
          {shipsArray.map((ship: any, index: number) => (
            <ShipDetails key={index} ship={ship} />
          ))}
        </div>
      </div>
      <div className="pagination w-full mt-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default BoatsCont;
