import { useState } from 'react';
import CatQsts from '../containers/help/CatQsts';
import axios from 'axios';
import LoadingLine from '../components/ui/LoadingLine';
import TableOfQuestions from '../components/help/QuestionsTable';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { axios_error_handler } from '../functions/axios_error_handler';

const fetshHelpCategories = async () => {
  const url = import.meta.env.VITE_SERVER_URL_HELP;
  const res = await axios.get(url + '/categories');
  return res.data;
}

const Help = () => {

  const [selectedCat, setSelectedCat] = useState(0);
  const { t } = useTranslation();

    const handleCategoryClick = (id: number) => {
        setSelectedCat(id);
  };

  const { data: helpCat, isLoading , error} = useQuery({
    queryKey: ['helpCategories'],
    queryFn: fetshHelpCategories,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    )
  }

  if (error) {
    axios_error_handler(error, t);
  }

    return (
      <div className="p-4 md:p-8 lg:max-w-[1000px] mx-auto px-4 md:px-[40px] lg:px-[100px]">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
          {t("help_questions_management")}
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-8">
          {t("help_questions_management_description")}
        </p>
        <CatQsts
          helpCat={helpCat}
          selectedCat={selectedCat}
          handleCategoryClick={handleCategoryClick}
        />
        <div>
          <TableOfQuestions categoryId={selectedCat} helpCat={helpCat} />
        </div>
      </div>
    );
};

export default Help;

