export interface IactivityRecirdlist {
    current: number;
    data: Data;
    size: number;
    sortField?: any[];
    sortKey?: string;
}

export interface Data {
    type: number; //0=首充奖励-邀请人,1=首充奖励-被邀请人,2=流水分成,3=晋级奖励
}
