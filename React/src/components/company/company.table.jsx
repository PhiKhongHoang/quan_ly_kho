import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, notification, Popconfirm, Table, Tag } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { DeleteCompanyAPI } from '../../service/company/company.api.service';
import UpdateCompanyModal from './update.company.modal';
import ViewCompanyDetail from './view.company.detail';
import Search from 'antd/es/transfer/search';
import { FetchDetail } from '../../service/company/detail/company.detail.api.service';
import { AuthContext } from '../context/auth.context';
import { format } from 'date-fns';

const CompanyTable = (props) => {
    const {
        dataCompany, loadCompany,
        page, pageSize, total,
        setPage, setPageSize,
    } = props;


    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)

    const [dataDetail, setDataDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    const [dataDetailCompany, setDataDetailCompany] = useState([]);


    const { user } = useContext(AuthContext);

    // Hàm kiểm tra quyền
    const checkPermission = (requiredModule) => {
        if (!user || !user.role || !user.role.permissions) return false;

        return user.role.permissions.some(permission => permission.module === requiredModule);
    };


    // *********************************
    const [dataSearch, setDataSearch] = useState([]);
    const [value, setValue] = useState('');

    // Đồng bộ dataSearch với dataCompany khi dataCompany thay đổi
    useEffect(() => {
        setDataSearch(dataCompany);
    }, [dataCompany]);


    const handleSearch = (e) => {
        const currValue = e.target.value;
        setValue(currValue);

        if (currValue.trim() === '') {
            setDataSearch(dataCompany); // Trả lại toàn bộ dữ liệu nếu input rỗng
        } else {
            const filteredData = dataCompany.filter(entry =>
                entry.name.toLowerCase().includes(currValue.toLowerCase()) // Tìm kiếm không phân biệt hoa thường
            );
            setDataSearch(filteredData);
        }
    };

    // *********************************

    const loadDetailCompany = async (id) => {
        const res = await FetchDetail(id)
        setDataDetailCompany(res.data)
    }

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
            title: "Tên công ty",
            dataIndex: "name",
            render: (_, record) => {
                return (
                    <>
                        <a
                            href='#'
                            onClick={() => {
                                setDataDetail(record)
                                setIsDetailOpen(true)
                                loadDetailCompany(record.id)
                            }}
                        >
                            {record.name}
                        </a>
                    </>
                )
            }
        },
        {
            title: "Mô tả",
            dataIndex: "description"
        },
        {
            title: 'Số lượng sản phẩm',
            dataIndex: 'quantity',
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt) => format(new Date(createdAt), "dd/MM/yyyy HH:mm:ss"),
        },
        {
            title: "Ngày sửa đổi",
            dataIndex: "createdBy",
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                // Gán màu theo trạng thái
                let color = status === 'SELL' ? 'volcano' : status === 'BUY' ? 'green' : 'default';
                return <Tag color={color}>{status}</Tag>;
            },
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
        ...(checkPermission("ROLES")
            ? [
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
                                title="Delete company"
                                description="Xác nhận xóa?"
                                onConfirm={() => handleDeleteCompany(record.id)}
                                okText="Yes"
                                cancelText="No"
                                placement='left'
                            >
                                <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                            </Popconfirm>
                        </ div>
                    ),
                }
            ]
            :
            []),
    ];

    const handleDeleteCompany = async (id) => {
        const res = await DeleteCompanyAPI(id);
        if (res.data) {
            notification.success({
                message: "delete company",
                description: "xóa company thành công"
            })
            await loadCompany()
        } else {
            notification.error({
                message: "error delete company",
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


    return (
        <>
            {/* Ô tìm kiếm */}
            <div style={{ marginBottom: 20, }}>
                <Input
                    placeholder="Tìm kiếm tên công ty"
                    value={value}
                    onChange={handleSearch}
                    style={{ width: '300px' }}
                />
            </div>

            <Table
                bordered 
                columns={columns}
                dataSource={dataSearch}
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

            <UpdateCompanyModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadCompany={loadCompany}
            />

            <ViewCompanyDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadCompany={loadCompany}
                dataDetailCompany={dataDetailCompany}
            />
        </>
    )
}

export default CompanyTable;