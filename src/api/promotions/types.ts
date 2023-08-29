export interface FindGroupList {
    id: number;
    codeZh: string;
    promotionsResDtoList: null;
}

export interface FindList {
    id: number;
    code: string;
    category: number;
    img: string;
    descript: string;
    startedAt: number;
    endedAt: number;
}

export interface FindDetail {
    id: number;
    code: string;
    category: number;
    img: string;
    descript: string;
    startedAt: number;
    endedAt: number;
}
