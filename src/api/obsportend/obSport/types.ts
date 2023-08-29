export interface QueryLatestMarketInfoList {
    id: string;
    status: number;
    marketValue: string;
    matchHandicapStatus: number;
    matchStatus: number;
    matchInfoId: number;
    matchOver: number;
    matchPeriodId: number;
    placeNum: null;
    playId: number;
    score: string;
    marketOddsList: MarketOddsList[];
}

export interface MarketOddsList {
    oddsStatus: string;
    id: string;
    oddsValue: number;
    oddsType: string;
    playOptions: string;
}

export interface CountJointNumber {
    betAmountInfo: BetAmountInfo[];
}

export interface BetAmountInfo {
    minBet: string;
    num: number;
    orderMaxPay: string;
    seriesOdds: string;
    type: string;
    showKeyboard?: boolean;
    betAmount?: string;
    [name: string]: any;
}

export interface FrontListPB {
    nb: Fdata[];
    nt: Fdata[];
    nl: Fdata[];
}

export interface Fdata {
    context: string;
    id: string;
    isShuf: number;
    isTop: number;
    noticeType: number;
    noticeTypeName: string;
    sendTime: string;
    sendTimeOther: string;
    title: string;
}
