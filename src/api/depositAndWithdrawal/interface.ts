export interface IdepositRecords {
    current: number;
    data?: DataClass;
    size: number;
    sortField?: [];
    sortKey?: "ASC" | "DESC";
}

export interface DataClass {
    queryTime: string;
    transactionStatus: string;
    transactionType: string;
}

export interface IwithdrawalRecords extends IdepositRecords {}
