import type { UserLogin } from "@/api/user/types";
import Local from "@/utils/Local";
import { setHeaderTheme } from "@/utils/headerTheme";
import { oneTime } from "@/utils/times";
import { defineStore } from "pinia";

interface IloginInfo {
    username?: string;
    mobile?: string;
    password?: string;
}
interface dialogTip {
    value: boolean;
    title?: string;
    message?: string;
    callBack?: () => void;
}

export const useStore = defineStore("index", {
    state(): {
        uuid: string;
        user: UserLogin | null;
        token: string | null;
        loginInfo: IloginInfo | null; //记住密码
        toDayNoTip: string | null; //今天是否提示
        isBack: string; //是否返回跳转前
        loading: boolean;
        dialogTip: dialogTip; //全局弹窗提示
        showMatches: boolean; //显示赛事赛选
        cancelTokens: any[];
        line: boolean; //网络状态
        globelKey: number; //全局,resize
        gameID: string | null; //进入第三方游戏前存入游戏id
        oneTime: number | null;
        oneTimer: number | NodeJS.Timer | null;
        showSetMobile: boolean; //显示设置手机
        restrictionIp: boolean; //显示ip限制
        recordTip: boolean;
        gameTip: boolean;
        safariDialog: string | null;
        homeDialogTip: string | null;
        path: string;
    } {
        return {
            dialogTip: {
                value: false,
            },
            uuid: localStorage.getItem("uuid") || "",
            user: Local.get("user") || null,
            token: Local.get("token") || null,
            loginInfo: Local.get("loginInfo") || null,
            toDayNoTip: Local.get("today") || null,
            isBack: "",
            loading: false,
            showMatches: false,
            cancelTokens: [],
            line: true,
            globelKey: 0,
            gameID: Local.get("gameID") || null,
            oneTime: Local.get("oneTime") || null,
            oneTimer: null,
            showSetMobile: false,
            restrictionIp: false,
            recordTip: Local.get("recordTip") || null,
            gameTip: Local.get("gameTip") || null,
            safariDialog: Local.get("safariDialog") || null,
            homeDialogTip: Local.get("homeDialogTip") || null,
            path: "",
        };
    },
    actions: {
        setUUID(value: string) {
            this.uuid = value;
            value ? localStorage.setItem("uuid", value) : localStorage.removeItem("uuid");
        },
        setDialogTip(
            value: boolean,
            title: string = "未登录",
            message: string = "精彩内容等你来体验，快去登录吧！",
            callBack?: () => void
        ) {
            this.dialogTip = { value, title, message, callBack };
        },
        setToken(value: string | null) {
            this.token = value;
            value ? Local.set("token", value) : Local.remove("token");
        },
        setUser(value: UserLogin | null) {
            this.user = value;
            value ? Local.set("user", value) : Local.remove("user");
        },
        setLoginInfo(value: IloginInfo | null) {
            this.loginInfo = value;
            value ? Local.set("loginInfo", value) : Local.remove("loginInfo");
        },
        setToDayNoTip(value: string | null) {
            this.toDayNoTip = value;
            value ? Local.set("today", value) : Local.remove("today");
        },
        setIsBack(value: string) {
            this.isBack = value;
        },
        setLoading(value: boolean) {
            this.loading = value;
        },
        setShowMatches(value: boolean) {
            this.showMatches = value;
        },
        setGameID(value: string | null) {
            this.gameID = value;
            value ? Local.set("gameID", value) : Local.remove("gameID");
        },
        pushAxiosToken(value: any) {
            this.cancelTokens?.push(value);
        },
        cancelRequest() {
            if (!this.cancelTokens?.length) return;
            this.cancelTokens.forEach(item => {
                item();
            });
            this.cancelTokens = [];
        },
        setLine(value: boolean) {
            this.line = value;
        },
        setGlobelKey(value: number) {
            this.globelKey = value;
        },
        setShowSetMobile(value: boolean) {
            this.showSetMobile = value;
        },
        setRecordTip(value: boolean) {
            this.recordTip = value;
            value ? Local.set("recordTip", value) : Local.remove("recordTip");
        },
        setGameTip(value: boolean) {
            this.gameTip = value;
            value ? Local.set("gameTip", value) : Local.remove("gameTip");
        },
        setSafariDialog(value: string | null) {
            this.safariDialog = value;
            value ? Local.set("safariDialog", value) : Local.remove("safariDialog");
        },
        setHomeDialogTip(value: string | null) {
            this.homeDialogTip = value;
            value ? Local.set("homeDialogTip", value) : Local.remove("homeDialogTip");
        },
        oneTimeStart() {
            // 一键回收 前端限制
            if (!this.oneTime) this.oneTime = oneTime;
            return new Promise(resolve => {
                this.oneTimer = setInterval(() => {
                    if (!this.oneTime) return this.clearOneTime();
                    this.oneTime--;
                    if (this.oneTime < 0) {
                        this.clearOneTime();
                        resolve(true);
                        this.oneTime = oneTime;
                    }
                }, 1000);
            });
        },
        setRestrictionIp(value: boolean) {
            this.restrictionIp = value;
        },
        clearOneTime() {
            this.oneTimer && clearInterval(this.oneTimer);
        },
        setPath(value: string) {
            this.path = value;
            setHeaderTheme(value);
        },
    },
});
