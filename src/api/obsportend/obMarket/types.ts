export interface QueryOrderStatus {
    betNo: string;
    betTime: string;
    currentEvent: string;
    handleTime: string;
    infoCode: string;
    infoMsg: string;
    infoStatus: number;
    newMaxWinAmount: number;
    newProcessOrder: number;
    noSettleOrderSum: number;
    oddsChange: boolean;
    oddsChangeList: OddsChangeList[];
    orderNo: string;
    reTryCount: number;
    refuseCode: string;
    serverTime: number;
    status: number;
    tryNewProcessBet: string;
}

export interface OddsChangeList {
    betNo: string;
    playOptionsId: string;
    requestedOdds: string;
    usedOdds: string;
}

export interface ClientBet {
    betMoneyTotal: string;
    code: string;
    globalId: string;
    lock: number;
    maxWinMoneyTotal: string;
    msg: string;
    playOptionsId: string;
    orderDetailRespList: Partial<OrderDetailRespList>[];
    seriesOrderRespList: Partial<SeriesOrderRespList>[];
}

export interface OrderDetailRespList {
    addition: string;
    batchNum: string;
    betMoney: string;
    marketType: string;
    marketValues: string;
    matchDay: string;
    matchDetailType: number;
    matchInfo: string;
    matchName: string;
    matchStatus: number;
    matchType: number;
    maxWinMoney: string;
    oddsType: string;
    oddsValues: string;
    orderNo: string;
    orderStatusCode: number;
    playName: string;
    playOptionName: string;
    playOptionsId: string;
    scoreBenchmark: string;
    teamName: string;
}

export interface SeriesOrderRespList {
    betAmount: string;
    marketType: string;
    maxWinAmount: string;
    orderNo: string;
    orderStatusCode: number;
    seriesBetAmount: string;
    seriesSum: number;
    seriesValue: string;
    seriesOdds: string;
}

export interface SportsSetInquiry {
    market: number;
    bet: number;
    push: string;
    shock: number;
    pushSound: number;
}

export interface QueryMarketMaxMinBetMoney {
    list?: QList[];
    totalMaxBetMoney: string;
    totalMinBetMoney: string;
}

export interface QList {
    code?: string;
    globalId?: string;
    minBet: string;
    orderMaxPay: string;
    playId?: string;
    playOptionsId?: string;
    seriesOdds?: string;
    matchType?: null;
}
