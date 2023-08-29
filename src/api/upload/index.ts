// 文件上传
import { http } from "../http";

export const upload = {
    // 上传文件
    uploadFile: (data: File) => http("post", "/api/v1/upload/uploadFile", data),
};
