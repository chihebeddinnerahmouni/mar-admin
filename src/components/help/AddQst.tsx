import React, { useState } from "react";
import ReactModal from "react-modal";
import { Typography } from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { axios_error_handler } from "../../functions/axios_error_handler";
import SelectComp from "../ui/inputs/SelectInput";
import ButtonFunc from "../ui/buttons/Button";
import InputText from "../ui/inputs/InputText";
import HtmlEditor from "../ui/HtmlEditor";

interface AddQstProps {
  setClose: (isOpen: boolean) => void;
  categoriesArray: any;
}

ReactModal.setAppElement("#root");

const AddQst: React.FC<AddQstProps> = ({ setClose, categoriesArray }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [arabic_question, setArabicQuestion] = useState("");
  const [arabic_answer, setArabicAnswer] = useState("");
  const [category, setCategory] = useState<number>(0);
  const [step, setStep] = useState(1);
  const { t } = useTranslation();
  const url = import.meta.env.VITE_SERVER_URL_HELP;

  const handleSubmit = () => {
    axios
      .post(`${url}/categories/${category}/questions`, {
        question,
        answer,
        arabic_question,
        arabic_answer,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        axios_error_handler(error, t);
      });
  };

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={() => setClose(false)}
      className={
        "bg-white min-w-[300px] rounded-lg p-4 shadow-hardShadow lg:p-6 xl:max-w-[1000px] xl:mx-auto"
      }
      overlayClassName={
        "fixed bg-black bg-opacity-10 backdrop-blur-[7px] inset-0 flex items-center justify-center p-4 mt-[60px] md:px-20 lg:mt-[80px] "
      }
    >
      {step === 1 && (
        <Step1
          categoriesArray={categoriesArray}
          category={category}
          setCategory={setCategory}
          setStep={setStep}
        />
      )}

      {step === 2 && (
        <Step2
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          setAnswer={setAnswer}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <Step3
          arabic_question={arabic_question}
          setArabicQuestion={setArabicQuestion}
          arabic_answer={arabic_answer}
          setArabicAnswer={setArabicAnswer}
          handleSubmit={handleSubmit}
        />
      )}
    </ReactModal>
  );
};

export default AddQst;

const Step1 = ({
  categoriesArray,
  category,
  setCategory,
  setStep,
}: {
  categoriesArray: any;
  category: any;
  setCategory: any;
  setStep: any;
}) => {
  const { t } = useTranslation();

  // console.log(category);
  const nextFunc = () => {
    if (!category) {
      alert(t("select_category"));
      return;
    }
    setStep(2);
  };

  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        {t("wich_category")}?
      </Typography>
      <SelectComp
        options={categoriesArray}
        value={category.id}
        setValue={(id: number) => setCategory(id)}
      />
      <div className="mt-5">
        <ButtonFunc text="Next" onClick={nextFunc} />
      </div>
    </>
  );
};

const Step2 = ({ question, setQuestion, answer, setAnswer, setStep }: {
  question: any;
  setQuestion: any;
  answer: any;
  setAnswer: any;
  setStep: any;
}) => {
  const { t } = useTranslation();

  const nextFunc = () => {
    if (question === "" || answer === "") {
      alert(t("please_fill_all_fields"));
      return;
    }
    setStep(3);
  }


  return (
    <div className="space-y-3">
      <Typography variant="h4" component="h2" gutterBottom>
        {t("set_the_qst_and_answer_in_english")}
      </Typography>

      <InputText
        label={t("question-in_english")}
        value={question}
        setValue={(e: any) => setQuestion(e.target.value)}
      />
      <HtmlEditor setValue={setAnswer} initielValue={`${t("answer_in_english")}...`} />
      <ButtonFunc text="Next" onClick={nextFunc} />
    </div>
  );
};


const Step3 = ({
  arabic_question,
  setArabicQuestion,
  arabic_answer,
  setArabicAnswer,
  handleSubmit,
}: {
  arabic_question: any;
  setArabicQuestion: any;
  arabic_answer: any;
  setArabicAnswer: any;
  handleSubmit: any;
}) => {
  const { t } = useTranslation();

  const nextFunc = () => {
    if (!arabic_question || !arabic_answer) {
      alert(t("please_fill_all_fields"));
      return;
    }
    handleSubmit();
  };

  return (
    <div className="space-y-3">
      <Typography variant="h4" component="h2" gutterBottom>
        {t("set_the_qst_and_answer_in_arabic")}
      </Typography>

      <InputText
        label={t("question-in_arabic")}
        value={arabic_question}
        setValue={(e: any) => setArabicQuestion(e.target.value)}
      />
      <HtmlEditor setValue={setArabicAnswer}
      initielValue={`${t("answer_in_arabic")}...`}
      />
      <ButtonFunc text="Next" onClick={nextFunc} />
    </div>
  );
};

