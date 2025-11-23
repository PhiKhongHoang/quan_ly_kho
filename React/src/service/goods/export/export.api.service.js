// import axios from "axios";
import axios from "../../axios.customize";

// // done
const createExportGoodsAPI = (description, companyId) => {
    const URL_BACKEND = "/api/v1/export_goods";
    const data = {
        description: description,
        company: {
            id: companyId
        }
    };
    return axios.post(URL_BACKEND, data);
};

//done
const fetchAllExportGoodsAPI = (page, pageSize) => {
    const URL_BACKEND = `/api/v1/export_goods?page=${page}&size=${pageSize}`;

    return axios.get(URL_BACKEND);
}


export {
    createExportGoodsAPI,
    fetchAllExportGoodsAPI,
}