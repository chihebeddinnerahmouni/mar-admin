import { useTranslation } from "react-i18next";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import UpdateImages from "./UpdateImages";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Thumbnails, Fullscreen } from "yet-another-react-lightbox/plugins";


const Images = ({ images }: any) => {
    
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
   const [photoIndex, setPhotoIndex] = useState(-1);
   const url = import.meta.env.VITE_SERVER_URL_LISTING;
// console.log(images);


  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm relative">
      <p className="font-bold">{t("images")}</p>
      <div className="grid grid-cols-3 gap-4 mt-3">
        {images.map((image: any, index: number) => (
          <img
            onClick={() => setPhotoIndex(index + 1)}
            key={index}
            // src={image.url}
            src={url + '/' + image.url}
            alt={`Boat image ${index + 1}`}
            className="w-full h-[70px] object-cover object-center rounded cursor-pointer md:h-[105px]"
          />
        ))}
      </div>
      {photoIndex && (
        <Lightbox
          open={photoIndex >= 0}
          close={() => setPhotoIndex(-1)}
          index={photoIndex}
          plugins={[Thumbnails, Fullscreen]}
          slides={images.map((pic: any) => ({
            src: `${url}/${pic.url}`,
            // src: `${pic.url}`,
          }))}
        />
      )}
      <div
        className={`absolute top-1 flex gap-2 ${
          i18n.language === "ar" ? "left-2" : "right-2"
        }`}
      >
        <button onClick={() => setIsOpen(!isOpen)}>
          <HiOutlineDotsHorizontal className="text-writingGrey text-[30px]" />
        </button>
      </div>

      {isOpen && <UpdateImages setIsOpen={setIsOpen} images={images} />}
    </div>
  );
};


export default Images;
   
      