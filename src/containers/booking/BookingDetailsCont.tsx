import Top from "../../components/booking/Top";
import Bookingdetails from "./Bookingdetails";
import BookingMessages from "./BookingMessages";
import {
    useState,
    useEffect
} from "react";
import LoadingLine from "../../components/ui/LoadingLine";
import { useParams } from "react-router-dom";
import { db } from "../../lib/firebaseConfig";
import {
  collection, onSnapshot, query,
  // where
} from "firebase/firestore";
import ButtomTrip from "../../components/booking/ButtomTrip";
import { useNavigate } from "react-router-dom";




const BookingDetailsCont = () => {
  const [selected, setSelected] = useState("details");
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);
  const { bookingId } = useParams<{ bookingId: string }>();
  // const userId = Number(localStorage.getItem("userId"));
  const navigate = useNavigate();
    

  useEffect(() => {
    const fetchConversations = async () => {
      const q = query(
        collection(db, "conversations"),
        // where("conversationId", "==", "inquiry_2")
      );
      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const fetchedConversations = snapshot.docs
          .map((doc) => ({
            conversationId: doc.id,
            ...doc.data(),
          }))
          .filter((conversation) => conversation.conversationId === bookingId);

        // console.log(fetchedConversations);
        setDetails(fetchedConversations);
        if (fetchedConversations.length === 0) {
          navigate("/404");
          return;
        }
        setLoading(false);
      });
      return () => unsubscribe();
    };
    fetchConversations();
  }, [bookingId]);

  // console.log('details', details)

  if (loading) {
    return (
      <div className="flex-grow h-screen">
        <LoadingLine />
      </div>
    );
  }

  return (
    <div
      className={`flex-grow flex flex-col items-center pb-14 md:px-10 inboxListCss overflow-auto`}
    >{details.length !== 0 && (
      <>
      <Top selected={selected} setSelected={setSelected} details={details[0]} />
          {selected === "details" && <Bookingdetails details={details} />}
          {selected === "messages" && <BookingMessages details={details} />}
          <ButtomTrip setSelected={setSelected} details={details[0]} />
        </>
      )}
    </div>
  );
};


export default BookingDetailsCont;

// const details = [
//   {
//     conversationId: 1,
//     status: "ongoing",

//     createdAt: {
//       seconds: 1665360000,
//       nanoseconds: 123456789,
//     },

//     listingDetails: {
//       image:
//         "uploads/1731950771197-Prtag0XQANIJft7UhlWhU4WbAwowyxIr6i6hV5Z5.jpg",
//       name: "Boat name",
//     },

//     boatOwnerDetails: {},

//     clientDetails: {
//       id: 1,
//       name: "John",
//       surname: "Doe",
//       image: "john.jpg",
//     },

//     booking_info: {
//       preferredDate: "2022-10-10",
//       departureTime: "10:00",
//       additionalInfo: "I want to go fishing",
//       returnDateTime: {
//         seconds: 1665360000,
//         nanoseconds: 123456789,
//       },
//       duration: {
//         hours: 2,
//         minutes: 30,
//         nights: 0,
//       },
//       groupSize: {
//         adults: 2,
//         children: 1,
//         infants: 0,
//       },
//     },
//   },
// ];
