// import axios from "axios";
import axios from "../axios.customize";

// done
const createUserAPI = (name, email, password, roleId) => {
    const URL_BACKEND = "/api/v1/users";
    const data = {
        name: name,
        email: email,
        password: password,
        role: {
            id: roleId
        }
    };
    return axios.post(URL_BACKEND, data);
};

//done
const updateUserAPI = (id, name, active, roleId) => {
    const URL_BACKEND = "/api/v1/users";
    const data = {
        id: id,
        name: name,
        active: active,
        role: {
            id: roleId
        }
    }
    return axios.put(URL_BACKEND, data);
}

//done
const fetchAllUserPaginationAPI = (page, pageSize) => {
    const URL_BACKEND = `/api/v1/users/pagination?page=${page}&size=${pageSize}`;

    return axios.get(URL_BACKEND);
}

//done
const fetchAllUserAPI = () => {
    const URL_BACKEND = `/api/v1/users`;

    return axios.get(URL_BACKEND);
}

// done
const fetchUserByEmailAPI = (email) => {
    const URL_BACKEND = `/api/v1/users/email/${email}`;

    return axios.get(URL_BACKEND);
}

// done
const DeleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/users/${id}`;

    return axios.delete(URL_BACKEND);
}

// done
const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: email,
        password: password,
        delay: 2000
    }
    return axios.post(URL_BACKEND, data);
}

// done
const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";

    return axios.get(URL_BACKEND);
}

// done
const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";

    return axios.post(URL_BACKEND);
}

export {
    createUserAPI, updateUserAPI, fetchAllUserAPI, DeleteUserAPI,
    loginAPI, getAccountAPI,
    logoutAPI, fetchAllUserPaginationAPI, fetchUserByEmailAPI
}