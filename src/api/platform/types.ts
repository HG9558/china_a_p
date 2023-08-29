export interface PlatList extends AList {
    id: number;
    name: string;
    nameZh: string;
    status: number;
    walletName: string;
    [name: string]: any;
}

export interface Game {
    id: number;
    name: string;
    nameAbbr: string;
    ratio: null;
    list: GList[];
    active?: number;
    activityRecommendList: ActivityRecommendList[];
    newArr?: [GList[]];
}

export interface ActivityRecommendList {
    id: number;
    title: string;
    type: number;
    rebate?: string;
}

export interface GList {
    id: number;
    name: string;
    icon: string;
    platListId: string;
    groupId: number;
    status: number;
    isRecommend: number;
    recommendSort: number;
    maintenance: Maintenance;
    supportIframe: boolean;
    img: string;
    sort: number;
    isMenu: 0 | 1;
    gameTag: number;
    logoType: number | null;
    descrption: null | string;
    recommendLogo: string;
    betLogo: string;
}

export interface Maintenance {}

export interface Promotion {
    id: string;
    category: string;
    name: string;
    rebate: string;
}

export interface Promotion {
    id: string;
    category: string;
    name: string;
    rebate: string;
}

export interface GetPlatBetTabs {
    id: number | null;
    name: string;
    platListId: null | string;
    groupId: number | null;
    sort: number | null;
    gameList: GameList[] | null;
}

export interface GameList {
    id: number;
    name: string;
    icon: string;
    platListId: string;
    groupId: number;
    status: number;
    isRecommend: number;
    recommendSort: number;
    maintenance: Maintenance;
    supportIframe: boolean;
    img: string;
    sort: number;
}

export interface Maintenance {}

export interface GetBetListByDate {
    current: number;
    list: DList[];
    pages: number;
    size: number;
    total: number;
    totalAmount: number;
    totalProfit: number;
    totalValidBet: number;
    unSettleCount: number;
    [name: string]: any;
}

export interface DList {
    createdAt: number;
    dtCompleted: number;
    dtStarted: number;
    gameId: number;
    gameName: string;
    gamePlatId: number;
    gameTypeId: string;
    gameTypeName: string;
    id: string;
    payout: number;
    stake: number;
    transactionId: string;
    updatedAt: number;
    validBet: number;
    viewSportJson: ViewSportJSON[];
    xbProfit: number;
    xbStatus: string;
    xbUsername: string;
    [name: string]: any;
}

export interface ViewSportJSON {
    betName: string;
    betOptionName: string;
    betStatus: number;
    betTime: number;
    isLive: boolean;
    isParlay: boolean;
    matchName: string;
    matchScore: string;
    matchTeamsName: string;
    matchTime: number;
    maxPayout: number;
    odds: number;
    oddsTypeName: string;
    payout: number;
    seriesType: number;
    sportName: string;
    stake: number;
    teamsScore: string;
    transactionId: string;
}

export interface GetBetListByGame {
    current?: number;
    list?: GList[];
    pages?: number;
    size?: number;
    total: number;
    totalAmount: number;
    totalProfit: number;
    totalValidBet?: number;
    unSettleCount?: number;
    [name: string]: any;
}

export interface GList {
    gameId: number;
    gameName: string;
    gamePlatId: number;
    totalAmount: string;
    totalBet: string;
    totalProfit: string;
    [name: string]: any;
}

export interface Login {
    type: number;
    url: string;
    coin: string;
    isInteger: number; //是否支持浮点
    gameId: number;
    gameName: string;
    platListId: number;
}

export interface GameList extends GList {
    id: number;
    name: string;
    icon: string;
    platListId: string;
    groupId: number;
    status: number;
    isRecommend: number;
    recommendSort: number;
    maintenance: Maintenance;
    supportIframe: boolean;
    img: string;
    sort: number;
    [name: string]: any;
}

export interface Maintenance {}

export interface SlotGameList {
    current: string;
    size: string;
    list: SList[];
    total: string;
    pages: string;
    hotCount: string;
    newCount: string;
    favoriteCount: string;
    allCount: string;
}

export interface SList {
    id: string;
    name: string;
    img: string;
    isNew: number;
    status: number;
    gameTag: number;
    favoriteStar: number;
    hotStar: number;
    isFavorite: number;
}

export interface AllCoinDown {
    coin: string;
    gameCoin: string;
    freezeCoin: string;
    list?: AList[];
    sumCoin: string;
}

export interface AList {
    id: number;
    coin: string;
    gameName?: string;
    code: number;
    msg: string;
    activityUserStatus: number;
    activityApplyOrderId: null | string;
}

export interface CoinTransfer {
    id: number;
    coin: string;
    platCoin: string;
    orderId: string;
}
