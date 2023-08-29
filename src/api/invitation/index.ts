import { http } from "../http";
import { Res } from "../types";
import { IactivityRecirdlist } from "./interface";
import { ActivityRecirdlist, GetInvitationData } from "./types";

export const invitation = {
    // 邀请活动-活动记录
    activityRecirdlist: (data: IactivityRecirdlist): Promise<Res<ActivityRecirdlist>> =>
        http("post", "/api/v1/invitation/activityRecirdlist", data),

    // 邀请活动-邀请页面
    getInvitationData: (): Promise<Res<GetInvitationData>> =>
        http("post", "/api/v1/invitation/getInvitationData"),
};
