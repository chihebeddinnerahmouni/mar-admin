import StatsCont from "../containers/mainPage/statsCont";
import ChartsCont from "../containers/mainPage/ChartsCont";



const MainPage = () => {
  return (
    <div className="content pt-6 px-4 md:px-[40px] lg:px-[100px] mx-auto flex flex-col items-center">
      <StatsCont />
      <ChartsCont />
    </div>
  );
};

export default MainPage;