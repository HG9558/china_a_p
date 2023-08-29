// App
import Local from "@/utils/Local";
import { defineStore } from "pinia";

interface IuseApp {
    isApp: string;
    top: string; //活动头部
}

export const useApp = defineStore("app", {
    state(): IuseApp {
        return {
            isApp: Local.get("isApp") || "",
            top: Local.get("top") || "",
        };
    },
    actions: {
        setIsApp(value: string) {
            this.isApp = value;
        },
        setTop(value: string) {
            this.top = value;
        },
    },
});
