import { EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import ViewCategoryDetail from './view.manage.category.detail';
import UpdateCategoryModal from './update.manage.category.modal';
import { fetchAllProductByCategoryAPI } from '../../../../service/product_manage/product/product_manage.product.api.service';

const CategoryTable = (props) => {
    const {
        dataCategory, loadCategory,
        page, pageSize, total,
        setPage, setPageSize,
    } = props;


    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)

    const [dataDetail, setDataDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [idCategory, setIdCategory] = useState(0)
    const [dataProduct, setDataProduct] = useState("")

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
            title: 'Tên danh mục',
            dataIndex: 'name',
            render: (_, record) => {
                return (
                    <>
                        <a
                            href='#'
                            onClick={() => {
                                setDataDetail(record)
                                setIsDetailOpen(true)
                                setIdCategory(record.id)
                            }}
                        >
                            {record.name}
                        </a>
                    </>
                )
            }
        },
        {
            title: 'Số lượng sản phẩm',
            dataIndex: 'quantity',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
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
                </ div>
            ),
        },
    ];


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

    const loadAllProduct = async (id) => {
        const res = await fetchAllProductByCategoryAPI(id)
        setDataProduct(res.data)
    }

    useEffect(() => {
        if (idCategory > 0)
            loadAllProduct(idCategory);
    }, [idCategory]);

    return (
        <>
            <Table
                bordered 
                columns={columns}
                dataSource={dataCategory}
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

            <UpdateCategoryModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadCategory={loadCategory}
            />

            <ViewCategoryDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadCategory={loadCategory}
                dataProduct={dataProduct}
            />
        </>
    )
}

export default CategoryTable;