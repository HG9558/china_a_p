import { http } from "../http";
import { Res } from "../types";
import { IfundsDetailsList } from "./interface";
import { FundsDetailsList } from "./types";

export const funds = {
    fundsDetailsList: (data: IfundsDetailsList): Promise<Res<FundsDetailsList>> =>
        http("post", "/api/v1/funds/fundsDetailsList", data),
};
