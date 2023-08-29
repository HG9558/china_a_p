// vip信息
import { http } from "../http";
import type { Res } from "../types";
import { Iactivity } from "./interface";
import type { VipInfo, VipDetails } from "./types";

export const vipInfo = {
    //用户vip特权
    vipInfo: (): Promise<Res<VipInfo>> => http("post", "/api/v1/vip/info"),

    //vip详情
    vipDetails: (): Promise<Res<VipDetails>> => http("post", "/api/v1/vip/details"),

    // 晋级活动
    activity: (data: Iactivity): Promise<Res<any>> => http("post", "/api/v1/vip/activity", data),
};
