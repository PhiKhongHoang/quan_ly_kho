import { Button, Input, notification, Modal, Select, Form, Switch, Col, Row, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { createRoleAPI, updateRoleAPI } from "../../../service/role/role.api.service";
import { PlusOutlined } from "@ant-design/icons";

const UpdateRoleModal = (props) => {
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadRole, dataPermission } = props;
    const [form] = Form.useForm(); // Khởi tạo form instance
    console.log(dataUpdate)
    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                id: dataUpdate.id,
                name: dataUpdate.name,
                description: dataUpdate.description,
                active: dataUpdate.active,
                // permissions: dataUpdate.permissions.map(id => ({ id }))
                permissions: dataUpdate.permissions.map(permission => permission.id),
            });
        }
    }, [dataUpdate, form]);

    const handleSubmit = async () => {

        try {

            const values = await form.validateFields(); // Validate toàn bộ form
            const { id, name, description, active, permissions: permissionsIds } = values;

            // Gửi API với dữ liệu role, sử dụng permissionsIds (mảng các ID)
            const res = await updateRoleAPI(id, name, description, active, permissionsIds);



            if (res.data) {
                notification.success({
                    message: "Cập nhật trò người dùng",
                    description: "Cập nhật vai trò người dùng thành công",
                });
                resetAndCloseModal();
                await loadRole();
            } else {
                notification.error({
                    message: "Lỗi Cập nhật vai trò người dùng",
                    description: JSON.stringify(res.message),
                });
            }
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        form.resetFields(); // Reset toàn bộ form
        setDataUpdate(null);
    };

    return (
        <Modal
            title="Cập nhật vai trò người dùng"
            open={isModalUpdateOpen}
            onOk={() => handleSubmit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText="Lưu"
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

                <Row gutter={16}>  {/* Gutter thêm khoảng cách giữa các cột */}
                    <Col span={17}>  {/* 70% chiều rộng */}
                        <Form.Item
                            name="name"
                            label="Tên vai trò"
                            rules={[{ required: true, message: "Vui lòng nhập tên vai trò!" }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item
                            name="active"
                            label="Active"
                            initialValue={true} // Mặc định là active (true)
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[
                        { required: true, message: "Vui lòng nhập mô tả!" },
                    ]}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    name="permissions"
                    label="Quyền hạn"
                    rules={[{ required: true, message: "Vui lòng chọn quyền hạn!" }]}
                >
                    <Checkbox.Group>
                        {Object.entries(
                            dataPermission.reduce((groups, permission) => {
                                const { module } = permission;
                                if (!groups[module]) {
                                    groups[module] = [];
                                }
                                groups[module].push(permission);
                                return groups;
                            }, {})
                        ).map(([module, permissions]) => (
                            <div key={module} style={{ marginBottom: "20px" }}>
                                <h4>{module}</h4>
                                <Row>
                                    {permissions.map((permission) => (
                                        <Col span={8} key={permission.id}>
                                            <Checkbox value={permission.id}>{permission.name}</Checkbox>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ))}
                    </Checkbox.Group>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default UpdateRoleModal;
