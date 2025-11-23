import { Input, notification, Modal, Form, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../../service/user/user.api.service";

const UpdateUserModal = (props) => {
    const [form] = Form.useForm(); // Tạo form instance để quản lý form
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser, dataRole } = props;


    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                id: dataUpdate.id,
                name: dataUpdate.name,
                active: dataUpdate.active,
                role: dataUpdate.role?.id,
            });
        }
    }, [dataUpdate, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // Lấy dữ liệu từ form và kiểm tra hợp lệ
            const { id, name, active, role } = values;

            const res = await updateUserAPI(id, name, active, role);
            if (res.data) {
                notification.success({
                    message: "Cập nhật tài khoản",
                    description: "Cập nhật tài khoản thành công",
                });
                resetAndCloseModal();
                await loadUser();
            } else {
                notification.error({
                    message: "Lỗi cập nhật tài khoản",
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
            title="Cập nhật tài khoản"
            open={isModalUpdateOpen}
            onOk={() => handleSubmit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText="LƯU"
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
                    label="Tên tài khoản"
                    rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}
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
                    name="role"
                    label="Vài trò"
                    rules={[{ required: true, message: "Vui lòng chọn một vai trò người dùng!" }]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn vai trò"
                        optionFilterProp="label"
                        options={dataRole.map((role) => ({
                            value: role.id, // Dùng id làm giá trị
                            label: role.name, // Dùng name làm nhãn
                        }))}
                    />
                </Form.Item>


            </Form>
        </Modal>
    );
};

export default UpdateUserModal;
