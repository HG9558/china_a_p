export interface FundsDetailsList {
    current: number;
    list: FList[];
    pages: number;
    size: number;
    total: number;
}

export interface FList {
    coin: number;
    coinNow: number;
    createdAt: number;
    iconType: string;
    outIn: number;
    referId: string;
    transactionDetails: string;
    transactionType: string;
    [name: string]: any;
}
