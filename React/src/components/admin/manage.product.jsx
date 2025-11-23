import { useEffect, useState } from "react";
import ProductForm from "./product_manager/product/manage.product.form";
import ProductTable from "./product_manager/product/manage.product.table";
import { fetchAllProductAPI, fetchAllProductPaginationAPI } from "../../service/product_manage/product/product_manage.product.api.service";
import { fetchAllCategoryAPI } from "../../service/product_manage/category/product_manage.category.api.service";
import { fetchAllCompanyBuyAPI } from "../../service/company/company.api.service";

const ProductManagerPage = () => {
    const [dataProduct, setDataProduct] = useState([]);
    const [dataProductSearch, setDataProductSearch] = useState([]);
    const [dataCategory, setDataCategory] = useState([]);
    const [dataCompanyBuy, setDataCompanyBuy] = useState([]);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)


    // empty array => run once 
    // not empty => next value  !== prev value
    useEffect(() => {
        loadProduct();
        loadCategory();
        loadCompanyBuy();
        loadProductSearchSearch();
    }, [page, pageSize]); // [page] #87 5:43

    const loadProduct = async () => {
        const res = await fetchAllProductPaginationAPI(page, pageSize)
        if (res.data) {
            setDataProduct(res.data.result)
            setPage(res.data.meta.page)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        setDataProduct(res.data.result)
    }

    const loadProductSearchSearch = async () => {
        const res = await fetchAllProductAPI()
        setDataProductSearch(res.data)
    }

    const loadCategory = async () => {
        const res = await fetchAllCategoryAPI()
        setDataCategory(res.data)
    }

    const loadCompanyBuy = async () => {
        const res = await fetchAllCompanyBuyAPI()
        setDataCompanyBuy(res.data)
    }

    return (
        <div>
            <div style={{ padding: "20px" }}>
                <ProductForm
                    loadProduct={loadProduct}
                    loadCategory={loadCategory}
                    dataCategory={dataCategory}
                    loadCompanyBuy={loadCompanyBuy}
                    dataCompanyBuy={dataCompanyBuy}
                />
                <ProductTable
                    loadProduct={loadProduct}
                    dataProduct={dataProduct}
                    setDataCompanyBuy={setDataCompanyBuy}
                    setDataCategory={setDataCategory}
                    dataCompanyBuy={dataCompanyBuy}
                    dataCategory={dataCategory}
                    dataProductSearch={dataProductSearch}
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

export default ProductManagerPage;