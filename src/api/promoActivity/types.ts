export interface GetPromoTag {
    id: number;
    name: string;
    sort: string;
}

export interface AnalyzeTagPromoActivityList {
    id: number;
    name: string;
    promoActivityList: APromoActivityList[];
    sort: string;
}

export interface APromoActivityList {
    activityEndTime: number;
    activityStartTime: number;
    applyMode: number;
    bonusType: number;
    detailText: string;
    deviceH5: number;
    deviceMobile: number;
    deviceWeb: number;
    displayEndTime: number;
    displayStartTime: number;
    gameList: string;
    id: number;
    label: number;
    link: string;
    mobileDetailPic: string;
    mobileListPic: string;
    participateUserThFilenameURL: string;
    periodType: number;
    plateRecommend: number;
    promotionsTagIdList: string;
    scoreCalType: number;
    scoreLevelList: ScoreLevelList[];
    sort: string;
    target: number;
    targetAgentUserId: number;
    title: string;
    userLevelIdList: string;
    userList: any[];
    webDetailPic: string;
    webListPic: string;
}

export interface ScoreLevelList {
    amount: number;
    bonus: number;
    limitMax: number;
    multiple: number;
    percentage: number;
}

export interface GetTagPromoActivityList {
    id: number;
    name: string;
    promoActivityList: PromoActivityList[];
    sort: string;
}

export interface PromoActivityList {
    activityEndTime: number;
    activityStartTime: number;
    applyMode: number;
    bonusType: number;
    detailText: string;
    deviceH5: number;
    deviceMobile: number;
    deviceWeb: number;
    displayEndTime: number;
    displayStartTime: number;
    gameList: string;
    id: number;
    label: number;
    link: string;
    mobileDetailPic: string;
    mobileListPic: string;
    participateUserThFilenameURL: string;
    periodType: number;
    plateRecommend: number;
    promotionsTagIdList: string;
    scoreCalType: number;
    scoreLevelList: ScoreLevelList[];
    sort: string;
    target: number;
    targetAgentUserId: number;
    title: string;
    type: number;
    userLevelIdList: string;
    userList: any[];
    webDetailPic: string;
    webListPic: string;
}

export interface ScoreLevelList {
    amount: number;
    bonus: number;
    limitMax: number;
    multiple: number;
    percentage: number;
}

export interface GameListDto {
    id: number;
    name: string;
    status: number;
    list?: null;
}

export interface GetPromoActivity {
    activityEndTime: number;
    activityStartTime: number;
    activityStatus: number;
    applyMode: number;
    bonusType: number;
    detailText: string;
    deviceH5: number;
    deviceMobile: number;
    deviceWeb: number;
    displayEndTime: number;
    displayStartTime: number;
    gameList: number[];
    gameListDto: GameListDto[];
    haveApplied: boolean;
    id: number;
    label: number;
    link: string;
    mobileDetailPic: string;
    mobileListPic: string;
    periodType: number;
    plateRecommend: number;
    promotionsTagIdList: string;
    scoreCalType: number;
    scoreLevelList: ScoreLevelList[];
    sort: string;
    target: number;
    targetAgentUserId: number;
    title: string;
    type: number;
    userApplyStatus: number;
    userLevelIdList: string;
    userList: any[];
    webDetailPic: string;
    webListPic: string;
}

export interface ScoreLevelList {
    amount: number;
    bonus: number;
    limitMax: number;
    multiple: number;
    percentage: number;
}

export interface ScoreLevelList {
    amount: number;
    bonus: number;
    limitMax: number;
    multiple: number;
    percentage: number;
}

export interface CalculateApplyPromoActivity {
    applyAmount: number;
    applyBonus: number;
    promotionsActivityId: number;
    statementAmount: number;
    [name: string]: any;
}

export interface QueryUserApplyPromoActivityStatus {
    promotionsActivityId: string;
    title: string;
    targetAmount: string; //所需流水
    requireCoin: string; //还需要多少流水
    requireCoinFulfill: string; //已完成多少流水
    orderId: string;
    queryOk: boolean;
    msg: string;
}

export interface GetApplyPlatPromoActivityList {
    gameListId: number;
    msg: string;
    orderId: string;
    platListId: number;
    promotionsActivityId: number;
    queryOk: boolean;
    refreshPage: boolean;
    requireCoin: number; //还需要多少流水
    requireCoinFulfill: number; //已完成多少流水
    targetAmount: number; //所需流水
    title: string;
}

export interface TrialCoinTransferApplyActivity {
    gameListId: number;
    msg: string;
    orderId: string;
    origTargetAmount: number;
    platListId: number;
    queryOk: boolean;
    refreshPage: boolean;
    targetAmount: number;
}
