import { http } from "../http";
import { Res } from "../types";
import type {
    IdepositWithdrawalDetails,
    IdepositWithdrawalDetailsStatistics,
    IdepositWithdrawalUserDetails,
    IdepositWithdrawalUserDetailsStatistics,
    ImyTeamStatisticsBySubHisOrNew,
    ImyTeamStatisticsHisOrNew,
    IplayerActivityDetails,
    IplayerActivityDetailsStatistics,
    Ireports,
    IrewardsCommissionActiveDetails,
    IrewardsCommissionDetails,
    IrewardsCommissionDetailsStatistics,
    IsubordinateList,
    IsubordinateListZT,
    ItransferOrWithDraw,
    bindInviteAndIp,
} from "./interface";

export const centerAgent = {
    // 代理中心-我的报表
    reports: (data: Ireports) => http("post", "/api/v1/centerAgent", data),

    // 代理中心-我的报表-玩家活跃度详情-列表
    playerActivityDetails: (data: IplayerActivityDetails) =>
        http("post", "/api/v1/centerAgent/playerActivityDetails", data),

    // 代理中心-我的报表-充值与提现详情-列表
    depositWithdrawalDetails: (data: IdepositWithdrawalDetails) =>
        http("post", "/api/v1/centerAgent/depositWithdrawalDetails", data),

    // 代理中心-我的报表-玩家活跃度详情-统计
    playerActivityDetailsStatistics: (data: IplayerActivityDetailsStatistics) =>
        http("post", "/api/v1/centerAgent/playerActivityDetailsStatistics", data),

    // 代理中心-我的报表-充值与提现详情-统计
    depositWithdrawalDetailsStatistics: (data: IdepositWithdrawalDetailsStatistics) =>
        http("post", "/api/v1/centerAgent/depositWithdrawalDetailsStatistics", data),

    // 代理中心-我的报表-用户详情-列表
    depositWithdrawalUserDetails: (data: IdepositWithdrawalUserDetails) =>
        http("post", "/api/v1/centerAgent/depositWithdrawalUserDetails", data),

    // 代理中心-我的报表-用户详情-统计
    depositWithdrawalUserDetailsStatistics: (data: IdepositWithdrawalUserDetailsStatistics) =>
        http("post", "/api/v1/centerAgent/depositWithdrawalUserDetailsStatistics", data),

    // 代理中心-我的报表-奖金与佣金详情-列表
    rewardsCommissionDetails: (data: IrewardsCommissionDetails) =>
        http("post", "/api/v1/centerAgent/rewardsCommissionDetails", data),

    // 代理中心-我的报表-奖金与佣金详情-统计
    rewardsCommissionDetailsStatistics: (data: IrewardsCommissionDetailsStatistics) =>
        http("post", "/api/v1/centerAgent/rewardsCommissionDetailsStatistics", data),

    // 代理中心-我的报表-奖金与佣金详情-列表->活跃会员佣金->会员详情
    rewardsCommissionActiveDetails: (data: IrewardsCommissionActiveDetails) =>
        http("post", "/api/v1/centerAgent/rewardsCommissionActiveDetails", data),

    // H5-我的团队-统计
    myTeamStatisticsHisOrNew: (data: ImyTeamStatisticsHisOrNew) =>
        http("post", "/api/v1/centerAgent/myTeamStatisticsHisOrNew", data),

    // H5-我的团队-层级统计
    myTeamStatisticsBySubHisOrNew: (data: ImyTeamStatisticsBySubHisOrNew) =>
        http("post", "/api/v1/centerAgent/myTeamStatisticsBySubHisOrNew", data),

    // 代理中心-我的下级-列表
    subordinateList: (data: IsubordinateList) =>
        http("post", "/api/v1/centerAgent/subordinate/subordinateList", data),

    // 代理中心-我的下级-列表-直推人数列表(弹框)
    subordinateListZT: (data: IsubordinateListZT) =>
        http("post", "/api/v1/centerAgent/subordinate/subordinateListZT", data),

    // 代理中心-我的下级-统计
    subordinateStatistics: () =>
        http("post", "/api/v1/centerAgent/subordinate/subordinateStatistics"),

    // 代理中心-轉帳提現
    transferOrWithDraw: (data: ItransferOrWithDraw) =>
        http("post", "/api/v1/centerAgent/subordinate/transferOrWithDraw", data),

    // 查询佣金规则
    getCommissionRule: () => http("post", "/api/v1/centerAgent/subordinate/getCommissionRule"),

    // 查询活跃会员代理奖金规则
    getCommissionPromoRule: () =>
        http("post", "/api/v1/centerAgent/subordinate/getCommissionPromoRule"),

    // 绑定合营代码IP关系
    bindInviteAndIp: (data: bindInviteAndIp): Promise<Res<any>> =>
        http("post", "/api/v1/centerAgent/bindInviteAndIp", data),
};
