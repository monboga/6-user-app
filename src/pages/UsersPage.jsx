/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { useUsers } from "../hook/useUsers";
import { useAuth } from "../auth/hooks/useAuth";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/Paginator";

export const UsersPage = () => {

  // obtenemos el parametro de la ruta
  // devolvemos un objeto con los valores de la ruta
  const {page} = useParams();

  const {
    users,
    visibleForm,
    isLoading,
    paginator,
    handlerOpenForm,
    getUsers,
  } = useUsers();

  // contexto del auth
  const { login } = useAuth();

  useEffect(() => {

    // pasamos el page y recibe al useUsers la pagina
    getUsers(page);

  }, [page]);

  if(isLoading) {
    return (
      <div className="container my-4 text-center">
        {/* <h4>Cargando ...</h4> */}
        <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Cargando ...</span>
        </div>
      </div>
    );
  }
  
  return (
    <>
    {!visibleForm || 
      <UserModalForm />
    }
    <div className="container">
      <h2>Users App</h2>
      <div className="row">
        
          {/* pasamos los datos del usuario que viene del componente
          {!visibleForm || 
          <div className="col">

          </div>
            } */}

        
        <div className="col">
          { (visibleForm || !login.isAdmin) || <button
            className="btn btn-primary my-2"
            onClick={handlerOpenForm}
          >
            Nuevo Usuario
          </button>}

          {users.length === 0 ? (
            <div className="alert alert-warning">
              No hay usuarios en el sistema!
            </div>
          ) : (
            <>
            
            <UsersList />
            {/* tenemos el paginador debajo de la tabla UserList */}
            {/* componente queda como reutilizable para cualquier ruta */}
            <Paginator url="/users/page" paginator={paginator}/>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};
