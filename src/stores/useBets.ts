// 下注
import { defineStore, storeToRefs } from "pinia";
import type { HP, Ol } from "@/api/obsportend/obMatches/types";
import Local from "@/utils/Local";
import { API } from "@/api";
import type { OrderMaxBetMoney } from "@/api/obsportend/obMarket/interface";
import { ovTransition, transitionMatchType } from "@/utils/match";
import type { ClientBet } from "@/api/obsportend/obMarket/types";
import { useStore } from ".";
import { authToPage } from "@/utils";
import { showFailToast } from "vant";
import { Imatch, Value } from "./types";
import { useMatch } from "./useMatch";

interface IuseBets {
    sOid: string;
    showBetPopup: boolean;
    showSeriesPopup: boolean;
    showFailPopup: boolean;
    showSuccessPopup: boolean;
    seriesIndex: number;
    orderDetail?: ClientBet | null;
    failOrderDetail?: Partial<ClientBet> | null;
    betList: Map<string, Value>;
    singleCast: Map<string, Value>;
}

export const useBets = defineStore("bets", {
    state(): IuseBets {
        return {
            sOid: Local.get("sOid") || "",
            orderDetail: null,
            failOrderDetail: null,
            showBetPopup: false, //单注投注
            showSeriesPopup: false, //闯关投注
            showFailPopup: false, //下注失败
            showSuccessPopup: false, //下注成功
            seriesIndex: 3, //串关在赛事中的索引
            singleCast: new Map(), //单注
            betList: new Map(Local.get("betList") && JSON.parse(Local.get("betList"))),
        };
    },
    getters: {
        isSeries(): boolean {
            // 是否是串关
            const { path } = storeToRefs(useStore());
            return this.seriesIndex == useMatch()?.active && /(\/details|\/match)/.test(path.value);
        },
    },
    actions: {
        setSOid(value: string) {
            this.sOid = value;
            Local.set("sOid", value);
        },
        setShowBetPopup(value: boolean) {
            this.showBetPopup = value;
        },
        setShowFailPopup(value: boolean) {
            this.showFailPopup = value;
        },
        setShowSeriesPopup(value: boolean) {
            this.showSeriesPopup = value;
        },
        setShowSuccessPopup(value: boolean) {
            this.showSuccessPopup = value;
        },
        setOrderDetail(value: ClientBet | null) {
            this.orderDetail = value;
        },
        setFailOrderDetail(value: Partial<ClientBet> | null) {
            this.failOrderDetail = value;
        },
        setSeriesIndex(value: number) {
            this.seriesIndex = value;
        },
        async setBetList(item: Imatch, hp: HP, k: Ol) {
            if (this.isSeries && hp.hids == 0) return showFailToast("此投注项不可串关");
            const status = authToPage();
            if (!status) return;
            const hl = hp.hl?.find(item => item.ol?.find(v => v.oid == k.oid));
            const hid = hl?.hid;
            if (!hid) return;
            if (this.isSeries && k.oid === this.betList.get(k.oid)?.oid) {
                this.betList.delete(k.oid);
                this.deleteBetList(k.oid);
                return;
            }
            const data: Value = {
                match: item,
                mid: item.mid,
                ov: k.ov,
                hp,
                hl,
                odds: k,
                hid: hid,
                oid: k.oid,
                oddsStatus: k.os,
            };
            if (this.isSeries || !this.showBetPopup) {
                Array.from(this.betList.values()).forEach(v => {
                    if (v.match.mid == item.mid) this.betList.delete(v.oid);
                });
                this.saveBetsStorage();
            } else hp.hl?.forEach(item => item.ol?.forEach(v => this.betList.delete(v.oid)));
            if (this.betList.size >= 10) return showFailToast("最多选择10项进行投注");
            if (this.isSeries) this.betList.set(k.oid, data);
            if (!this.isSeries) {
                // 如果不是串关
                this.singleCast.set(k.oid, data);
                this.showBetPopup = !this.showBetPopup;
            }
            const params: OrderMaxBetMoney = {
                deviceType: 1,
                marketId: hid,
                matchId: hp.mid,
                matchType: transitionMatchType(hp.hl?.[0]?.hmt!),
                oddsFinally: ovTransition(k.ov, hp.hsw).toString(),
                oddsValue: +k.ov,
                openMiltSingle: 1,
                playId: +hp.hpid,
                playOptionId: k.oid,
                seriesType: 1,
            };
            const res = await this.queryMarketMaxMinBetMoney({ orderMaxBetMoney: [params] });
            const minBet = "10";
            const orderMaxPay = "10000";
            const totalMaxBetMoney = "20000";
            const betItem = this.isSeries ? this.betList.get(k.oid) : this.singleCast.get(k.oid);
            if (betItem) {
                const queryMoney = {
                    minBet: res.data?.totalMinBetMoney || minBet,
                    orderMaxPay: res.data?.totalMaxBetMoney || orderMaxPay,
                };
                const value = {
                    ...betItem,
                    queryMoney,
                    totalMinBetMoney: res.data?.totalMinBetMoney || minBet,
                    totalMaxBetMoney: res.data?.totalMaxBetMoney || totalMaxBetMoney,
                };
                this.isSeries ? this.betList.set(k.oid, value) : this.singleCast.set(k.oid, value);
            }
            if (this.isSeries) this.saveBetsStorage();
        },
        async queryMarketMaxMinBetMoney(params: { orderMaxBetMoney: OrderMaxBetMoney[] }) {
            //查询最大最小投注金额
            const { token } = useStore();
            if (!token) return { code: -1, data: null, msg: "" };
            const res = await API.queryMarketMaxMinBetMoney({
                orderMaxBetMoney: params.orderMaxBetMoney,
            });
            return res;
        },
        deleteBetList(key: string) {
            this.betList.delete(key);
            this.saveBetsStorage();
            if (this.betList.size === 0) {
                this.setShowBetPopup(false);
                this.setShowSeriesPopup(false);
            }
        },
        clearBetList() {
            this.betList.clear();
            Local.remove("betList");
            if (this.betList.size === 0) {
                this.setShowBetPopup(false);
                this.setShowSeriesPopup(false);
            }
            this.saveBetsStorage();
        },
        editBetList(value: Map<string, Value>) {
            this.betList = value;
            this.saveBetsStorage();
        },
        saveBetsStorage(value?: Map<string, Value>) {
            Local.set(
                "betList",
                value
                    ? JSON.stringify(Array.from(value.entries()))
                    : JSON.stringify(Array.from(this.betList.entries()))
            );
        },

        clearSingleCast() {
            this.singleCast.clear();
            if (this.singleCast.size === 0) {
                this.setShowBetPopup(false);
                this.setShowSeriesPopup(false);
            }
        },
        editSingleCast(value: Map<string, Value>) {
            this.singleCast = value;
        },
    },
});
