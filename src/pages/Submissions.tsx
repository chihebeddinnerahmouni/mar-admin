import SubmissionsTable from "../components/submissions/SubmissionsTable";
import LoadingLine from "../components/ui/LoadingLine";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { axios_error_handler } from "../functions/axios_error_handler";

const fetshSubmissions = async () => {
  const url = import.meta.env.VITE_SERVER_URL_LISTING;
  const response = await axios.get(`${url}/api/submit/user-submissions?status=Pending`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return response.data;
}



const Submissions = () => {
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getSubmissions"],
    queryFn: fetshSubmissions,
  })
 
  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    )
  }

  if (error) {
    axios_error_handler(error, t);
    return null;
  }



  return (
    <div className="p-4 md:p-8 lg:max-w-[1000px] mx-auto px-4 md:px-[40px] lg:px-[100px]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        {t("submissions_management")}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t("submissions_management_description")} 
      </p>
      <SubmissionsTable rows={data} />
    </div>
  );
}

export default Submissions
