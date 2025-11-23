import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Table } from 'antd';
import { useState } from 'react';
import ViewImportGoodsDetail from './view.import.detail';
import { FetchDetail } from '../../../service/goods/import/detail/import.detail.api.service';
import { format } from 'date-fns';

const ImportGoodsTable = (props) => {
    const {
        dataImportGoods, loadImportGoods,
        dataCompany, loadCompany,
        page, pageSize, total,
        setPage, setPageSize,
    } = props;


    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)
    const [dataDetailImport, setDataDetailImport] = useState([]);

    const [dataDetail, setDataDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [company, setCompany] = useState("")

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
            title: 'Mô tả',
            dataIndex: 'description',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: "createdAt",
            render: (createdAt) => format(new Date(createdAt), "dd/MM/yyyy HH:mm:ss"),
        },
        {
            title: 'Công ty',
            render: (_, record) => {
                return (
                    <>
                        {record.company.name}
                    </>
                )
            }
        },
        {
            title: 'Chi tiết',
            dataIndex: 'description',
            render: (_, record) => {
                return (
                    <>
                        <a
                            href='#'
                            onClick={() => {
                                setDataDetail(record)
                                setIsDetailOpen(true)
                                loadImportGoodsDetail(record.id)
                                setCompany(record.company.name)
                            }}
                        >
                            Chi tiết đơn hàng
                        </a>
                    </>
                )
            }
        },
    ];


    const loadImportGoodsDetail = async (id) => {
        const res = await FetchDetail(id)
        setDataDetailImport(res.data)
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
            <Table
                bordered 
                columns={columns}
                dataSource={dataImportGoods}
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
            <ViewImportGoodsDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadImportGoods={loadImportGoods}
                dataDetailImport={dataDetailImport}
                company={company}
            />
        </>
    )
}

export default ImportGoodsTable;