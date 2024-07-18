import Footer from "../../layout/footer/Footer";
import Header from "../../layout/header/Header";
import Main from "../../layout/main/Main";
import Login from "../login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "../../routes/route.js";
import Form from "../form/Form.jsx";
import { AuthProvider } from "../../context/auth context/AuthContext.jsx";
import ProtectedRoute from "../../components/protected route/ProtectedRoute.jsx";

const Home = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="h-screen">
          <Header />
          <Routes>
            <Route path={routes.home.path} element={<Main />} />
            <Route path={routes.login.path} element={<Login />} />
            <Route
              path={routes.form.path}
              element={<ProtectedRoute element={<Form />} />}
            />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default Home;
