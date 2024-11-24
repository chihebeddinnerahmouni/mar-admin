import { useState, useEffect } from "react";
import CategoriesCont from "../../containers/boats/CategoriesCont";
import BoatsCont from "../../containers/boats/BoatsCont";
import axios from "axios";
import LoadingLine from "../../components/ui/LoadingLine";
import { useTranslation } from "react-i18next";


const Boats = () => {

  const [ctegoriesArray, setCategoriesArray] = useState([]);
  // const ctegoriesArray = categories;
  const [selectedType, setSelectedType] = useState();
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_SERVER_URL_CATEGORY;
  const { t } = useTranslation();


  useEffect(() => {
    axios
      .get(url + "/categories")
      .then((response) => {
        setCategoriesArray(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);






  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingLine />
      </div>
    )
  }


  return (
    <div className="p-4 md:p-8 mx-auto px-4 md:px-[40px] lg:px-[100px] lg:max-w-[1700px] ">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        {t("boats_management")}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t("boats_management_description")}
      </p>
      <CategoriesCont
        shipsTypes={ctegoriesArray}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <BoatsCont selectedType={selectedType} />
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
