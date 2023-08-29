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
    sortField?: string[];
    sortKey?: string;
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
