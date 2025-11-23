import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, notification, Popconfirm, Table } from 'antd';
import { useEffect, useState } from 'react';
import ViewUserDetail from './view.user.detail';
import UpdateUserModal from './update.user.modal';
import { DeleteUserAPI } from '../../../service/user/user.api.service';

const UserTable = (props) => {
    const {
        dataUserSearch,
        setDataUserSearch,
        dataUser, loadUser,
        dataRole, loadRole,
        page, pageSize, total,
        setPage, setPageSize, setTotal
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
            title: 'Tên tài khoản',
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
            title: 'Email',
            dataIndex: 'email',
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
                < div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record)
                            setIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />

                    <Popconfirm
                        title="Xóa tài khoản"
                        description="Xác nhận xóa?"
                        onConfirm={() => handleDeleteUser(record.id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </ div>
            ),
        },
    ];

    const handleDeleteUser = async (id) => {
        const res = await DeleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "Xóa tài khoản",
                description: "Xóa tài khoản thành công"
            })
            await loadUser()
        } else {
            notification.error({
                message: "Lỗi xóa tài khoản",
                description: JSON.stringify(res.message)
            })
        }
    }


    const onChange = (pagination, filters, sorter, extra) => {

        // setPage, setPageSize,
        // nếu thay đổi trang page
        if (pagination && pagination.current) {
            // page: giá trị react lưu
            // pagination.current : giá trị mới hiện tại (phải lưu ý vì current  mới đúng trong antd)
            // dùng dấu cộng (+) trước 1 tên biến thì sẽ tự động chuyển string thành int
            if (+pagination.current != +page) {
                setPage(+pagination.current)
            }

        }

        // nếu thay đổi tổng số phần tử : pageSize 
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize != +pageSize) {
                setPageSize(+pagination.pageSize)
            }

        }

    };

    // *********************************
    const [dataSearch, setDataSearch] = useState([]);
    const [value, setValue] = useState('');


    const handleSearch = (e) => {
        const currValue = e.target.value;
        setValue(currValue);

        if (currValue.trim() === '') {
            setDataSearch([]); // Trả lại toàn bộ dữ liệu nếu input rỗng
        } else {
            const filteredData = dataUserSearch.filter(entry =>
                entry.name.toLowerCase().includes(currValue.toLowerCase()) // Tìm kiếm không phân biệt hoa thường
            );
            setDataSearch(filteredData);

        }
    };

    // *********************************

    return (
        <>
            {/* Ô tìm kiếm */}
            <div style={{ marginBottom: 20, }}>
                <Input
                    placeholder="Tìm kiếm tên tài khoản"
                    value={value}
                    onChange={handleSearch}
                    style={{ width: '300px' }}
                />
            </div>

            <Table
                bordered 
                columns={columns}
                dataSource={value === '' ? dataUser : dataSearch}
                rowKey={"id"}
                pagination={
                    {
                        page: page,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: value !== '' ? dataSearch.length : total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                onChange={onChange}

            />

            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadUser={loadUser}
                dataRole={dataRole}
                loadRole={loadRole}
            />

            <ViewUserDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadUser={loadUser}
                dataRole={dataRole}
                loadRole={loadRole}

            />
        </>
    )
}

export default UserTable;