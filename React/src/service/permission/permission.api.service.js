import axios from "../axios.customize";

const fetchAllPermissionAPI = () => {
    const URL_BACKEND = `/api/v1/permissions`;

    return axios.get(URL_BACKEND);
}

// done
const DeletePermissionAPI = (id) => {
    const URL_BACKEND = `/api/v1/permissions/${id}`;

    return axios.delete(URL_BACKEND);
}

export {
    fetchAllPermissionAPI, DeletePermissionAPI,
}