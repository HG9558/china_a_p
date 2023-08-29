// 娱乐
import { FunBanners } from "@/api/home/types";
import { defineStore } from "pinia";
import type { Game } from "@/api/platform/types";

interface Istate {
    banner?: FunBanners[];
    gameList?: Game[];
}

export const useEntertain = defineStore("useEntertain", {
    state(): Istate {
        return {
            banner: undefined,
            gameList: undefined,
        };
    },
    actions: {
        setBanner(value: FunBanners[]) {
            this.banner = value;
        },
        setGameList(value: Game[]) {
            this.gameList = value;
        },
    },
});
