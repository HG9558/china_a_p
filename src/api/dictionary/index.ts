import { http } from "../http";
import type { Res } from "../types";
import type { IgetDictionary } from "./interface";
import type { GetDictionary } from "./types";

export const dictionary = {
    // 获取字典
    getDictionary: (data?: IgetDictionary): Promise<Res<GetDictionary>> =>
        http("post", "/api/v1/dictionary/getDictionary", data),
};
