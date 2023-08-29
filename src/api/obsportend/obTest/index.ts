// ob环境测试类
import { http } from "@/api/http";

export const obTest = {
    obTestLogin: () => http("post", "/obsportend/v1/OBTest/login"),
};
