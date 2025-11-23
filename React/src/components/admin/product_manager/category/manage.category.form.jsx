import { Button, Input, notification, Modal, Select, Form } from "antd";
import { useState } from "react";
import { createCategoryAPI } from '../../../../service/product_manage/category/product_manage.category.api.service';
import { PlusOutlined } from "@ant-design/icons";

const CategoryForm = (props) => {
    const { loadCategory, dataRole, } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm(); // Khởi tạo form instance

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // Validate toàn bộ form
            const { name, description } = values;

            // Gửi API với roleId
            const res = await createCategoryAPI(name, description);

            if (res.data) {
                notification.success({
                    message: "Create category",
                    description: "Tạo category thành công",
                });
                resetAndCloseModal();
                await loadCategory();
            } else {
                notification.error({
                    message: "Error create category",
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

    return (
        <div className="category-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Danh sách danh mục</h3>
                <Button onClick={() => setIsModalOpen(true)} type="primary">
                    <PlusOutlined /> Tạo mới
                </Button>
            </div>
            <Modal
                title="Tạo mới danh mục"
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
                        name="name"
                        label="Tên danh mục"
                        rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[
                            { required: true, message: "Vui lòng nhập mô tả!" },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>



                </Form>
            </Modal>
        </div>
    );
};

export default CategoryForm;
