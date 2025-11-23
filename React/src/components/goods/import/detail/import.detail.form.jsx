import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, notification, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { createImportGoodsDetailAPI } from '../../../../service/goods/import/detail/import.detail.api.service';

const ImportGoodsDetailForm = (props) => {
    let { dataProduct, idImport, openFormDetail, onClose } = props;


    const [form] = Form.useForm(); // Khởi tạo form instance

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // Validate toàn bộ form
            const { importGoodsDetails } = values; // Lấy danh sách chi tiết hàng nhập

            // Kiểm tra xem có sản phẩm trùng nhau không
            const productIds = importGoodsDetails.map(detail => detail.product);
            const hasDuplicateProduct = new Set(productIds).size !== productIds.length;

            if (hasDuplicateProduct) {
                notification.error({
                    message: "Lỗi",
                    description: "Không thể thêm sản phẩm trùng nhau vào đơn hàng!",
                });
                return; // Dừng lại không cho submit
            }

            // Chuẩn bị dữ liệu đúng định dạng
            const data = {
                importGoods: { id: idImport }, // Sử dụng idImport từ props
                importGoodsDetails: importGoodsDetails.map((detail) => ({
                    quantity: detail.quantity,
                    importPrice: detail.importPrice,
                    product: { id: detail.product }, // Chuyển product ID thành object { id: ... }
                })),
            };

            // Gửi API với dữ liệu đã chuẩn bị
            const res = await createImportGoodsDetailAPI(data.importGoods.id, data.importGoodsDetails);

            if (res.data) {
                notification.success({
                    message: "Tạo chi tiết đơn nhập hàng",
                    description: "Tạo chi tiết đơn nhập hàng thành công",
                });
                form.resetFields();
                onClose();
            } else {
                notification.error({
                    message: "Lỗi tạo chi tiết đơn nhập hàng",
                    description: JSON.stringify(res.message),
                });
            }
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };


    const handleCancel = () => {
        form.resetFields();
        onClose(); // Gọi hàm đóng modal từ cha
    };

    return (
        <Modal
            title="Tạo chi tiết đơn nhập hàng"
            open={openFormDetail}
            onOk={handleSubmit}
            onCancel={handleCancel}
            maskClosable={false}
        >
            <Form
                form={form}
                layout="vertical"
                style={{ display: "flex", flexDirection: "column" }}
            >
                {/* Import Goods */}
                <Form.Item
                    label="ID Import Goods"
                >
                    <Input disabled value={idImport} />
                </Form.Item>

                {/* Dynamic Details */}
                <Form.List
                    name="importGoodsDetails"
                    rules={[
                        { required: true, message: "Vui lòng nhập sản phẩm!" }
                    ]}
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <div key={key}>
                                    <div style={{ width: "100%" }}>
                                        <Form.Item
                                            name={[name, "product"]}
                                            label="Sản phẩm"
                                            rules={[{ required: true, message: "Vui lòng chọn sản phẩm!" }]}
                                        >
                                            <Select
                                                showSearch
                                                placeholder="Chọn sản phẩm"
                                                optionFilterProp="label"
                                                options={dataProduct.map((product) => ({
                                                    value: product.id, // Dùng id làm giá trị
                                                    label: product.name, // Dùng name làm nhãn
                                                }))}
                                            />
                                        </Form.Item>

                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px' }}>
                                        <div style={{ marginBottom: '4px' }}>Số lượng</div>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "quantity"]}
                                            fieldKey={[fieldKey, "quantity"]}
                                            rules={[{ required: true, message: "Số lượng là bắt buộc!" }]}
                                        >
                                            <InputNumber placeholder="Số lượng" min={1} style={{ width: "50%" }} />
                                        </Form.Item>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px' }}>
                                        <div style={{ marginBottom: '4px' }}>Giá nhập</div>
                                        <Form.Item
                                            {...restField}
                                            name={[name, "importPrice"]}
                                            fieldKey={[fieldKey, "importPrice"]}
                                            rules={[{ required: true, message: "Giá nhập là bắt buộc!" }]}
                                        >
                                            <InputNumber
                                                min={0}
                                                formatter={value => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/₫\s?|(,*)/g, '')}
                                                style={{ width: '100%' }}
                                            />
                                        </Form.Item>
                                    </div>


                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </div>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                    style={{ width: "100%" }}
                                >
                                    Thêm sản phẩm
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default ImportGoodsDetailForm;
