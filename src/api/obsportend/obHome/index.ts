// ob体育首页接口
import { http } from "@/api/http";
import type { Res } from "@/api/types";
import type { IgetTournamentMatches } from "./interface";
import type { GetTournamentMatches, InitPB, isLogin } from "./types";

export const obHome = {
    // 判断用户是否登录ob体育
    isLogin: (): Promise<Res<isLogin>> => http("post", "/obsportend/v1/obHome/yewu11/v1/w/isLogin"),

    // 获取体育菜单
    initPB: (): Promise<Res<InitPB[]>> =>
        http("get", "/obsportend/v1/obHome/yewu11/pub/v1/m/menu/initPB"),

    // 获取联赛数据
    getTournamentMatches: (data: IgetTournamentMatches): Promise<Res<GetTournamentMatches[]>> =>
        http("get", "/obsportend/v1/obHome/getTournamentMatches", data),
};
