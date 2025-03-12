import { useTranslation } from "react-i18next";
import { MdDriveFileRenameOutline } from "react-icons/md";
interface NamePicProps {
  title: string;
}

const Name: React.FC<NamePicProps> = ({ title }) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full p-2 bg-white mt-5 rounded-10 shadow-sm flex items-center gap-4">
      <p>
        <MdDriveFileRenameOutline className="text-writingGrey text-[30px] min-w-[40px]" />
      </p>
      <div className="text">
        <p className="font-bold">{t("name")}</p>
        <p className="text-[18px]">{title}</p>
      </div>
    </div>
  );
};

export default Name;
