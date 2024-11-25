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
  where
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

  const fetchConversations = async (clientSearch: string) => {
    // const q = query(
    //   collection(db, "conversations"),
    // clientSearch && where("clientName", "==", clientSearch)

    // where("conversationId", "==", "inquiry_2")
    // where("status", "==", "pending")
    // );
    setLoading(true);
    let q;
    if (clientSearch) {
      q = query(
        collection(db, "conversations"),
        where("clientDetails.name", "==", clientSearch)
      );
    } else {
      q = query(collection(db, "conversations"));
    }
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
    fetchConversations(clientSearch);
  }, []);

  useEffect(() => {
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
      <div className="w-full h-screen lg:w-[350px]">
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
        <form
          className="search relative w-full"
          onSubmit={(e) => {
            e.preventDefault;
            fetchConversations(clientSearch)
          }}
        >
          <input
            type="text"
            value={clientSearch}
            onChange={(e) => setClientSearch(e.target.value)}
            placeholder={t("search_by_client_name") + "..."}
            className={`p-2 w-full border rounded-40 outline-main font-semibold bg-emptyInput ${
              i18n.language === "ar" ? "pl-7" : "pr-7"
            }`}
          />
          <button
            type="submit"
            className={`absolute top-1/2 transform -translate-y-1/2 bg-main h-[80%] w-[35px] flex items-center justify-center rounded-50 hover:bg-mainHover ${
              i18n.language === "ar" ? "left-4" : "right-1"
            }`}
          >
            <IoSearchSharp className={`text-white text-[18px] `} />
          </button>
        </form>
        {filteredConversations.map((inboxItem: any, index: number) => (
          <BookingItemComp key={index} item={inboxItem} />
        ))}
      </div>
    </>
  );
};


export default BookingList;




// tried to implement infinite scroll
// import BookingItemComp from "../../components/booking/BokkingItemComp";
// import LoadingLine from "../../components/ui/LoadingLine";
// import {
//   useState,
//   useEffect,
//   useCallback
// } from "react";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";
// import {
//   collection, onSnapshot, query, limit, startAfter
// } from "firebase/firestore";
// import { db } from "../../lib/firebaseConfig";
// import Filter from "../../components/booking/Filter";
// import options from "../../assets/files/filter_categories";


// const BookingList = () => {
//   const [loading, setLoading] = useState(true);
//   const [originalConversations, setOriginalConversations] = useState<any>([]);
//   const [filteredConversations, setFilteredConversations] = useState<any>([]);
//   const [selectedFilter, setSelectedFilter] = useState<string>(options[0]);
//   const [lastDoc, setLastDoc] = useState<any>(null);
//   const [isFetchingMore, setIsFetchingMore] = useState(false);
//   const navigate = useNavigate();
//   const { bookingId } = useParams<{ bookingId: string }>();
//   const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });

//   const fetchConversations = useCallback(async (lastDoc = null) => {
//     setIsFetchingMore(true);
//     let q = query(
//       collection(db, "conversations"),
//       limit(3)
//     );
//     if (lastDoc) {
//       q = query(q, startAfter(lastDoc));
//     }
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       let fetchedConversations = snapshot.docs.map((doc) => ({
//         conversationId: doc.id,
//         ...doc.data(),
//       })) as any;

//       setOriginalConversations((prev: any) => [...prev, ...fetchedConversations]);
//       setFilteredConversations((prev: any) => [...prev, ...fetchedConversations]);
//       setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
//       setLoading(false);
//       setIsFetchingMore(false);
//       if (!bookingId && !isMobile && !lastDoc) {
//         navigate(`/bookings/${fetchedConversations[0].conversationId}`);
//       }
//     });
//     return () => unsubscribe();
//   }, [bookingId, isMobile, navigate]);

//   useEffect(() => {
//     fetchConversations();
//   }, [fetchConversations]);

//   useEffect(() => {
//     if (selectedFilter === "all") {
//       setFilteredConversations(originalConversations);
//       return;
//     }

//     const newArray = originalConversations.filter(
//       (conv: any) => conv.status === selectedFilter
//     );
//     setFilteredConversations(newArray);
//   }, [selectedFilter, originalConversations]);

//   const handleScroll = useCallback(() => {
//     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetchingMore) return;
//     fetchConversations(lastDoc);
//   }, [fetchConversations, isFetchingMore, lastDoc]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);

//   if (loading) {
//     return (
//       <div className="w-full h-screen lg:w-[350px]">
//         <LoadingLine />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Filter
//         selectedFilter={selectedFilter}
//         setSelectedFilter={setSelectedFilter}
//       />
//       <div className="items w-full mt-5 flex flex-col gap-4">
//         {filteredConversations.map((inboxItem: any, index: number) => (
//           <BookingItemComp key={index} item={inboxItem} />
//         ))}
//       </div>
//       {isFetchingMore && <LoadingLine />}
//     </>
//   );
// };

// export default BookingList;