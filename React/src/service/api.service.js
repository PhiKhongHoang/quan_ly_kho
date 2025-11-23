// import axios from "axios";
import axios from "./axios.customize";

const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: email,
        password: password,
    }
    return axios.post(URL_BACKEND, data);
};

// done
const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";

    return axios.get(URL_BACKEND);
}

// done
const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";

    return axios.post(URL_BACKEND);
}

const sendOTPAPI = (email) => {
    const URL_BACKEND = "/api/v1/auth/send-otp";

    // Tạo đối tượng FormData
    const formData = new FormData();
    formData.append("email", email); // Key là 'email' với giá trị là text

    // Gửi yêu cầu POST với form-data
    return axios.post(URL_BACKEND, formData, {
        headers: {
            "Content-Type": "multipart/form-data", // Xác định loại dữ liệu là form-data
        },
    });
};

const verifyOTPAPI = (email, otp) => {
    const URL_BACKEND = "/api/v1/auth/verify-otp";

    // Tạo đối tượng FormData
    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", otp);

    // Gửi yêu cầu POST với form-data
    return axios.post(URL_BACKEND, formData, {
        headers: {
            "Content-Type": "multipart/form-data", // Xác định loại dữ liệu là form-data
        },
    });
}

const ChangePasswordAPI = (email, otp, password) => {
    const URL_BACKEND = "/api/v1/auth/change-password";

    // Tạo đối tượng FormData
    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", otp);
    formData.append("password", password);

    // Gửi yêu cầu POST với form-data
    return axios.put(URL_BACKEND, formData, {
        headers: {
            "Content-Type": "multipart/form-data", // Xác định loại dữ liệu là form-data
        },
    });
}

export {
    loginAPI, getAccountAPI,
    logoutAPI,
    sendOTPAPI, verifyOTPAPI, ChangePasswordAPI
}