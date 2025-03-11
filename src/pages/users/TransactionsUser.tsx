import { useTranslation } from "react-i18next";
import axios from "axios";
import { useEffect } from "react";
import LoadingLine from "../../components/ui/LoadingLine";
import BalanceSection from "../../components/users/Balance";
import TransactionsTable from "../../components/users/TransactionsTable";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axios_error_handler } from "../../functions/axios_error_handler";



const fetshData = async (userId: string) => {
  const urlListing = import.meta.env.VITE_SERVER_URL_LISTING;
  const res = await axios.get(`${urlListing}/api/transactions/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return res.data;
}



const TransactionsUser = () => {
  const { t } = useTranslation();
  const { userId } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["userTransactions", userId],
    queryFn: () => fetshData(userId!),
    enabled: !!userId,
  })

  useEffect(() => { 
    if (error) axios_error_handler(error, t);
  }, [error]);
  if (error) return null;

  if (isLoading) {
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

        {data.releasedBalance !== undefined &&
          data.unreleasedBalance !== undefined && (
            <BalanceSection
              released={data.releasedBalance}
              unreleased={data.unreleasedBalance}
            />
          )}
        {data.transactions.length === 0 ? (
          <div className="no-transactions text-center p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
            <h2 className="text-xl font-bold text-yellow-700">
              {t("no_transactions")}
            </h2>
            <p className="text-lg text-yellow-600">
              {t("no_transactions_yet")}
            </p>
          </div>
        ) : (
          <TransactionsTable rows={data.transactions} />
        )}
      </div>
    </div>
  );
};

export default TransactionsUser;
