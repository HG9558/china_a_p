// ob体育原生api接口
import { http } from "@/api/http";
import type { Res } from "@/api/types";
import type { Datum, MatchesPagePB } from "../obMatches/types";
import type {
    IcountJointNumber,
    IgetDateMenuListPB,
    IgetHotMatchesPageList,
    IgetMatchBaseInfoByMidsPB,
    IgetMatchDetailPB,
    IliveMatchesPB,
    IqueryLatestMarketInfo,
    IqueryLatestMarketInfoList,
    IsetTopping,
    IvideoAnimationMatches,
} from "./interface";
import type { CountJointNumber, FrontListPB, QueryLatestMarketInfoList } from "./types";
import { UserLogin } from "@/api/user/types";

export const obSport = {
    // 获取用户信息
    getUserInfo: () => http("get", "/obsportend/v1/obSport/yewu12/api/user/getUserInfo"),

    // 查询最新盘口数据
    queryLatestMarketInfo: (data: IqueryLatestMarketInfo) =>
        http(
            "post",
            "/obsportend/v1/obSport/yewu13/v1/betOrder/client/queryLatestMarketInfo",
            data
        ),

    // 多個查询最新盘口数据
    queryLatestMarketInfoList: (
        data: IqueryLatestMarketInfoList
    ): Promise<Res<QueryLatestMarketInfoList[]>> =>
        http(
            "post",
            "/obsportend/v1/obSport/yewu13/v1/betOrder/client/queryLatestMarketInfoList",
            data
        ),

    // 公告api
    frontListPB: (): Promise<Res<FrontListPB>> =>
        http("post", "/obsportend/v1/obSport/yewu11/v2/notice/frontListPB"),

    // 公告api
    headListPB: () => http("post", "/obsportend/v1/obSport/yewu11/v2/notice/headListPB"),

    // 历史查询记录
    queryHistoryPB: () => http("post", "/obsportend/v1/obSport/yewu11/v1/hotSearch/queryHistoryPB"),

    // 早盘-串关统计每天赛事数
    getDateMenuListPB: (data: IgetDateMenuListPB) =>
        http("post", "/obsportend/v1/obSport/yewu11/v2/menu/getDateMenuListPB", data),

    // 体育赛事直播API
    videoAnimationMatches: (data: IvideoAnimationMatches) =>
        http("post", "/obsportend/v1/obSport/yewu11/v1/videoAnimationMatches", data),

    // 滚球赛事信息
    liveMatchesPB: (data: IliveMatchesPB) =>
        http("post", "/obsportend/v1/obSport/yewu11/v1/m/liveMatchesPB", data),

    // 获取单个赛事信息
    getMatchBaseInfoByMidsPB: (data: IgetMatchBaseInfoByMidsPB) =>
        http("post", "/obsportend/v1/obSport/yewu11/v1/m/getMatchBaseInfoByMidsPB", data),

    // 获取赛事详情
    getMatchDetailPB: (data: IgetMatchDetailPB): Promise<Res<Datum>> =>
        http("post", "/obsportend/v1/obSport/yewu11/v1/m/matchDetail/getMatchDetailPB", data),

    // 获取推荐赛事
    getHotMatchesPageList: (data: IgetHotMatchesPageList): Promise<Res<MatchesPagePB>> =>
        http("post", "/obsportend/v1/obSport/getHotMatchesPageList", data),

    // 检查PM游戏是否取消维护
    checkObStatus: (): Promise<Res<any>> => http("post", "/obsportend/v1/obSport/checkObStatus"),

    // 玩法置顶或取消置顶
    setTopping: (data: IsetTopping): Promise<Res<boolean>> =>
        http("post", "/obsportend/v1/obSport/setTopping", data),

    // 获取投注组合
    countJointNumber: (data: IcountJointNumber[]): Promise<Res<CountJointNumber>> =>
        http("post", "/obsportend/v1/obSport/countJointNumber", data),
};
