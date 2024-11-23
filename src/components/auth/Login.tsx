import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { useState } from "react";
import LoadingButton from "../ui/LoadingButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";





const Login = () => {


  const login = () => {
    let isMissing = false;
    if (email === "") {
      setIsEmailMissing(true);
      isMissing = true;
    }
    if (password === "") {
      setIsPasswordMissing(true);
      isMissing = true;
    }
    if (isMissing) return;


    setLoading(true);
 
    axios
      .post(
        `${url}/api/user/signin`,
        {
          email,
          password,
        },
        {}
      )
      .then((res) => {
        // console.log(res);
        localStorage.setItem("jwt", res.data.token);
        setLoading(false);
        navigate("/");
      })
      .catch((err: any) => {
        // console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: t(err.response.data.message),
          confirmButtonText: t("try_again"),
          customClass: {
            confirmButton: "custom-confirm-button",
          },
        });
        setLoading(false);
      });

  };

  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailMissing, setIsEmailMissing] = useState(false);
  const [isPasswordMissing, setIsPasswordMissing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_SERVER_URL_USERS;


  return (
    <div className="w-full h-[100vh] py-6 bg-white  shadow-hardShadow flex flex-col items-center justify-center md:rounded-10 md:w-[400px] md:h-auto">
      <div className="all flex flex-col items-center">
        <p className="text-lg font-semibold text-writingMainDark">
          {t("signin")}
        </p>

        <div className="email w-[320px] mt-5">
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

        {/* password */}
        <div className="password w-[320px] mt-5">
          <div className="passwordinput relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("password")}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsPasswordMissing(false);
              }}
              className={`w-full h-10 border-[1px] rounded-[5px] px-2 focus:border-none focus:outline-main ${
                isPasswordMissing ? "border-red-400" : "border-gray-300"
              }`}
            />
            <button
              className={`absolute top-[50%] translate-y-[-50%] ${
                i18n.language === "en" ? "right-3" : "left-3"
              } `}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaRegEyeSlash />
              ) : (
                <FaRegEye className="text-writingGrey" />
              )}
            </button>
          </div>
          {isPasswordMissing && (
            <p className="text-[10px] mt-2 text-red-400">
              {t("enter_password")}
            </p>
          )}
        </div>

        {/* signin button and figet password */}
        <div className="buttons flex flex-col w-[320px]">
          <Link
            to="/forgot-password"
            className="text-xs text-main mt-10 font-medium underline"
          >
            {t("forgotPassword")}
          </Link>
          <button
            className="w-full h-10 bg-main text-white rounded-[5px] mt-3 hover:bg-mainHover"
            onClick={login}
            disabled={loading}
          >
            {loading ? <LoadingButton /> : t("login")}
          </button>
        </div>

        {/* redirect to create account */}
        <div className="text-xs mt-5 flex gap-1">
          <p>{t("dontHaveAccount")}</p>
          <Link to="/register" className="text-main font-medium underline">
            {t("create_account")}
          </Link>
        </div>

        {/* privacy */}
        <div className="policy">
          <p className="text-xs text-gray-400 mt-5">
            {t("by_continuing_you_agree_to_our")}{" "}
            <Link to="/terms" className="text-main underline">
              {t("terms")}
            </Link>{" "}
            {t("and")}{" "}
            <Link to="/privacy" className="text-main underline">
              {t("privacy")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
