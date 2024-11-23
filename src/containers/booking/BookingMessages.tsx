import {
    useState,
    useEffect,
    useRef
} from "react";
import LoadingLine from "../../components/ui/LoadingLine";
import { db } from "../../lib/firebaseConfig";
import {
  orderBy,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";

const BookingMessages = ({ details }: any) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<any>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "conversations", details[0].conversationId, "messages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => doc.data() as any);
      setMessages(fetchedMessages);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [details[0]]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }

  // console.log(messages);

  return (
    <>
      <div className="content w-full px-4 mt-[82px] md:w-[550px] lg:mt-[88px] xl:w-[650px] messagesContCss bg-creme">
        <div className="flex flex-col space-y-5 lg:space-y-8">
          {messages.map((message: any, index: number) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                {/* <img
                  src={
                    message.senderId === userId
                      ? profilePic
                        ? `${url}/${profilePic}`
                        : "/anonyme.jpg"
                      : ownerPic
                      ? `${url}/${ownerPic}`
                      : "/anonyme.jpg"
                  }
                  className="w-8 h-8 rounded-full bg-gray-300 object-cover object-center lg:h-10 lg:w-10"
                /> */}
                <div className="flex flex-col">
                  <span className="font-semibold text-sm lg:text-base">
                    {message.senderName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {message.timestamp ? (
                      <>
                        {new Date(
                          message.timestamp.toDate()
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        {new Date(
                          message.timestamp.toDate()
                        ).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: undefined,
                        })}
                      </>
                    ) : (
                      "Loading..."
                    )}
                  </span>
                </div>
              </div>
              <div className="bg-[#ebebeb] p-2 rounded-md lg:text-[18px]">
                <span>{message.message}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
};

export default BookingMessages;


// const messages = [
//   {
//     senderId: 1,
//     senderName: "User One",
//     message: "Hello, this is a test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:00:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
//   {
//     senderId: 2,
//     senderName: "User Two",
//     message: "Hi, this is another test message.",
//     timestamp: {
//       toDate: () => new Date("2022-10-10T10:05:00Z"),
//     },
//   },
// ];