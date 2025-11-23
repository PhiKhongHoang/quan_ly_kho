import { Button, Input, notification, Modal, Select, Form } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { createExportGoodsAPI } from "../../../service/goods/export/export.api.service";
import ExportGoodsDetailForm from "./detail/export.detail.form";


const ExportGoodsForm = (props) => {
    const { dataProduct, loadExportGoods, dataCompanySellForm, loadProduct } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openFormDetail, setOpenFormDetail] = useState(false);
    const [idExport, setIdExport] = useState();
    const [form] = Form.useForm(); // Khởi tạo form instance

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // Validate toàn bộ form
            const { description, company: companyId } = values;

            // Gửi API với companyId
            const res = await createExportGoodsAPI(description, companyId);

            if (res.data) {
                notification.success({
                    message: "Tạo đơn hàng",
                    description: "Tạo đơn hàng thành công",
                });
                resetAndCloseModal();
                setIdExport(res.data.id)
                showModalDetail();
                await loadExportGoods();
            } else {
                notification.error({
                    message: "Lỗi tạo đơn hàng mới",
                    description: JSON.stringify(res.message),
                });
            }
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

    const resetAndCloseModal = () => {
        form.resetFields(); // Reset toàn bộ form
        setIsModalOpen(false);
    };

    const showModalDetail = () => {
        setOpenFormDetail(true);
    };

    const closeModalDetail = () => {
        setOpenFormDetail(false);
    };

    return (
        <>
            <div className="exportGoods-form" style={{ margin: "10px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Danh sách xuất hàng</h3>
                    <Button onClick={() => setIsModalOpen(true)} type="primary">
                        <PlusOutlined /> Tạo mới
                    </Button>
                </div>
                <Modal
                    title="Tạo mới đơn hàng"
                    open={isModalOpen}
                    onOk={handleSubmit}
                    onCancel={resetAndCloseModal}
                    maskClosable={false}
                    okText="Tạo mới"
                >
                    <Form
                        form={form}
                        layout="vertical"
                        style={{ display: "flex", flexDirection: "column" }}
                    >

                        <Form.Item
                            name="description"
                            label="Mô tả"
                            rules={[
                                { required: true, message: "Please input your description!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>


                        <Form.Item
                            name="company"
                            label="Công ty"
                            rules={[{ required: true, message: "Please select a company!" }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn công ty"
                                optionFilterProp="label"
                                options={(dataCompanySellForm || []).map((company) => ({
                                    value: company.id,
                                    label: company.name,
                                }))}
                            />
                        </Form.Item>


                    </Form>
                </Modal>
            </div>

            <ExportGoodsDetailForm
                dataProduct={dataProduct}
                loadProduct={loadProduct}
                idExport={idExport}
                openFormDetail={openFormDetail}
                onClose={closeModalDetail}
            />
        </>
    );
};

export default ExportGoodsForm;
