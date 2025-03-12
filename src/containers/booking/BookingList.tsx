import BookingItemComp from "../../components/booking/BokkingItemComp";
import LoadingLine from "../../components/ui/LoadingLine";
import {
  useState,
  useEffect
} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  collection, onSnapshot, query,
  // where
} from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";
import Filter from "../../components/booking/Filter";
import options from "../../assets/files/filter_categories";
import { useTranslation } from "react-i18next";
import InputSearch from "../../components/ui/inputs/InputSearch";


const BookingList = () => {




  const [loading, setLoading] = useState(true);
  const [originalConversations, setOriginalConversations] = useState<any>([]);
  const [filteredConversations, setFilteredConversations] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(options[0]);
  const [clientSearch, setClientSearch] = useState<string>("");
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });
  const { t, i18n } = useTranslation();

  const fetchConversations = async () => {
    const q = query(
      collection(db, "conversations"),
    );
    setLoading(true);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let fetchedConversations = snapshot.docs.map((doc) => ({
        conversationId: doc.id,
        ...doc.data(),
      })) as any;

      

      setOriginalConversations(fetchedConversations);
      setFilteredConversations(fetchedConversations);
      // console.log(fetchedConversations);
      // console.log(fetchedConversations[0]);
      setLoading(false);
      if (!bookingId && !isMobile) {
        navigate(`/inquiries/${fetchedConversations[0].conversationId}`);
        setLoading(false);
        return;
      }
    });
    return () => unsubscribe();
  };


  useEffect(() => {
    fetchConversations();
  }, []);


  const searchByName = (clientSearch: string) => {
    if (clientSearch) {
      const searchLower = clientSearch.toLowerCase();
      const filtered = originalConversations.filter((conv: any) => {
        const fullName =
          `${conv.clientDetails.name} ${conv.clientDetails.surname}`.toLowerCase();
        return fullName.startsWith(searchLower);
      });
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(originalConversations);
    }
  };


  // to filter the conversations based on the selected filter status
  useEffect(() => {
    setClientSearch("");
    if (selectedFilter === "all") {
      setFilteredConversations(originalConversations);
      return;
    }
    const newArray = originalConversations.filter(
      (conv: any) => conv.status === selectedFilter
    );
    setFilteredConversations(newArray);
  }, [selectedFilter, originalConversations]);

  if (loading) {
    return (
      <div className="h-screen lg:w-[350px]">
        <LoadingLine />
      </div>
    );
  }

  return (
    <>
      <div className="items w-full flex flex-col gap-4 max-w-[400px] mx-auto">
        <Filter
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <InputSearch
          value={clientSearch}
          setValue={(e: any) => {
            setClientSearch(e.target.value);
            searchByName(e.target.value);
          }}
          label={t("search_by_client_name")}
          onClick={(e: any) => {
            e.preventDefault();
            fetchConversations();
          }}
          i18n={i18n}
        />
        {filteredConversations.map((inboxItem: any, index: number) => (
          <BookingItemComp key={index} item={inboxItem} />
        ))}
      </div>
    </>
  );
};


export default BookingList;


// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Button from "@mui/material/Button";
// import options from "../../assets/files/filter_categories";


// const Filter = ({ selectedFilter, setSelectedFilter }: any) => {
//   const { t, i18n } = useTranslation();
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const isFilterOpen = Boolean(anchorEl);

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div className="relative w-full">
//       <Button
//         className="flex items-center gap-3 text-sm text-main"
//         onClick={handleClick}
//         sx={{ fontFamily: "Cairo, sans-serif" }}
//       >
//         <span className="text-main">{t(selectedFilter)}</span>{" "}
//         {isFilterOpen ? (
//           <FaChevronUp className="text-main" />
//         ) : (
//           <FaChevronDown className="text-main" />
//         )}
//       </Button>

//       <Menu
//         anchorEl={anchorEl}
//         open={isFilterOpen}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: i18n.language === "en" ? "left" : "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: i18n.language === "en" ? "left" : "right",
//         }}
//       >
//         {options.map((option, index) => (
//           <MenuItem
//             key={index}
//             sx={{
//               "&:hover": {
//                 backgroundColor: "#f7f7f7",
//               },
//               width: "200px",
//               fontFamily: "Cairo, sans-serif",
//             }}
//             onClick={() => {
//               setSelectedFilter(option);
//               handleClose();
//             }}
//           >
//             {t(option)}
//           </MenuItem>
//         ))}
//       </Menu>
//     </div>
//   );
// };

// export default Filter;
