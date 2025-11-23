import { Button, Input, notification, Modal, Select, Form, Switch, Col, Row, Checkbox } from "antd";
import { useState } from "react";
import { createRoleAPI } from "../../../service/role/role.api.service";
import { PlusOutlined } from "@ant-design/icons";

const RoleForm = (props) => {
    const { loadRole, dataPermission } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm(); // Khởi tạo form instance


    const handleSubmit = async () => {

        try {

            const values = await form.validateFields(); // Validate toàn bộ form
            const { name, description, active, permissions: permissionsIds } = values;

            // Gửi API với dữ liệu role, sử dụng permissionsIds (mảng các ID)
            const res = await createRoleAPI(name, description, active, permissionsIds);



            if (res.data) {
                notification.success({
                    message: "Tạo vai trò người dùng",
                    description: "Tạo vai trò người dùng thành công",
                });
                resetAndCloseModal();
                await loadRole();
            } else {
                notification.error({
                    message: "Lỗi tạo vai trò người dùng",
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
        <div className="role-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Danh sách vai trò</h3>
                <Button onClick={() => setIsModalOpen(true)} type="primary">
                    <PlusOutlined /> Tạo mới
                </Button>
            </div>
            <Modal
                title="Tạo vai trò người dùng"
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
        </div>
    );
};

export default RoleForm;
