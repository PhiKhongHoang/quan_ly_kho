import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, Modal, notification, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { createExportGoodsDetailAPI } from '../../../../service/goods/export/detail/export.detail.api.service';
import { max } from 'date-fns';

const ExportGoodsDetailForm = (props) => {
    let { dataProduct, idExport, openFormDetail, onClose, loadProduct } = props;
    const [chooseProduct, setChooseProduct] = useState(null);

    const [form] = Form.useForm(); // Khởi tạo form instance

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields(); // Validate toàn bộ form
            const { exportGoodsDetails } = values; // Lấy danh sách chi tiết hàng nhập

            // Kiểm tra xem có sản phẩm trùng nhau không
            const productIds = exportGoodsDetails.map(detail => detail.product);
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
                exportGoods: { id: idExport },
                exportGoodsDetails: exportGoodsDetails.map((detail) => ({
                    quantity: detail.quantity,
                    exportPrice: detail.exportPrice,
                    product: { id: detail.product },
                })),
            };

            console.log(data)

            // Gửi API với dữ liệu đã chuẩn bị
            const res = await createExportGoodsDetailAPI(data.exportGoods.id, data.exportGoodsDetails);

            if (res.data) {
                notification.success({
                    message: "Tạo chi tiết đơn xuất hàng",
                    description: "Tạo chi tiết đơn xuất hàng thành công",
                });
                form.resetFields();
                onClose();
                loadProduct();
            } else {
                notification.error({
                    message: "Lỗi tạo chi tiết đơn xuất hàng",
                    description: "Không đủ số lượng hàng",
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


    useEffect(() => {
        if (chooseProduct && chooseProduct.exportPrice !== undefined) {
            const exportGoodsDetails = form.getFieldValue('exportGoodsDetails');

            // Cập nhật giá cho sản phẩm được chọn
            form.setFieldsValue({
                exportGoodsDetails: exportGoodsDetails.map((detail, index) => {
                    // Nếu sản phẩm đã chọn có id trùng với sản phẩm trong danh sách
                    if (detail.product === chooseProduct.id) {
                        return {
                            ...detail,
                            exportPrice: chooseProduct.exportPrice,  // Cập nhật giá cho sản phẩm được chọn
                        };
                    }
                    return detail;
                }),
            });
        }
    }, [chooseProduct, form]);


    return (
        <Modal
            title="Tạo chi tiết đơn xuất hàng"
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
                {/* Export Goods */}
                <Form.Item
                    label="ID Export Goods"
                >
                    <Input disabled value={idExport} />
                </Form.Item>

                <Form.List
                    name="exportGoodsDetails"
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <div key={key}>
                                    {/* Sản phẩm */}
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
                                                value: product.id,
                                                label: product.name,
                                            }))}
                                            onChange={(value) => {
                                                const selectedProduct = dataProduct.find((product) => product.id === value);

                                                // Cập nhật giá trị liên quan trong form
                                                const currentDetails = form.getFieldValue('exportGoodsDetails');
                                                form.setFieldsValue({
                                                    exportGoodsDetails: currentDetails.map((detail, index) =>
                                                        index === name
                                                            ? {
                                                                ...detail,
                                                                exportPrice: selectedProduct.exportPrice || 0,
                                                                quantity: 1,
                                                            }
                                                            : detail
                                                    ),
                                                });
                                            }}
                                        />
                                    </Form.Item>

                                    {/* Số lượng */}
                                    <Form.Item
                                        {...restField}
                                        name={[name, "quantity"]}
                                        label="Số lượng"
                                        rules={[{ required: true, message: "Số lượng là bắt buộc!" }]}
                                    >
                                        <InputNumber
                                            placeholder="Số lượng"
                                            min={1}
                                            max={
                                                dataProduct.find(product =>
                                                    product.id === form.getFieldValue(['exportGoodsDetails', name, 'product'])
                                                )?.quantity || 0 // Nếu không có sản phẩm, max = 0
                                            }
                                            value={form.getFieldValue(['exportGoodsDetails', name, 'quantity'])} // Duy trì giá trị trong form
                                            onChange={(value) => {
                                                // Cập nhật lại số lượng khi thay đổi
                                                const exportGoodsDetails = form.getFieldValue('exportGoodsDetails');
                                                form.setFieldsValue({
                                                    exportGoodsDetails: exportGoodsDetails.map((detail, index) =>
                                                        index === name ? { ...detail, quantity: value } : detail
                                                    ),
                                                });
                                            }}
                                        />
                                        <div>
                                            <span> Số lượng còn lại: &nbsp;
                                                <span style={{ fontSize: 15 }}>
                                                    {
                                                        dataProduct.find(product =>
                                                            product.id === form.getFieldValue(['exportGoodsDetails', name, 'product'])
                                                        )?.quantity || 0
                                                    }
                                                </span>
                                            </span>
                                        </div>
                                    </Form.Item>



                                    {/* Giá xuất */}
                                    <Form.Item
                                        {...restField}
                                        name={[name, "exportPrice"]}
                                        label="Giá xuất"
                                        rules={[{ required: true, message: "Giá xuất là bắt buộc!" }]}
                                    >
                                        <InputNumber
                                            min={0}
                                            formatter={(value) => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value) => value.replace(/₫\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>

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

export default ExportGoodsDetailForm;
