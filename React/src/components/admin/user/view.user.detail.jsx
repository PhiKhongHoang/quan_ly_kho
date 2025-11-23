import { Drawer, Descriptions } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs"; // Import dayjs để định dạng ngày

const ViewUserDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;

    // Hàm định dạng ngày tháng sử dụng dayjs
    const formatDate = (date) => {
        return dayjs(date).format("DD/MM/YYYY HH:mm:ss"); // Định dạng ngày: Ngày/Tháng/Năm Giờ:Phút:Giây
    };

    return (
        <Drawer
            width={"40vw"}
            title="User Detail"
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ? (
                <Descriptions bordered column={1} size="small">
                    <Descriptions.Item label="Id">{dataDetail.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên người dùng">{dataDetail.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataDetail.email}</Descriptions.Item>
                    <Descriptions.Item label="Kích hoạt">{dataDetail.active ? "YES" : "NO"}</Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">{formatDate(dataDetail.createdAt)}</Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật">{formatDate(dataDetail.updatedAt)}</Descriptions.Item>
                </Descriptions>
            ) : (
                <p>Không có dữ liệu</p>
            )}
        </Drawer>
    );
};

export default ViewUserDetail;
