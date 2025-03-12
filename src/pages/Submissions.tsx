import SubmissionsTable from "../components/submissions/SubmissionsTable";
import LoadingLine from "../components/ui/LoadingLine";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { axios_error_handler } from "../functions/axios_error_handler";
import { useEffect } from "react";

const fetshSubmissions = async () => {
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const response = await axios.get(
    `${url}/api/submit/user-submissions?status=Pending`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }
  );
  return response.data;
};

const Submissions = () => {
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getSubmissions"],
    queryFn: fetshSubmissions,
  });

  useEffect(() => {
    if (error) axios_error_handler(error, t);
  }, [error]);
  if (error) return null;

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 lg:max-w-[1000px] mx-auto px-4 md:px-[40px] lg:px-[100px]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        {t("submissions_management")}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t("submissions_management_description")}
      </p>
      <SubmissionsTable rows={data.submissions} />
      {/* <SubmissionsTable rows={dataArray} /> */}
    </div>
  );
};

export default Submissions;


// const dataArray = [
//   {
//     id: 1,
//     user_id: 1,
//     admin_contacted: true,
//     boat_type: { en: "Yacht", ar: "يخت" },
//     business_management: "Captain Included",
//     business_type: "im_individual",
//     city: { en: "Dubai", ar: "دبي" },
//     status: "Approved",
//     created_at: "2025-02-19T11:38:44.000Z",
//     updated_at: "2025-02-19T11:38:53.000Z",
//     user_response: null,
//     user: {
//       id: 1,
//       name: "John",
//       surname: "Doe",
//       email: "john.doe@example.com",
//       password: "password123",
//       phoneNumber: "1234567890",
//       profilePicture: null,
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
//       updatedAt: "2025-02-19T11:38:53.000Z",
//     },
//   },{
//   id: 2,
//   user_id: 2,
//   admin_contacted: false,
//   boat_type: { en: "Sailboat", ar: "قارب شراعي" },
//   business_management: "Self Managed",
//   business_type: "im_company",
//   city: { en: "Abu Dhabi", ar: "أبو ظبي" },
//   status: "Pending",
//   created_at: "2025-03-01T09:15:30.000Z",
//   updated_at: "2025-03-01T09:20:45.000Z",
//   user_response: "Awaiting approval",
//   user: {
//     id: 2,
//     name: "Jane",
//     surname: "Smith",
//     email: "jane.smith@example.com",
//     password: "password456",
//     phoneNumber: "0987654321",
//     profilePicture: "profile.jpg",
//     dateOfBirth: "1985-05-15",
//     address: "456 Another St",
//     isAuthorized: "no",
//     role: "user",
//     lastLogin: "2025-02-28T08:00:00.000Z",
//     isVerified: false,
//     preferences: "email_notifications",
//     block: false,
//     suspend: true,
//     contact: false,
//     createdAt: "2025-02-01T00:00:00.000Z",
//     description: "Avid sailor",
//     languageSpoken: "Arabic",
//     updatedAt: "2025-03-01T09:20:45.000Z"
//   }
// }
// ];