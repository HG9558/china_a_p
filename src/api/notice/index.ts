// 公告信息
import { http } from "../http";
import type { Res } from "../types";
import type { IreadNotice, IreadNotices, IsendNotice, IgetNotice } from "./interface";
import type {
    RotationNotice,
    SendBbtyNotice,
    SendNotice,
    UnreadCount,
    GetNotice,
    GetPop,
} from "./types";

export const notice = {
    // 用户触发信息读取操作
    readNotice: (data: IreadNotice): Promise<Res<any>> =>
        http("post", "/api/v1/notice/readNotice", data),

    // 用户批量已读读取操作
    readNotices: (data: IreadNotices): Promise<Res<any>> =>
        http("post", "/api/v1/notice/readNotices", data),

    // 跑马灯-轮播公告
    rotationNotice: (): Promise<Res<RotationNotice[]>> =>
        http("post", "/api/v1/notice/rotationNotice"),

    // 获取体育信息
    sendBbtyNotice: (): Promise<Res<SendBbtyNotice[]>> =>
        http("post", "/api/v1/notice/sendBbtyNotice"),

    // 获取公告
    sendNotice: (data: IsendNotice): Promise<Res<SendNotice>> =>
        http("post", "/api/v1/notice/sendNotice", data),

    // 获取用户公告
    getNotice: (data: IgetNotice): Promise<Res<GetNotice>> =>
        http("post", "/api/v1/notice/getNotice", data),

    // 获取系统消息、通知未读数据
    unreadCount: (): Promise<Res<UnreadCount[]>> => http("post", "/api/v1/notice/unreadCount"),

    // 获取首页公告
    getPop: (): Promise<Res<GetPop[]>> => http("post", "/api/v1/notice/getPop"),
};
