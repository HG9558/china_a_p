export interface isLogin {
    isLogin: boolean;
}

export interface InitPB {
    count: string;
    field1: null | string;
    field2: null | string;
    grade: number | null;
    menuId: string;
    menuName: string;
    menuType: number;
    parentId: number;
    containLive: boolean;
    subList: InitPB[] | null;
    topMenuList: TopMenuList[] | null;
    sort: number;
    suggest: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    matchesCount: number | null;
}

export interface TopMenuList {
    count: string;
    field1: string;
    field2: null;
    grade: null;
    menuId: string;
    menuName: string;
    menuType: number;
    parentId: null;
    containLive: boolean;
    subList: any[];
    topMenuList: any[];
}

export interface GetTournamentMatches {
    tnS: string;
    list: TList[];
}

export interface TList {
    csid: string;
    mid: string;
    seoy: string;
    hps: HP[];
    csna: string;
    onTn: string;
    med: string;
    tid: string;
    srid: string;
    mcg: number;
    lurl: string;
    tf: boolean;
    cds: string;
    seid: string;
    tn: string;
    mgt: string;
    tlev: number;
    tnPinYin: string;
    tnS: string;
    [name: string]: any;
}

export interface HP {
    hid: string;
    hps: string;
    hsw: string;
    hpid: string;
    hpon: string;
    hpono: number;
    hs: number;
    hv: string;
    hmt: number;
    hn: number;
    hmed: string;
    hmgt: string;
    isHide?: boolean;
    ol: Ol[];
}

export interface Ol {
    oid: string;
    os: number;
    otd: number;
    ot: string;
    ov: string;
    on: string;
    cds: string;
    ots: string;
    oddSort: number;
}
