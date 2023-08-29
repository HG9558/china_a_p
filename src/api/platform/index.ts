// 首页 - 三方游戏
import { http } from "../http";
import type { Res } from "../types";
import type {
    IcoinDownBatch,
    IcoinTransfer,
    IgameList,
    IgetBetListByDate,
    IgetBetListByGame,
    Ilogin,
    IqueryBalance,
    IqueryBalanceBatch,
    IslotGameFavorite,
    IslotGameList,
} from "./interface";
import type {
    AllCoinDown,
    CoinTransfer,
    Game,
    GameList,
    GetBetListByDate,
    GetBetListByGame,
    GetPlatBetTabs,
    Login,
    PlatList,
    SlotGameList,
} from "./types";

export const platform = {
    // 游戏列表
    game: (): Promise<Res<Game[]>> => http("post", "/api/v1/platform/game"),

    // 平台列表
    platList: (): Promise<Res<PlatList[]>> => http("post", "/api/v1/platform/platList"),

    // 游戏列表
    gameList: (data: IgameList): Promise<Res<GameList[]>> =>
        http("post", "/api/v1/platform/gameList", data),

    // 登录第三方游戏
    platformLogin: (data: Ilogin): Promise<Res<Login>> =>
        http("post", "/api/v1/platform/login", data),

    // 三方游戏平台(上、下分)
    coinTransfer: (data: IcoinTransfer): Promise<Res<CoinTransfer>> =>
        http("post", "/api/v1/platform/coinTransfer", data),

    // 三方游戏平台->批量下分
    coinDownBatch: (data: IcoinDownBatch) => http("post", "/api/v1/platform/coinDownBatch", data),

    // 三方游戏平台->一键回收
    allCoinDown: (): Promise<Res<AllCoinDown>> => http("post", "/api/v1/platform/allCoinDown"),

    // 查询用户钱包余额
    queryUserWallet: (): Promise<Res<AllCoinDown>> =>
        http("post", "/api/v1/platform/queryUserWallet"),

    // 查詢全部三方游戏平台餘額
    allQueryBalance: (): Promise<Res<AllCoinDown>> =>
        http("post", "/api/v1/platform/allQueryBalance"),

    // 三方游戏余额查询
    queryBalance: (data: IqueryBalance) => http("post", "/api/v1/platform/queryBalance", data),

    // 三方游戏批量余额查询
    queryBalanceBatch: (data: IqueryBalanceBatch[]) =>
        http("post", "/api/v1/platform/queryBalanceBatch", data),

    // 老虎机游戏列表
    slotGameList: (data: IslotGameList): Promise<Res<SlotGameList>> =>
        http("post", "/api/v1/platform/slotGameList", data),

    // 收藏-取消 老虎机游戏
    slotGameFavorite: (data: IslotGameFavorite): Promise<Res<boolean>> =>
        http("post", "/api/v1/platform/slotGameFavorite", data),

    // 根据游戏Id查询投注列表
    getBetListByDate: (data: IgetBetListByDate): Promise<Res<GetBetListByDate>> =>
        http("post", "/api/v1/platform/getBetListByDate", data),

    // 取得注單頁簽
    getPlatBetTabs: (): Promise<Res<GetPlatBetTabs[]>> =>
        http("post", "/api/v1/platform/getPlatBetTabs"),

    // 游戏投注列表
    getBetListByGame: (data: IgetBetListByGame): Promise<Res<GetBetListByGame>> =>
        http("post", "/api/v1/platform/getBetListByGame", data),
};
