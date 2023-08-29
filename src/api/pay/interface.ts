export interface IpayTypeList {
    queryType: string;
}

export interface IpayOnLineList {
    payTypeCode: string;
}

export interface IonlinePay {
    payAmount?: string;
    id: string | number;
    [name: string]: any;
}

export interface IofflinePay {
    coin?: string;
    payChannelType?: string;
    payType?: string;
    [name: string]: any;
}

export interface Iwithdrawal {
    id: number;
    coin: string;
    securePassword: string;
    withdrawalType: number;
    //withdrawalType:0-虚拟币 1-银行卡转账,
}
