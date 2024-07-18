// src/components/login/Login.js
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormContextSetup } from "../../context/FormContext";
import { mockData } from "./data";
import { useAuth } from "../../context/auth context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLogin, setIsLogout, isLogin, isLogout } =
    useContext(FormContextSetup);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
    setIsLogin(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let user = mockData.find(
      (elm) => elm.email === email && elm.password === password
    );

    if (user) {
      login(email);
      setIsLogin(false);
      setIsLogout(true);
      navigate("/", { state: email });
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="bg-[#e9e6e6] w-full h-3/4 p-4 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-[#181344] w-1/3 px-6 py-8 rounded-md text-sm font-semibold text-[#F9c55d] border border-[#F9c55d]"
      >
        <h2 className="mb-8 text-xl">Login to your account</h2>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-[#e9e6e6] p-1 w-3/5 rounded-md outline-[#F9c55d] text-xs font-medium text-[#181344]"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-[#e9e6e6] p-1 w-3/5 rounded-md outline-[#F9c55d] text-xs font-medium text-[#181344]"
          />
        </div>
        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="bg-[#181344] py-1 px-6 rounded-full hover:bg-[#383080] block text-[10px] font-medium text-white border border-[#F9c55d] shadow-lg cursor-pointer"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={handleHomeClick}
            className="hover:bg-[#181344] py-1 px-6 rounded-full bg-[#383080] block text-[10px] font-medium text-white border border-[#F9c55d] shadow-lg cursor-pointer"
          >
            Home
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
