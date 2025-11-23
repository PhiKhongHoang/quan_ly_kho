import { Button, Input, notification, Modal, Select, Form } from "antd";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { createUserAPI } from "../../../service/user/user.api.service";

const UserForm = (props) => {
    const { loadUser, dataRole, } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm(); // Khởi tạo form instance

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // Validate toàn bộ form
            const { name, email, password, role: roleId } = values;

            // Gửi API với roleId
            const res = await createUserAPI(name, email, password, roleId);

            if (res.data) {
                notification.success({
                    message: "Tạo tài khoản",
                    description: "Tạo tài khoản thành công",
                });
                resetAndCloseModal();
                await loadUser();
            } else {
                notification.error({
                    message: "Lỗi tạo tài khoản",
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
        <div className="user-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Danh sách người dùng</h3>
                <Button onClick={() => setIsModalOpen(true)} type="primary">
                    <PlusOutlined /> Tạo mới
                </Button>
            </div>
            <Modal
                title="Tạo tài khoản"
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={resetAndCloseModal}
                maskClosable={false}
                okText="Create"
            >
                <Form
                    form={form}
                    layout="vertical"
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <Form.Item
                        name="name"
                        label="Tên tài khoản"
                        rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Vui lòng nhập email!" },
                            { type: "email", message: "Không đúng định dạng email!" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        label="Vai trò"
                        rules={[{ required: true, message: "Vui lòng chọn vai trò người dùng!" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn vai trò người dùng"
                            optionFilterProp="label"
                            options={dataRole.map((role) => ({
                                value: role.id, // Dùng id làm giá trị
                                label: role.name, // Dùng name làm nhãn
                            }))}
                        />
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    );
};

export default UserForm;
