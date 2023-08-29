export interface IgameList {
    isRecommend?: number;
}

export interface Ilogin {
    id?: string;
    slotId?: string;
}

export interface IcoinTransfer {
    coin?: string;
    direction?: number; //0上分 1下分
    gameId?: number;
    id?: number;
    name?: string;
    [name: string]: any;
}

export interface IcoinDownBatch {
    coin?: number;
    id?: number;
}

export interface IqueryBalance {
    id?: number;
    name?: string;
}

export interface IqueryBalanceBatch {
    id?: number;
    name?: string;
}

export interface IslotGameList {
    current: number;
    data?: {
        category?: number;
        id?: string;
        name?: string;
    };
    size: number;
    sortField?: [];
    sortKey?: string;
}

export interface IslotGameFavorite {
    direction?: number;
    gameId?: number;
    gameSlotId?: string;
}

export interface IgetBetListByDate {
    current: number;
    data?: {
        endTime?: number;
        groupId?: number | null;
        id?: number | null;
        startTime?: number;
        status?: number;
        username?: string;
    };
    size: number;
    sortField?: [];
    sortKey?: string;
}

export interface IgetBetListByGame {
    current: number;
    data?: {
        endTime?: number;
        startTime?: number;
        username?: string;
    };
    size: number;
    sortField?: [];
    sortKey?: string;
}
