import { Outlet } from "react-router-dom";
import TopBar from "./components/ui/TopBar";
import { useEffect } from "react";
import isLoggedIn from "./lib/isLogedin";
import { useNavigate } from "react-router-dom";


function App() {

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
  }, []);


  return (
    <>
        <TopBar />
        <div className="mt-[60px] lg:mt-[80px]">
          <Outlet />
        </div>
    </>
  );
}

export default App;
