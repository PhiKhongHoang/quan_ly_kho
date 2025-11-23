import React, { useEffect, useRef, useState } from 'react';
import { Button, DatePicker, Space, Table } from 'antd';
import { useReactToPrint } from 'react-to-print';
import { FilePdfTwoTone } from '@ant-design/icons';
import { FetchReportMonth } from '../../../../service/goods/export/detail/export.detail.api.service';
import dayjs from 'dayjs';

const ReportMonthPage = () => {
    const [dataProduct, setDataProduct] = useState([]);
    const [date, setDate] = useState(dayjs());
    const [isTableVisible, setIsTableVisible] = useState(true); // State để ẩn/hiện bảng

    const loadProduct = async () => {
        try {
            const year = date.year();
            const month = date.month() + 1;

            const response = await FetchReportMonth(month, year);
            const result = response.data;

            if (result) {
                setDataProduct(result);
            } else {
                console.error("API Error:", result.error || "Unknown error");
            }
        } catch (error) {
            console.error("Error fetching chart dataMonth:", error);
        }
    };

    useEffect(() => {
        loadProduct();
    }, [date]);

    const onChange = (date, dateString) => {
        setDate(date);
    };

    // ****** pdf *****
    const componentPDF = useRef();

    const generatePDF = useReactToPrint({
        contentRef: componentPDF,
        documentTitle: `Báo cáo xuất hàng tháng ${date.month() + 1}_${date.year()}`,
    });
    // ***************

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => index + 1,
        },
        {
            title: 'Id sản phẩm',
            dataIndex: 'id',
            render: (_, record) => <span>{record.idProduct}</span>,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            render: (_, record) => <span>{record.productName}</span>,
        },
        {
            title: 'Tổng số lượng xuất hàng',
            dataIndex: 'totalQuantity',
            sorter: (a, b) => b.totalQuantity - a.totalQuantity,
            defaultSortOrder: 'descend',
        },
        {
            title: 'Tổng tiền xuất hàng',
            dataIndex: 'totalAmount',
            sorter: (a, b) => b.totalAmount - a.totalAmount,
            defaultSortOrder: 'descend',
            render: (text) => text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        },
        {
            title: 'Tổng lợi nhuận',
            dataIndex: 'totalProfit',
            sorter: (a, b) => b.totalProfit - a.totalProfit,
            defaultSortOrder: 'descend',
            render: (text) => text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        },
    ];

    return (
        <>
            <div ref={componentPDF}>
                <style>
                    {`
                        @media print {
                            .no-print {
                                display: none;
                            }
                        }
                    `}
                </style>

                <div style={{ textAlign: "left " }}>
                    <span style={{ fontSize: 30 }}>Tổng kho vật liệu chống thấm KTN3</span>
                    <br />
                    <span style={{ fontSize: 15 }}>Địa chỉ: Khu 5 - Tứ Xã - Lâm Thao - Phú Thọ</span>
                    <br />
                    <span style={{ fontSize: 15 }}>Điện thoại: 096868686</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{ fontSize: 15 }}>MST: 8101572275</span>
                    <br />
                    <span style={{ fontSize: 15 }}>Email: chongthamktn3@gmail.com</span>
                    &nbsp;&nbsp;&nbsp;
                    <span style={{ fontSize: 15 }}>Website: chongthamktn3.vn</span>
                </div>

                <br /><br />

                <div style={{ textAlign: "center " }}>
                    <b style={{ fontSize: 25 }}>BÁO CÁO XUẤT HÀNG</b>
                    <br />
                    <p style={{ fontSize: 15 }}>Tháng {date.month() + 1} - năm {date.year()}</p>
                    <br />
                    <DatePicker
                        className="no-print"
                        value={date}
                        onChange={onChange}
                        picker="month"
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                        className="no-print"
                        onClick={() => generatePDF()}
                        danger style={{ height: 50, width: 200 }}
                    >
                        <span style={{ fontSize: 20 }}>Xuất báo cáo &nbsp;</span>
                        <FilePdfTwoTone style={{ fontSize: 30 }} />
                    </Button>
                </div>

                <br /><br />

                <Button
                    className="no-print"
                    type="primary"
                    onClick={() => setIsTableVisible(!isTableVisible)}
                    style={{ marginBottom: 16 }}
                >
                    {isTableVisible ? "Ẩn bảng" : "Hiện bảng"}
                </Button>

                <br /><br />

                {isTableVisible && (
                    <Table
                bordered  columns={columns} dataSource={dataProduct} pagination={false} />
                )}
            </div>
        </>
    );
};

export default ReportMonthPage;
