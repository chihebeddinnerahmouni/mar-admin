import RequestsTable from "../../components/documents/RequestsTable";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingLine from "../../components/ui/LoadingLine";
import StatusCont from "../../containers/documents/documents/StatusCont";
import { useQuery } from "@tanstack/react-query";
import { axios_error_handler } from "../../functions/axios_error_handler";


const fetschData = async (status: string) => { 
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const {data} = await axios.get(`${url}/api/submit/submissions-with-pending-documents?status=${status}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return data;
}


const Documents = () => {

  const { t } = useTranslation();
  const [status, setStatus] = useState("pending");

  const { data, isLoading, error } = useQuery({
    queryKey: ["getRequestsDocument", status],
    queryFn: () => fetschData(status),
  });

  useEffect(() => { 
    if (error) axios_error_handler(error, t);
  }, [error]);
  if (error) return null;


  


  if (isLoading) {
    return <div className="w-full h-screen">
      <LoadingLine />
    </div>
  }


  return (
    <div className="p-4 md:p-8 lg:max-w-[1000px] mx-auto px-4 md:px-[40px]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        {t("Documents_management")}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t("Documents_management_description")}
      </p>
      <StatusCont status={status} setStatus={setStatus} />
      <RequestsTable rows={data.data} />
      {/* <RequestsTable rows={testData} /> */}
    </div>
  );
}

export default Documents



// const testData = [
//   {
//     id: 1,
//     profilePic: "profile1.jpg",
//     name: "John Doe",
//     phone: "1234567890",
//     email: "john.doe@example.com",
//     business_type: "im_individual",
//     boat_type: "Yacht",
//     city: "Dubai",
//     user: {
//       id: 1,
//       name: "John",
//       surname: "Doe",
//       email: "john.doe@example.com",
//       password: "password123",
//       phoneNumber: "1234567890",
//       profilePicture: "profile1.jpg",
//       dateOfBirth: "1990-01-01",
//       address: "123 Main St",
//       isAuthorized: "yes",
//       role: "admin",
//       lastLogin: "2025-02-18T10:00:00.000Z",
//       isVerified: true,
//       preferences: null,
//       block: false,
//       suspend: false,
//       contact: true,
//       createdAt: "2025-01-01T00:00:00.000Z",
//       description: null,
//       languageSpoken: "English",
//       updatedAt: "2025-02-19T11:38:53.000Z"
//     },
//     submission: {
//       id: 1,
//       business_type: "im_individual",
//       boat_type: { en: "Yacht", ar: "يخت" },
//       city: { en: "Dubai", ar: "دبي" }
//     }
//   },
//   {
//     id: 2,
//     profilePic: "profile2.jpg",
//     name: "Jane Smith",
//     phone: "0987654321",
//     email: "jane.smith@example.com",
//     business_type: "im_company",
//     boat_type: "Sailboat",
//     city: "Abu Dhabi",
//     user: {
//       id: 2,
//       name: "Jane",
//       surname: "Smith",
//       email: "jane.smith@example.com",
//       password: "password456",
//       phoneNumber: "0987654321",
//       profilePicture: "profile2.jpg",
//       dateOfBirth: "1985-05-15",
//       address: "456 Another St",
//       isAuthorized: "no",
//       role: "user",
//       lastLogin: "2025-02-28T08:00:00.000Z",
//       isVerified: false,
//       preferences: "email_notifications",
//       block: false,
//       suspend: true,
//       contact: false,
//       createdAt: "2025-02-01T00:00:00.000Z",
//       description: "Avid sailor",
//       languageSpoken: "Arabic",
//       updatedAt: "2025-03-01T09:20:45.000Z"
//     },
//     submission: {
//       id: 2,
//       business_type: "im_company",
//       boat_type: { en: "Sailboat", ar: "قارب شراعي" },
//       city: { en: "Abu Dhabi", ar: "أبو ظبي" }
//     }
//   }
// ];

