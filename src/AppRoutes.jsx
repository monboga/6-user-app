import { LoginPage } from "./auth/pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserRoutes } from "./routes/UserRoutes";
import { useSelector } from "react-redux";

export const AppRoutes = () => {
  const { isAuth, isLoginLoading } = useSelector(state => state.auth);

  // proceso que se tiene que resolver mientras no este autenticado
  if (isLoginLoading) {
    return (
      <div className="container my-4 text-center">
      {/* <h4>Cargando ...</h4> */}
      <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando ...</span>
      </div>
    </div>
    );
  }

  return (
    <Routes>
      {isAuth ? (
        <Route path="/*" element={<UserRoutes />} />
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<Navigate to={"/login"} />} />
        </>
      )}

      {/*  */}
    </Routes>
  );
};
