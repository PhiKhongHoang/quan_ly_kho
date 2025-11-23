import { Button, Input, notification, Modal, Select, Form } from "antd";
import { useContext, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { createCompanyAPI } from "../../service/company/company.api.service";
import { AuthContext } from "../context/auth.context";

const CompanyForm = (props) => {
    const { loadCompany, dataRole, } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm(); // Khởi tạo form instance

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // Validate toàn bộ form
            const { name, description, status } = values;

            // Gửi API với roleId
            const res = await createCompanyAPI(name, description, status);

            if (res.data) {
                notification.success({
                    message: "Tạo mới công ty",
                    description: "Tạo công ty thành công",
                });
                resetAndCloseModal();
                await loadCompany();
            } else {
                notification.error({
                    message: "Lỗi tạo mới công ty",
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

    // Hàm kiểm tra quyền
    const { user } = useContext(AuthContext);

    const checkPermission = (requiredModule) => {
        if (!user || !user.role || !user.role.permissions) return false;
        return user.role.permissions.some(permission => permission.module === requiredModule);
    };


    return (
        <div className="company-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3> Danh sách công ty</h3>

                {checkPermission("USERS") && (
                    <Button onClick={() => setIsModalOpen(true)} type="primary">
                        <PlusOutlined />Tạo mới
                    </Button>
                )}

            </div>
            <Modal
                title="Tạo mới công ty"
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
                        label="Tên công ty"
                        rules={[{ required: true, message: "Vui lòng nhập tên công ty!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Địa chỉ"
                        rules={[
                            { required: true, message: "Vui lòng nhập mô tả!" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: "Vui lòng chọn status!" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Select status"
                            optionFilterProp="label"
                            options={[
                                { value: "BUY", label: "BUY" },
                                { value: "SELL", label: "SELL" },
                            ]}
                        />
                    </Form.Item>


                </Form>
            </Modal>
        </div>
    );
};

export default CompanyForm;
