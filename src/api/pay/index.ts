// 我的-支付模块
import { http } from "../http";
import type { Res } from "../types";
import type {
    IofflinePay,
    IonlinePay,
    IpayOnLineList,
    IpayTypeList,
    Iwithdrawal,
} from "./interface";
import type { OnlinePay, PayOnLineList, PayTypeList, Withdrawal } from "./types";

export const pay = {
    // 支付类型列表
    payTypeList: (data: IpayTypeList): Promise<Res<PayTypeList[]>> =>
        http("post", "/api/v1/pay/payTypeList", data),

    // 支付-代付展示通道列表
    payOnLineList: (data: IpayOnLineList): Promise<Res<PayOnLineList[]>> =>
        http("post", "/api/v1/pay/payOnLineList", data),

    // 在线支付-获取支付链接
    onlinePay: (data: IonlinePay): Promise<Res<OnlinePay>> =>
        http("post", "/api/v1/pay/onlinePay", data),

    // 离线支付
    offlinePay: (data: IofflinePay): Promise<Res<any>> =>
        http("post", "/api/v1/pay/offlinePay", data),

    // 提现申请
    withdrawal: (data: Iwithdrawal): Promise<Res<Withdrawal>> =>
        http("post", "/api/v1/pay/withdrawal", data),
};
