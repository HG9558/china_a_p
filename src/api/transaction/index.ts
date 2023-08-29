// 用户交易信息
import { http } from "../http";
import type { Res } from "../types";
import type { IsendTransactions } from "./interface";
import type { SendTransactions } from "./types";

export const transaction = {
    // 查询交易记录
    sendTransactions: (data: IsendTransactions): Promise<Res<SendTransactions>> =>
        http("post", "/api/v1/transaction/sendTransactions", data),
};
