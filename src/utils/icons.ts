import ic_sports_5 from "@/assets/sports/ic_sports_5.png";
import ic_sports_7 from "@/assets/sports/ic_sports_7.png";
import ic_sports_13 from "@/assets/sports/ic_sports_13.png";
import ic_sports_14 from "@/assets/sports/ic_sports_14.png";
import ic_sports_16 from "@/assets/sports/ic_sports_16.png";
import ic_sports_17 from "@/assets/sports/ic_sports_17.png";
import ic_sports_18 from "@/assets/sports/ic_sports_18.png";
import ic_sports_19 from "@/assets/sports/ic_sports_19.png";

import ic_sports_active_5 from "@/assets/sports/ic_sports_active_5.png";
import ic_sports_active_7 from "@/assets/sports/ic_sports_active_7.png";
import ic_sports_active_13 from "@/assets/sports/ic_sports_active_13.png";
import ic_sports_active_14 from "@/assets/sports/ic_sports_active_14.png";
import ic_sports_active_16 from "@/assets/sports/ic_sports_active_16.png";
import ic_sports_active_17 from "@/assets/sports/ic_sports_active_17.png";
import ic_sports_active_18 from "@/assets/sports/ic_sports_active_18.png";
import ic_sports_active_19 from "@/assets/sports/ic_sports_active_19.png";

import ic_official from "@/assets/games/ic_official.png";
import ic_recommend from "@/assets/games/ic_recommend.png";
import ic_popular from "@/assets/games/ic_popular.png";

import ic_qq_pay from "@/assets/finance/ic_qq_pay.png";
import ic_alipay from "@/assets/finance/ic_alipay.png";
import ic_bank_transfer from "@/assets/finance/ic_bank_transfer.png";
import ic_cloud_pay from "@/assets/finance/ic_cloud_pay.png";
import ic_union_pay from "@/assets/finance/ic_union_pay.png";
import ic_digital_currency from "@/assets/finance/ic_digital_currency.png";
import ic_wechat from "@/assets/finance/ic_wechat.png";
import ACTIVITIES from "@/assets/finance/ACTIVITIES.png";
import ADJUST_ACCOUNTS from "@/assets/finance/ADJUST_ACCOUNTS.png";
import DEPOSIT from "@/assets/finance/DEPOSIT.png";
import OTHER from "@/assets/finance/OTHER.png";
import PREFERENTIAL from "@/assets/finance/PREFERENTIAL.png";
import REBATE from "@/assets/finance/REBATE.png";
import TRANSFER from "@/assets/finance/TRANSFER.png";
import WELFARE from "@/assets/finance/WELFARE.png";
import WITHDRAW from "@/assets/finance/WITHDRAW.png";

import ic_game_1 from "@/assets/games/ic_game_1.png"; //体育赛事
import ic_game_2 from "@/assets/games/ic_game_2.png"; //电子游戏
import ic_game_3 from "@/assets/games/ic_game_3.png"; //真人娱乐
import ic_game_4 from "@/assets/games/ic_game_4.png"; //捕鱼游戏
import ic_game_5 from "@/assets/games/ic_game_5.png"; //棋牌游戏
import ic_game_6 from "@/assets/games/ic_game_6.png"; //电子竞技
import ic_game_7 from "@/assets/games/ic_game_7.png"; //彩票投注

interface Icons {
    [name: number]: any;
}
interface IgameTags {
    [name: number]: { label: string; icon: any };
}
interface Ifinances {
    ZFB: any;
    WECHAT: any;
    BANK_TRANSFER: any;
    DIGITAL_CURRENCY: any;
    CLOUD_PAY: any;
    UNION_PAY: any;
    QQ_PAY: any;
    [name: string]: any;
}

export const sportsUn: Icons = {
    5: ic_sports_5,
    1001: ic_sports_5,
    7: ic_sports_7,
    1002: ic_sports_7,
    13: ic_sports_13,
    14: ic_sports_14,
    16: ic_sports_16,
    17: ic_sports_17,
    18: ic_sports_18,
    19: ic_sports_19,
};

export const sportsActive: Icons = {
    5: ic_sports_active_5,
    1001: ic_sports_active_5,
    7: ic_sports_active_7,
    1002: ic_sports_active_7,
    13: ic_sports_active_13,
    14: ic_sports_active_14,
    16: ic_sports_active_16,
    17: ic_sports_active_17,
    18: ic_sports_active_18,
    19: ic_sports_active_19,
};

export const gameTags: IgameTags = {
    1: { label: "推荐", icon: ic_official },
    2: { label: "热门", icon: ic_recommend },
    3: { label: "官方", icon: ic_popular },
};

export const finances = (type: string) => {
    switch (type) {
        case "ZFB":
            return ic_alipay;
        case "WECHAT":
            return ic_wechat;
        case "BANK_TRANSFER":
            return ic_bank_transfer;
        case "DIGITAL_CURRENCY":
            return ic_digital_currency;
        case "CLOUD_PAY":
            return ic_cloud_pay;
        case "UNION_PAY":
            return ic_union_pay;
        case "QQ_PAY":
            return ic_qq_pay;
        case "ACTIVITIES":
            return ACTIVITIES;
        case "ADJUST_ACCOUNTS":
            return ADJUST_ACCOUNTS;
        case "DEPOSIT":
            return DEPOSIT;
        case "PREFERENTIAL":
            return PREFERENTIAL;
        case "REBATE":
            return REBATE;
        case "TRANSFER":
            return TRANSFER;
        case "WELFARE":
            return WELFARE;
        case "WITHDRAW":
            return WITHDRAW;
        default:
            return OTHER;
    }
};

export const gamesIcons: Icons = {
    1: ic_game_1,
    2: ic_game_2,
    3: ic_game_3,
    4: ic_game_4,
    5: ic_game_5,
    6: ic_game_6,
    7: ic_game_7,
};
