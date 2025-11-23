import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Layout, Menu, theme } from 'antd';
import {
    BugOutlined,
    LineChartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProductOutlined,
    SolutionOutlined,
    UserOutlined,
} from '@ant-design/icons';
import UserPage from '../components/admin/user';
import RolePage from '../components/admin/role';
import ProductManagerPage from '../components/admin/manage.product';
import CategoryManagerPage from '../components/admin/manage.category';
import ProductPage from '../components/admin/statistic/product/statistic.product';
import ProfitPage from '../components/admin/statistic/profit/statistic.profit';
import ReportPage from '../components/admin/statistic/report_export/statistic.report';
import ReportImportPage from '../components/admin/statistic/report_import/statistic.report';


const AdminPage = () => {
    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Map URL to Menu Key
    const pathToKey = {
        '/admin/user': '1',
        '/admin/role': '2',
        '/admin/statistic/product': '4',
        '/admin/statistic/profit': '44',
        '/admin/statistic/report_export': '444',
        '/admin/statistic/report_import': '4444',
        '/admin/product-manager/category': '7',
        '/admin/product-manager/product': '8',
    };

    const keyToPath = {
        '1': '/admin/user',
        '2': '/admin/role',
        '4': '/admin/statistic/product',
        '44': '/admin/statistic/profit',
        '444': '/admin/statistic/report_export',
        '4444': '/admin/statistic/report_import',
        '7': '/admin/product-manager/category',
        '8': '/admin/product-manager/product',
    };

    // Lấy `selectedKey` từ URL
    const selectedKey = pathToKey[location.pathname] || '1';

    const renderContent = () => {
        switch (selectedKey) {
            case '1':
                return <UserPage />;
            case '2':
                return <RolePage />;
            case '4':
                return <ProductPage />;
            case '44':
                return <ProfitPage />;
            case '444':
                return <ReportPage />;
            case '4444':
                return <ReportImportPage />;
            case '7':
                return <CategoryManagerPage />;
            case '8':
                return <ProductManagerPage />;
        }
    };

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]} // Đồng bộ với URL
                    onClick={(e) => navigate(keyToPath[e.key] || '/admin/user')}
                    items={[
                        {
                            key: '0',
                            icon: <BugOutlined />,
                            label: 'ADMIN',
                            disabled: true,
                        },
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'Tài khoản',
                        },
                        {
                            key: '2',
                            icon: <SolutionOutlined />,
                            label: 'Quyền hạn',
                        },
                        {
                            key: '3',
                            label: 'Báo cáo và T.kê',
                            icon: <LineChartOutlined />,
                            children: [
                                { key: '4', label: 'Sản phẩm' },
                                { key: '44', label: 'Lợi nhuận' },
                                { key: '4444', label: 'Nhập hàng' },
                                { key: '444', label: 'Xuất hàng' },
                            ],
                        },

                        {
                            key: '6',
                            label: 'QL sản phẩm',
                            icon: <ProductOutlined />,
                            children: [
                                { key: '7', label: 'Danh mục' },
                                { key: '8', label: 'Sản phẩm' },
                            ],
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {renderContent()} {/* Hiển thị nội dung */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminPage;
