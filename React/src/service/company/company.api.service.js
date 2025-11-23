// import axios from "axios";
import axios from "../axios.customize";

// // done
const createCompanyAPI = (name, description, status) => {
    const URL_BACKEND = "/api/v1/companies";
    const data = {
        name: name,
        description: description,
        status: status
    };
    return axios.post(URL_BACKEND, data);
};

// //done
const updateCompanyAPI = (id, name, description, status, active) => {
    const URL_BACKEND = "/api/v1/companies";
    const data = {
        id: id,
        name: name,
        description: description,
        status: status,
        active: active
    }
    return axios.put(URL_BACKEND, data);
}

//done
const fetchAllCompanyAPI = (page, pageSize) => {
    const URL_BACKEND = `/api/v1/companies?page=${page}&size=${pageSize}`;

    return axios.get(URL_BACKEND);
}

// done
const DeleteCompanyAPI = (id) => {
    const URL_BACKEND = `/api/v1/companies/${id}`;

    return axios.delete(URL_BACKEND);
}

const fetchAllCompanySellAPI = () => {
    const URL_BACKEND = "/api/v1/companies/sell";

    return axios.get(URL_BACKEND);
}

const fetchAllCompanyBuyAPI = () => {
    const URL_BACKEND = "/api/v1/companies/buy";

    return axios.get(URL_BACKEND);
}

const fetchAllCompanySellActiveAPI = () => {
    const URL_BACKEND = "/api/v1/companies/active/sell";

    return axios.get(URL_BACKEND);
}

const fetchAllCompanyBuyActiveAPI = () => {
    const URL_BACKEND = "/api/v1/companies/active/buy";

    return axios.get(URL_BACKEND);
}


export {
    createCompanyAPI, updateCompanyAPI,
    fetchAllCompanyAPI, DeleteCompanyAPI,
    fetchAllCompanySellAPI, fetchAllCompanyBuyAPI,
    fetchAllCompanyBuyActiveAPI, fetchAllCompanySellActiveAPI
}