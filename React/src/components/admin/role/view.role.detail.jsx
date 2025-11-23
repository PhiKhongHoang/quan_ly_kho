import { Drawer, Descriptions, Table } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs"; // Import dayjs để định dạng ngày tháng

const ViewRoleDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;

    // Hàm định dạng ngày tháng sử dụng dayjs
    const formatDate = (date) => {
        return dayjs(date).format("DD/MM/YYYY HH:mm:ss"); // Định dạng ngày: Ngày/Tháng/Năm Giờ:Phút:Giây
    };

    // Cấu trúc dữ liệu cho bảng permissions
    const columns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Permission Name",
            dataIndex: "name",
            key: "name",
        },
    ];

    return (
        <Drawer
            width={"40vw"}
            title="Role Detail"
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ? (
                <>
                    <Descriptions bordered column={1} size="small">
                        <Descriptions.Item label="Id">{dataDetail.id}</Descriptions.Item>
                        <Descriptions.Item label="Tên vai trò">{dataDetail.name}</Descriptions.Item>
                        <Descriptions.Item label="Mô tả">{dataDetail.description}</Descriptions.Item>
                        <Descriptions.Item label="Kích hoạt">{dataDetail.active ? "YES" : "NO"}</Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">{formatDate(dataDetail.createdAt)}</Descriptions.Item>
                        <Descriptions.Item label="Ngày cập nhật">{formatDate(dataDetail.updatedAt)}</Descriptions.Item>
                    </Descriptions>

                    <div style={{ marginTop: 20 }}>
                        <span style={{ fontWeight: "bold" }}>Permissions:</span>
                        <Table
                bordered 
                            columns={columns}
                            dataSource={dataDetail.permissions}
                            rowKey="id"
                            pagination={false} // Tắt phân trang nếu không cần thiết
                            size="small"
                            style={{ marginTop: 10 }}
                        />
                    </div>
                </>
            ) : (
                <p>Không có dữ liệu</p>
            )}
        </Drawer>
    );
};

export default ViewRoleDetail;
