import axios from "../axios.customize";


// done
const createRoleAPI = (name, description, active, permissionsIds) => {
    const URL_BACKEND = "/api/v1/roles";
    const data = {
        name: name,
        description: description,
        active: active,
        permissions: permissionsIds.map(id => ({ id }))
    };
    return axios.post(URL_BACKEND, data);
};

const updateRoleAPI = (id, name, description, active, permissionsIds) => {
    const URL_BACKEND = "/api/v1/roles";
    const data = {
        id: id,
        name: name,
        description: description,
        active: active,
        permissions: permissionsIds.map(id => ({ id }))
    };
    return axios.put(URL_BACKEND, data);
};

//done
const fetchAllRolePaginationAPI = (page, pageSize) => {
    const URL_BACKEND = `/api/v1/roles/pagination?page=${page}&size=${pageSize}`;

    return axios.get(URL_BACKEND);
}

//done
const fetchAllRoleAPI = () => {
    const URL_BACKEND = `/api/v1/roles`;

    return axios.get(URL_BACKEND);
}

// done
const DeleteRoleAPI = (id) => {
    const URL_BACKEND = `/api/v1/roles/${id}`;

    return axios.delete(URL_BACKEND);
}

export {
    fetchAllRoleAPI, DeleteRoleAPI, createRoleAPI, fetchAllRolePaginationAPI, updateRoleAPI
}