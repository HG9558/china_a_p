export interface ActivityRecirdlist {
    list: DataList;
    unclaimedQuantity: number;
}

export interface DataList {
    current: number;
    list: ListElement[];
    pages: number;
    size: number;
    total: number;
}

export interface ListElement {
    title: string;
    deliveryAt: string;
    firstAmount: number;
    rebateAmount: number;
    registerAt: number;
    state: number;
    type: number;
    userName: string;
}

export interface GetInvitationData {
    activityEnd: string;
    activityStart: string;
    activityState: number;
    description: string;
    firstDepositMax: number;
    firstDepositMin: number;
    gameDtoList: GameDtoList[];
    h5ActivateImage: string;
    h5MainImage: string;
    inviteFirstDepositRate: number;
    inviteFirstRecharge: number;
    inviteGame: number;
    inviteLink: string;
    inviteLvUp: number;
    inviteNum: number;
    inviteesFirstDepositRate: number;
    pcActivateImage: string;
    pcMainImage: string;
    promotionDtoList: PromotionDtoList[];
    withdrawMultiple: number;
    [name: string]: any;
}

export interface GameDtoList {
    gameName: string;
    gameRate: number;
    gameWithdrawMultiple: number;
}

export interface PromotionDtoList {
    promotionWithdrawMultiple: number;
    vipLevelName: string;
    vipReward: number;
}
