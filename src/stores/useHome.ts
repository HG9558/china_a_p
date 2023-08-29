// 首页
import { HomeTabs } from "@/api/home/types";
import { defineStore } from "pinia";

interface Istate {
    state: Partial<HomeTabs>;
    active: number;
    active_c: number;
}

export const useHome = defineStore("useHome", {
    state(): Istate {
        return {
            state: {
                banner: undefined,
                loadingList: undefined,
                obMenuList: undefined,
                recommendGame: undefined,
                tabs: undefined,
            },
            active: 0,
            active_c: 0,
        };
    },
    actions: {
        setState(value: HomeTabs) {
            this.state = value;
        },
        setActive(value: number) {
            this.active = value;
        },
        setActive_c(value: number) {
            this.active_c = value;
        },
    },
});
