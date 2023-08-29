export interface IqueryLatestMarketInfo {
    marketId: number;
    matchInfoId: number;
    matchType: number;
    oddsId: number;
    oddsType?: string;
    placeNum?: string;
    playId: number;
}
export interface IqueryLatestMarketInfoList {
    latestMarketInfoDtoList: LatestMarketInfoDtoList[];
}

export interface LatestMarketInfoDtoList {
    marketId: string;
    matchInfoId: string;
    matchType: number;
    oddsId: string;
    oddsType?: string;
    placeNum?: string;
    playId: string;
}
export interface IgetDateMenuListPB {
    device?: string;
    euid?: string;
    orpt?: string;
    pids?: string;
    versionNewStatus?: string;
}
export interface IvideoAnimationMatches {
    csid?: string;
}
export interface IliveMatchesPB {
    cps?: number;
    cuid?: string;
    euid?: string;
    md?: string;
    sort?: number;
    type?: string;
    userLevel?: number;
}
export interface IgetMatchBaseInfoByMidsPB {
    cuid?: string;
    euid?: string;
    mids?: string;
    sort?: number;
}
export interface IgetMatchDetailPB {
    mid?: string;
    mcid?: string;
    sportId?: string;
}

export interface IgetHotMatchesPageList {
    cpn: number;
    cps: number;
    sportId: number;
    euid?: string; //菜单ID
    device?: "v2_h5_st"; //设备
    sort?: number; //排序
    type?: number; //一级菜单筛选类型
    [name: string]: any;
}

export interface IsetTopping {
    playId: string;
    sportId: string;
    type: string;
}

export interface IcountJointNumber {
    dataSource?: string;
    deviceType: number;
    marketId: string;
    matchId: string;
    matchProcessId?: number;
    matchType: number;
    oddsFinally: string;
    oddsValue: number;
    playId: string;
    openMiltSingle?: number;
    playOptionId: string;
    playOptions?: string;
    scoreBenchmark?: string;
    seriesType: number;
    sportId?: string;
    tenantId?: number;
    tournamentId?: string;
    tournamentLevel?: number;
}
