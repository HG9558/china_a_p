export interface UserLogin {
    id?: number;
    username?: string;
    accountState?: number;
    nickname?: string;
    avatar?: string;
    coin?: string;
    fcoin?: string;
    requireCoin?: string;
    role?: number;
    levelId?: number;
    realName?: string;
    birthday?: string;
    status?: number;
    areaCode?: string;
    mobile?: string;
    sex?: number;
    bindBank?: number;
    score?: number;
    promoCode?: number;
    apiToken?: string;
    passwordHash?: string;
    passwordCoin?: string;
    createdAt?: number;
    autoTransfer?: number;
    upgradeBalance?: string;
    days?: number;
    nicknameUpdate?: number;
    totalDepositCount?: number;
    totalDeposit?: string;
    totalWithdrawalsCount?: number;
    totalWithdrawals?: string;
    [name: string]: any;
}

export interface CoinRewardsList {
    current: number;
    hitCount: boolean;
    orders: Order[];
    pages: number;
    records: Record[];
    searchCount: boolean;
    size: number;
    total: number;
}

export interface Order {
    asc: boolean;
    column: string;
}

export interface Record {
    id: string;
    coin: string;
    receiveStatus: number;
    endDate: Date;
    title: string;
    descrption: string;
    daMaMultiple: null;
    createdAt: number;
    isExpired: number;
    categoryId: number;
    fromName: string;
    checked?: boolean;
    fromFirstRecharge: string;
    [name: string]: any;
}

export interface InviteActivity {
    InviteFirstRecharge: number;
    InviteGame: number;
    InviteLink: string;
    InviteLvUp: number;
    InviteNum: number;
    description: number;
    endTime: number;
    gameReward: number;
    gameRewardExp: number;
    gameRewardLimit: number;
    gameTurnoverTimes: number;
    h5ActivateImage: string;
    h5MainImage: string;
    id: number;
    inviteFirstRecharge: number;
    inviteFirstRechargeRate: number;
    inviteGame: number;
    inviteLink: string;
    inviteLvUp: number;
    inviteNum: number;
    inviteRewardRate: number;
    maxFirstRecharge: number;
    minFirstRecharge: number;
    pcMainImage: number;
    startTime: number;
    vipReward: number;
    vipTimes: number;
    withdrawTimes: number;
    [name: string]: any;
}
