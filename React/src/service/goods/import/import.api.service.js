// import axios from "axios";
import axios from "../../axios.customize";

// // done
const createImportGoodsAPI = (description, companyId) => {
    const URL_BACKEND = "/api/v1/import_goods";
    const data = {
        description: description,
        company: {
            id: companyId
        }
    };
    return axios.post(URL_BACKEND, data);
};

// //done
const updateImportGoodsAPI = (id, description, companyId) => {
    const URL_BACKEND = "/api/v1/import_goods";
    const data = {
        id: id,
        description: description,
        company: {
            id: companyId
        }
    }
    return axios.put(URL_BACKEND, data);
}

//done
const fetchAllImportGoodsAPI = (page, pageSize) => {
    const URL_BACKEND = `/api/v1/import_goods?page=${page}&size=${pageSize}`;

    return axios.get(URL_BACKEND);
}

export {
    createImportGoodsAPI, updateImportGoodsAPI,
    fetchAllImportGoodsAPI,
}