/* eslint-disable react/prop-types */
import { Navigate, Route, Routes } from "react-router-dom";
import { UsersPage } from "../pages/UsersPage";
import { NavBar } from "../components/layout/NavBar";
import { RegisterPage } from "../pages/RegisterPage";
import { useSelector } from "react-redux";

export const UserRoutes = () => {

  const { isAdmin } = useSelector(state => state.auth);


  return (
    <>
        <NavBar />
        <Routes>

          <Route path="users" element={<UsersPage/>} />

          {/* este page es el mismo que tenemos en el hook */}
          <Route path="users/page/:page" element={<UsersPage/>} />

          {/* muestra o no la pagina dependiendo de si es admin o no */}
          {!isAdmin ||
          <>

          <Route path="users/edit/:id" element={<RegisterPage/>} />
          <Route path="users/register" element={<RegisterPage/>} />

          </>
          }
          <Route path="/" element={<Navigate to="/users" />} />
        </Routes>
    </>
  );
};
