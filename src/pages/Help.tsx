import { useState, useEffect } from 'react';
import CatQsts from '../containers/help/CatQsts';
import axios from 'axios';
import LoadingLine from '../components/ui/LoadingLine';
import TableOfQuestions from '../components/help/QuestionsTable';




const Help = () => {



  const [selectedCat, setSelectedCat] = useState(0);
  const [loading, setLoading] = useState(true);
  const [helpCat, setHelpCat] = useState<any[]>([]);
  const url = import.meta.env.VITE_SERVER_URL_HELP;

    const handleCategoryClick = (id: number) => {
        setSelectedCat(id);
  };


  useEffect(() => { 
    axios.get(url + '/categories')
      .then((res) => {
        setHelpCat(res.data);
        setSelectedCat(res.data[0].id);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);
  

  if (loading) { 
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    )
  }

    return (
      <div className="p-4 md:p-8 lg:max-w-[1000px] mx-auto px-4 md:px-[40px] lg:px-[100px]">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text">
          Help Questions Management
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-8">
          Explore and manage help questions with detailed insights into each
          query available for assistance.
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

