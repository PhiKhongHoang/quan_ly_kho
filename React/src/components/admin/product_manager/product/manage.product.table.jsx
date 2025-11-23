import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, notification, Popconfirm, Table } from 'antd';
import { useState } from 'react';
import UpdateProductModal from './update.manage.product.modal';
import ViewProduct from './view.manage.product.detail';
import { createOrUpdateFollowAPI } from '../../../../service/follow/follow.api.service';
import { DeleteProductAPI } from '../../../../service/product_manage/product/product_manage.product.api.service';

const ProductTable = (props) => {
    const {
        dataProductSearch,
        dataProduct, loadProduct,
        dataCompanyBuy, setDataCompanyBuy,
        dataCategory, setDataCategory,
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
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            render: (_, record) => {
                return (
                    <>
                        <a
                            href='#'
                            onClick={() => {
                                setDataDetail(record)
                                setIsDetailOpen(true)
                                handleFollow(record.id)
                            }}
                        >
                            {record.name}
                        </a>
                    </>
                )
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Giá nhập gần nhất',
            dataIndex: 'latestImportPrice',
            render: (text) => {
                // Sử dụng toLocaleString để định dạng giá bán với dấu chấm phân cách
                return text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            },
        },
        {
            title: 'Giá bán',
            dataIndex: 'exportPrice',
            render: (text) => {
                // Sử dụng toLocaleString để định dạng giá bán với dấu chấm phân cách
                return text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            },
        },
        {
            title: 'Cảnh báo hết hàng',
            dataIndex: 'numberWarning',
        },
        {
            title: 'Đã bán',
            dataIndex: 'quantitySold',
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

                    {/* <Popconfirm
                        title="Delete product"
                        description="Xác nhận xóa?"
                        onConfirm={() => handleDeleteProduct(record.id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm> */}
                </ div>
            ),
        },
    ];

    // const handleDeleteProduct = async (id) => {
    //     const res = await DeleteProductAPI(id);
    //     if (res.data) {
    //         notification.success({
    //             message: "delete product",
    //             description: "xóa product thành công"
    //         })
    //         await loadProduct()
    //     } else {
    //         notification.error({
    //             message: "error delete product",
    //             description: JSON.stringify(res.message)
    //         })
    //     }
    // }


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
            const filteredData = dataProductSearch.filter(entry =>
                entry.name.toLowerCase().includes(currValue.toLowerCase()) // Tìm kiếm không phân biệt hoa thường
            );
            setDataSearch(filteredData);

        }
    };

    // *********************************

    const handleFollow = async (idProduct) => {
        const res = await createOrUpdateFollowAPI(idProduct);
    }

    return (
        <>
            {/* Ô tìm kiếm */}
            <div style={{ marginBottom: 20, }}>
                <Input
                    placeholder="Tìm kiếm tên sản phẩm"
                    value={value}
                    onChange={handleSearch}
                    style={{ width: '300px' }}
                />
            </div>

            <Table
                bordered 
                columns={columns}
                // dataSource={dataProduct}
                dataSource={value === '' ? dataProduct : dataSearch}
                rowKey={"id"}
                pagination={
                    {
                        page: page,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        // total: total,
                        total: value !== '' ? dataSearch.length : total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}

            />

            <UpdateProductModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadProduct={loadProduct}
                setDataCompanyBuy={setDataCompanyBuy}
                setDataCategory={setDataCategory}
                dataCompanyBuy={dataCompanyBuy}
                dataCategory={dataCategory}
            />

            <ViewProduct
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadProduct={loadProduct}
            />
        </>
    )
}

export default ProductTable;