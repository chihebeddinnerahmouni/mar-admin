import logo from '../assets/files/logo';
import { Link, Outlet } from 'react-router-dom';


const AuthLayout = () => {
    return (
      <div
        className="w-full min-h-screen md:pt-[40px] md:pb-10 flex justify-center items-center"
        style={{
          background: "linear-gradient(to bottom, #FF7F89, #FFA6B0)",
        }}
      >
        <Link
          to="/"
          className="absolute top-4 leftt-4 md:top-7 md:left-7 text-white"
        >
          <img src={logo} className="" alt="logo" />
        </Link>
        
        <Outlet />
      </div>
    ); 
};

export default AuthLayout;