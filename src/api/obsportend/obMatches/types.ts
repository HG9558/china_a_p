export interface MatchValue {
    tid: string;
    tn: string;
    lurl: string;
    list: Datum[];
    isHide: boolean;
    [name: string]: any;
}

export interface MatchesPagePB {
    pages: number;
    data: Datum[];
    cto: string;
}

export interface Datum {
    mcid: string;
    csna: string;
    csid: string;
    tid: string;
    tn: string;
    tlev: number;
    mhid: string;
    mid: string;
    mst: string;
    mcg: number;
    mmp: string;
    mms: number;
    mhlu: string[];
    malut: string;
    mgt: string;
    man: string;
    maid: string;
    tf: boolean;
    mf: boolean;
    mct: string;
    mc: number;
    mhlut: string;
    mat: string;
    ms: number;
    mng: number;
    mle: number;
    mvs: number;
    malu: string[];
    mhn: string;
    mfo: null;
    mhs: number;
    mft: number;
    msc: string[];
    mscs?: { [name: string]: string[] };
    msts: null;
    hps: HP[];
    mlet: string;
    srid: string;
    cmec: null | string;
    seid: string;
    frman: string[];
    lurl: string;
    cds: string;
    frmhn: string[];
    mess: number;
    th: number;
    mo: number;
    mp: number;
    mearlys: number;
    isHide?: boolean;
    mfLoading?: boolean;
    [name: string | number]: any;
}

export interface HP {
    hids?: number;
    hlid?: null;
    hmm?: number;
    hpid: string;
    hpn?: string;
    hpon: string;
    hpt?: number;
    hshow?: string;
    hsw: string;
    hton?: string;
    mid: string;
    title?: Title[];
    hl?: Hl[];
    isHide?: boolean;
    htonLoading?: boolean;
    [name: string]: any;
}

export interface Title {
    osn: string;
    otd: string;
}

export interface Hl {
    hid: string;
    hmt: number;
    hon?: null;
    hs: number;
    hn: number;
    hv: string;
    ol?: Ol[];
    [name: string]: any;
}

export interface Ol {
    cds?: string;
    oid: string;
    on: string;
    onb?: string;
    os: number;
    ot: string;
    otd?: number;
    ots: string;
    otv?: null | string;
    ov: string;
    [name: string]: any;
}

export interface ChampionMatchesPagePB {
    [name: string]: O[];
}

export interface O {
    csid: string;
    mid: string;
    seoy: string;
    hps: CHP[];
    csna: string;
    onTn: string;
    med: string;
    tid: string;
    srid: string;
    mcg: string;
    lurl: string;
    tf: boolean;
    cds: string;
    seid: string;
    tn: string;
    mgt: string;
    tlev: number;
    tnPinYin: string;
    tnS: string;
}

export interface CHP {
    hid: string;
    hps: string;
    hsw: string;
    hpid: string;
    hpon: number;
    hpono: number;
    hs: number;
    hv: null;
    hmt: number;
    hn: number;
    hmed: string;
    hmgt: string;
    ol: COl[];
}

export interface COl {
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

export interface GetCategoryList {
    marketName: string;
    id: string;
    orderNo: number;
    plays: number[];
}

export interface OHl {
    hid: string;
    hmt: number;
    hon: string;
    hs: number;
    hn: number | null;
    hv: string;
    ol: Ol[];
}

export interface OOl {
    cds: string;
    oid: string;
    on: string;
    onb: null;
    os: number;
    ot: string;
    otd: number;
    ots: string;
    otv: string;
    ov: string;
}

export interface Title {
    osn: string;
    otd: string;
}

export interface VideoAnimationUrlPB {
    animation3Url: null;
    path: null;
    styleName: null;
    animationUrl: null;
    referUrl: string;
    videoUrlVOList: VideoURLVOList[];
    iframeUrl: string;
}

export interface VideoURLVOList {
    flvUrl: string;
    muUrl: string;
    sid: string;
    sms: string;
    sts: string;
}

export interface AddOrCancelMatch {
    code: string;
    data: number;
    msg: string;
    ts: number;
}

export interface VideoReferUrlPB {
    referUrl: string;
    aniUrl: string;
}
