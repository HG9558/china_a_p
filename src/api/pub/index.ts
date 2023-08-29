import { http } from "../http";
import { Res } from "../types";
import { Versions } from "./types";

export const pub = {
    versions: (): Promise<Res<Versions>> => http("post", "/api/v1/pub/versions"),
};
