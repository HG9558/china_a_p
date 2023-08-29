import { centerAgent } from "./centerAgent";
import { depositAndWithdrawal } from "./depositAndWithdrawal";
import { dictionary } from "./dictionary";
import { funds } from "./funds";
import { home } from "./home";
import { invitation } from "./invitation";
import { marketing } from "./marketing";
import { notice } from "./notice";
import { obsportend } from "./obsportend";
import { pay } from "./pay";
import { platform } from "./platform";
import { promoActivity } from "./promoActivity";
import { promotions } from "./promotions";
import { pub } from "./pub";
import { transaction } from "./transaction";
import { upload } from "./upload";
import { user } from "./user";
import { vipInfo } from "./vip";
import { wallet } from "./wallet";

export const API = {
    ...centerAgent,
    ...depositAndWithdrawal,
    ...dictionary,
    ...funds,
    ...home,
    ...invitation,
    ...marketing,
    ...notice,
    ...obsportend,
    ...pay,
    ...platform,
    ...promoActivity,
    ...promotions,
    ...pub,
    ...transaction,
    ...upload,
    ...user,
    ...vipInfo,
    ...wallet,
};
