import { notification } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Tạo instance của axios với baseURL và các cấu hình mặc định
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,  // Đảm bảo rằng URL backend đã được cấu hình đúng
    withCredentials: true,  // Cho phép gửi cookies trong mỗi yêu cầu
});

// Hàm giải mã và lấy thời gian hết hạn của access token
const getAccessTokenExpiration = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000;  // Chuyển đổi thời gian từ giây sang mili giây
    } catch (error) {
        return null;
    }
};

// Hàm để làm mới access token
const handleRefreshToken = async () => {
    try {
        // Gửi yêu cầu GET đến API refresh và gửi cookie kèm theo (withCredentials: true)
        const response = await axios.get('http://localhost:8080/api/v1/auth/refresh', {
            withCredentials: true,
        });

        if (response && response.data) return response.data.data.access_token;
        else return null;

    } catch (error) {
        console.error('Lỗi khi làm mới token:', error);
    }
};

// Tạo một hàm kiểm tra và refresh token trước khi hết hạn
const refreshTokenIfNeeded = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    const expirationTime = getAccessTokenExpiration(token);
    const currentTime = Date.now();

    // Kiểm tra nếu còn ít hơn 5 phút trước khi token hết hạn
    const refreshThreshold = 5 * 60 * 1000;  // 5 phút (300,000 ms)
    if (expirationTime - currentTime < refreshThreshold) {
        console.log("Token sắp hết hạn, đang làm mới...");
        const newAccessToken = await handleRefreshToken();
        if (newAccessToken) {
            localStorage.setItem('access_token', newAccessToken);
            console.log("Đã làm mới token thành công!");
        }
    }
};

// Gọi hàm này để kiểm tra và làm mới token khi cần
// Kiểm tra token khi người dùng thực hiện hành động nào đó
document.addEventListener('mousemove', refreshTokenIfNeeded);


//gán token vào header với interceptor
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    if (typeof window !== "undefined" && window && window.localStorage && window.localStorage.getItem('access_token')) {
        config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token');
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Interceptor xử lý lỗi 401 và thực hiện refresh token
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Kiểm tra nếu response có trường data và data.data, trả về trực tiếp
    if (response.data && response.data.data) return response.data;
    return response;
}, async function (error) {
    const originalRequest = error.config;

    // Kiểm tra nếu lỗi là 400 từ API đăng nhập
    if (error.response && error.response.status === 400 && originalRequest.url.includes('/api/v1/auth/login')) {

        return {
            statusCode: 400,
            error: "Bad Request",
            message: error.response.data?.message || "Thông tin đăng nhập không hợp lệ.",
            data: null,
        };
    }

    // Kiểm tra nếu lỗi là 400 từ API đăng nhập
    if (error.response && error.response.status === 400 && !originalRequest.url.includes('/api/v1/auth/login')) {

        return {
            statusCode: 400,
            // error: error.response.data?.error || "Bad request",
            message: error.response.data?.error || "Bad request",
            data: null,
        };
    }

    if (error.response.status === 403) {
        return {
            statusCode: 403,
            error: error.response.data?.error || "Forbidden",
            message: error.response.data?.message,
            data: null,
        };
    }

    // Kiểm tra nếu lỗi là 401 và chưa thử refresh token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Đánh dấu rằng đã thử refresh token

        try {
            const newAccessToken = await handleRefreshToken();

            if (!newAccessToken) {
                throw new Error("Không tìm thấy access_token trong phản hồi từ server.");
            }

            // Lưu access token mới vào localStorage
            localStorage.setItem('access_token', newAccessToken);

            // Cập nhật lại header Authorization của yêu cầu cũ
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            // Thực hiện lại yêu cầu cũ với access token mới
            return axios(originalRequest);
        } catch (refreshError) {
            console.error("Lỗi khi refresh token:", refreshError);

            // Nếu không thể refresh token, chuyển lỗi tới người dùng
            return Promise.reject(refreshError);
        }
    }

    // Nếu không phải lỗi 401 hoặc đã thử refresh, trả lỗi về
    return Promise.reject(error);
});



export default instance;
