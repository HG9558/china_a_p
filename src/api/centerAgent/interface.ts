export interface Ireports {
    endTime?: number;
    startTime?: number;
}

export interface IplayerActivityDetails {
    current: number;
    data?: {
        category?: number;
        endTime?: number;
        startTime?: number;
        username?: string;
    };
    size: number;
    sortField?: [];
    sortKey?: string;
}

export interface IdepositWithdrawalDetails {
    current: number;
    data?: {
        category?: number;
        endTime?: number;
        startTime?: number;
        username?: string;
    };
    size: number;
    sortField?: [];
    sortKey?: string;
}

export interface IplayerActivityDetailsStatistics {
    category?: number;
    endTime?: number;
    startTime?: number;
    username?: string;
}

export interface IdepositWithdrawalDetailsStatistics {
    category?: number;
    endTime?: number;
    startTime?: number;
    username?: string;
}

export interface IdepositWithdrawalUserDetails {
    current: number;
    data?: {
        uid: number;
    };
    size: number;
    sortField?: [];
    sortKey?: string;
}

export interface IdepositWithdrawalUserDetailsStatistics {
    uid?: number;
}

export interface IrewardsCommissionDetails {
    current: number;
    data?: {
        agentLevel?: number;
        category?: number;
        endTime?: number;
        startTime?: number;
        subCategory?: number;
        username?: string;
    };
    size: number;
    sortField?: [];
    sortKey?: string;
}

export interface IrewardsCommissionDetailsStatistics {
    agentLevel?: number;
    category?: number;
    endTime?: number;
    startTime?: number;
    subCategory?: number;
    username?: string;
}

export interface IrewardsCommissionActiveDetails {
    current: number;
    data?: {
        commissionId?: number;
    };
    size: number;
    sortField?: [];
    sortKey?: string;
}

export interface ImyTeamStatisticsHisOrNew {
    endTime?: number;
    startTime?: number;
}

export interface ImyTeamStatisticsBySubHisOrNew {
    endTime?: number;
    startTime?: number;
}

export interface IsubordinateList {
    current: number;
    data?: {
        agentLevel?: number;
        endTime?: number;
        role?: number;
        startTime?: number;
        status?: number;
        username?: string;
    };
    size: number;
    sortField?: [];
    sortKey?: string;
}

export interface IsubordinateListZT {
    current: number;
    data?: {
        uid?: number;
        username?: string;
    };
    size: number;
    sortField?: [];
    sortKey?: string;
}

export interface ItransferOrWithDraw {
    bankAccount?: number;
    coinPassword?: string;
    type: number;
    uid: number;
    usedCoin: number;
}

export interface bindInviteAndIp {
    i_code: string;
}
