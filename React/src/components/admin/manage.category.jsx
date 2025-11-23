import { useEffect, useState } from "react";
import CategoryTable from "./product_manager/category/manage.category.table";
import { fetchAllCategoryPaginationAPI } from '../../service/product_manage/category/product_manage.category.api.service'
import CategoryForm from "./product_manager/category/manage.category.form";


const CategoryManagerPage = () => {

    const [dataCategory, setDataCategory] = useState([]);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    // empty array => run once 
    // not empty => next value  !== prev value
    useEffect(() => {
        loadCategory();
    }, [page, pageSize]); // [page] #87 5:43

    const loadCategory = async () => {
        const res = await fetchAllCategoryPaginationAPI(page, pageSize)
        if (res.data) {
            setDataCategory(res.data.result)
            setPage(res.data.meta.page)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        setDataCategory(res.data.result)
    }

    return (
        <div>
            <div style={{ padding: "20px" }}>
                <CategoryForm
                    loadCategory={loadCategory}
                />
                <CategoryTable
                    loadCategory={loadCategory}
                    dataCategory={dataCategory}
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

export default CategoryManagerPage;