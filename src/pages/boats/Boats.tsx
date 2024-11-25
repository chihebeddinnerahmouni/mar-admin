import BoatsCont from "../../containers/boats/BoatsCont";
import { useTranslation } from "react-i18next";


const Boats = () => {

  const { t } = useTranslation();


  return (
    <div className="p-4 md:p-8 mx-auto px-4 md:px-[40px] lg:px-[100px] lg:max-w-[1700px] ">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        {t("boats_management")}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t("boats_management_description")}
      </p>
      <BoatsCont />
    </div>
  );
}

export default Boats


// const categories = [
//   { id: 1, name: "test", image: "anonyme.jpg" },
//   { id: 2, name: "test2", image: "anonyme.jpg" },
//   { id: 3, name: "tst3", image: "anonyme.jpg" },
//   { id: 4, name: "test4", image: "anonyme.jpg" },
// ];
