/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useUsers } from "../hook/useUsers";

export const UserForm = ({ handlerCloseForm, userSelected }) => {
  const { initialUserForm, handlerAddUser, errors } = useUsers();
  // valores iniciales del formulario
  
  const [userForm, setUserForm] = useState(initialUserForm);
  const [checked, setChecked] = useState(userForm.admin);
  const { id, username, password, email, admin } = userForm;

  useEffect(() => {
    setUserForm({
      ...userSelected,
      password: "",
    });
  }, [userSelected]);

  const onInputChange = ({ target }) => {
    // console.log(target.value);
    const { name, value } = target;

    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onCheckboxChange = () => {
    // manejamos el estado de si esta chequeado o no.
    // cada vez que haga click cambia su valor.
    setChecked(!checked);
    setUserForm({ 
      ...userForm,
       admin: checked
      });
  };

  const onSubmit = (event) => {
    // para que la pagina no haga un refresh
    event.preventDefault();
    // validacion de que los campos del formulario se ecuentren vacios.
    // if (!username || (!password && id === 0) || !email) {

    //   Swal.fire(
    //     "Error de validacion",
    //     "Debe completar los datos del formulario",
    //     "error"
    //   );

    //   return;
    // }
    // // validacion basica de un email
    // if(!email.includes('@')) {
    //   Swal.fire(
    //     "Error de validacion email",
    //     "El email debe ser valido, incluir un @",
    //     "error"
    //   );
    //   return;
    // }
    // console.log(userForm);

    // guardar el user form en el listado de usuarios
    handlerAddUser(userForm);
    // setUserForm(initialUserForm);
  };
  const onCloseForm = () => {
    handlerCloseForm();
    setUserForm(initialUserForm);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          className="form-control my-3 w-75"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onInputChange}
        />

        <p className="text-danger">{errors?.username}</p>
        {id > 0 || (
          <input
            className="form-control my-3 w-75"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={onInputChange}
          />
        )}
        <p className="text-danger">{errors?.password}</p>

        <input
          className="form-control my-3 w-75"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onInputChange}
        />
        <p className="text-danger">{errors?.email}</p>

        <div className="my-3 form-check">
          <input
            type="checkbox"
            name="admin"
            checked={admin}
            className="form-check-input"
            onChange={onCheckboxChange}
          />
          <label className="form-check-label">Admin</label>
        </div>

        <input type="hidden" name="id" value={id} />
        <button className="btn btn-primary" type="submit">
          {id > 0 ? "Editar" : "Crear"}
        </button>

        {!handlerCloseForm || (
          <button
            className="btn btn-primary mx-2"
            type="button"
            onClick={() => onCloseForm()}
          >
            Cerrar
          </button>
        )}
      </form>
    </>
  );
};
