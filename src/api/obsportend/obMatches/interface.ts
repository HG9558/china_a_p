export interface ImatchesPagePB {
    cpn: number;
    cps: number;
    device?: string;
    euid: string;
    md?: string | null;
    sort: number;
    tid?: string | null;
    type: number;
}

export interface IsearchForAppPB {
    keyword: string;
    matchType?: string;
    md?: string;
    searchSportType?: string;
}

export interface IcollectH5ListBottom {
    sort: number;
    sportId?: string;
    status: number;
}

export interface IaddOrCancelMatch {
    cf: number;
    cuid?: number;
    mid: number;
}

export interface IgetCategoryList {
    sportId?: string;
    mid?: string;
}

export interface IgetMatchOddsInfoPB {
    mcid?: string;
    mid?: string;
    sportId?: string;
}

export interface IvideoAnimationUrlPB {
    mid: string;
    type: string;
    device?: string;
}

export interface IchampionMatchesPagePB {
    euid?: string;
    cpn?: number;
    sort: number;
    type?: number;
}

export interface ImatcheResultPB {
    cpn: number;
    cps: number;
    cuid?: string;
    device?: string;
    euid: number;
    md: number;
    sort: number;
    tid?: string;
    type: number;
}

export interface IgetTournamentMatchesBySportId {
    sportId: string;
}
