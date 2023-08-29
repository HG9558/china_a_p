import { http } from "../http";
import { Res } from "../types";
import { IdepositRecords, IwithdrawalRecords } from "./interface";
import { DepositRecords, DepositTransactionType, WithdrawalRecords } from "./types";

export const depositAndWithdrawal = {
    // 存款记录
    depositRecords: (data: IdepositRecords): Promise<Res<DepositRecords>> =>
        http("post", "/api/v1/depositAndWithdrawal/depositRecords", data),

    // 取款记录
    withdrawalRecords: (data: IwithdrawalRecords): Promise<Res<WithdrawalRecords>> =>
        http("post", "/api/v1/depositAndWithdrawal/withdrawalRecords", data),

    // 存款交易类型
    depositTransactionType: (): Promise<Res<DepositTransactionType[]>> =>
        http("post", "/api/v1/depositAndWithdrawal/depositTransactionType"),
};
