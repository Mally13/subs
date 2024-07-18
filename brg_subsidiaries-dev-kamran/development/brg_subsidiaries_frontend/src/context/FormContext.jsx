import { createContext, useState } from "react";

export const FormContextSetup = createContext();

const FormContext = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLogout, setIsLogout] = useState(false);
  return (
    <FormContextSetup.Provider
      value={{ isLogin, setIsLogin, isLogout, setIsLogout }}
    >
      {children}
    </FormContextSetup.Provider>
  );
};

export default FormContext;
