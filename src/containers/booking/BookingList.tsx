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

const BookingList = () => {




  const [loading, setLoading] = useState(true);
  const [originalConversations, setOriginalConversations] = useState<any>([]);
  const [filteredConversations, setFilteredConversations] = useState<any>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>(options[0]);
  const navigate = useNavigate();
  const { bookingId } = useParams<{ bookingId: string }>();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });


  useEffect(() => {
    const fetchConversations = async () => {
      const q = query(
        collection(db, "conversations"),
        // where("conversationId", "==", "inquiry_2")
        // where("status", "==", "ongoing")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        let fetchedConversations = snapshot.docs.map((doc) => ({
          conversationId: doc.id,
          ...doc.data(),
        })) as any;

        setOriginalConversations(fetchedConversations);
        setFilteredConversations(fetchedConversations);
        // console.log(fetchedConversations);
        // console.log(fetchedConversations[0].conversationId);
        setLoading(false);
        if (!bookingId && !isMobile) {
          navigate(`/bookings/${fetchedConversations[0].conversationId}`);
          setLoading(false);
          return;
        }
      });
      return () => unsubscribe();
    };

    fetchConversations();
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
      <Filter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div className="items w-full mt-5 flex flex-col gap-4">
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