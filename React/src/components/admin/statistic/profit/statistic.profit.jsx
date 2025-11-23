import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import { FetchProfitMonth, FetchProfitYear } from "../../../../service/goods/export/detail/export.detail.api.service";
import { format, startOfMonth } from "date-fns";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const ProfitPage = () => {

    const [data, setData] = useState([]);
    const [day, setDay] = useState(startOfMonth(new Date()));
    const [totalProfitMonth, setTotalProfitMonth] = useState(0);


    const fetchChartData = async () => {
        try {
            const formattedDate = format(day, "yyyy-MM-dd");

            // Gọi hàm FetchProfitMonth thay vì fetch
            const response = await FetchProfitMonth(formattedDate); // Truyền startDate vào đây
            const result = response.data; // Axios sẽ trả về dữ liệu trong response.data

            // Kiểm tra nếu API trả về thành công
            if (result) {
                // Chuyển đổi `data` từ object thành array
                const formattedData = Object.entries(result).map(([date, value]) => ({
                    date,
                    value,
                }));

                // Tính tổng lợi nhuận
                setTotalProfitMonth((formattedData.reduce((acc, item) => acc + item.value, 0)).toLocaleString('vi', { style: 'currency', currency: 'VND' }));

                // setData(formattedData);
                setData(formattedData.reverse()); // đảo ngược mảng ( ngày 1 - 30)
            } else {
                console.error("API Error:", result.error || "Unknown error");
            }
        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    };

    useEffect(() => {
        fetchChartData();
    }, [day]);


    const config = {
        data,
        height: 400,
        xField: "date",
        yField: "value",
        smooth: true, // Làm mượt đường biểu đồ
    };

    const onChange = (date, dateString) => {
        if (date) {
            // Tạo ngày đầu tiên của tháng được chọn
            const firstDayOfMonth = new Date(date.year(), date.month(), 1);
            setDay(firstDayOfMonth);
        }
    };

    // *********************************************************************
    const [dataYear, setDataYear] = useState([]);
    const [year, setYear] = useState(dayjs().year());
    const [totalProfitYear, setTotalProfitYear] = useState(0);


    const fetchChartDataYear = async () => {
        try {
            const response = await FetchProfitYear(year);
            const result = response.data; // Axios sẽ trả về dữ liệu trong response.data

            // Kiểm tra nếu API trả về thành công
            if (result) {
                // Chuyển đổi `data` từ object thành array
                const formattedData = Object.entries(result).map(([date, value]) => ({
                    date,
                    value,
                }));

                // Tính tổng lợi nhuận
                setTotalProfitYear((formattedData.reduce((acc, item) => acc + item.value, 0)).toLocaleString('vi', { style: 'currency', currency: 'VND' }));

                // setDataYear(formattedData);
                setDataYear(formattedData); // đảo ngược mảng ( ngày 1 - 30)
            } else {
                console.error("API Error:", result.error || "Unknown error");
            }
        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    };

    useEffect(() => {
        fetchChartDataYear();
    }, [year]);


    const configYear = {
        data: dataYear,
        height: 400,
        xField: "date",
        yField: "value",
        smooth: true, // Làm mượt đường biểu đồ
    };

    const onChangeYear = (date, dateString) => {
        if (date) {
            setYear(date.year());
        }
    };

    return (
        <>
            <Line {...config} />
            <br /><br />
            <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 30 }}>
                    {`Lợi nhuận tháng `}
                </span>
                <DatePicker
                    onChange={onChange}
                    picker="month"
                    defaultValue={dayjs()}
                />
                <span style={{ fontSize: 30 }}> &nbsp; {totalProfitMonth} </span>
            </div>


            <div style={{ backgroundColor: "#ccc", height: 40, marginTop: 20, marginBlock: 20 }}></div>

            <Line {...configYear} />
            <br /><br />
            <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 30 }}>
                    {`Lợi nhuận năm `}
                </span>
                <DatePicker
                    onChange={onChangeYear}
                    picker="year"
                    defaultValue={dayjs()}
                />
                <span style={{ fontSize: 30 }}> &nbsp; {totalProfitYear} </span>
            </div>
        </>
    );
};

export default ProfitPage;
