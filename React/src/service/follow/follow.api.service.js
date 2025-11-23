// import axios from "axios";
import axios from "../axios.customize";

// // done
const createOrUpdateFollowAPI = (idProduct) => {
    const URL_BACKEND = "/api/v1/follows";
    const data = {
        product: {
            id: idProduct
        }
    };
    return axios.post(URL_BACKEND, data);
};

export {
    createOrUpdateFollowAPI,
}