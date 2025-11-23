import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, notification, Popconfirm, Table, Tag } from 'antd';
import { useState } from 'react';
import { createOrUpdateFollowAPI } from '../../../service/follow/follow.api.service';
import ViewProduct from './view.product.detail';

const ProductTable = (props) => {
    const {
        dataProductSearch,
        dataProduct, loadProduct,
        page, pageSize, total,
        setPage, setPageSize,
    } = props;

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
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, record, index) => {
                {
                    if (record.quantity === 0) {
                        return (
                            <>
                                <Tag color="red" key="red">
                                    Hết hàng
                                </Tag>
                            </>
                        )
                    }
                    else if (record.quantity <= record.numberWarning) {
                        return (
                            <>
                                <Tag color="geekblue" key="geekblue">
                                    Còn ít
                                </Tag>
                            </>
                        )
                    }
                    else {
                        return (
                            <>
                                <Tag color="green" key="green">
                                    Còn hàng
                                </Tag>
                            </>
                        )
                    }
                }
            },
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current != +page) {
                setPage(+pagination.current)
            }

        }

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