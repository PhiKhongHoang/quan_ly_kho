// import axios from "axios";
import axios from "../../axios.customize";

const FetchDetail = (id) => {
    const URL_BACKEND = `/api/v1/companies_detail/${id}`;

    return axios.get(URL_BACKEND);
}

export {
    FetchDetail,
}