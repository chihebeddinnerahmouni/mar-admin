import { useTranslation } from "react-i18next";
import CommentComp from "./CommentComp";


const Reviews = ({ reviews }: any) => {
    
    const { t } = useTranslation();

  return (
    // <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm relative">
    //       <p className="font-bold">{t("reviews")}</p>
    //         <div className="mt-3 flex flex-col gap-7">
    //             {reviews.map((review: any, index: number) => (
    //             <CommentComp key={index} comment={review} />
    //             ))}
    //       </div>
    // </div>

    <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm relative">
      <p className="font-bold">{t("reviews")}</p>
      <div className="mt-3 flex flex-col gap-7">
        {reviews.length === 0 ? (
          <p className="text-writingGrey mx-auto">{t("no_reviews_yet")}</p>
        ) : (
          reviews.map((review: any, index: number) => (
            <CommentComp key={index} comment={review} />
          ))
        )}
      </div>
    </div>
  );
}

export default Reviews
