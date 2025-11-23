
import { useEffect, useState } from 'react';
import UserTable from './user/user.table';
import UserForm from './user/user.form';
import { fetchAllUserAPI, fetchAllUserPaginationAPI } from '../../service/user/user.api.service';
import { fetchAllRoleAPI } from '../../service/role/role.api.service';


const UserPage = () => {
    const [dataUser, setDataUser] = useState([]);
    const [dataUserSearch, setDataUserSearch] = useState([]);
    const [dataRole, setDataRole] = useState([]);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    // empty array => run once 
    // not empty => next value  !== prev value
    useEffect(() => {
        loadUser();
        loadRole();
        loadUserSearch();
    }, [page, pageSize]); // [page] #87 5:43


    const loadUser = async () => {
        const res = await fetchAllUserPaginationAPI(page, pageSize)
        if (res.data) {
            setDataUser(res.data.result)
            setPage(res.data.meta.page)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        setDataUser(res.data.result)
    }

    const loadUserSearch = async () => {
        const res = await fetchAllUserAPI()

        setDataUserSearch(res.data)
    }

    const loadRole = async () => {
        const res = await fetchAllRoleAPI()

        setDataRole(res.data)
    }
    return (
        <div>
            <div style={{ padding: "20px" }}>
                <UserForm
                    loadUser={loadUser}
                    loadRole={loadRole}
                    dataRole={dataRole}
                />
                <UserTable
                    loadUser={loadUser}
                    dataUser={dataUser}
                    loadRole={loadRole}
                    dataRole={dataRole}
                    dataUserSearch={dataUserSearch}
                    setDataUserSearch={setDataUserSearch}
                    page={page}
                    pageSize={pageSize}
                    total={total}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    setTotal={setTotal}
                />
            </div>
        </div>
    )
}

export default UserPage;