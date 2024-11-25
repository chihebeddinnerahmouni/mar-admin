import RequestsTable from "../../components/documents/RequestsTable";
import { useTranslation } from "react-i18next";




const Documents = () => {

  const { t } = useTranslation();

  return (
    <div className="p-4 md:p-8 lg:max-w-[1000px] mx-auto px-4 md:px-[40px]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        {t("Documents_management")}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t("Documents_management_description")}
      </p>
      <RequestsTable rows={requests} />
    </div>
  );
}

export default Documents


const requests = [
  {
    id: 1,
    name: "kiheb rahmouni",
    image: "https://",
    email: "chihebrahmouni30@gmail.com",
    phone: "0773781669",
    documents: [
      {
        title: "lience",
        document: "https://",
      },
      {
        title: "carte grise",
        document: "https://",
      },
      {
        title: "carte w say",
        document: "https://",
      },
    ],
  },
  {
    id: 2,
    name: "chiheb rahmouni",
    image: "https://",
    email: "chihebrahmouni30@gmail.com",
    phone: "0773781669",
    documents: [
      {
        title: "lience",
        document: "https://",
      },
      {
        title: "carte grise",
        document: "https://",
      },
      {
        title: "carte w say",
        document: "https://",
      },
    ],
  },
  {
    id: 3,
    name: "chiheb rahmouni",
    image: "https://",
    email: "chihebrahmouni30@gmail.com",
    phone: "0773781669",
    documents: [
      {
        title: "lience",
        document: "https://",
      },
      {
        title: "carte grise",
        document: "https://",
      },
      {
        title: "carte w say",
        document: "https://",
      },
    ],
  },
  {
    id: 4,
    name: "chiheb rahmouni",
    image: "https://",
    email: "chihebrahmouni30@gmail.com",
    phone: "0773781669",
    documents: [
      {
        title: "lience",
        document: "https://",
      },
      {
        title: "carte grise",
        document: "https://",
      },
      {
        title: "carte w say",
        document: "https://",
      },
    ],
  },
];