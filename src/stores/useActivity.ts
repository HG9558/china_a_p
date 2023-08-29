// 活动
import { GetTagPromoActivityList } from "@/api/promoActivity/types";
import { defineStore } from "pinia";

interface Istate {
    groupList: GetTagPromoActivityList[];
    active: number;
}

export const useActivity = defineStore("useActivity", {
    state(): Istate {
        return {
            groupList: [],
            active: 1,
        };
    },
    actions: {
        setActive(value: number) {
            this.active = value;
        },
        setGroupList(value: GetTagPromoActivityList[]) {
            this.groupList = value;
        },
    },
});
