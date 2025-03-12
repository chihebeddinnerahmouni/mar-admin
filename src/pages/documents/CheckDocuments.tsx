import DocumentComp from "../../components/documents/DocumentComp";
import LoadingLine from "../../components/ui/LoadingLine";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { axios_error_handler } from "../../functions/axios_error_handler";
import { useEffect } from "react";
import ButtonsCont from "../../containers/documents/check documents/ButtonsCont";

const url = import.meta.env.VITE_SERVER_URL_LISTING;


const fetschData = async (submittionId: string) => {
  const { data } = await axios.get(`${url}/api/submit/documents/submission/${submittionId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return data;
}


const CheckDocuments = () => {

  const { submittionId } = useParams<{ submittionId: string }>();
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getRequestsDocument", submittionId],
    queryFn: () => fetschData(submittionId!),
    enabled: !!submittionId,
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
        {t("documents")}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t("this_is_what")}{" "}
        {t("uploaded_as_documents_you_view_the_documents_below")}
      </p>
      <ButtonsCont
        status={data.documents[0].status}
        submittionId={submittionId!}
      />

      <div className="docs flex flex-col gap-5 pb-20">
        {data.documents.map((document: any, index: number) => (
          <DocumentComp key={index} document={document} />
        ))}
      </div>
    </div>
  );
};

export default CheckDocuments;


// const testData = {
//   documents: [
//     {
//       id: 1,
//       document_type: "Passport",
//       document_path: "documents/passport.pdf",
//       document: "documents/passport.pdf",
//       status: "pending"
//     },
//     {
//       id: 2,
//       document_type: "Driver's License",
//       document_path: "documents/license.jpg",
//       document: "documents/license.jpg",
//       status: "pending"
//     }
//   ]
// };

