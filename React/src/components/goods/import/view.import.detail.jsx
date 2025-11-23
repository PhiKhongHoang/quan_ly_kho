import { FilePdfOutlined, FilePdfTwoTone } from "@ant-design/icons";
import { Button, Drawer, notification, Row, Col } from "antd";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { AuthContext } from "../../context/auth.context";
import { fetchUserByEmailAPI } from "../../../service/user/user.api.service";

const ViewImportGoodsDetail = (props) => {
    const { user } = useContext(AuthContext);
    const { dataDetailImport, setDataDetailImport, isDetailOpen, setIsDetailOpen, company } = props;
    const [name, setName] = useState("")

    // ****** pdf *****
    const componentPDF = useRef();

    const generatePDF = useReactToPrint({
        contentRef: componentPDF,
        documentTitle: "Hóa đơn nhập hàng",
    });
    // ***************

    // Tính tổng tiền
    const totalAmount = dataDetailImport.reduce((total, order) => total + order.totalAmount, 0);

    useEffect(() => {
        loadUser(dataDetailImport[0]?.createdBy);
    }, [dataDetailImport[0]?.createdBy]);

    const loadUser = async (email) => {
        const res = await fetchUserByEmailAPI(email)

        setName(res.data.name)
    }

    return (
        <>

            <Drawer
                width={"40vw"}
                title="Chi tiết hóa đơn"
                onClose={() => {
                    setIsDetailOpen(false)
                }}
                open={isDetailOpen}
            >
                {dataDetailImport
                    ?
                    <div
                        ref={componentPDF} // truyền ref xuất pdf
                        style={{ width: "100%" }}
                    >
                        <div style={{ textAlign: "left ", }} >
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

                        <div style={{ textAlign: "center ", }}>
                            <b style={{ fontSize: 25 }}>HÓA ĐƠN NHẬP HÀNG</b>
                        </div>

                        <br /><br />

                        <div>
                            <span>Nhà cung cấp: Công ty {company} </span>
                        </div>

                        <br /><br />

                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>#</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Tên sản phẩm</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Số lượng</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Giá 1 sản phẩm</th>
                                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataDetailImport.map((order, index) => (
                                    <tr key={order.id}>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{index + 1}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.product.name}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.quantity}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.importPrice}</td>
                                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{order.totalAmount}</td>
                                    </tr>
                                ))}

                                <tr>
                                    <td colSpan={4} style={{ textAlign: "right", border: "1px solid #ddd", padding: "8px", fontWeight: "bold" }}>
                                        Tổng cộng
                                    </td>
                                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                        {totalAmount.toLocaleString()} đ
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <br /><br />

                        <div style={{ marginRight: 50, }}>
                            <div style={{ textAlign: "right" }}>
                                <span>Ngày ................ tháng ................ năm ...............</span>
                            </div>
                            <Row style={{ marginTop: 20 }}>
                                <Col span={8}>
                                    {dataDetailImport[0]?.createdBy
                                        ?
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nhân viên lập hóa đơn</span>
                                        :
                                        ""
                                    }
                                </Col>
                                <Col span={8}></Col>
                                <Col span={8}>Nhân viên xuất hóa đơn</Col>
                            </Row>
                            <Row style={{ marginTop: 100, textAlign: "center" }}>
                                <Col span={8}>
                                    {dataDetailImport[0]?.createdBy
                                        ?
                                        <>
                                            <span>{name}</span>
                                        </>
                                        :
                                        ""
                                    }
                                </Col>
                                <Col span={8}></Col>
                                <Col span={6}>{user.name}</Col>
                            </Row>

                        </div>
                    </div >
                    :
                    <p>Không có dữ liệu</p>
                }


                <br /><br />

                <Button
                    onClick={() => generatePDF()}
                    danger style={{ height: 50, width: 150 }}
                >
                    <span style={{ fontSize: 20 }}>Xuất file &nbsp;</span>
                    <FilePdfTwoTone style={{ fontSize: 30 }} />
                </Button>

            </Drawer>
        </>
    );
}

export default ViewImportGoodsDetail;
