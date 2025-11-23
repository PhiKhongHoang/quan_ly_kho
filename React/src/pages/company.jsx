import { useContext, useEffect, useState } from "react";
import { fetchAllCompanyAPI } from "../service/company/company.api.service";
import CompanyForm from "../components/company/company.form";
import CompanyTable from "../components/company/company.table";
import PrivateRoute from "./private.route";
import { AuthContext } from "../components/context/auth.context";


const CompanyManagerPage = () => {

    const [dataCompany, setDataCompany] = useState([]);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    // empty array => run once 
    // not empty => next value  !== prev value
    useEffect(() => {
        loadCompany();
    }, [page, pageSize]); // [page] #87 5:43

    const loadCompany = async () => {
        const res = await fetchAllCompanyAPI(page, pageSize)
        if (res.data) {
            setDataCompany(res.data.result)
            setPage(res.data.meta.page)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        setDataCompany(res.data.result)
    }

    return (
        <div>
            <div style={{ padding: "20px" }}>
                <CompanyForm
                    loadCompany={loadCompany}
                />

                <CompanyTable
                    loadCompany={loadCompany}
                    dataCompany={dataCompany}
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

export default CompanyManagerPage;