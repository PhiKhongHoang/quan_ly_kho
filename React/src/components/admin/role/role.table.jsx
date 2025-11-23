import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Table } from 'antd';
import { useState } from 'react';
import { DeleteRoleAPI } from '../../../service/role/role.api.service';
import ViewRoleDetail from './view.role.detail';
import UpdateRoleModal from './update.role.modal';

const RoleTable = (props) => {
    const {
        dataRole, loadRole,
        dataPermission, loadPermission,
        page, pageSize, total,
        setPage, setPageSize,
    } = props;


    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)
    const [dataDetail, setDataDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>
                        {(index + 1) + (page - 1) * pageSize}
                    </>
                )
            }
        },
        {
            title: 'Vai trò',
            dataIndex: 'name',
            render: (_, record) => {
                return (
                    <>
                        <a
                            href='#'
                            onClick={() => {
                                setDataDetail(record)
                                setIsDetailOpen(true)
                            }}
                        >
                            {record.name}
                        </a>
                    </>
                )
            }
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: (active) => (
                <span style={{ color: active ? 'green' : 'red' }}>
                    {active ? 'YES' : 'NO'}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: "pointer", color: "orange" }}
                    />

                    <Popconfirm
                        title="Delete role"
                        description="Xác nhận xóa?"
                        onConfirm={() => handleDeleteRole(record.id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleDeleteRole = async (id) => {
        const res = await DeleteRoleAPI(id);
        if (res.data) {
            notification.success({
                message: "delete role",
                description: "xóa role thành công"
            })
            await loadRole()
        } else {
            notification.error({
                message: "error delete role",
                description: JSON.stringify(res.message)
            })
        }
    }


    const onChange = (pagination, filters, sorter, extra) => {
        // setPage, setPageSize,
        // nếu thay đổi trang page
        if (pagination && pagination.current) {
            // page: giá trị react lưu
            // pagination.current: giá trị mới
            // dùng dấu cộng (+) trước 1 tên biến thì sẽ tự động chuyển string thành int
            if (+pagination.current !== +page) {
                setPage(+pagination.current)
            }

        }

        // nếu thay đổi tổng số phần tử : pageSize 
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }

        }

    };


    return (
        <>
            <Table
                bordered 
                columns={columns}
                dataSource={dataRole}
                rowKey={"id"}
                pagination={
                    {
                        page: page,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}

            />

            <UpdateRoleModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadRole={loadRole}
                loadPermission={loadPermission}
                dataPermission={dataPermission}
            />

            <ViewRoleDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadRole={loadRole}
                loadPermission={loadPermission}
                dataPermission={dataPermission}

            />

        </>
    )
}

export default RoleTable;