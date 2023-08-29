export interface VipInfo {
    canJoin: boolean;
    days: number;
    deposit: number;
    nowId: number;
    rules: Rule[];
    score: number;
    upDeposit: number;
    upScore: number;
    username: string;
}

export interface groupId {
    id: number;
    name: string;
    status: number;
}

export interface Rule {
    bonusRate: number;
    gameListName: string;
    groupId: groupId[];
    id: number;
    joinTime: string;
    maxBonus: number;
    maxRebateCoin: number;
    minTransfer: number;
    multiple: number;
    name: string;
    rewardsBirthday: number;
    rewardsMonthly: number;
    rewardsMonthlyMid: number;
    rewardsUpgrade: number;
    scoreDeposit: number;
    scoreRelegation: number;
    scoreUpgrade: number;
    scoreValidityDate: number;
    statmentAmount: number;
    status: number;
    withdrawalNums: number;
    withdrawalTotalCoin: number;
    [name: string]: any;
}

export interface VipDetails {
    levels: Level[];
    rebates: Rebate[];
    reds: Red[];
    weals: Weal[];
}

export interface Level {
    name: string;
    scoreDeposit: number;
    scoreRelegation: number;
    scoreUpgrade: number;
    [name: string]: string | number;
}

export interface Rebate {
    basketball: number;
    chess: number;
    fishion: number;
    live: number;
    lottery: number;
    name: string;
    slot: number;
    sports: number;
    [name: string]: string | number;
}

export interface Red {
    name: string;
    rewardsMonthly: number;
    rewardsMonthlyMid: number;
    [name: string]: string | number;
}

export interface Weal {
    name: string;
    rewardsBirthday: number;
    rewardsUpgrade: number;
    withdrawalTotalCoin: number;
    [name: string]: string | number;
}
