import { http } from "../http";
import { Res } from "../types";
import {
    IapplyPromoActivity,
    IcheckApplyPlatPromoActivity,
    IgetPromoActivity,
    IqueryUserApplyPromoActivityStatus,
    ItrialCoinTransferApplyActivity,
    calculateApplyPromoActivity,
} from "./interface";
import {
    AnalyzeTagPromoActivityList,
    CalculateApplyPromoActivity,
    GetApplyPlatPromoActivityList,
    GetPromoActivity,
    GetPromoTag,
    GetTagPromoActivityList,
    QueryUserApplyPromoActivityStatus,
    TrialCoinTransferApplyActivity,
} from "./types";

export const promoActivity = {
    // 取得活動页签
    getPromoTag: (): Promise<Res<GetPromoTag[]>> =>
        http("post", "/api/v1/promoActivity/getPromoTag"),

    // 組合活動页签的优惠活动
    analyzeTagPromoActivityList: (): Promise<Res<AnalyzeTagPromoActivityList[]>> =>
        http("post", "/api/v1/promoActivity/analyzeTagPromoActivityList"),

    // 取得活動页签的优惠活动
    getTagPromoActivityList: (): Promise<Res<GetTagPromoActivityList[]>> =>
        http("post", "/api/v1/promoActivity/getTagPromoActivityList"),

    // 取得优惠活动
    getPromoActivity: (data: IgetPromoActivity): Promise<Res<GetPromoActivity>> =>
        http("post", "/api/v1/promoActivity/getPromoActivity", data),

    // 申請优惠活动
    applyPromoActivity: (data: IapplyPromoActivity): Promise<Res<any>> =>
        http("post", "/api/v1/promoActivity/applyPromoActivity", data),

    // 檢查是否申首存場館优惠活动
    checkApplyPlatPromoActivity: (data: IcheckApplyPlatPromoActivity): Promise<Res<boolean>> =>
        http("post", "/api/v1/promoActivity/checkApplyPlatPromoActivity", data),

    // 計算 活動紅利 及 流水
    calculateApplyPromoActivity: (
        data: calculateApplyPromoActivity
    ): Promise<Res<CalculateApplyPromoActivity>> =>
        http("post", "/api/v1/promoActivity/calculateApplyPromoActivity", data),

    // 取得會員申請活動的狀態
    queryUserApplyPromoActivityStatus: (
        data: IqueryUserApplyPromoActivityStatus
    ): Promise<Res<QueryUserApplyPromoActivityStatus>> =>
        http("post", "/api/v1/promoActivity/queryUserApplyPromoActivityStatus", data),

    // 取得會員參加活動清單
    getApplyPlatPromoActivityList: (): Promise<Res<GetApplyPlatPromoActivityList[]>> =>
        http("post", "/api/v1/promoActivity/getApplyPlatPromoActivityList"),

    // 试算上分后活动流水
    trialCoinTransferApplyActivity: (
        data: ItrialCoinTransferApplyActivity
    ): Promise<Res<TrialCoinTransferApplyActivity>> =>
        http("post", "/api/v1/promoActivity/trialCoinTransferApplyActivity", data),
};
