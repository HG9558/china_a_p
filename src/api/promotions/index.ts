// 优惠活动中心
import { http } from "../http";
import type { Res } from "../types";
import type { IfindList, IfindDetail } from "./interface";
import type { FindDetail, FindGroupList, FindList } from "./types";

export const promotions = {
    // 查询所有活动分组
    findGroupList: (): Promise<Res<FindGroupList[]>> =>
        http("post", "/api/v1/promotions/findGroupList"),

    // 按照分组查询所有活动
    findList: (data: IfindList): Promise<Res<FindList[]>> =>
        http("post", "/api/v1/promotions/findList", data),

    // 查询活动详细信息
    findDetail: (data: IfindDetail): Promise<Res<FindDetail>> =>
        http("post", "/api/v1/promotions/findDetail", data),
};
