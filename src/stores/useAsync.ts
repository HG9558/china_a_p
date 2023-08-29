// 全局异步请求
import { API } from "@/api";
import type { GetDictionary } from "@/api/dictionary/types";
import type { HomeIP, Init } from "@/api/home/types";
import type { SportsSetInquiry } from "@/api/obsportend/obMarket/types";
import Local from "@/utils/Local";
import { defineStore, storeToRefs } from "pinia";
import { useStore } from ".";
import type { AllCoinDown } from "@/api/platform/types";
import type { IcoinTransfer } from "@/api/platform/interface";
import { betTime, checkObTime, detailTime, hotTime, matchTime } from "@/utils/times";
import { GetApplyPlatPromoActivityList } from "@/api/promoActivity/types";

interface IuseAsync {
    ip: HomeIP | null;
    init?: Init | null;
    balance: AllCoinDown | null; //钱包
    dictionary: GetDictionary | null;
    sports: SportsSetInquiry | null; //赛事参数
    promoActivityList: GetApplyPlatPromoActivityList[] | null;
    normal: boolean; //是否维护
    countTimer: number; //全局定时器key,每秒递增
    time30: number; //每30秒递增
    detailTimeMs: number; //赛事详情ms状态
    matchType: number; //赛事type
    hotTimeKey: number; //首页定时器key
    matchTimeKey: number; //赛事定时器key
    detailTimeKey: number; //赛事详情定时器key
    betTimeKey: number; //下注定时器key
}

export const useAsync = defineStore("async", {
    state(): IuseAsync {
        return {
            ip: null,
            init: Local.get("init") || undefined,
            dictionary: null,
            balance: Local.get("balance") || null,
            sports: Local.get("sports") || null,
            promoActivityList: Local.get("promoActivityList") || null,
            normal: true,
            matchType: 0,
            countTimer: 1,
            time30: 0,
            detailTimeMs: 0,
            hotTimeKey: 0,
            matchTimeKey: 0,
            detailTimeKey: 0,
            betTimeKey: 0,
        };
    },
    actions: {
        async homeInit() {
            const res = await API.homeInit();
            if (res.code === 0) {
                this.init = res.data!;
                Local.set("init", this.init);
            }
        },
        async sportsSetInquiry() {
            const res = await API.sportsSetInquiry();
            if (res.code === 0) {
                this.sports = res.data;
                this.sports && Local.set("sports", this.sports);
            }
            return res;
        },
        async getDictionary() {
            const res = await API.getDictionary();
            if (res.code === 0) {
                this.dictionary = res.data;
            }
        },
        async userProfile() {
            const res = await API.userProfile();
            if (res.code === 0) {
                const { setUser } = useStore();
                setUser(res.data);
            }
            return res;
        },
        async queryUserWallet() {
            const res = await API.queryUserWallet();
            if (res.code == 0) {
                this.balance = res.data!;
                this.balance && Local.set("balance", this.balance);
            }
            return res;
        },
        async allQueryBalance() {
            const res = await API.allQueryBalance();
            if (res.code == 0) {
                this.balance = res.data!;
                this.balance && Local.set("balance", this.balance);
            }
            return res;
        },
        async coinTransfer(data: IcoinTransfer) {
            const res = await API.coinTransfer(data);
            return res;
        },
        async allCoinDown() {
            const res = await API.allCoinDown();
            return res;
        },
        async homeIp() {
            const res = await API.homeIp();
            if (res.code == 0) {
                this.ip = res.data;
            }
        },
        async getCheckObStatus() {
            const res = await API.checkObStatus();
            if (res.code == 0) this.normal = res.data;
            if (res.code == 39008) this.normal = !!res.data;
            return res;
        },
        async getApplyPlatPromoActivityList() {
            const res = await API.getApplyPlatPromoActivityList();
            if (res.code == 0) {
                this.promoActivityList = res.data;
            }
            return res;
        },
        async pullPoints() {
            const { gameID, user } = storeToRefs(useStore());
            if (gameID.value && user.value?.autoTransfer == 1) {
                // 下分
                await useAsync()?.coinTransfer({
                    coin: "",
                    id: +gameID.value,
                    direction: 1,
                    name: user.value?.realName,
                });
                useStore()?.setGameID(null);
            }
            return true;
        },
        async checkObStatus() {
            this.getCheckObStatus();
            setInterval(() => {
                // 全局定时器
                if (this.countTimer % hotTime == 0) {
                    // 首页定时器
                    this.hotTimeKey++;
                }
                if (this.countTimer % matchTime?.value(this.matchType) == 0) {
                    // 赛事轮巡定时器
                    this.matchTimeKey++;
                }
                if (this.countTimer % detailTime.value(this.detailTimeMs) == 0) {
                    // 赛事详情定时器
                    this.detailTimeKey++;
                }
                if (this.countTimer % betTime == 0) {
                    // 单注串关定时器
                    this.betTimeKey++;
                }
                if (this.countTimer % checkObTime === 0) {
                    this.time30++;
                    this.getCheckObStatus();
                }
                this.countTimer++;
            }, 1000);
        },
        setDetailTimeMs(value: number) {
            this.detailTimeMs = value;
        },
        setMatchType(value: number) {
            this.matchType = value;
        },
    },
});
