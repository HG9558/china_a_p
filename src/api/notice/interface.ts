export interface IreadNotice {
    nid?: number;
}

export interface IsendNotice {
    current: number;
    data?: {
        category?: number;
    };
    size: number;
    sortField?: [];
    sortKey?: string;
}

export interface IgetNotice {
    current: number;
    data: DataClass;
    size: number;
    sortField?: any[];
    sortKey?: string;
}

export interface DataClass {
    noticeType: number;
}

export interface IreadNotices {
    nidList: number[];
}
