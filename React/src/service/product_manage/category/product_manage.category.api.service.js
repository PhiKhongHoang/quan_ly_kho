// import axios from "axios";
import axios from "../../axios.customize";

// // done
const createCategoryAPI = (name, description) => {
    const URL_BACKEND = "/api/v1/categories";
    const data = {
        name: name,
        description: description,
    };
    return axios.post(URL_BACKEND, data);
};

// //done
const updateCategoryAPI = (id, name, description) => {
    const URL_BACKEND = "/api/v1/categories";
    const data = {
        id: id,
        name: name,
        description: description,
    }
    return axios.put(URL_BACKEND, data);
}

//done
const fetchAllCategoryPaginationAPI = (page, pageSize) => {
    const URL_BACKEND = `/api/v1/categories/pagination?page=${page}&size=${pageSize}`;

    return axios.get(URL_BACKEND);
}

const fetchAllCategoryAPI = () => {
    const URL_BACKEND = `/api/v1/categories`;

    return axios.get(URL_BACKEND);
}


export {
    createCategoryAPI, updateCategoryAPI,
    fetchAllCategoryAPI, fetchAllCategoryPaginationAPI,
}