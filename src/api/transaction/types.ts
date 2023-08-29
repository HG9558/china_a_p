export interface SendTransactions {
    current: number;
    list: TList[];
    pages: number;
    size: number;
    total: number;
}

export interface TList {
    category: number;
    coin: number;
    coinBefore: number;
    createdAt: number;
    icon: string;
    id: number;
    outIn: number;
    payCtCode: string;
    payCtName: string;
    referId: number;
    status: number;
    subCategory: number;
    uid: number;
    updatedAt: number;
    username: string;
}
