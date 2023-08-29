// 赛事
import { InitPB } from "@/api/obsportend/obHome/types";
import { ImatchesPagePB } from "@/api/obsportend/obMatches/interface";
import Local from "@/utils/Local";
import { defineStore } from "pinia";

interface IdayList {
    md: string;
    date: string;
    week: string;
}

interface Istate {
    swipeActive: number;
    sort: 1 | 2;
    active: number;
    active_c: number;
    dayActive: string | null;
    initPBList?: InitPB[];
    dayList?: IdayList[];
    params: ImatchesPagePB;
}

export const useMatch = defineStore("useMatch", {
    state(): Istate {
        return {
            swipeActive: 0,
            sort: 2,
            active: Local.get("active") || 0,
            active_c: Local.get("active_c") || 0,
            dayActive: Local.get("dayActive") || null,
            initPBList: Local.get("initPBList") || undefined,
            dayList: Local.get("dayList") || undefined,
            params: Local.get("params") || {
                cpn: 1, //页数
                cps: 15, //每页行数
                euid: "", //菜单ID
                device: "v2_h5_st", //设备
                sort: 1, //排序
                type: 0, //一级菜单筛选类型
            },
        };
    },
    actions: {
        setSwipeActive(value: number) {
            this.swipeActive = value;
        },
        setSort(value: 1 | 2) {
            this.sort = value;
        },
        setActive(value: number) {
            this.active = value;
            value ? Local.set("active", value) : Local.remove("active");
        },
        setActive_c(value: number) {
            this.active_c = value;
            value ? Local.set("active_c", value) : Local.remove("active_c");
        },
        setDayActive(value: string | null) {
            this.dayActive = value;
            value ? Local.set("dayActive", value) : Local.remove("dayActive");
        },
        setInitPBList(value: InitPB[]) {
            this.initPBList = value;
            value ? Local.set("initPBList", value) : Local.remove("initPBList");
        },
        setDayList(value: IdayList[]) {
            this.dayList = value;
            value ? Local.set("dayList", value) : Local.remove("dayList");
        },
        setParams(value: ImatchesPagePB) {
            this.params = value;
            value ? Local.set("params", value) : Local.remove("params");
        },
        clearMatch() {
            this.active = 0;
            this.active_c = 0;
            this.dayActive = null;
            this.initPBList = undefined;
            this.dayList = undefined;
        },
    },
});
