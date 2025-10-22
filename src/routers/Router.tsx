import { Route, Routes } from "react-router-dom";
import NotFind from "../components/templates/NotFind";
import MainPage from "../components/templates/mainPage";
import LogInPage from "../components/templates/loginPage";

const Routers = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFind />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LogInPage />} />
    </Routes>
  );
};

export default Routers;
