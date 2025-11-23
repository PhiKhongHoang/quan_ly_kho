import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Layout, Menu, Space, Table, Tag, theme } from 'antd';
import { fetchAllProductAPI } from '../service/home/home.api.service';
import Sider from 'antd/es/layout/Sider';
import { BugOutlined, LineChartOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ProductOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Content, Header } from 'antd/es/layout/layout';
import AllProductPage from '../components/home/all_product';
import QuanTamPage from '../components/home/quantam';
import HangSapHetPage from '../components/home/hangsaphet';

const HomePage = () => {

    const { Header, Sider, Content } = Layout;
    const [collapsed, setCollapsed] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Map URL to Menu Key
    const pathToKey = {
        '/all-product': '0',
        '/quan-tam': '1',
        '/hang-sap-het': '2',
    };

    const keyToPath = {
        '0': '/all-product',
        '1': '/quan-tam',
        '2': '/hang-sap-het',
    };

    // Lấy `selectedKey` từ URL
    const selectedKey = pathToKey[location.pathname] || '1';

    const renderContent = () => {
        switch (selectedKey) {
            case '0':
                return <AllProductPage />;
            case '1':
                return <QuanTamPage />;
            case '2':
                return <HangSapHetPage />;
        }
    };

    return (
        <>
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
                                label: 'Tất cả sản phẩm',
                            },
                            {
                                key: '1',
                                icon: <BugOutlined />,
                                label: 'Quan tâm',
                            },
                            {
                                key: '2',
                                icon: <UserOutlined />,
                                label: 'Hàng sắp hết',
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
        </>
    )
}

export default HomePage;