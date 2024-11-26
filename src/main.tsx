import App from "./App.tsx";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import Users from "./pages/users/Users.tsx";
import Regions from "./pages/Regions.tsx";
import english from "./locales/english.json";
import arabic from "./locales/arabic.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Categories from "./pages/Categories.tsx";
import Boats from "./pages/boats/Boats.tsx";
import UpdateBoat from "./pages/boats/UpdateBoat.tsx";
import Help from "./pages/Help.tsx";
import Features from "./pages/Features.tsx";
import Submissions from "./pages/Submissions.tsx";
import Documents from "./pages/documents/Documents.tsx";
import CheckDocuments from "./pages/documents/CheckDocuments.tsx";
import MakeListings from "./pages/make listing/MakeListings.tsx";
import AuthLayout from "./layout/authLayout.tsx";
import Login from "./components/auth/Login.tsx";
import Signup from "./components/auth/Signup.tsx";
import ForgetPassword from "./components/auth/ForgetPassword.tsx";
import CheckListing from "./pages/make listing/CheckListing.tsx";
import Bookings from "./pages/Bookings.tsx";
import NoPage from "./pages/NoPage.tsx";
import AccountUser from "./pages/users/AccountUser.tsx";
import TransactionsUser from "./pages/users/TransactionsUser.tsx";




const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/categories", element: <Categories /> },
      { path: "/users", element: <Users /> },
      { path: "/users/user/:userId", element: <AccountUser /> },
      { path: "/users/transactions/:userId", element: <TransactionsUser /> },
      { path: "/features", element: <Features /> },
      { path: "/boats", element: <Boats /> },
      { path: "/boats/update-boat/:boatId", element: <UpdateBoat /> },
      { path: "/regions", element: <Regions /> },
      { path: "/help", element: <Help /> },
      { path: "/submissions", element: <Submissions /> },
      { path: "/documents", element: <Documents /> },
      {
        path: "/documents/check-document/:userId",
        element: <CheckDocuments />,
      },
      { path: "/listings", element: <MakeListings /> },
      { path: "listings/check-details/:listingId", element: <CheckListing /> },
      { path: "inquiries", element: <Bookings /> },
      { path: "inquiries/:bookingId", element: <Bookings /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Signup /> },
      { path: "/forgot-password", element: <ForgetPassword /> },
    ],
  },
  {
    path: "*",
    element: <NoPage />,
  },
]);




// i18n for translation
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: english,
      },
      ar: {
        translation: arabic,
      },
    },
    lng: localStorage.getItem("i18nextLng") || "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    document.documentElement.setAttribute(
      "dir",
      i18n.language === "ar" ? "rtl" : "ltr"
    );

    i18n.on("languageChanged", (lng) => {
      document.documentElement.setAttribute(
        "dir",
        lng === "ar" ? "rtl" : "ltr"
      );
    });
  });





ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} />
  </>
);
