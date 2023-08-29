export interface IgetPromoActivity {
    id: string;
    type?: number;
}

export interface IapplyPromoActivity {
    applyAmount: string;
    gameListId: number;
    id: string;
}

export interface calculateApplyPromoActivity extends IapplyPromoActivity {}

export interface IcheckApplyPlatPromoActivity {
    platListId: number;
    uid?: number;
}

export interface IqueryUserApplyPromoActivityStatus {
    orderId?: string;
    platListId: number;
}

export interface ItrialCoinTransferApplyActivity {
    orderId: number;
    transferCoin: number;
}
