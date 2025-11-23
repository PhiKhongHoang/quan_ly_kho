// import axios from "axios";
import axios from "../../../axios.customize";

// // done
const createImportGoodsDetailAPI = (importGoodsId, importGoodsDetails) => {
    const URL_BACKEND = "/api/v1/import_goods_detail";
    const data = {
        importGoods: {
            id: importGoodsId
        },
        importGoodsDetails: importGoodsDetails,
    };
    return axios.post(URL_BACKEND, data);
};

const FetchDetail = (id) => {
    const URL_BACKEND = `/api/v1/import_goods_detail/detail/${id}`;

    return axios.get(URL_BACKEND);
}

const FetchReportMonth = (month, year) => {
    const URL_BACKEND = `/api/v1/import_goods_detail/report/month?month=${month}&year=${year}`;

    return axios.get(URL_BACKEND);
}

const FetchReportYear = (year) => {
    const URL_BACKEND = `/api/v1/import_goods_detail/report/year?year=${year}`;

    return axios.get(URL_BACKEND);
}

export {
    createImportGoodsDetailAPI,
    FetchDetail, FetchReportMonth, FetchReportYear
}