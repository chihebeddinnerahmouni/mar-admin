import FeaturesTable from '../components/features/FeaturesTable'
import { useState, useEffect } from 'react';
import LoadingLine from '../components/ui/LoadingLine';
import axios from 'axios';
import Swal from 'sweetalert2';


// const rowsArray = [
//   {
//     id: 1,
//     englishName: "bluetooth",
//     arabicName: "نلؤكسهعؤل",
//   },
// ];


const Features = () => {
// const rows = rowsArray
  const [rows, setRows] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const url = import.meta.env.VITE_SERVER_URL_LISTING; 

  

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
        Features Management
      </h1>
      <p className="text-sm md:text-base text-gray-600 mb-8">
        Explore and manage boat Features with detailed insights into each type
        of boat available for rental.
      </p>

      <FeaturesTable rows={rows} />
    </div>
  );
}

export default Features
