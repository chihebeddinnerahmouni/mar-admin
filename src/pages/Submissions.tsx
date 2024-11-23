import SubmissionsTable from "../components/submissions/SubmissionsTable";
import LoadingLine from "../components/ui/LoadingLine";
import axios from "axios";
import { useEffect, useState } from "react";


const Submissions = () => {

  const [submittions, setSubmittions] = useState<any[]>([]);  
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_SERVER_URL_LISTING;



  useEffect(() => {
    axios
      .get(`${url}/api/submit/user-submissions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSubmittions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);


  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 lg:max-w-[1000px] mx-auto px-4 md:px-[40px] lg:px-[100px]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        Submittions Management
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        Explore and manage Users Submissions with detailed insights into each
        Submission.
      </p>

      <SubmissionsTable rows={submittions} />
    </div>
  );
}

export default Submissions


// const submittions = [
//   {
//     id: 1,
//     user_id: 1,
//     business_type: "im_individual",
//     city: "Al Riadh",
//     boat_type: "2",
//     business_management: "Captain Included",
//     status: "Approved",
//     admin_contacted: true,
//     user_response: null,
//     created_at: "2024-11-18T17:10:12.000Z",
//     updated_at: "2024-11-18T17:14:03.000Z",
//   },
//   {
//     id: 2,
//     user_id: 1,
//     business_type: "im_individual",
//     city: "Al Riadh",
//     boat_type: "2",
//     business_management: "Captain Included",
//     status: "Approved",
//     admin_contacted: true,
//     user_response: null,
//     created_at: "2024-11-18T17:10:12.000Z",
//     updated_at: "2024-11-18T17:14:03.000Z",
//   },
//   {
//     id: 3,
//     user_id: 1,
//     business_type: "im_individual",
//     city: "Al Riadh",
//     boat_type: "2",
//     business_management: "Captain Included",
//     status: "Approved",
//     admin_contacted: true,
//     user_response: null,
//     created_at: "2024-11-18T17:10:12.000Z",
//     updated_at: "2024-11-18T17:14:03.000Z",
//   },
 
// ];



// // const submission =  {
// //     id: 4,
// //     business_type: "enterprise",
// //     city: "Luxor",
// //     category: "Technology",
// //     country: "Egypt",
// //     user: {
// //       id: 4,
// //       name: "Sara Ibrahim",
// //       email: "sara.ibrahim@example.com",
// //       phone: "01000000003",
// //       image: "https://randomuser.me/api/portraits/men/1.jpg",
// //     }
// //   }