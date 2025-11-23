// import axios from "axios";
import axios from "../axios.customize";

// done
const createLogoAPI = (name) => {
    const URL_BACKEND = "/api/v1/logo";
    const data = {
        name: name,
    };
    return axios.post(URL_BACKEND, data);
};

//done
const fetchLogoAPI = () => {
    const URL_BACKEND = `/api/v1/logo`;

    return axios.get(URL_BACKEND);
}

export {
    createLogoAPI, fetchLogoAPI
}