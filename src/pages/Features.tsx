import FeaturesTable from '../components/features/FeaturesTable'
import { useState, useEffect } from 'react';
import LoadingLine from '../components/ui/LoadingLine';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';


const Features = () => {
  const [rows, setRows] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const url = import.meta.env.VITE_SERVER_URL_LISTING; 
  const { t } = useTranslation();

  

  useEffect(() => {
    axios
      .get(`${url}/admin/listing/features`)
      .then((response) => {
        // console.log(response.data);
        setRows(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        }).then(() => { 
          window.location.reload();
        });
        setLoading(false);
      });
  }, [])

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    )
  }
  


  return (
    <div className="p-4 md:p-8 lg:max-w-[1000px] mx-auto md:px-[40px]">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
        {t("features_management")}
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        {t("features_management_description")}
      </p>

      <FeaturesTable rows={rows} />
    </div>
  );
}

export default Features
