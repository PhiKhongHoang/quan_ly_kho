import { useEffect, useState } from "react";
import ImportGoodsTable from "../components/goods/import/import.table";
import { fetchAllImportGoodsAPI } from "../service/goods/import/import.api.service";
import ImportGoodsForm from "../components/goods/import/import.form";
import { fetchAllExportGoodsAPI } from "../service/goods/export/export.api.service";
import ExportGoodsForm from "../components/goods/export/export.form";
import ExportGoodsTable from "../components/goods/export/export.table";
import { Row } from "antd";
import { fetchAllProductAPI } from "../service/product_manage/product/product_manage.product.api.service";
import { fetchAllCompanyBuyActiveAPI, fetchAllCompanyBuyAPI, fetchAllCompanySellActiveAPI, fetchAllCompanySellAPI } from "../service/company/company.api.service";

const ImportGoodsPage = () => {
    const [dataImportGoods, setDataImportGoods] = useState([]);
    const [dataExportGoods, setDataExportGoods] = useState([]);
    const [dataCompanySell, setDataCompanySell] = useState([]);
    const [dataCompanyBuy, setDataCompanyBuy] = useState([]);
    const [dataCompanyBuyForm, setDataCompanyBuyForm] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    // empty array => run once 
    // not empty => next value  !== prev value
    useEffect(() => {
        loadImportGoods();
        loadExportGoods();
        loadCompanySell();
        loadCompanyBuy();
        loadCompanyBuyForm();
        loadProduct();
    }, [page, pageSize]); // [page] #87 5:43


    const loadImportGoods = async () => {
        const res = await fetchAllImportGoodsAPI(page, pageSize)
        if (res.data) {
            setDataImportGoods(res.data.result)
            setPage(res.data.meta.page)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        setDataImportGoods(res.data.result)
    }

    const loadExportGoods = async () => {
        const res = await fetchAllExportGoodsAPI(page, pageSize)
        setDataExportGoods(res.data.result)
    }

    const loadCompanySell = async () => {
        const res = await fetchAllCompanySellActiveAPI()
        setDataCompanySell(res.data)
    }

    const loadCompanyBuy = async () => {
        const res = await fetchAllCompanyBuyAPI()
        setDataCompanyBuy(res.data)
    }

    const loadCompanyBuyForm = async () => {
        const res = await fetchAllCompanyBuyActiveAPI()
        setDataCompanyBuyForm(res.data)
    }

    const loadProduct = async () => {
        const res = await fetchAllProductAPI()
        setDataProduct(res.data)
    }


    return (
        <div>
            <div style={{ padding: "20px" }}>
                <ImportGoodsForm
                    loadImportGoods={loadImportGoods}
                    loadCompanyBuyForm={loadCompanyBuyForm}
                    dataCompanyBuyForm={dataCompanyBuyForm}
                    dataProduct={dataProduct}
                />
                <ImportGoodsTable
                    loadImportGoods={loadImportGoods}
                    dataImportGoods={dataImportGoods}
                    loadCompanyBuy={loadCompanyBuy}
                    dataCompanyBuy={dataCompanyBuy}
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    setPage={setPage}
                    setPageSize={setPageSize}
                />
            </div>
        </div>
    )
}

export default ImportGoodsPage;