// import axios from "axios";
import axios from "../axios.customize";

//done
const fetchAllProductAPI = (page, pageSize) => {
    const URL_BACKEND = `/api/v1/products?page=${page}&size=${pageSize}`;

    return axios.get(URL_BACKEND);
}

//done
const fetchAllProductActiveAPI = (page, pageSize) => {
    const URL_BACKEND = `/api/v1/products/active?page=${page}&size=${pageSize}`;

    return axios.get(URL_BACKEND);
}

// done
const fetchAllProductLowStockPaginationAPI = (page, pageSize) => {
    const URL_BACKEND = `/api/v1/products/low-stock/pagination?page=${page}&size=${pageSize}`;

    return axios.get(URL_BACKEND);
}

// done
const fetchAllProductLowStockAPI = () => {
    const URL_BACKEND = `/api/v1/products/low-stock`;

    return axios.get(URL_BACKEND);
}


// done
const fetchAllProductFollowAPI = (page, pageSize) => {
    const URL_BACKEND = `/api/v1/products/follow?page=${page}&size=${pageSize}`;

    return axios.get(URL_BACKEND);
}


export {
    fetchAllProductAPI, fetchAllProductLowStockAPI, fetchAllProductFollowAPI, fetchAllProductActiveAPI, fetchAllProductLowStockPaginationAPI,
}