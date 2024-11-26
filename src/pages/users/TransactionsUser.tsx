import { useTranslation } from "react-i18next";
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingLine from "../../components/ui/LoadingLine";
import isLoggedIn from "../../lib/isLogedin";
import { useNavigate } from "react-router-dom";
import BalanceSection from "../../components/users/Balance";
import TransactionsTable from "../../components/users/TransactionsTable";

const TransactionsUser = () => {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [released, setReleased] = useState(0);
  const [unreleased, setUnreleased] = useState(0);
  const urlListing = import.meta.env.VITE_SERVER_URL_LISTING;
  const navigate = useNavigate();

  useEffect(() => {
    const fetshdata = () => {
      axios
        .get(`${urlListing}/api/transactions/my-transactions`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((res) => {
          // console.log(res.data);
          setTransactions(res.data.transactions);
          setReleased(res.data.releasedBalance);
          setUnreleased(res.data.unreleasedBalance);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (!isLoggedIn()) {
      return navigate("/?page=1");
    }
    fetshdata();
    // setTransactions(data.transactions);
    // setReleased(data.releasedBalance);
    // setUnreleased(data.unreleasedBalance);
    // setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen">
        <LoadingLine />
      </div>
    );
  }


  return (
    <div
      className={`w-full mt-[75px] pt-7 inboxListCss px-[20px] pb-10 md:px-[60px] lg:px-[120px] lg:mt-[95px] 2xl:px-[220px] bg-creme`}
    >
      <div className="content max-w-[1100px] mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center">
          {t("transactions")}
        </h1>

        {released !== undefined && unreleased !== undefined && (
          <BalanceSection released={released} unreleased={unreleased} />
        )}
        {transactions.length === 0 ? (
          <div className="no-transactions text-center p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
            <h2 className="text-xl font-bold text-yellow-700">
              {t("no_transactions")}
            </h2>
            <p className="text-lg text-yellow-600">
              {t("no_transactions_yet")}
            </p>
          </div>
        ) : (
          <TransactionsTable rows={transactions} />
        )}
      </div>
    </div>
  );
};

export default TransactionsUser;

// const data = {
//   transactions: [
//     {
//       id: 8,
//       transaction_type: "payment",
//       amount: 25242,
//       createdAt: "2024-11-14T17:32:26.000Z",
//       listing: {
//         title: "chiheb's boat",
//         description: "boat",
//       },
//       boatOwner: {
//         id: 14,
//         name: "zakaria",
//         surname: "amrani",
//       },
//     },
//     {
//       id: 7,
//       transaction_type: "payment",
//       amount: 25221,
//       createdAt: "2024-11-14T17:29:28.000Z",
//       listing: {
//         title: "chiheb's boat",
//         description: "boat",
//       },
//       boatOwner: {
//         id: 14,
//         name: "zakaria",
//         surname: "amrani",
//       },
//     },
//   ],
//   releasedBalance: 0,
//   unreleasedBalance: 12000,
// };
