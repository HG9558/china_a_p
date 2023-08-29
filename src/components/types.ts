import type { Swiper } from "swiper/types";

export interface Address {
    value: string;
    text: string;
    children?: Child[];
}

export interface Child {
    value: string;
    text: string;
}

export interface TgetTournamentMatches {
    getTournamentMatches: (euid: string) => void;
    getTournamentMatchesBySportId: (sportId: string) => void;
}

export interface LoginRegisterTabs {
    title: string;
    component: any;
    key?: string;
}

export interface SwiperRef {
    update?: () => void;
    swiperRef?: Swiper;
}

export interface CaptchaRef {
    reset?: () => void;
}

export interface Captcha {
    sessionId?: string;
    token?: string;
    sig?: string;
}

export interface RechargePopupRef {
    start?: () => void;
}

interface Ilist {
    img: any;
}

interface Itabs {
    title: string;
    list: Ilist[];
}

export interface Ideposits {
    title: string;
    icon: any;
    tabs?: Itabs[];
    list?: Ilist[];
}

export interface Iregister {
    promoCode: string;
    promoType: "u" | "a";
}

export interface ISendSmsBtn {
    timeStart: () => void;
    clearTime: () => void;
}
