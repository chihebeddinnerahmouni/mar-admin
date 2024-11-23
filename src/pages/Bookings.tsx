import BookingList from "../containers/booking/BookingList";
import BookingDetailsCont from "../containers/booking/BookingDetailsCont";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
// import isLoggedIn from "@/lib/isLogedin";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });
  // const isMobile = useMediaQuery({ query: "(max-width: 648px)" });
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!isLoggedIn()) {
//       navigate("/page=1");
//     }
//   }, []);

  return (
    <div className="w-full mt-[60px] flex lg:mt-[80px] md:justify-center lg:pb-0">
      {bookingId && isMobile ? null : (
        <div className="list w-full pt-5 relative lg:w-[350px] px-3 overflow-auto pb-5 z-10 lg:px-2 inboxListCss md:w-[550px]">
          <BookingList />
        </div>
      )}

      {bookingId ? (
        isMobile ? (
          <BookingDetailsCont />
        ) : (
          <BookingDetailsCont />
        )
      ) : isMobile ? null : (
        null
      )}
    </div>
  );
};


export default Bookings;
