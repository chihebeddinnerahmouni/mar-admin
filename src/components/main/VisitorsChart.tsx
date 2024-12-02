import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useMediaQuery } from "react-responsive";
import { useTranslation } from "react-i18next";


const visitorsDataset = [
  { month: "Jan", arabic_month: "يناير", visitors: 1000 },
  { month: "Feb", arabic_month: "فبراير", visitors: 700 },
  { month: "Mar", arabic_month: "مارس", visitors: 785 },
  { month: "Apr", arabic_month: "أبريل", visitors: 888 },
  { month: "May", arabic_month: "مايو", visitors: 999 },
  { month: "Jun", arabic_month: "يونيو", visitors: 543 },
  { month: "Jul", arabic_month: "يوليو", visitors: 600 },
  { month: "Aug", arabic_month: "أغسطس", visitors: 700 },
  { month: "Sep", arabic_month: "سبتمبر", visitors: 800 },
  { month: "Oct", arabic_month: "أكتوبر", visitors: 900 },
  { month: "Nov", arabic_month: "نوفمبر", visitors: 1000 },
  { month: "Dec", arabic_month: "ديسمبر", visitors: 1100 },
];
export default function TickPlacementBars() {
  const tickPlacement = "middle";
  const tickLabelPlacement = "middle";
    const mainColor = "#FF385C";
    const isXl = useMediaQuery({ query: "(min-width: 1280px)" });
const { i18n, t } = useTranslation();
 
    
  return (
    <div className="w-full" dir="ltr">
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: visitorsDataset.map((item) =>
              i18n.language === "ar" ? item.arabic_month : item.month
            ),
            tickPlacement,
            tickLabelPlacement,
          },
        ]}
        series={[
          {
            data: visitorsDataset.map((item) => item.visitors),
            label: t("monthly_visitors"),
            valueFormatter: (value: number | null) =>
              value !== null ? `${value} ${t("visitors")}` : "",
            color: mainColor,
          },
        ]}
        height={isXl ? 400 : 300}
        sx={{
          [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: "translateX(-10px)",
          },
          //   backgroundColor: "green",
        }}
      />
    </div>
  );
}
