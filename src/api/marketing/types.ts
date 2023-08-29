export interface MarketingReports {
    inviteUrl: string;
    inviteUserCount: number;
    promoCode: number;
    totalBetturnoverCoin: number;
    totalCoin: number;
    totalFirstdepositCoin: number;
    weekAllCoin: number;
    weekBetturnoverCoin: number;
    weekFirstdepositCoin: number;
    [name: string]: string | number;
}

export interface PlayerActivityDetails {
    current: number;
    list: PList[];
    pages: number;
    size: number;
    total: number;
}

export interface PList {
    coin: number;
    createdAt: number;
    rewardscoin: number;
    uid: number;
    username: string;
}

export interface RewardsCommissionDetails {
    current: number;
    list: RList[];
    pages: number;
    size: number;
    total: number;
}

export interface RList {
    agentLevel: number;
    avatar: string;
    category: number;
    coin: number;
    commissionCount: number;
    commissionId: number;
    createdAt: number;
    levelCode: string;
    levelId: number;
    monthName: Date;
    rewardsCoin: number;
    uid: number;
    username: string;
}
