// import axios from "axios";
import axios from "../../../axios.customize";

// // done
const createExportGoodsDetailAPI = (exportGoodsId, exportGoodsDetails) => {
    const URL_BACKEND = "/api/v1/export_goods_detail";
    const data = {
        exportGoods: {
            id: exportGoodsId
        },
        exportGoodsDetails: exportGoodsDetails,
    };
    return axios.post(URL_BACKEND, data);
};

const FetchProfitMonth = (startDate) => {
    const URL_BACKEND = `/api/v1/export_goods_detail/daily/month?startDate=${startDate}`;

    return axios.get(URL_BACKEND);
}

const FetchProfitYear = (year) => {
    const URL_BACKEND = `/api/v1/export_goods_detail/monthly/year?year=${year}`;

    return axios.get(URL_BACKEND);
}

const FetchDetail = (id) => {
    const URL_BACKEND = `/api/v1/export_goods_detail/detail/${id}`;

    return axios.get(URL_BACKEND);
}

const FetchProductDay = (date) => {
    const URL_BACKEND = `/api/v1/export_goods_detail/product-total-amount-day?date=${date}`;

    return axios.get(URL_BACKEND);
}

const FetchProductMonth = (month, year) => {
    const URL_BACKEND = `/api/v1/export_goods_detail/profit-by-month?month=${month}&year=${year}`;

    return axios.get(URL_BACKEND);
}

const FetchReportMonth = (month, year) => {
    const URL_BACKEND = `/api/v1/export_goods_detail/report/month?month=${month}&year=${year}`;

    return axios.get(URL_BACKEND);
}

const FetchReportYear = (year) => {
    const URL_BACKEND = `/api/v1/export_goods_detail/report/year?year=${year}`;

    return axios.get(URL_BACKEND);
}

export {
    createExportGoodsDetailAPI,
    FetchProfitMonth,
    FetchDetail,
    FetchProductDay,
    FetchProductMonth,
    FetchProfitYear,
    FetchReportMonth,
    FetchReportYear
}