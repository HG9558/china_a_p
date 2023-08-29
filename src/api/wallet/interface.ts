export interface IaddUserBank {
    accountName: string;
    accountNo: string;
    bankAddress: string;
    bankName: string;
    mobile: string;
    smsCode: string;
    [name: string]: string;
}

export interface IaddVirtualBank {
    mobile: string;
    smsCode: string;
    usdtAddress: string;
    usdtName: string;
    usdtProtocol: string;
    [name: string]: string;
}

export interface IdeleteVirtualBank {
    id: number;
    status: number;
}

export interface IdeleteUserBank {
    id: number;
    status: number;
}
