import { Button, Input, notification, Modal, Select, Form } from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { createImportGoodsAPI } from "../../../service/goods/import/import.api.service";
import ImportGoodsDetailForm from "./detail/import.detail.form";
import { fetchAllProductByImportGoodsAPI } from "../../../service/product_manage/product/product_manage.product.api.service";


const ImportGoodsForm = (props) => {
    const { loadImportGoods, dataCompanyBuyForm, } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openFormDetail, setOpenFormDetail] = useState(false);
    const [idImport, setIdImport] = useState(-1);
    const [dataProduct, setDataProduct] = useState([])

    const [form] = Form.useForm(); // Khởi tạo form instance

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // Validate toàn bộ form
            const { description, company: companyId } = values;

            // Gửi API với companyId
            const res = await createImportGoodsAPI(description, companyId);

            if (res.data) {
                notification.success({
                    message: "Create importGoods",
                    description: "Tạo importGoods thành công",
                });
                resetAndCloseModal();
                setIdImport(res.data.id)
                showModalDetail();
                await loadImportGoods();
            } else {
                notification.error({
                    message: "Error create importGoods",
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

    useEffect(() => {
        if (idImport > 0)
            loadProduct(idImport);
    }, [idImport]);

    const loadProduct = async (idImport) => {
        const res = await fetchAllProductByImportGoodsAPI(idImport)
        setDataProduct(res.data)
    }


    return (
        <>
            <div className="importGoods-form" style={{ margin: "10px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Danh sách nhập hàng</h3>
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
                            rules={[{ required: true, message: "Vui lòng chọn công ty!" }]}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn công ty"
                                optionFilterProp="label"
                                options={(dataCompanyBuyForm || []).map((company) => ({
                                    value: company.id,
                                    label: company.name,
                                }))}
                            />
                        </Form.Item>


                    </Form>
                </Modal>
            </div>

            <ImportGoodsDetailForm
                dataProduct={dataProduct}
                idImport={idImport}
                openFormDetail={openFormDetail}
                onClose={closeModalDetail}
            />
        </>
    );
};

export default ImportGoodsForm;
