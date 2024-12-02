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
import { IoSearchSharp } from "react-icons/io5";


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
        <div
          className="search relative w-full"
          onSubmit={(e) => {
            e.preventDefault;
            fetchConversations()
          }}
        >
          <input
            type="text"
            value={clientSearch}
            onChange={(e) => {
              setClientSearch(e.target.value)
              searchByName(e.target.value)
            }}
            placeholder={t("search_by_client_name") + "..."}
            className={`px-2 h-[54px] w-full border rounded-40 outline-main font-semibold bg-emptyInput ${
              i18n.language === "ar" ? "pl-7" : "pr-7"
            }`}
          />
          <button
            type="submit"
            className={`absolute top-1/2 transform -translate-y-1/2 bg-main h-[50px] w-[50px] flex items-center justify-center rounded-50 hover:bg-mainHover ${
              i18n.language === "ar" ? "left-1" : "right-1"
            }`}
          >
            <IoSearchSharp className={`text-white text-[18px] `} />
          </button>
        </div>
        {filteredConversations.map((inboxItem: any, index: number) => (
          <BookingItemComp key={index} item={inboxItem} />
        ))}
      </div>
    </>
  );
};


export default BookingList;


