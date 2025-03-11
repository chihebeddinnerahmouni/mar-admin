import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputEmail from "../ui/inputs/InputEmail";
import InputPassword from "../ui/inputs/InputPassword";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonFunc from "../ui/buttons/Button";
import { useMutation } from "@tanstack/react-query";
import AuthLayout from "../../layout/authLayout";
import { axios_error_handler } from "../../functions/axios_error_handler";

const url = import.meta.env.VITE_SERVER_URL_USERS;
const signInFunction = async (values: any) => {
  const { data } = await axios.post(`${url}/api/user/signin`, {
    email: values.email,
    password: values.password,
  });
  return data;
};

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signInFunction,
    onSuccess: (data) => {
      localStorage.setItem("jwt", data.token);
      navigate("/");
    },
    onError: (error: any) => {
      axios_error_handler(error, t);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required(t("email_is_required"))
        .email(t("enter_valid_email")),
      password: Yup.string().required(t("password_is_required")),
    }),
    onSubmit: () => {
      mutate(formik.values);
    },
  });

  return (
    <AuthLayout title={t("signin")}>
      <div className="all flex flex-col items-center w-full">
        <form
          className="all flex flex-col items-center"
          onSubmit={formik.handleSubmit}
        >
          <FieldComp
            Component={InputEmail}
            value={formik.values.email}
            setValue={formik.handleChange("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            label="email"
          />

          <FieldComp
            Component={InputPassword}
            value={formik.values.password}
            setValue={formik.handleChange("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            label="password"
          />

          <div className="buttons flex flex-col w-[320px]">
            {/* <ForgotPassword /> */}
            <div className="w-full mt-3">
              <ButtonFunc type="submit" text={t("login")} loading={isPending} />
            </div>
          </div>
        </form>
        {/* <SignupPart />
        <PrivacyPart /> */}
      </div>
    </AuthLayout>
  );
};

export default Login;

// const FieldComp = ({ elem, index }: any) => {
const FieldComp = ({
  Component,
  value,
  setValue,
  error,
  helperText,
  label,
}: any) => {
  const { t } = useTranslation();
  return (
    <div className={`w-[320px] mt-5`}>
      <Component
        label={t(label)}
        value={value}
        setValue={setValue}
        error={error}
        helperText={helperText}
      />
    </div>
  );
};

// const ForgotPassword = () => {
//   const { t } = useTranslation();
//   return (
//     <Link
//       to="/forgot-password"
//       className="text-xs text-main mt-10 font-medium underline"
//     >
//       {t("forgotPassword")}
//     </Link>
//   );
// };

// const SignupPart = () => {
//   const { t } = useTranslation();
//   return (
//     <div className="text-xs mt-5 flex gap-1">
//       <p>{t("dontHaveAccount")}</p>
//       <Link to="/register" className="text-main font-semibold underline">
//         {t("create_account")}
//       </Link>
//     </div>
//   );
// };

// const PrivacyPart = () => {
//   const { t } = useTranslation();
//   return (
//     <div className="policy">
//       <p className="text-xs text-gray-400 mt-5">
//         {t("by_continuing_you_agree_to_our")}{" "}
//         <Link to="/terms" className="text-main underline">
//           {t("terms")}
//         </Link>{" "}
//         {t("and")}{" "}
//         <Link to="/privacy" className="text-main underline">
//           {t("privacy")}
//         </Link>
//       </p>
//     </div>
//   );
// };
