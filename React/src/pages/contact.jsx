import { UploadOutlined } from "@ant-design/icons";
import { Button, Image, message, QRCode } from "antd";
import { createFileAPI } from "../service/file/file.api.service";
import { createLogoAPI, fetchLogoAPI } from "../service/logo/logo.api.service";
import { useContext, useEffect, useState } from "react";
import PrivateRoute from "./private.route";
import { AuthContext } from "../components/context/auth.context";

const ContactPage = () => {
    const { user } = useContext(AuthContext);

    // Hàm kiểm tra quyền
    const checkPermission = (requiredModule) => {
        if (!user || !user.role || !user.role.permissions) return false;

        return user.role.permissions.some(permission => permission.module === requiredModule);
    };


    const [logo, setLogo] = useState();

    const loadLogo = async () => {
        const response = await fetchLogoAPI();

        if (response && response.data && response.data.length > 0) {
            const lastLogo = response.data[response.data.length - 1]; // Lấy logo cuối cùng
            setLogo(`http://localhost:8080/storage/logo/${lastLogo.name}`); // Cập nhật URL của logo
        } else {
            setLogo("http://localhost:8080/storage/logo/logo.png")
        }
    }

    const handleFileUpload = async (event) => {
        const file = event.target.files[0]; // Lấy file đã chọn
        if (!file) {
            message.error("No file selected!");
            return;
        }

        try {
            const folder = "logo"; // Đặt tên folder
            const response = await createFileAPI(file, folder); // Gửi file và folder
            message.success("Upload file thành công!");

            await createLogoAPI(response.data.fileName); // lưu db

            loadLogo();

        } catch (error) {
            message.error("File upload failed!");
            console.error("Upload error:", error);
        }
    };

    useEffect(() => {
        loadLogo();
    }, []);

    return (
        <>
            <div style={{ marginBottom: 30 }}>
                <Image
                    width={"100%"}
                    height={300}
                    src={logo}
                />
            </div>

            &nbsp; Mã QR logo:
            <br />
            <QRCode
                errorLevel="H"
                value={logo}
                icon="../../../public/logo.png"
            />
            <br />

            {checkPermission("USERS") && (
                <div style={{ marginBottom: 20 }}>
                    <Button type="primary">
                        <UploadOutlined />
                        <label style={{ margin: 0, cursor: "pointer" }}>
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                style={{
                                    display: "none", // Ẩn input
                                }}
                                onChange={handleFileUpload} // Xử lý sự kiện khi chọn file
                            />
                            Thay đổi logo
                        </label>
                    </Button>
                </div>
            )}

            <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: 40 }}>
                    Mọi thắc mắc vui lòng liên hệ  &nbsp;
                    <a href="mailto:admin@gmail.com" style={{ color: 'blue', textDecoration: 'underline' }}>
                        admin@gmail.com
                    </a>
                    &nbsp; trong giờ hành chính!
                </span>

            </div>

        </>
    );
};

export default ContactPage;
