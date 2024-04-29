import Swal from "sweetalert2";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout } from "../../store/slices/auth/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const {user, isAdmin, isAuth} = useSelector(state => state.auth);
    // const [login, dispatch] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();

    const handlerLogin = async ({username, password}) => {
      
      try {
          const response = await loginUser({username, password});
          const token = response.data.token;

          // window.atob decodifica a base64
          const claims = JSON.parse(window.atob(token.split(".")[1])); //convierte un string mediante un patron en elementos de un arreglo.
          console.log(claims);
          const user = {username: claims.sub};
          dispatch(onLogin({user, isAdmin: claims.isAdmin}));
          sessionStorage.setItem('login', JSON.stringify({
            isAuth: true,
            isAdmin: claims.isAdmin,
            user,
          }));

          sessionStorage.setItem('token',`Bearer ${token}`);

          // se va directamente a /users
          navigate('/users');
    
        } catch(error) {
          if(error.response?.status == 401) {
            Swal.fire("Error de Login", "Username y passwords invalidos", "error");
            
          } else if(error.response?.status == 403) {
            Swal.fire("Error de Login", "No tiene acceso al recurso o permisos!", "error");
            
          } else {
            throw error;
          }
        }
      };
    
      const handlerLogout = () => {
        dispatch(onLogout());
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
      }

    // siempre devuelve un objeto.
    return {
        login:{
          user,
          isAdmin,
          isAuth,
        },
        handlerLogin,
        handlerLogout
    }
}