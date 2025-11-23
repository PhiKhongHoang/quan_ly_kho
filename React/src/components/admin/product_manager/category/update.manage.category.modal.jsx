import { Input, notification, Modal, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { updateCategoryAPI } from "../../../../service/product_manage/category/product_manage.category.api.service";

const UpdateCategoryModal = (props) => {
    const [form] = Form.useForm(); // Tạo form instance để quản lý form
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadCategory, } = props;


    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                id: dataUpdate.id,
                name: dataUpdate.name,
                description: dataUpdate.description,

            });
        }
    }, [dataUpdate, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // Lấy dữ liệu từ form và kiểm tra hợp lệ
            const { id, name, description } = values;

            const res = await updateCategoryAPI(id, name, description);
            if (res.data) {
                notification.success({
                    message: "Update category",
                    description: "Update thành công",
                });
                resetAndCloseModal();
                await loadCategory();
            } else {
                notification.error({
                    message: "Error update category",
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
            title="Update a Category"
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
                    rules={[{ required: true, message: "Id is required!" }]}  // Nếu muốn kiểm tra thì có thể bỏ qua rule này
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Please input your name!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="description"
                    rules={[{ required: true, message: "Please select a description!" }]}
                >
                    <Input />
                </Form.Item>



            </Form>
        </Modal>
    );
};

export default UpdateCategoryModal;
