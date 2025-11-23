import { Button, Drawer, notification } from "antd";
import { useEffect, useState } from "react";

const ViewCompanyDetail = (props) => {
    const { dataDetailCompany, dataDetail, setDataDetail, isDetailOpen, setIsDetailOpen, } = props;



    return (
        <>

            <Drawer
                width={"40vw"}
                title="Danh sách sản phẩm"
                onClose={() => {
                    setDataDetail(null)
                    setIsDetailOpen(false)
                }}
                open={isDetailOpen}>
                {dataDetailCompany
                    ?
                    <>
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>#</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Tên sản phẩm</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataDetailCompany.map((order, index) => (
                                    <tr key={order.id}>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.product.name}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </>
                    :
                    <>
                        <p>Không có dữ liệu</p>
                    </>
                }
            </Drawer>
        </>
    )
}

export default ViewCompanyDetail;