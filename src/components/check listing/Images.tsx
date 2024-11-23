import { useTranslation } from "react-i18next";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { Thumbnails, Fullscreen } from "yet-another-react-lightbox/plugins";


const Images = ({ images }: any) => {
    const { t } = useTranslation();
    const [photoIndex, setPhotoIndex] = useState(-1);
      const url = import.meta.env.VITE_SERVER_URL_LISTING;
    


  return (
    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm relative">
      <p className="font-bold">{t("images")}</p>
      <div className="grid grid-cols-3 gap-4 mt-3">
        {images.map((image: any, index: number) => (
          <img
            onClick={() => setPhotoIndex(index + 1)}
            key={index}
            src={`${url}/${image.url}`}
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
          }))}
        />
      )}
    </div>
  );
};

export default Images;
