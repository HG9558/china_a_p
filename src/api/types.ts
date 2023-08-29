export interface Res<T> {
    readonly code: number;
    readonly msg: string;
    readonly data: null | T;
}
