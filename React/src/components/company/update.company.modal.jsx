import { Input, notification, Modal, Form, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { updateCompanyAPI } from "../../service/company/company.api.service";

const UpdateCompanyModal = (props) => {
    const [form] = Form.useForm(); // Tạo form instance để quản lý form
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadCompany, } = props;


    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                id: dataUpdate.id,
                name: dataUpdate.name,
                description: dataUpdate.description,
                active: dataUpdate.active,
                status: dataUpdate.status

            });
        }
    }, [dataUpdate, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // Lấy dữ liệu từ form và kiểm tra hợp lệ
            const { id, name, description, status, active } = values;

            const res = await updateCompanyAPI(id, name, description, status, active);
            if (res.data) {
                notification.success({
                    message: "Update company",
                    description: "Update thành công",
                });
                resetAndCloseModal();
                await loadCompany();
            } else {
                notification.error({
                    message: "Error update company",
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
            title="Update a Company"
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

                <Form.Item
                    name="active"
                    label="Active"
                >
                    <Switch />
                </Form.Item>


            </Form>
        </Modal>
    );
};

export default UpdateCompanyModal;
