import { DatePicker, Empty, } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FetchProductDay, FetchProductMonth } from "../../../../service/goods/export/detail/export.detail.api.service";
import { format } from "date-fns";
import { Column } from "@ant-design/plots";

function ProductPage() {

    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(dayjs()); // Ngày mặc định là ngày hiện tại

    const [dataMonth, setDataMonth] = useState([]);
    const [selectedDateMonth, setSelectedDateMonth] = useState(dayjs()); // Ngày mặc định là ngày hiện tại

    const fetchChartData = async () => {
        try {
            const formattedDate = format(selectedDate, "yyyy-MM-dd");

            // Gọi hàm FetchProfitMonth thay vì fetch
            const response = await FetchProductDay(formattedDate); // Truyền startDate vào đây
            const result = response.data; // Axios sẽ trả về dữ liệu trong response.data

            // Kiểm tra nếu API trả về thành công
            if (result) {
                // Chuyển đổi dữ liệu
                const formattedData = result.map(item => ({
                    type: item.productName, // Lấy productName làm type
                    value: item.profit // Lấy totalAmount làm value
                }));

                setData(formattedData);
            } else {
                console.error("API Error:", result.error || "Unknown error");
            }
        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    };

    const config = {
        data: data,
        xField: "type",
        yField: "value",
        axis: {
            x: null
        },
    };

    useEffect(() => {
        fetchChartData();
    }, [selectedDate]);

    const onChange = (date, dateString) => {
        setSelectedDate(date);
    };


    // **************************************
    const fetchChartDataMonth = async () => {
        try {
            const year = selectedDateMonth.year(); // Lấy năm
            const month = selectedDateMonth.month() + 1; // Lấy tháng (từ 0-11, nên +1 để thành 1-12)

            // Gọi hàm FetchProfitMonth thay vì fetch
            const response = await FetchProductMonth(month, year); // Truyền startDate vào đây
            const result = response.data; // Axios sẽ trả về dữ liệu trong response.dataMonth

            // Kiểm tra nếu API trả về thành công
            if (result) {
                // Chuyển đổi dữ liệu
                const formattedData = result.map(item => ({
                    type: item.productName, // Lấy productName làm type
                    value: item.profit // Lấy totalAmount làm value
                }));

                setDataMonth(formattedData);
            } else {
                console.error("API Error:", result.error || "Unknown error");
            }
        } catch (error) {
            console.error("Error fetching chart dataMonth:", error);
        }
    };

    const configMonth = {
        data: dataMonth,
        xField: "type",
        yField: "value",
        axis: {
            x: null
        },
    };

    useEffect(() => {
        fetchChartDataMonth();
    }, [selectedDateMonth]);

    const onChangeMonth = (date, dateString) => {
        setSelectedDateMonth(date);
    };

    return (
        <>

            <div>
                {data.length > 0
                    ?
                    <Column {...config} />
                    :
                    <>
                        <Empty style={{ marginBottom: 50 }} />
                    </>
                }

                <br />
                <div style={{ textAlign: "center" }}>
                    <span style={{ fontSize: 30 }}>Lợi nhuận từng sản phẩm ngày </span>
                    <DatePicker
                        style={{ height: 50 }}
                        value={selectedDate}
                        format="YYYY-MM-DD"
                        onChange={onChange}
                    />
                </div>
            </div>

            <div style={{ backgroundColor: "#ccc", height: 40, marginTop: 10, marginBlock: 10 }}></div>

            <div>
                {dataMonth.length > 0
                    ?
                    <Column {...configMonth} />
                    :
                    <>
                        <Empty style={{ marginBottom: 50 }} />;
                    </>
                }

                <br />
                <div style={{ textAlign: "center" }}>
                    <span style={{ fontSize: 30 }}>Lợi nhuận từng sản phẩm tháng </span>
                    <DatePicker
                        onChange={onChangeMonth}
                        picker="month"
                        value={selectedDateMonth}
                    />
                </div>
            </div>
        </>
    );
}

export default ProductPage;
