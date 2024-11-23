import { Outlet } from "react-router-dom"
import TopBar from "./components/ui/TopBar";



function App() {


  return (
    <>
      <TopBar />
      <div className="mt-[60px] lg:mt-[80px]">
        <Outlet />
      </div>

    </>
  );
}

export default App
