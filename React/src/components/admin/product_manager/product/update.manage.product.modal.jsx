import { Input, notification, Modal, Form, Select, Switch, InputNumber } from "antd";
import { useEffect, useState } from "react";
import { updateProductAPI } from "../../../../service/product_manage/product/product_manage.product.api.service";


const UpdateProductModal = (props) => {
    const [form] = Form.useForm(); // Tạo form instance để quản lý form
    const {
        isModalUpdateOpen, setIsModalUpdateOpen,
        dataUpdate, setDataUpdate,
        loadProduct,
        dataCompanyBuy, setDataCompanyBuy,
        dataCategory, setDataCategory,
    } = props;


    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                id: dataUpdate.id,
                name: dataUpdate.name,
                description: dataUpdate.description,
                active: dataUpdate.active,
                company: dataUpdate.company?.id,
                category: dataUpdate.category?.id,
                exportPrice: dataUpdate.exportPrice,
                numberWarning: dataUpdate.numberWarning,

            });
        }
    }, [dataUpdate, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // Lấy dữ liệu từ form và kiểm tra hợp lệ
            const { id, name, description, active, company, category, exportPrice, numberWarning } = values;

            const res = await updateProductAPI(id, name, description, active, company, category, exportPrice, numberWarning);
            if (res.data) {
                notification.success({
                    message: "Update productDetail",
                    description: "Update thành công",
                });
                resetAndCloseModal();
                await loadProduct();
            } else {
                notification.error({
                    message: "Error update productDetail",
                    description: JSON.stringify(res.message),
                });
            }

        } catch (error) {
            console.error("Validation Failed:", error);

        }
    };

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        form.resetFields(); // Reset form
        setDataUpdate(null);
    };

    return (
        <Modal
            title="Update a Product"
            open={isModalUpdateOpen}
            onOk={() => handleSubmit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText="SAVE"
        >
            <Form
                form={form}
                layout="vertical"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <Form.Item
                    name="id"
                    label="Id"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="active"
                    label="Active"
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    name="company"
                    label="Công ty"
                    rules={[{ required: true, message: "Vui lòng chọn công ty!" }]}
                >
                    <Select
                        showSearch
                        placeholder="Select company"
                        optionFilterProp="label"
                        options={dataCompanyBuy.map((company) => ({
                            value: company.id, // Dùng id làm giá trị
                            label: company.name, // Dùng name làm nhãn
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    name="category"
                    label="Danh mục"
                    rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn danh mục"
                        optionFilterProp="label"
                        options={dataCategory.map((category) => ({
                            value: category.id, // Dùng id làm giá trị
                            label: category.name, // Dùng name làm nhãn
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    name="exportPrice"
                    label="Giá bán"
                    rules={[
                        { required: true, message: "Vui lòng nhập giá!" },
                    ]}
                >
                    <InputNumber
                        min={0} // Không cho phép giá trị âm
                        formatter={value => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} // Định dạng số
                        parser={value => value.replace(/₫\s?|(,*)/g, '')} // Loại bỏ định dạng khi nhập
                        style={{ width: '100%' }} // Đảm bảo khớp giao diện với các trường khác
                    />
                </Form.Item>

                <Form.Item
                    name="numberWarning"
                    label="Cảnh báo số lượng"
                >
                    <InputNumber
                        min={1} // Bắt đầu từ 1
                        max={1000} // Giới hạn tối đa nếu cần
                        style={{ width: '100%' }}
                    />
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default UpdateProductModal;
