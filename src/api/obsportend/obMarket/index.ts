// ob体育注单接口
import { http } from "@/api/http";
import type { Res } from "@/api/types";
import type {
    IClientBet,
    IBetParlay,
    IorderPreSettle,
    IqueryMarketMaxMinBetMoney,
    IsportsSet,
} from "./interface";
import type {
    ClientBet,
    QueryMarketMaxMinBetMoney,
    QueryOrderStatus,
    SportsSetInquiry,
} from "./types";

export const obMarket = {
    // 查询注单状态
    queryOrderStatus: (): Promise<Res<QueryOrderStatus[]>> =>
        http("post", "/obsportend/v1/obMarket/yewu13/v1/betOrder/queryOrderStatus"),

    // 注单提前结算
    orderPreSettle: (data: IorderPreSettle): Promise<Res<any>> =>
        http("post", "/obsportend/v1/obMarket/yewu13/v1/betOrder/orderPreSettle", data),

    // 動態投注(單注或多個單注)
    clientBet: (data: IClientBet): Promise<Res<ClientBet>> =>
        http("post", "/obsportend/v1/obMarket/yewu13/v1/betOrder/client/bet", data),

    // 動態投注(串關)
    betParlay: (data: IBetParlay): Promise<Res<ClientBet>> =>
        http("post", "/obsportend/v1/obMarket/yewu13/v1/betOrder/client/betParlay", data),

    // 查询最大最小投注金额
    queryMarketMaxMinBetMoney: (
        data: IqueryMarketMaxMinBetMoney
    ): Promise<Res<QueryMarketMaxMinBetMoney>> =>
        http(
            "post",
            "/obsportend/v1/obMarket/yewu13/v1/betOrder/client/queryMarketMaxMinBetMoney",
            data
        ),

    // 赛事设置
    sportsSet: (data: IsportsSet): Promise<Res<SportsSetInquiry>> =>
        http("post", "/obsportend/v1/obMarket/sportsSet", data),

    // 赛事设置查询
    sportsSetInquiry: (): Promise<Res<SportsSetInquiry>> =>
        http("post", "/obsportend/v1/obMarket/sportsSetInquiry"),
};
