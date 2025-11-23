// import axios from "axios";
import axios from "../../axios.customize";

// done
const createProductAPI = (categoryId, companyId, products) => {
    const URL_BACKEND = "/api/v1/products";
    const data = {
        category: {
            id: categoryId
        },
        company: {
            id: companyId
        },
        products: products
    };
    return axios.post(URL_BACKEND, data);
};



//done
const updateProductAPI = (id, name, description, active, companyId, categoryId, exportPrice, numberWarning) => {
    const URL_BACKEND = "/api/v1/products";
    const data = {
        id: id,
        name: name,
        description: description,
        active: active,
        company: {
            id: companyId
        },
        category: {
            id: categoryId
        },
        exportPrice: exportPrice,
        numberWarning: numberWarning
    }
    return axios.put(URL_BACKEND, data);
}

//done
const fetchAllProductAPI = () => {
    const URL_BACKEND = `/api/v1/products`;

    return axios.get(URL_BACKEND);
}

const fetchAllProductPaginationAPI = (page, pageSize) => {
    const URL_BACKEND = `/api/v1/products/pagination?page=${page}&size=${pageSize}`;

    return axios.get(URL_BACKEND);
}

//done
const fetchAllProductByImportGoodsAPI = (id) => {
    const URL_BACKEND = `/api/v1/products/fetch-by-import-goods/${id}`;

    return axios.get(URL_BACKEND);
}

const fetchAllProductByCategoryAPI = (id) => {
    const URL_BACKEND = `/api/v1/products/fetch-by-category/${id}`;

    return axios.get(URL_BACKEND);
}

// done
const DeleteProductAPI = (id) => {
    const URL_BACKEND = `/api/v1/products/${id}`;

    return axios.delete(URL_BACKEND);
}


export {
    createProductAPI, updateProductAPI, fetchAllProductAPI, DeleteProductAPI,
    fetchAllProductByImportGoodsAPI, fetchAllProductPaginationAPI, fetchAllProductByCategoryAPI,
}