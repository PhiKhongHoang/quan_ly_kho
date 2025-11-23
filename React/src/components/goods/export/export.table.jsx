import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, notification, Popconfirm, Table } from 'antd';
import { useState } from 'react';
import ViewExportGoodsDetail from './view.export.detail';
import { FetchDetail } from '../../../service/goods/export/detail/export.detail.api.service';
import { format } from 'date-fns';


const ExportGoodsTable = (props) => {
    const {
        dataExportGoods, loadExportGoods,
        dataCompany, loadCompany,
        page, pageSize, total,
        setPage, setPageSize,
    } = props;


    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)
    const [dataDetailExport, setDataDetailExport] = useState([]);

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
                                loadExportGoodsDetail(record.id)
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

    const loadExportGoodsDetail = async (id) => {
        const res = await FetchDetail(id)
        setDataDetailExport(res.data)
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
                dataSource={dataExportGoods}
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

            <ViewExportGoodsDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadExportGoods={loadExportGoods}
                dataDetailExport={dataDetailExport}
                company={company}
            />
        </>
    )
}

export default ExportGoodsTable;