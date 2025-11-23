import { Link, useNavigate } from 'react-router-dom';
import { Menu, message } from 'antd';
import {
    UsergroupAddOutlined, HomeOutlined, AuditOutlined, SettingOutlined,
    LoginOutlined, AliwangwangOutlined,
    LogoutOutlined,
    UserAddOutlined,
    LineChartOutlined,
    WhatsAppOutlined,
    BugOutlined,
    FallOutlined,
    RiseOutlined,
} from '@ant-design/icons';
import { Children, useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../service/api.service';

const Header = () => {

    const { user, setUser } = useContext(AuthContext)
    // ********************************************

    // Hàm kiểm tra quyền module
    const hasModulePermission = (requiredModule) => {
        if (!user || !user.role || !user.role.permissions) return false;

        return user.role.permissions.some(permission => permission.module === requiredModule);
    };
    // ********************************************

    const [page, setPage] = useState('');

    const navigate = useNavigate(); // Khởi tạo navigate


    const onClick = (e) => {
        setPage(e.key);
    };

    const handleLogout = async () => {
        const res = await logoutAPI()
        if (res.data) {
            // clear data
            localStorage.removeItem("access_token")
            setUser({
                id: "",
                email: "",
                name: "",
                role: {
                    id: "",
                    name: "",
                    active: "",
                    permissions: [], // Khởi tạo là mảng rỗng
                }
            })


            message.success("Logout thành công.")

            // redirect to home
            navigate("/login")

        }

    }

    const items = [
        {
            label: <Link to={"/"}>Trang chủ</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },

        ...(hasModulePermission("COMPANIES")
            ? [
                {
                    label: 'Nhập - xuất hàng',
                    key: 'goods',
                    icon: <UsergroupAddOutlined />,
                    children: [
                        {
                            label: <Link to={"/goods/import-goods"}> Nhập hàng </Link>,
                            key: 'import',
                            icon: <FallOutlined />
                        },
                        {
                            label: <Link to={"/goods/export-goods"}> Xuất hàng </Link>,
                            key: 'export',
                            icon: <RiseOutlined />,
                        },
                    ]
                },
            ]
            : []),

        ...(hasModulePermission("COMPANIES")
            ? [
                {
                    label: <Link to={"/company"}>Công ty</Link>,
                    key: "company",
                    icon: <AuditOutlined />,
                },
            ]
            : []),

        {
            label: <Link to={"/contact"}>Liên hệ</Link>,
            key: 'contact',
            icon: <WhatsAppOutlined />,
        },

        {
            label: `Welcome ${user.name}`,
            key: 'user',
            icon: <AliwangwangOutlined />,
            children: [
                ...(user.role?.name === "ADMIN" ? [
                    {
                        label: <Link to={"/admin/user"}> ADMIN </Link>,
                        key: 'admin',
                        icon: <BugOutlined />
                    },
                ] : []),
                {
                    label: <span onClick={() => handleLogout()} >Đăng xuất</span>,
                    key: 'logout',
                    icon: <LogoutOutlined />,
                },
            ]
        },
    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[page]}
            mode="horizontal"
            items={items}
        />

    )
}

export default Header;