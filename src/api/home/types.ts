export interface HomeTabs {
    tabs: Tab[];
    recommendGame: RecommendGame[];
    banner: Banner[];
    obMenuList: ObMenuList[];
    loadingList: LoadingList[];
}

export interface Banner {
    gameId: number;
    href: string;
    id: number;
    img: string;
    nbRedirectType: number;
    promotionsGroupId: number;
    promotionsTagId: number;
    redirect: number;
    redirectType: number;
}

export interface LoadingList {
    id: number;
    terminal: number;
    img: string;
}

export interface ObMenuList {
    id: number;
    menuName: string;
    menuType: number;
    count: string;
    field1: string;
    field2: null;
    grade: number;
    menuId: string;
    parentId: number;
    sort: number;
    status: number;
    containLive: boolean;
    suggest: number;
    createdAt: number;
    updatedAt: number;
    matchesCount: number;
    parentMenuType: number;
}

export interface RecommendGame {
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
    logoType: number | null;
    img: string;
    sort: number;
    isMenu: 0 | 1;
    gameTag: number;
    descrption: string;
    recommendLogo: string;
    betLogo: string;
}

export interface Maintenance {}

export interface Maintenance {}

export interface Tab {
    code: string;
    title: string;
}

export interface Init {
    h5_url: H5URL;
    area_code: AreaCode[];
    oss_server: string;
    inviteSwitch: 0 | 1; //邀请活动 0关闭 1 开启
    pub_setting: PubSetting;
    avatars: Avatars;
}

export interface AreaCode {
    country?: string;
    code?: string;
    name?: string;
}

export interface Avatars {
    host: string;
    avatars: string[];
}

export interface H5URL {
    help: string;
    marketing: string;
    vipDetail: string;
    bettingRules: string;
    about: string;
    tutorial: string;
    activityRoutine: string;
    vip: string;
    welfareCenter: string;
}

export interface PubSetting {
    cooperateSkype: string;
    cooperateWhatapp: string;
    cooperateTelegram: string;
    suggestionsEmail: string;
    appUserCustomerService: string;
    appAgentCustomerService: string;
    cooperatePhone: string;
    webUserCustomerService: string;
    downloadUrl: string;
    cooperateLine: string;
    webAgentCustomerService: string;
    customerServiceEmail: string;
    [name: string]: string;
}

export interface Avatars {
    host: string;
    avatars: string[];
}

export interface H5URL {
    help: string;
    marketing: string;
    bettingRules: string;
    about: string;
    tutorial: string;
    activityRoutine: string;
    vip: string;
    welfareCenter: string;
}

export interface HomeIP {
    ip: string;
    countryCode: null;
}

export interface FunBanners {
    id: number;
    img: string;
    redirect: number;
    redirectType: number;
    nbRedirectType: number;
    promotionsTagId: number | null;
    promotionsGroupId: number | null;
    gameId: number | null;
    href: string | null;
    type: number;
    promotionsLink: string | null;
}
