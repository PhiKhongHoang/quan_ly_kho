
import { useEffect, useState } from 'react';
import RoleTable from './role/role.table';
import { fetchAllRolePaginationAPI } from '../../service/role/role.api.service';
import RoleForm from './role/role.form';
import { fetchAllPermissionAPI } from '../../service/permission/permission.api.service';


const RolePage = () => {
    const [dataRole, setDataRole] = useState([]);
    const [dataPermission, setDataPermission] = useState([]);
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    // empty array => run once 
    // not empty => next value  !== prev value
    useEffect(() => {
        loadRole();
        loadPermission();
    }, [page, pageSize]); // [page] #87 5:43

    const loadRole = async () => {
        const res = await fetchAllRolePaginationAPI(page, pageSize)
        if (res.data) {
            setDataRole(res.data.result)
            setPage(res.data.meta.page)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
        setDataRole(res.data.result)
    }

    const loadPermission = async () => {
        const res = await fetchAllPermissionAPI()

        setDataPermission(res.data)
    }



    return (
        <div>
            <div style={{ padding: "20px" }}>
                <RoleForm
                    loadRole={loadRole}
                    loadPermission={loadPermission}
                    dataPermission={dataPermission}
                />
                <RoleTable
                    loadRole={loadRole}
                    dataRole={dataRole}
                    loadPermission={loadPermission}
                    dataPermission={dataPermission}
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

export default RolePage;