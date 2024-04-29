import usersApi from "../apis/usersApi";

const BASE_URL = '';

// const config = () => {

//     return {
//         headers: {
//             "Authorization": sessionStorage.getItem('token'),
//             "Content-Type": "application/json",
//         }
//     }
// }

export const findAll = async() => {
    try {
        // servidor de spring para el backend donde lista todos los usuarios.
        const response = await usersApi.get(BASE_URL);
        return response;
        
    } catch (error) {

        console.error(error);
        
    }

}

export const save = async ({username, email, password, admin}) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await usersApi.post(BASE_URL, {
            username,
            email,
            password,
            admin,
        },);
    } catch (error) {
        throw error;
    }

}

export const update = async ({id, username, email, admin}) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await usersApi.put(`${BASE_URL}/${id}`, {
            username,
            email,
            admin,
            // password: 'nothing', //password provisional para que no marque error al editar.
        },)
    } catch (error) {
        throw error;        
    }

}

export const remove = async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
        await usersApi.delete(`${BASE_URL}/${id}`,);
    } catch (error) {
        // console.error(error);
        throw error;
    }
}