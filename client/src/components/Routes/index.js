import React from "react";
import { Route, Routes } from "react-router-dom";
import Gallery from "../Gallery";
import LoginPage from "../LoginPage";
import RegisterUser from "../RegisterUser";
import { ROUTES } from "../../constants/routes";

const ComponentRoutes = () => (
  <Routes>
    <Route path={ROUTES.LOGIN_IN} element={<LoginPage />} />
    <Route path={ROUTES.REGISTER} element={<RegisterUser />} />
    <Route path={ROUTES.LANDING_PAGE} element={<Gallery />} />
  </Routes>
);
export default ComponentRoutes;