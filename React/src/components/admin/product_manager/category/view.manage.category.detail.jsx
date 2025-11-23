import { Drawer, Descriptions } from "antd";
import { useState } from "react";
import dayjs from "dayjs"; // Import dayjs để định dạng ngày
import { fetchAllProductByCategoryAPI } from "../../../../service/product_manage/product/product_manage.product.api.service";

const ViewCategoryDetail = (props) => {
    const { dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, dataProduct } = props;
    console.log(dataProduct)
    // Hàm định dạng ngày tháng sử dụng dayjs
    const formatDate = (date) => {
        return dayjs(date).format("DD/MM/YYYY HH:mm:ss"); // Format ngày theo định dạng: Ngày/Tháng/Năm Giờ:Phút:Giây
    };

    return (
        <Drawer
            width={"40vw"} // Kích thước Drawer
            title="Chi tiết danh mục"
            onClose={() => {
                setDataDetail(null);  // Xóa dữ liệu khi đóng Drawer
                setIsDetailOpen(false);  // Đóng Drawer
            }}
            open={isDetailOpen} // Mở Drawer nếu isDetailOpen = true
        >
            {dataDetail ? (
                <Descriptions bordered column={1} size="small">
                    <Descriptions.Item label="Id">{dataDetail.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên danh mục">{dataDetail.name}</Descriptions.Item>
                    <Descriptions.Item label="Số lượng">{dataDetail.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Mô tả">{dataDetail.description}</Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">{formatDate(dataDetail.createdAt)}</Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật">{formatDate(dataDetail.updatedAt)}</Descriptions.Item>
                </Descriptions>
            ) : (
                <p>Không có dữ liệu danh mục</p>
            )}
            <br />
            {dataProduct
                ?
                <>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>#</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Id</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Tên sản phẩm</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Số lượng</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Slg đã bán</th>
                                <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataProduct.map((order, index) => (
                                <tr key={order.id}>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.id}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.name}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.quantity}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.quantitySold}</td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.active ? 'YES' : 'NO'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </>
                :
                <>
                    <p>Không có dữ liệu sản phẩm</p>
                </>
            }
        </Drawer>
    );
};

export default ViewCategoryDetail;
