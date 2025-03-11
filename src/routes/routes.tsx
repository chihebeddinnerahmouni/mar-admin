import App from "../App.tsx";
import "../index.css";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage.tsx";
import Users from "../pages/users/Users.tsx";
import Regions from "../pages/Regions.tsx";
import Categories from "../pages/Categories.tsx";
import Boats from "../pages/boats/Boats.tsx";
import UpdateBoat from "../pages/boats/UpdateBoat.tsx";
import Help from "../pages/Help.tsx";
import Features from "../pages/Features.tsx";
import Submissions from "../pages/Submissions.tsx";
import Documents from "../pages/documents/Documents.tsx";
import CheckDocuments from "../pages/documents/CheckDocuments.tsx";
import MakeListings from "../pages/make listing/MakeListings.tsx";
import Login from "../components/auth/Login.tsx";
import CheckListing from "../pages/make listing/CheckListing.tsx";
import Bookings from "../pages/Bookings.tsx";
import NoPage from "../pages/NoPage.tsx";
import AccountUser from "../pages/users/AccountUser.tsx";
import TransactionsUser from "../pages/users/TransactionsUser.tsx";

export const router = createBrowserRouter([
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
        path: "/documents/check-document/:submittionId",
        element: <CheckDocuments />,
      },
      { path: "/listings", element: <MakeListings /> },
      { path: "listings/check-details/:listingId", element: <CheckListing /> },
      { path: "inquiries", element: <Bookings /> },
      { path: "inquiries/:bookingId", element: <Bookings /> },
    ],
  },

  { path: "/login", element: <Login /> },

  {
    path: "*",
    element: <NoPage />,
  },
]);
