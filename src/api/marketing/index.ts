// 营销代理
import { http } from "../http";
import type { Res } from "../types";
import type { IplayerActivityDetails, Ireports, IrewardsCommissionDetails } from "./interface";
import type { MarketingReports, PlayerActivityDetails, RewardsCommissionDetails } from "./types";

export const marketing = {
    // 营销代理-我的奖励
    marketingReports: (data: Ireports): Promise<Res<MarketingReports>> =>
        http("post", "/api/v1/marketing/reports", data),

    // 营销代理-本周下级流水详情-列表
    playerActivityDetails: (data: IplayerActivityDetails): Promise<Res<PlayerActivityDetails>> =>
        http("post", "/api/v1/marketing/reports/playerActivityDetails", data),

    // 营销代理-本周新增首存详情-列表
    rewardsCommissionDetails: (
        data: IrewardsCommissionDetails
    ): Promise<Res<RewardsCommissionDetails>> =>
        http("post", "/api/v1/marketing/reports/rewardsCommissionDetails", data),
};
