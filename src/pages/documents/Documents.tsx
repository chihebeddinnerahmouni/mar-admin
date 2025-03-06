import RequestsTable from "../../components/documents/RequestsTable";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useState } from "react";
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

  if (isLoading) {
    return <div className="w-full h-screen">
      <LoadingLine />
    </div>
  }

  if (error) {
    axios_error_handler(error, t);
    return null;
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
    </div>
  );
}

export default Documents

