export interface IsendTransactions {
    current?: number;
    data?: {
        category?: number;
        endDate?: number;
        startDate?: number;
        status?: number;
    };
    size: number;
    sortField?: string[];
    sortKey?: string;
}
