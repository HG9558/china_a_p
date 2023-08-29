// 首页
import { http } from "../http";
import type { Res } from "../types";
import type { FunBanners, HomeIP, HomeTabs, Init } from "./types";

export const home = {
    //檢查版本
    checkVersion: () => http("post", "/api/v1/home/checkVersion"),

    //初始化
    homeInit: (): Promise<Res<Init>> => http("post", "/api/v1/home/init"),

    //获取Ip
    homeIp: (): Promise<Res<HomeIP>> => http("get", "/api/v1/home/ip"),

    //首页页签
    homeTabs: (): Promise<Res<HomeTabs>> => http("post", "/api/v1/home/tabs"),

    //娱乐页轮播图
    funBanners: (): Promise<Res<FunBanners[]>> => http("post", "/api/v1/home/funBanners"),
};
