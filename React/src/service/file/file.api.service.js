// import axios from "axios";
import axios from "../axios.customize";

// done
const createFileAPI = (file, folder) => {
    const URL_BACKEND = "/api/v1/files";

    // Kiểm tra file trước khi tạo FormData
    if (!file) {
        throw new Error("No file provided.");
    }

    // Tạo FormData để gửi file và tham số folder
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    // Gửi request POST với axios
    return axios.post(URL_BACKEND, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export {
    createFileAPI
}