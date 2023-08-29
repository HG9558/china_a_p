export interface IorderPreSettle {
    deviceType: number;
    frontSettleAmount: string;
    orderNo: string;
    settleAmount: string;
}

export interface IClientBet {
    acceptOdds: number;
    currencyCode: string;
    deviceImei: string;
    deviceType: string;
    openMiltSingle: number;
    seriesOrders?: SeriesOrder[];
}

export interface SeriesOrder {
    fullBet: number;
    orderDetailList: OrderDetailList[];
}

export interface OrderDetailList {
    betAmount: string;
    marketId: string;
    marketTypeFinally: string;
    matchId: string;
    matchType: number;
    oddFinally: string;
    odds: string;
    placeNum: number;
    playId: string;
    playOptionsId: string;
    scoreBenchmark: string;
}

export interface IBetParlay {
    acceptOdds: number;
    deviceImei: string;
    deviceType: string;
    openMiltSingle: number;
    seriesOrders?: PSeriesOrder[];
}

export interface PSeriesOrder {
    fullBet: number;
    orderDetailList: POrderDetailList[];
    seriesSum?: number;
    seriesType?: number;
    seriesOdds?: string;
}

export interface POrderDetailList {
    betAmount: string;
    marketId: string;
    marketTypeFinally: string;
    matchId: string;
    matchType: number;
    oddFinally: string;
    odds: string;
    placeNum: number;
    playId: string;
    playOptionsId: string;
    scoreBenchmark: string;
}

export interface IqueryMarketMaxMinBetMoney {
    orderMaxBetMoney: OrderMaxBetMoney[];
}

export interface OrderMaxBetMoney {
    dataSource?: string;
    deviceType: number;
    marketId: string;
    matchId: string;
    matchProcessId?: string;
    matchType: number;
    oddsFinally?: string;
    oddsValue: number;
    openMiltSingle: number;
    playId: number;
    playOptionId: string;
    playOptions?: string;
    scoreBenchmark?: string;
    seriesType: number;
    sportId?: string;
    tenantId?: string;
    tournamentId?: number;
    tournamentLevel?: number;
    userId?: string;
    [name: string]: any;
}

export interface IsportsSet {
    bet: number;
    market: number;
    push: string;
    pushSound: number;
    shock: number;
}
