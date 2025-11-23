import { Button, Input, notification, Modal, Select, Form, Space, InputNumber, Row } from "antd";
import { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { createProductAPI } from "../../../../service/product_manage/product/product_manage.product.api.service";


const ProductForm = (props) => {
    const { loadProduct, dataCompanyBuy, dataCategory } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm(); // Khởi tạo form instance

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // Validate toàn bộ form
            const { company: companyId, category: categoryId, products } = values;

            // Gửi API với companyId và productId
            const res = await createProductAPI(categoryId, companyId, products);
            console.log(res)
            if (res.data) {
                notification.success({
                    message: "Tạo sản phẩm",
                    description: "Tạo sản phẩm thành công",
                });
                resetAndCloseModal();
                await loadProduct();
            } else {
                notification.error({
                    message: "Lỗi tạo sản phẩm",
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
        <div className="productDetail-form" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Danh sách chi tiết sản phẩm</h3>
                <Button onClick={() => setIsModalOpen(true)} type="primary">
                    <PlusOutlined /> Tạo mới
                </Button>
            </div>
            <Modal
                title="Tạo mới sản phẩm"
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
                    <Form.List
                        name="products" // Tên danh sách sản phẩm
                        rules={[
                            { required: true, message: "Vui lòng nhập tên sản phẩm!" }
                        ]}
                    >
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <div key={key} style={{ marginBottom: '16px' }}>
                                        {/* Tên sản phẩm */}
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'name']} // Đảm bảo sử dụng tên trường mảng như name, description, ...
                                            fieldKey={[fieldKey, 'name']}
                                            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                                            style={{ marginBottom: '12px' }}
                                        >
                                            <Input placeholder="Tên sản phẩm" style={{ width: '100%' }} />
                                        </Form.Item>

                                        {/* Mô tả */}
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'description']}
                                            fieldKey={[fieldKey, 'description']}
                                            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                                            style={{ marginBottom: '12px' }}
                                        >
                                            <Input.TextArea placeholder="Mô tả sản phẩm" style={{ width: '100%' }} />
                                        </Form.Item>

                                        {/* Giá bán */}
                                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px' }}>
                                            <div style={{ marginBottom: '4px' }}>Giá bán</div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'exportPrice']}
                                                fieldKey={[fieldKey, 'exportPrice']}
                                                rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
                                                style={{ marginBottom: '0' }}
                                            >
                                                <InputNumber
                                                    min={0}
                                                    formatter={value => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/₫\s?|(,*)/g, '')}
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </div>

                                        {/* Cảnh báo số lượng */}
                                        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px' }}>
                                            <div style={{ marginBottom: '4px' }}>Số lượng cảnh báo</div>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'numberWarning']}
                                                fieldKey={[fieldKey, 'numberWarning']}
                                                rules={[{ required: true, message: 'Vui lòng nhập số lượng cảnh báo' }]}
                                                style={{ marginBottom: '0' }}
                                            >
                                                <InputNumber
                                                    min={1}
                                                    max={1000}
                                                    style={{ width: '100%' }}
                                                />
                                            </Form.Item>
                                        </div>

                                        {/* Remove Product Button */}
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </div>
                                ))}

                                {/* Thêm sản phẩm */}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Thêm sản phẩm
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>



                    {/* Chọn công ty */}
                    <Form.Item
                        name="company"
                        label="Công ty"
                        rules={[{ required: true, message: "Vui lòng chọn công ty!" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn công ty"
                            optionFilterProp="label"
                            options={dataCompanyBuy.map((company) => ({
                                value: company.id,
                                label: company.name,
                            }))}
                        />
                    </Form.Item>

                    {/* Chọn danh mục */}
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
                                value: category.id,
                                label: category.name,
                            }))}
                        />
                    </Form.Item>


                </Form>
            </Modal>
        </div>
    );
};

export default ProductForm;
