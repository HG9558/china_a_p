export interface DepositRecords {
    current: number;
    list?: DList[];
    pages: number;
    size: number;
    total: number;
}

export interface DList {
    coinApply: number;
    createdAt: number;
    orderNo: string;
    payChannelName: string;
    payTypeName: string;
    status: number;
    payType: string;
    [name: string]: any;
}

export interface WithdrawalRecords {
    current: number;
    list?: WList[];
    pages: number;
    size: number;
    total: number;
}

export interface WList {
    coinApply: number;
    createdAt: number;
    orderNo: string;
    status: number;
    payType: string;
    transactionMethod: string;
    transactionType: string;
    [name: string]: any;
}

export interface DepositTransactionType {
    payName: string;
    payType: string;
}
