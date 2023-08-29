<!-- 下注 从底部弹出 -->
<template>
    <VanPopup
        :round="true"
        position="bottom"
        @closed="closed"
        v-model:show="showBetPopup"
        :safe-area-inset-bottom="true"
        class="betPopup_box overflow-hidden max-h-[90%] flex flex-col"
    >
        <div class="flex-1 h-full flex flex-col overflow-hidden box-border" @click="close">
            <!-- 头部样式 -->
            <div
                class="h-11 flex-shrink-0 flex items-center justify-between px-5 bg-[url('@/assets/bets/ic_bet_title_bg.png')] bg-no-repeat bg-left bg-cover bg-white"
            >
                <div class="flex-1 flex items-center">
                    <img
                        class="w-[30px] h-[30px] flex-shrink-0 mr-1"
                        :src="Array.from(singleCast.values())?.[0]?.match?.lurl"
                        alt=""
                    />
                    <p class="flex-1 line-clamp-1">
                        {{ Array.from(singleCast.values())?.[0]?.match?.tn }}
                    </p>
                </div>
                <div class="text-sm text-txt text-15px font-medium">
                    <span @click.stop="setShowBetPopup(false)"> 关闭 </span>
                </div>
            </div>
            <!-- 列表样式 -->
            <div class="overflow-hidden bg-gradient-to-b flex-1 flex flex-col relative">
                <div
                    :key="item[1]?.oid"
                    v-for="item in singleCast"
                    class="w-full mb-2 last-of-type:mb-0"
                >
                    <div class="relative bg-white">
                        <div class="bg-gradient-to-b relative">
                            <div
                                v-if="opened"
                                class="min-h-[74px] border-y border-y-[#ddd] bg-white flex items-center justify-between px-5"
                            >
                                <div class="flex-1 overflow-hidden">
                                    <p class="font-semibold text-base line-clamp-2 leading-5 mb-2">
                                        <template v-if="item[1]?.hp?.hpid == '10001'">
                                            {{ item[1]?.hp?.hps }}
                                        </template>
                                        <template v-if="item[1]?.match?.mhn && item[1]?.match?.man">
                                            {{ item[1]?.match?.mhn }}
                                            vs
                                            {{ item[1]?.match?.man }}
                                        </template>
                                    </p>
                                    <div
                                        class="text-xs flex items-center line-clamp-1 whitespace-nowrap flex-shrink-0"
                                    >
                                        <template v-if="item[1]?.hp?.hpid != '10001'">
                                            <span>{{ item[1].hp?.hpn || item[1]?.hp?.hps }}</span>
                                            <i class="border-r border-mainText mx-2 h-3"></i>
                                        </template>
                                        <span class="line-clamp-1 break-all">
                                            {{ rightText(item[1]) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex-shrink-0 pl-5 min-w-[90px] flex justify-end">
                                    <BetOv
                                        :first-ov="`${item[1]?.ov}`"
                                        :hsw="item[1]?.hp?.hsw"
                                        :key="`${item[1]?.odds}`"
                                        :item="item[1]?.odds"
                                        class="!mr-0"
                                    />
                                </div>
                            </div>
                            <NoData
                                v-else
                                class="!pb-3 border-y border-y-[#eee]"
                                :absolute="false"
                                :text="'盘口已关闭'"
                            />

                            <div class="text-13px text-[#999] relative">
                                <div
                                    class="h-[50px] bg-[#F6F8F8] px-2 flex items-center justify-between text-sm"
                                    @click.stop="selectOrder(item)"
                                    :class="{
                                        ' border-main_t bg-red-100/10': isTip(item),
                                    }"
                                >
                                    <div class="flex items-center flex-1 pl-1">
                                        <span
                                            class="text-base flex-shrink-0 text-mainText mr-1 font-OPPO_M"
                                        >
                                            ￥
                                        </span>
                                        <p class="flex-1 h-7 flex items-center w-28">
                                            <span
                                                class="flex items-center before:inline-block before:h-4 before:w-[2px] before:rounded before:mx-[2px] text-15px font-OPPO_B"
                                                :class="{
                                                    'before:bg-main cursor': item[1]?.showKeyboard,
                                                    'flex-row-reverse text-mainText  font-OPPO_B !text-[18px]':
                                                        item[1]?.betAmount,
                                                }"
                                            >
                                                {{
                                                    item[1]?.betAmount
                                                        ? item[1]?.betAmount
                                                        : `限额
                                                    ${addThousandSeparator(
                                                        Number(item[1]?.queryMoney?.minBet || "10")
                                                    )}
                                                    ~
                                                    ${addThousandSeparator(
                                                        Number(
                                                            item[1]?.queryMoney?.orderMaxPay ||
                                                                "10000"
                                                        )
                                                    )}`
                                                }}
                                            </span>
                                        </p>
                                    </div>
                                    <div
                                        class="flex min-w-[110px] items-center justify-end flex-shrink-0 relative before:absolute before:left-0 before:h-4 before:w-[2px] before:bg-[#949494]"
                                        @click="allQueryBalance"
                                    >
                                        <p class="text-txt mr-1 text-17px font-OPPO_B">
                                            {{
                                                animate
                                                    ? ellipsis(balance?.coin)
                                                    : balance?.coin || "0.00"
                                            }}
                                        </p>
                                        <span
                                            class="w-[14px] h-[14px] text-mainText"
                                            v-html="ic_refresh"
                                            :class="{ 'animate-spin opacity-50': !!animate }"
                                            @animationiteration="animationiteration"
                                        ></span>
                                    </div>
                                </div>
                                <Keyboard
                                    @change="setBetAmount"
                                    :value="item[1]?.betAmount || ''"
                                    @close="item[1].showKeyboard = false"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 底部样式 -->
            <div class="z-10 bg-white p-3 pb-5">
                <div class="flex items-center h-10">
                    <VanButton
                        :disabled="vItem?.hp?.hpid == '10001' || vItem?.hp?.hids == 0"
                        class="w-[78px] border-0 rounded-xl bg-mainBg flex-shrink-0 mr-3"
                        @click.stop="toSeries"
                    >
                        <i class="icon-add font-normal text-xs" />
                        <span class="font-medium">串关</span>
                    </VanButton>
                    <VanButton
                        class="flex-1 border-0 text-white rounded-xl text-17px flex items-center justify-center"
                        :class="opened ? 'tlw_btn_linear' : 'bg-[#A0A0A0]'"
                        :loading="loading"
                        @click.stop="submit"
                        :disabled="loading || !opened"
                    >
                        <template v-if="opened">
                            <span class="font-OPPO_M">投注</span>
                            <span class="font-OPPO_M">
                                {{ `(可赢${betWinTotal().toFixed(2)})` }}
                            </span>
                        </template>
                        <template v-else>
                            <span class="text-17px">盘口已关闭</span>
                        </template>
                    </VanButton>
                </div>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { useBets } from "@/stores/useBets";
import {
    addThousandSeparator,
    getScoresOrigin,
    marketTypeFinally,
    matchStatus,
    ovTransition,
    rightText,
    transitionMatchType,
} from "@/utils/match";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { computed, watch, ref } from "vue";
import { useStore } from "@/stores";
import { API } from "@/api";
import type { IClientBet, IBetParlay, PSeriesOrder } from "@/api/obsportend/obMarket/interface";
import type { LatestMarketInfoDtoList } from "@/api/obsportend/obSport/interface";
import { useAsync } from "@/stores/useAsync";
import { ellipsis } from "@/utils";
import { showFailToast } from "vant";
import ic_refresh from "@/assets/svg/ic_refresh.svg?raw";
import BetOv from "./BetOv.vue";
import Keyboard from "./Keyboard.vue";
import { useHomeWorker } from "@/worker";
import { Value } from "@/stores/types";
import { useMatch } from "@/stores/useMatch";
import NoData from "../NoData.vue";
import { ClientBet } from "@/api/obsportend/obMarket/types";

const {
    setSOid,
    setShowBetPopup,
    editSingleCast,
    setShowSuccessPopup,
    setShowFailPopup,
    setOrderDetail,
    setFailOrderDetail,
    clearSingleCast,
} = useBets();
const { showBetPopup, singleCast, betList, sOid, isSeries, seriesIndex } = storeToRefs(useBets());
const { sports, normal, betTimeKey } = storeToRefs(useAsync());
const { line } = storeToRefs(useStore());
const { setActive } = useMatch();
const showKeyboard = ref<boolean>();
const betAmount = ref<string>("");
const loopLoading = ref<boolean>();
const loading = ref<boolean>(false);
const animate = ref<boolean | string>();
const { balance } = storeToRefs(useAsync());
const router = useRouter();

const allQueryBalance = async () => {
    animate.value = true;
    await useAsync()?.allQueryBalance();
    animate.value = "over";
};

const animationiteration = () => {
    if (animate.value === "over") {
        animate.value = false;
    }
};

// 单注
const vItem = computed(() => Array.from(singleCast.value)?.[0]?.[1]);

const opened = computed(() => {
    // 返回false 盘口已关闭
    const item = Array.from(singleCast.value.values())?.[0];
    if (item?.hp?.hpid == "10001") return true;
    return matchStatus(item?.match?.mhs!, item?.hl?.hs, +item?.oddsStatus!) == "Opened";
});

const isTip = computed(() => (item: [string, Value]) => {
    // 限额提示
    if (item[1]?.betAmount == "") return false;
    if (+item[1]?.betAmount! > +balance.value?.coin!) return true;
    if (+item[1]?.queryMoney?.orderMaxPay! < +item[1]?.betAmount!) return true;
    if (+item[1]?.queryMoney?.minBet! > +item[1]?.betAmount!) return true;
});

const totalMinBetMoney = computed(
    // 最小投注
    () => Array.from(singleCast.value.values())?.[0]?.totalMinBetMoney || "0.00"
);

const totalMinTip = computed(() => {
    // 全部输入最小限额提示
    return betAmount.value && +totalMinBetMoney.value > +betAmount.value;
});

const betTotal = computed(() => {
    // 总下注金额
    return Array.from(singleCast.value.values()).reduce(
        (prev, item) => +prev + +(item.betAmount || "0"),
        0
    );
});

const betWinTotal = computed(() => () => {
    // 可赢总额
    return Array.from(singleCast.value.values()).reduce((prev, item) => {
        const ov = ovTransition(item.odds?.ov, item.hp.hsw) || 0;
        const amount = item.betAmount || 0;
        return prev + +ov * +amount - +amount;
    }, 0);
});

const selectOrder = (item: [string, Value]) => {
    // 选中单注
    const _item = singleCast.value.get(sOid.value);
    if (_item) _item.showKeyboard = false;
    showKeyboard.value = false;
    item[1].showKeyboard = true;
    setSOid(item[0]);
};

const setBetAmount = (e: string) => {
    // 设置单注金额
    if (!opened.value) return;
    const item = singleCast.value.get(sOid.value);
    if (item) item.betAmount = e;
};

const close = () => {
    // 关闭所有键盘
    Array.from(singleCast.value.values())?.forEach(item => (item.showKeyboard = false));
    showKeyboard.value = false;
};

const submit = async () => {
    // 提交前参数处理
    if (+balance.value?.coin! < +betTotal.value) {
        showFailToast({
            message: "余额不足，请充值！",
            icon: "warning",
            className: "warning",
        });
        return;
    }
    const _item = Array.from(singleCast.value.values())?.[0];
    if (_item) {
        if (
            +_item?.totalMaxBetMoney! < +betTotal?.value ||
            +_item?.totalMinBetMoney! > +betTotal.value
        ) {
            showFailToast({
                message: `投注范围${_item?.totalMinBetMoney}-${_item?.totalMaxBetMoney}`,
                icon: "warning",
                className: "warning",
            });
            return;
        }
    }
    let series = {};
    let params: IClientBet | IBetParlay = {
        acceptOdds: sports.value?.bet || 1,
        deviceType: "1",
        currencyCode: "",
        deviceImei: "",
        seriesOrders: [],
        openMiltSingle: singleCast.value.size > 1 ? 1 : 0,
    };
    let betParlayData: PSeriesOrder = {
        fullBet: +betTotal.value == +balance.value?.coin! ? 1 : 0,
        orderDetailList: [],
        ...series,
    };
    Array.from(singleCast.value.values())?.forEach(item => {
        if (+item.betAmount! > 0) {
            params.seriesOrders!.push({
                fullBet: +betTotal.value == +balance.value?.coin! ? 1 : 0,
                orderDetailList: [
                    {
                        betAmount: item?.betAmount!,
                        marketId: item?.hid,
                        matchId: item?.hp?.mid || "",
                        marketTypeFinally: marketTypeFinally(item.hp?.hsw),
                        matchType: transitionMatchType(item?.hp?.hl?.[0]?.hmt!),
                        oddFinally: ovTransition(item?.odds.ov, item.hp.hsw).toString(),
                        odds: item?.odds.ov,
                        placeNum: item.hp?.hl?.[0]?.hn!,
                        playId: item?.hp?.hpid,
                        playOptionsId: item?.oid,
                        scoreBenchmark: getScoresOrigin(item.match?.msc!),
                    },
                ],
                ...series,
            });
        }
    });
    if (betParlayData.orderDetailList?.[0]) params.seriesOrders![0] = betParlayData;
    clientBet(params);
};

const clientBet = async (params: IClientBet) => {
    // 單注或多個單注
    loading.value = true;
    const res = await API.clientBet(params);
    loading.value = false;
    if (res.code === 0) {
        switch (res.data?.code) {
            case "0000000":
                if (res.data?.orderDetailRespList?.[0]) {
                    setOrderDetail(res.data);
                    setShowSuccessPopup(true);
                    useAsync()?.queryUserWallet();
                }
                break;
            default:
                const maxWinMoney = betWinTotal.value;
                const data: Partial<ClientBet> = {
                    orderDetailRespList: [],
                };
                Array.from(singleCast.value.values())?.forEach(item => {
                    data.orderDetailRespList?.push({
                        betMoney: `${+item.betAmount! * 100}`,
                        maxWinMoney: (maxWinMoney() * 100)?.toFixed(2),
                        oddsValues: ovTransition(item?.odds.ov, item.hp.hsw).toString(),
                        playOptionsId: item.oid,
                        playName: item.hp.hpn,
                        playOptionName: rightText(item),
                    });
                });
                setFailOrderDetail(data);
                setShowFailPopup(true);
                res.data?.msg &&
                    showFailToast({
                        message: res.data?.msg,
                        icon: "warning",
                        className: "warning",
                    });
                break;
        }
        return;
    }
    return res;
};

const queryLatestMarketInfoList = async () => {
    // 查询赔率 以及开盘状态
    const params: LatestMarketInfoDtoList[] = Array.from(singleCast.value).map(item => ({
        marketId: item[1]?.hid,
        matchInfoId: item[1]?.hp?.mid,
        matchType: transitionMatchType(item[1]?.hp?.hl?.[0]?.hmt!),
        oddsId: item[1]?.oid,
        playId: item[1]?.hp?.hpid,
    }));
    loopLoading.value = true;
    const res = await API.queryLatestMarketInfoList({ latestMarketInfoDtoList: params });
    loopLoading.value = false;
    if (res.code === 0) {
        const data = await useHomeWorker.queryLatestMarketInfoList(
            JSON.stringify(Array.from(singleCast.value.entries()) || []),
            JSON.stringify(res.data || [])
        );
        editSingleCast(data);
    }
    return res;
};

const toSeries = () => {
    // 点击串关
    Array.from(singleCast.value.values())?.forEach(item => {
        betList.value.set(item.oid, item);
        singleCast.value.delete(item.oid);
    });
    setActive(seriesIndex.value);
    router.push("/match");
    setShowBetPopup(false);
};

const closed = () => {
    if (!isSeries.value) clearSingleCast();
};

watch(
    () => betTimeKey.value,
    async () => {
        // 定时器轮巡 多個查询最新盘口数据
        if (loopLoading.value || !line.value || !normal.value || !showBetPopup.value) return;
        queryLatestMarketInfoList();
    }
);

watch(
    () => showBetPopup.value,
    n => {
        if (!n) {
            betAmount.value = "";
            Array.from(singleCast.value.values())?.forEach(item => (item.betAmount = ""));
            return;
        }
        const item = Array.from(singleCast.value.entries())[0];
        if (item[1]) {
            setSOid(item[0]);
            item[1].showKeyboard = true;
        }
        queryLatestMarketInfoList();
    }
);
</script>

<style lang="scss">
.betPopup_box {
    &.van-popup--round {
        border-radius: 10px 10px 0 0 !important;
    }
}
</style>
