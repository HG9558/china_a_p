// ob体育赛事接口
import { http } from "@/api/http";
import type { Res } from "@/api/types";
import type {
    IaddOrCancelMatch,
    IchampionMatchesPagePB,
    IcollectH5ListBottom,
    IgetCategoryList,
    IgetMatchOddsInfoPB,
    IgetTournamentMatchesBySportId,
    ImatcheResultPB,
    ImatchesPagePB,
    IsearchForAppPB,
    IvideoAnimationUrlPB,
} from "./interface";
import type {
    AddOrCancelMatch,
    ChampionMatchesPagePB,
    Datum,
    GetCategoryList,
    HP,
    MatchesPagePB,
    VideoAnimationUrlPB,
    VideoReferUrlPB,
} from "./types";
import { GetTournamentMatches } from "../obHome/types";

export const obMatches = {
    // 赛事分页查询
    matchesPagePB: (data: ImatchesPagePB): Promise<Res<MatchesPagePB>> =>
        http("post", "/obsportend/v1/obMatches/yewu11/v1/m/matchesPagePB", data),

    // 赛事搜索
    searchForAppPB: (data: IsearchForAppPB): Promise<Res<Datum[]>> =>
        http("post", "/obsportend/v1/obMatches/yewu11/v1/hotSearch/searchForAppPB", data),

    // 获取关注赛事列表
    collectH5ListBottom: (data: IcollectH5ListBottom): Promise<Res<Datum[]>> =>
        http("post", "/obsportend/v1/obMatches/yewu11/v1/m/collectH5ListBottom", data),

    // 赛事关注-取消关注
    addOrCancelMatch: (data: IaddOrCancelMatch): Promise<Res<AddOrCancelMatch>> =>
        http("post", "/obsportend/v1/obMatches/yewu13/v1/userCollection/addOrCancelMatch", data),

    // 获取玩法集
    getCategoryList: (data: IgetCategoryList): Promise<Res<GetCategoryList[]>> =>
        http("get", "/obsportend/v1/obMatches/yewu11/v1/w/category/getCategoryList", data),

    // 获取赛事玩法
    getMatchOddsInfoPB: (data: IgetMatchOddsInfoPB): Promise<Res<HP[]>> =>
        http("post", "/obsportend/v1/obMatches/yewu11/v1/m/matchDetail/getMatchOddsInfoPB", data),

    // 获取视频滚球赛事
    getVideosPB: () => http("get", "/obsportend/v1/obMatches/yewu11/v1/m/getVideosPB"),

    // 获取赛事动画和视频播放链接
    videoAnimationUrlPB: (data: IvideoAnimationUrlPB): Promise<Res<VideoAnimationUrlPB>> =>
        http("post", "/obsportend/v1/obMatches/yewu11/v1/w/videoAnimationUrlPB", data),

    // 获取视频referUrl
    videoReferUrlPB: (): Promise<Res<VideoReferUrlPB>> =>
        http("post", "/obsportend/v1/obMatches/yewu11/v1/w/videoReferUrlPB"),

    // 冠军赛事查询
    championMatchesPagePB: (data: IchampionMatchesPagePB): Promise<Res<ChampionMatchesPagePB>> =>
        http("post", "/obsportend/v1/obMatches/yewu11/v1/m/championMatchesPagePB", data),

    // 赛果查询
    matcheResultPB: (data: ImatcheResultPB): Promise<Res<MatchesPagePB>> =>
        http("post", "/obsportend/v1/obMatches/yewu11/v1/m/matcheResultPB", data),

    // 根据赛种获取联赛列表
    getTournamentMatchesBySportId: (
        data: IgetTournamentMatchesBySportId
    ): Promise<Res<GetTournamentMatches[]>> =>
        http("post", "/obsportend/v1/obMatches/getTournamentMatchesBySportId", data),
};
