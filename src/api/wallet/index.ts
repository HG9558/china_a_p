// 我的-银行卡相关
import { http } from "../http";
import type { Res } from "../types";
import type {
    IaddUserBank,
    IaddVirtualBank,
    IdeleteUserBank,
    IdeleteVirtualBank,
} from "./interface";
import type {
    BankList,
    BankNums,
    UserBankList,
    UserVirtualBankList,
    WithdrawalHint,
} from "./types";

export const wallet = {
    // 系统银行卡列表
    bankList: (): Promise<Res<BankList[]>> => http("post", "/api/v1/wallet/bankList"),

    // 我的-银行卡列表
    userBankList: (): Promise<Res<UserBankList[]>> => http("post", "/api/v1/wallet/userBankList"),

    // 钱包-添加用户银行卡
    addUserBank: (data: IaddUserBank): Promise<Res<any>> =>
        http("post", "/api/v1/wallet/addUserBank", data),

    // 钱包-解绑用户银行卡
    deleteUserBank: (data: IdeleteUserBank): Promise<Res<any>> =>
        http("post", "/api/v1/wallet/deleteUserBank", data),

    // 我的-数字货币列表
    userVirtualBankList: (): Promise<Res<UserVirtualBankList[]>> =>
        http("post", "/api/v1/wallet/userVirtualBankList"),

    // 钱包-添加数字货币
    addVirtualBank: (data: IaddVirtualBank): Promise<Res<any>> =>
        http("post", "/api/v1/wallet/addVirtualBank", data),

    // 钱包-银行卡数量
    bankNums: (): Promise<Res<BankNums>> => http("post", "/api/v1/wallet/bankNums"),

    // 钱包-解绑数字货币
    deleteVirtualBank: (data: IdeleteVirtualBank): Promise<Res<any>> =>
        http("post", "/api/v1/wallet/deleteVirtualBank", data),

    // 钱包-提款提示信息
    withdrawalHint: (): Promise<Res<WithdrawalHint>> =>
        http("post", "/api/v1/wallet/withdrawalHint"),
};
