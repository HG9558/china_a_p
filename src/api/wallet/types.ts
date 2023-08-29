export interface BankList {
    code: string;
    country: string;
    createdAt: number;
    icon: string;
    id: number;
    name: string;
    sort: number;
    status: number;
    updatedAt: number;
}

export interface BankNums {
    virtual: number;
    bank: number;
}

export interface UserBankList {
    accountName: string;
    accountNo: string;
    bankAddress: string;
    bankName: string;
    icon: string;
    status: number;
    id: number;
    successMark: boolean;
    [name: string]: any;
}

export interface WithdrawalHint {
    bankMax: string;
    bankMin: string;
    bigCoin: string;
    createdAt: string;
    dailyCoin: string;
    completedUserFlow: string;
    dailyNum: number;
    levelId: number;
    usdtrate: string;
    userFlow: string;
    updatedAt: string;
    virtualMax: string;
    virtualMin: string;
}

export interface UserVirtualBankList {
    mark: string;
    status: number;
    usdtAddress: string;
    usdtName: string;
    usdtProtocol: string;
    id: number;
    successMark: boolean;
    [name: string]: any;
}
