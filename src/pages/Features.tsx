import FeaturesTable from '../components/features/FeaturesTable'
import { useCallback, useEffect } from 'react';
import LoadingLine from '../components/ui/LoadingLine';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { axios_error_handler } from '../functions/axios_error_handler';


const Features = () => {
  const { t } = useTranslation();
  
  const fetshData = useCallback(async () => {
    const url = import.meta.env.VITE_SERVER_URL_LISTING;
    const response = await axios.get(`${url}/admin/listing/features`)
    return response.data
  }, [])

  const { data, isLoading, error } = useQuery({
    queryKey: ['getFeatures'],
    queryFn: fetshData,
  })

    useEffect(() => {
      if (error) axios_error_handler(error, t);
    }, [error]);
    if (error) return null;

  if (isLoading) {
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

      <FeaturesTable rows={data} />
    </div>
  );
}

export default Features
