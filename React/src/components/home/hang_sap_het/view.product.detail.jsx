import { Button, Drawer, Descriptions } from "antd";
import dayjs from "dayjs";

const ViewProduct = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen } = props;

    const formatDate = (date) => {
        return dayjs(date).format("DD/MM/YYYY HH:mm:ss"); // Format ngày: Ngày/Tháng/Năm Giờ:Phút:Giây
    };

    return (
        <Drawer
            width={"40vw"}
            title="Chi tiết sản phẩm"
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ? (
                <Descriptions bordered column={1} size="small">
                    <Descriptions.Item label="Id">{dataDetail.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên sản phẩm">{dataDetail.name}</Descriptions.Item>
                    <Descriptions.Item label="Danh mục">{dataDetail.category.name}</Descriptions.Item>
                    <Descriptions.Item label="Công ty">{dataDetail.company.name}</Descriptions.Item>
                    <Descriptions.Item label="Mô tả">{dataDetail.description}</Descriptions.Item>
                    <Descriptions.Item label="Số lượng">{dataDetail.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Kích hoạt">{dataDetail.active ? "YES" : "NO"}</Descriptions.Item>
                    <Descriptions.Item label="Giá nhập gần nhất">{dataDetail.latestImportPrice}</Descriptions.Item>
                    <Descriptions.Item label="Giá bán">{dataDetail.exportPrice}</Descriptions.Item>
                    <Descriptions.Item label="Cảnh báo hết hàng">{dataDetail.numberWarning}</Descriptions.Item>
                    <Descriptions.Item label="Đã bán">{dataDetail.quantitySold}</Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">{formatDate(dataDetail.createdAt)}</Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật">{formatDate(dataDetail.updatedAt)}</Descriptions.Item>
                    <Descriptions.Item label="Người tạo">{dataDetail.createdBy}</Descriptions.Item>
                    <Descriptions.Item label="Người cập nhật">{dataDetail.updatedBy}</Descriptions.Item>
                </Descriptions>
            ) : (
                <p>Không có dữ liệu</p>
            )}
        </Drawer>
    );
};

export default ViewProduct;
