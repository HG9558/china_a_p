export interface IfundsDetailsList {
    current: number;
    data: DataClass;
    size: number;
    sortField: any[];
    sortKey: "DESC";
}

export interface DataClass {
    queryTime: string;
    queryType: string;
}
