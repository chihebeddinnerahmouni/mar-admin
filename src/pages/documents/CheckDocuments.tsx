import DocumentComp from "../../components/documents/DocumentComp";
import LoadingLine from "../../components/ui/LoadingLine";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingButton from "../../components/ui/LoadingButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { axios_error_handler } from "../../functions/axios_error_handler";

const url = import.meta.env.VITE_SERVER_URL_LISTING;


const fetschData = async (submittionId: string) => {
  const { data } = await axios.get(`${url}/api/submit/documents/submission/${submittionId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return data;
}
const sendData = async (submittionId: string) => {
  const { data } = await axios.put(`${url}/api/submit/user-submissions/${submittionId}/accept`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return data;
}

const CheckDocuments = () => {

  const { submittionId } = useParams<{ submittionId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getRequestsDocument", submittionId],
    queryFn: () => fetschData(submittionId!),
    enabled: !!submittionId,
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

  const { mutate, isPending } = useMutation({
    mutationFn: () => sendData(submittionId!),
    onSuccess: () => {
      navigate("/documents");
    },
    onError: (err) => {
      axios_error_handler(err, t);
    },
  })

  const accept = () => { 
    if (isPending) return;
    mutate();
  }



  return (
    <div className="p-4 md:p-8 lg:max-w-[1000px] mx-auto px-4 md:px-[40px]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        {t("documents")}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t("this_is_what")}{" "}
        {t("uploaded_as_documents_you_view_the_documents_below")}
      </p>
      {data.documents[0].status === "pending" && (
        <div className="buttons bg-creme h-[60px] flex justify-end items-center gap-4 mb-8 sticky top-[60px] lg:top-[80px] z-10">
          <button
            className="bg-green-500 text-white w-[80px] h-10 rounded hover:bg-green-600"
            onClick={accept}
          >
            {isPending ? <LoadingButton /> : t("accept")}
          </button>
          <button className="bg-main text-white w-[80px] h-10 rounded hover:bg-mainHover">
            {t("refuse")}
          </button>
        </div>
      )}

      <div className="docs flex flex-col gap-5 pb-20">
        {data.documents.map((document: any, index: number) => (
          <DocumentComp key={index} document={document} />
        ))}
      </div>
    </div>
  );
};

export default CheckDocuments;
