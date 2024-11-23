import { useState } from "react"
import { useTranslation } from "react-i18next"
import LoadingButton from "../ui/LoadingButton"

const ForgetPassword = () => {
    const { t } = useTranslation()
    const [email, setEmail] = useState("")
  const [isEmailMissing, setIsEmailMissing] = useState(false)
  const [loading, setLoading] = useState(false)

    const send = () => {
        let isMissing = false
        if (email === "") {
            setIsEmailMissing(true)
            isMissing = true
        }
      if (isMissing) return
      
            
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
    }

  return (
    // <div className="w-full h-full py-6 bg-white rounded-10 shadow-hardShadow flex flex-col items-center justify-center md:w-[400px] md:h-auto">
    <div className="w-full h-[100vh] py-6 bg-white  shadow-hardShadow flex flex-col items-center justify-center md:rounded-10 md:w-[400px] md:h-auto">
      <div className="all flex flex-col items-center">
        <p className="text-lg font-semibold text-writingMainDark">
          {t("forgot_your_password?")}
        </p>
        <p className="text-sm text-writingGrey font-medium mt-3">
          {t("send_reset_link")}
        </p>
        <div className="email w-[320px] mt-10">
          <input
            type="text"
            placeholder={t("email")}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailMissing(false);
            }}
            className={`outline-none w-full h-10 border border-gray-300 rounded-[5px] px-2 focus:border-none focus:outline-main ${
              isEmailMissing ? "border-red-400" : "border-gray-300"
            }`}
          />

          {isEmailMissing && (
            <p className="text-[10px] mt-2 text-red-400">{t("enter_email")}</p>
          )}
        </div>

        <button
          className="w-[320px] h-10 bg-mainBlue text-white bg-main rounded-[5px] mt-5"
          onClick={send}
          disabled={loading}
        >
          {loading ? <LoadingButton /> : t("send_email")}
        </button>
      </div>
    </div>
  );
}

export default ForgetPassword
