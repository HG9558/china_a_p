export interface RotationNotice {
    id: number;
    title: string;
    content: string;
    uids: null | string;
    category: number | null;
    status: number | null;
    sort: number | null;
    createdAt: number;
    updatedAt: number | null;
    subCategory: null;
    isRead: null;
}

export interface SendNotice {
    current: string;
    size: string;
    list: SList[];
    total: string;
    pages: string;
}

export interface SList {
    category: number;
    content: string;
    createdAt: number;
    id: number;
    isRead: number;
    sort: number;
    status: number;
    subCategory: number;
    title: string;
    uids: string;
    updatedAt: number;
    checked?: boolean;
    [name: string]: any;
}

export interface SendBbtyNotice {
    category: number;
    content: string;
    createdAt: number;
    id: number;
    isRead: number;
    sort: number;
    status: number;
    subCategory: number;
    title: string;
    uids: string;
    updatedAt: number;
}

export interface UnreadCount {
    count: number;
    noticeType: number;
}

export interface GetNotice {
    current: number;
    list: NList[];
    pages: number;
    size: number;
    total: number;
}

export interface NList {
    content: string;
    id: number;
    isRead: number;
    noticeType: number;
    publishTime: number;
    title: string;
    updatedAt: number;
    checked?: boolean;
    [name: string]: any;
}

export interface GetPop {
    id: number;
    noticeType: number;
    title: string;
    content: string;
    isRead: number;
    publishTime: number | null;
    updatedAt: number;
}
