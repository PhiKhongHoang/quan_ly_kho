import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const PrivateRoute = ({
    children,
    requiredModule,
    requiredApiPath,
    requiredMethod,
    requireAuthOnly = false // Chỉ kiểm tra user.id nếu true 
}) => {
    const { user } = useContext(AuthContext);

    // Function kiểm tra quyền truy cập
    const hasPermission = () => {
        if (!user || !user.role || !user.role.permissions) return false;

        return user.role.permissions.some(permission => {
            const moduleCheck = permission.module === requiredModule;
            const apiPathCheck = requiredApiPath ? permission.apiPath === requiredApiPath : true;
            const methodCheck = requiredMethod ? permission.method === requiredMethod : true;

            return moduleCheck && apiPathCheck && methodCheck;
        });
    };

    // Nếu chỉ yêu cầu user.id, không cần kiểm tra quyền
    if (requireAuthOnly) {
        if (user && user.id) {
            return <>{children}</>;
        }
    } else {
        // Kiểm tra quyền bình thường
        if (user && user.id && hasPermission()) {
            return <>{children}</>;
        }
    }

    // Trường hợp không được phép truy cập
    return (
        <Result
            status="403"
            title="Unauthorized!"
            subTitle="Bạn cần đăng nhập và có quyền truy cập tài nguyên này."
            extra={
                <Button type="primary">
                    <Link to="/login">
                        <span>Go to login</span>
                    </Link>
                </Button>
            }
        />
    );
};

export default PrivateRoute;
