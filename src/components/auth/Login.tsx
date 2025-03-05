// import { useTranslation } from "react-i18next";
// import { Link } from "react-router-dom";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import InputEmail from "../ui/inputs/InputEmail";
// import InputPassword from "../ui/inputs/InputPassword";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import ButtonFunc from "../ui/buttons/Button";

// const url = import.meta.env.VITE_SERVER_URL_USERS;
// const signInFunction = async (values: any) => {
//   const { data } = await axios.post(`${url}/api/user/signin`, {
//     email: values.email,
//     password: values.password,
//   });
//   return data;
// };

// const Login = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string()
//         .required(t("email_is_required"))
//         .email(t("email_must_be_valid")),
//       password: Yup.string().required(t("password_is_required")),
//     }),
//     onSubmit: () => {
//       refetch();
//     },
//   });

//   const { isSuccess, data, isLoading, error, refetch } = useQuery({
//     queryKey: ["login"],
//     queryFn: () => signInFunction(formik.values),
//     enabled: false,
//   });

//   if (axios.isAxiosError(error)) {
//     Swal.fire({
//       icon: "error",
//       title: t("oops"),
//       text: t(error.response?.data?.message || t("something_went_wrong")),
//       confirmButtonText: t("try_again"),
//       customClass: {
//         confirmButton: "custom-confirm-button",
//       },
//     });
//   }

//   useEffect(() => {
//     if (isSuccess) {
//       localStorage.setItem("jwt", data.token);
//       navigate("/?page=1");
//     }
//   }, [isSuccess]);

//   return (
//     <div className="w-full h-[100vh] py-6 bg-white  shadow-hardShadow flex flex-col items-center justify-center md:rounded-10 md:w-[400px] md:h-auto">
//       <div className="all flex flex-col items-center">
//         <p className="text-lg font-semibold text-writingMainDark">
//           {t("signin")}
//         </p>

//         <form
//           className="all flex flex-col items-center"
//           onSubmit={formik.handleSubmit}
//         >
//           <FieldComp
//             Component={InputEmail}
//             value={formik.values.email}
//             setValue={formik.handleChange("email")}
//             error={formik.touched.email && Boolean(formik.errors.email)}
//             helperText={formik.touched.email && formik.errors.email}
//             label="email"
//           />

//           <FieldComp
//             Component={InputPassword}
//             value={formik.values.password}
//             setValue={formik.handleChange("password")}
//             error={formik.touched.password && Boolean(formik.errors.password)}
//             helperText={formik.touched.password && formik.errors.password}
//             label="password"
//           />

//           <div className="buttons flex flex-col w-[320px]">
//             <ForgotPassword />
//             <div className="w-full mt-3">
//               <ButtonFunc type="submit" text={t("login")} loading={isLoading} />
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

// // const FieldComp = ({ elem, index }: any) => {
// const FieldComp = ({
//   Component,
//   value,
//   setValue,
//   error,
//   helperText,
//   label,
// }: any) => {
//   const { t } = useTranslation();
//   return (
//     <div className={`w-[320px] mt-5`}>
//       <Component
//         label={t(label)}
//         value={value}
//         setValue={setValue}
//         error={error}
//         helperText={helperText}
//       />
//     </div>
//   );
// };

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

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputEmail from "../ui/inputs/InputEmail";
import InputPassword from "../ui/inputs/InputPassword";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ButtonFunc from "../ui/buttons/Button";

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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required(t("email_is_required"))
        .email(t("email_must_be_valid")),
      password: Yup.string().required(t("password_is_required")),
    }),
    onSubmit: () => {
      refetch();
    },
  });

  const { isSuccess, data, isLoading, error, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: () => signInFunction(formik.values),
    enabled: false,
  });

  if (axios.isAxiosError(error)) {
    Swal.fire({
      icon: "error",
      title: t("oops"),
      text: t(error.response?.data?.message || t("something_went_wrong")),
      confirmButtonText: t("try_again"),
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    });
  }

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("jwt", data.token);
      navigate("/?page=1");
    }
  }, [isSuccess]);

  return (
    <div className="w-full h-[100vh] py-6 bg-white  shadow-hardShadow flex flex-col items-center justify-center md:rounded-10 md:w-[400px] md:h-auto">
      <div className="all flex flex-col items-center">
        <p className="text-lg font-semibold text-writingMainDark">
          {t("signin")}
        </p>

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
            <ForgotPassword />
            <div className="w-full mt-3">
              <ButtonFunc type="submit" text={t("login")} loading={isLoading} />
            </div>
          </div>
        </form>
      </div>
    </div>
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

const ForgotPassword = () => {
  const { t } = useTranslation();
  return (
    <Link
      to="/forgot-password"
      className="text-xs text-main mt-10 font-medium underline"
    >
      {t("forgotPassword")}
    </Link>
  );
};

