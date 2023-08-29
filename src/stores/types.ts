import type { HP, Ol, Hl } from "@/api/obsportend/obMatches/types";
import type { QList } from "@/api/obsportend/obMarket/types";

export interface Imatch {
    mid: string;
    msc?: string[];
    tn: string;
    csna: string;
    mcg: number;
    mhn: string;
    man: string;
    hps?: HP[];
    mhs?: number;
    [name: string]: any;
}

export interface Value {
    match: Partial<Imatch>;
    odds: Ol;
    hp: HP;
    hl: Hl;
    ov?: string;
    hid: string;
    oid: string;
    oddsStatus?: string | number;
    showKeyboard?: boolean;
    betAmount?: string;
    queryMoney?: QList;
    [name: string]: any;
    totalMaxBetMoney?: string;
    totalMinBetMoney?: string;
}
