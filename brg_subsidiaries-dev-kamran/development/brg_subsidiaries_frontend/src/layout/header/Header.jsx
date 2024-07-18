// src/components/header/Header.js
import logo from "../../assets/BinRahmaLogo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { FormContextSetup } from "../../context/FormContext";
import { useAuth } from "../../context/auth context/AuthContext";

const Header = () => {
  const { isLogin, setIsLogin, isLogout, setIsLogout } =
    useContext(FormContextSetup);
  const { isAuthenticated, logout, email } = useAuth();
  const navigate = useNavigate();

  const sliderVariants = {
    initial: {
      x: -300,
    },
    animate: {
      x: "0",
      transition: {
        duration: 1.5,
      },
    },
  };

  const handleLoginClick = () => {
    navigate("/login");
    setIsLogin(false);
  };

  const handleLogoutClick = () => {
    setIsLogout(false);
    setIsLogin(true);
    logout();
    navigate("/");
  };

  useEffect(() => {
    const loggedEmail = localStorage.getItem("token");
    setIsLogout(loggedEmail ? true : false);
    setIsLogin(loggedEmail ? false : true);
  }, [isAuthenticated]);

  return (
    <motion.div
      variants={sliderVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col lg:flex-row mb-4 lg:mb-0"
    >
      <div className="py-6 lg:w-1/2 flex flex-col lg:flex-row justify-between lg:items-center flex-1 p-1 lg:py-3 mb-2 lg:mb-0">
        <div className="w-full lg:w-3/5 mb-4 lg:mb-0">
          <img src={logo} alt="Bin Rahma" className="mx-auto w-[90%]" />
        </div>
        <h1 className="text-6xl hidden lg:block text-white font-bold px-8 lg:px-2 uppercase">
          Our
        </h1>
      </div>
      <div className="lg:w-1/2 flex flex-col lg:flex-row items-start lg:items-center lg:justify-between lg:py-3 bg-transparent bg-white">
        <h1 className="hidden lg:block text-6xl text-white lg:text-[#181344] font-bold px-8 lg:px-2 uppercase">
          Subsidiaries
        </h1>
        {isLogin && (
          <div className="px-8 rounded-lg w-full hidden lg:block">
            <button
              onClick={handleLoginClick}
              className="bg-[#181344] py-2 px-8 rounded-full hover:bg-[#383080] block ml-auto text-xs font-medium text-white border-2 border-[#F9c55d] shadow-lg cursor-pointer"
            >
              Log In
            </button>
          </div>
        )}
        {isLogout && (
          <div className="px-2">
            <div className="px-8 rounded-lg w-full hidden lg:block">
              <button
                onClick={handleLogoutClick}
                className="bg-[#181344] py-2 px-6 rounded-full hover:bg-[#383080] block ml-auto text-xs font-medium text-white border-2 border-[#F9c55d] shadow-lg cursor-pointer mb-2"
              >
                Log Out
              </button>
            </div>
            <h3 className="text-xs text-right">{email}</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Header;
