import { useEffect, useState } from "react";
import ProductTable from "./all_product/product.table";
import { fetchAllProductActiveAPI } from "../../service/home/home.api.service";

const AllProductPage = () => {
    const [dataProduct, setDataProduct] = useState([]);
    const [dataProductSearch, setDataProductSearch] = useState([]);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    // empty array => run once
    // not empty => next value  !== prev value
    useEffect(() => {
        loadProduct();
        loadProductSearchSearch();
    }, [page, pageSize]); // [page] #87 5:43

    const loadProduct = async () => {
        const res = await fetchAllProductActiveAPI(page, pageSize)
        if (res.data) {
            setDataProduct(res.data.result)
            setPage(res.data.meta.page)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        setDataProduct(res.data.result)
    }

    const loadProductSearchSearch = async () => {
        const res = await fetchAllProductActiveAPI(page, pageSize)
        setDataProductSearch(res.data.result)
    }




    return (
        <div>
            <div style={{ padding: "20px" }}>
                <ProductTable
                    loadProduct={loadProduct}
                    dataProduct={dataProduct}
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

export default AllProductPage;