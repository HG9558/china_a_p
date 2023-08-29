export interface GetDictionary {
    [key: string]: Datum[];
}

export interface Datum {
    code: string;
    title: string;
}
