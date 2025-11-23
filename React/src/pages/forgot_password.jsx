import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, Col, Divider, message, Modal } from "antd";
import { useState } from "react";
import { Link, useNavigate, } from "react-router-dom";
import { ChangePasswordAPI, sendOTPAPI, verifyOTPAPI } from "../service/api.service";
const ForgotPassword = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [otpValue, setOtpValue] = useState("");
    const [password, setPassword] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenPass, setIsModalOpenPass] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onInput = (value) => {
        // console.log('onInput:', value);
    };
    const sharedProps = {
        onInput,
    };

    const handleOtpChange = (value) => {
        setOtpValue(String(value));
    };

    const onFinish = async (values) => {
        const res = await sendOTPAPI(values.email)
        setEmail(values.email)
    }

    const handleOk = async (values) => {
        const res = await verifyOTPAPI(email, otpValue)

        if (res.data === "Invalid or expired OTP.") {
            setOtpValue("")
            alert("Sai mã OTP. Vui lòng kiểm tra lại!")
        }
        else {
            setIsModalOpen(false);
            setIsModalOpenPass(true)
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOkPass = async (values) => {
        // Kiểm tra form hợp lệ trước khi đóng modal
        form
            .validateFields()
            .then(async (values) => {
                const res = await ChangePasswordAPI(email, otpValue, password)
                setEmail("")
                setOtpValue("")
                setPassword("")
                message.success("Đổi mật khẩu thành công.")
                if (res.data) {
                    setIsModalOpenPass(false);
                    navigate("/login")
                }
            })
            .catch((info) => {
                console.log('Validate failed:', info);
            });
    };
    const handleCancelPass = () => {
        setIsModalOpenPass(false);
    };

    const handleOtpChangePass = (e) => {
        setPassword(e.target.value); // Chuyển giá trị thành chuỗi nếu cần
    };

    return (
        <>
            <Row justify={"center"} style={{ marginTop: "30px" }}>
                <Col xs={24} md={16} lg={8}>
                    <fieldset style={{
                        padding: "15px",
                        margin: "5px",
                        border: "1px solid #ccc",
                        borderRadius: "5px"
                    }}>
                        <legend>Quên mật khẩu</legend>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Email không được để trống!',
                                    },
                                    {
                                        type: "email",
                                        message: 'Email không đúng định dạng!',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập email của bạn" />
                            </Form.Item>

                            <Form.Item >
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            form.submit();
                                            showModal();
                                        }}
                                    >
                                        Gửi OTP
                                    </Button>
                                    <Link to="/login">Đăng nhập <ArrowRightOutlined /></Link>
                                </div>
                            </Form.Item>
                        </Form>
                        <Divider />
                    </fieldset>
                </Col>
            </Row >

            <Modal
                title="Nhập mã OTP"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
            >
                <Input.OTP
                    length={6}
                    {...sharedProps}
                    onChange={handleOtpChange}
                    value={otpValue}
                />
            </Modal>

            <Modal
                title="Thay đổi mật khẩu"
                open={isModalOpenPass}
                onOk={handleOkPass}
                onCancel={handleCancelPass}
                maskClosable={false}
            >
                <Form
                    form={form}
                    name="password_form"
                    initialValues={{ password: '' }}
                    onFinish={handleOkPass}
                >
                    <Form.Item
                        name="password"
                        label="Mật khẩu mới"
                        rules={[{ required: true, message: 'Mật khẩu không được để trống' }]} // Xác thực trường mật khẩu
                    >
                        <Input.Password
                            placeholder="Nhập mật khẩu mới"
                            value={password}
                            onChange={handleOtpChangePass}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ForgotPassword;