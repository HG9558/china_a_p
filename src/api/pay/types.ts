export interface PayTypeList {
    enableRecharge: number;
    enableWithdraw: number;
    icon: string;
    payName: string;
    payType: string;
    sort: number;
    status: number;
}

export interface PayOnLineList {
    id: number;
    payChannelShowName: string;
    payChannelName: string;
    payChannelMin: number;
    payChannelMax: number;
    payChannelRange: string;
    customAmount: number;
    discountStatus: number;
    offerDescription: string;
    realName: number;
    recommend: number;
    icon: string;
    rechargeDescription: string;
}

export interface OnlinePay {
    category: number;
    url: string;
}

export interface Withdrawal {
    id: number;
    failureMessage: string;
    requestLog: string;
    responseLog: string;
    successRequest: boolean;
    withdrawalOrderNo: string;
}
