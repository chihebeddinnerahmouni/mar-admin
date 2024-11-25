import BookingList from "../containers/booking/BookingList";
import BookingDetailsCont from "../containers/booking/BookingDetailsCont";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Bookings = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const isMobile = useMediaQuery({ query: "(max-width: 1045px)" });

  return (
    <div className="w-full mt-[60px] flex lg:mt-[80px] md:justify-center lg:pb-0">
      {bookingId && isMobile ? null : (
        <div className="list w-full pt-5 relative px-3 overflow-auto pb-5 z-10 md:px-28 lg:px-2 inboxListCss lg:w-[350px]">
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
