<!-- 串关 -->
<template>
    <VanPopup
        position="right"
        :overlay="false"
        @closed="closed"
        v-model:show="showSeriesPopup"
        :safe-area-inset-bottom="true"
        class="w-full h-full"
    >
        <div class="w-full h-full flex flex-col tlw_top_bg">
            <NavBar :click-left="clickLeft" transparent :nav-bar-props="{ title: '串关投注' }">
                <template #right>
                    <div class="text-white flex items-center" @click="clear">
                        <i class="icon-shanchu !font-normal text-base"></i>
                        <span class="!font-normal ml-[6px]">全部删除</span>
                    </div>
                </template>
            </NavBar>
            <div class="flex-1 bg-[#f4f4f4] overflow-hidden flex flex-col">
                <div class="h-11 px-5 flex items-center justify-between">
                    <span class="text-17px font-medium">我的投注</span>
                    <div class="flex items-center" @click="allQueryBalance">
                        <p class="text-txt mr-1 text-17px font-OPPO_B">
                            {{ animate ? ellipsis(balance?.coin) : balance?.coin || "0.00" }}
                        </p>
                        <span
                            class="w-4 h-4 text-mainText"
                            v-html="ic_refresh"
                            :class="{ 'animate-spin opacity-50': !!animate }"
                            @animationiteration="animationiteration"
                        ></span>
                    </div>
                </div>
                <div class="flex-1 overflow-y-auto pb-16">
                    <TransitionGroup>
                        <div class="mb-2 bg-white" v-for="(item, index) in betList" :key="index">
                            <div
                                class="h-[43px] relative bg-[url('@/assets/bets/ic_bet_title_bg.png')] bg-no-repeat bg-left bg-cover bg-white flex items-center justify-between px-5"
                            >
                                <div class="flex-1 flex items-center">
                                    <img
                                        class="w-[30px] h-[30px] flex-shrink-0 mr-1"
                                        :src="item[1]?.match?.lurl"
                                        alt=""
                                    />
                                    <p
                                        class="flex-1 line-clamp-1"
                                        :class="{ '!text-[#8C8C8C]': isGrey(item[1]) }"
                                    >
                                        {{ item[1]?.match?.tn }}
                                    </p>
                                </div>
                                <div class="flex items-center flex-shrink-0">
                                    <span
                                        v-show="item[1]?.hp?.hids == 0"
                                        class="bg-[#BF3D3615] text-xs rounded-3xl text-[#BF3D36] px-2 leading-5 mr-3"
                                    >
                                        不可串关
                                    </span>
                                    <i
                                        @click="deleteItem(item[0])"
                                        class="icon-shanchu text-[#BF3D36] font-medium text-base flex-shrink-0"
                                    ></i>
                                </div>
                            </div>
                            <div
                                class="min-h-[74px] bg-white flex items-center justify-between px-5"
                            >
                                <div class="flex-1 overflow-hidden">
                                    <p
                                        class="font-semibold text-base line-clamp-2 leading-5 mb-2"
                                        :class="{ '!text-[#8C8C8C]': isGrey(item[1]) }"
                                    >
                                        <template v-if="item[1]?.match?.mhn && item[1]?.match?.man">
                                            {{ item[1]?.match?.mhn }}
                                            vs
                                            {{ item[1]?.match?.man }}
                                        </template>
                                    </p>
                                    <div
                                        class="text-xs flex items-center line-clamp-1 whitespace-nowrap flex-shrink-0"
                                        :class="{ '!text-[#8C8C8C]': isGrey(item[1]) }"
                                    >
                                        <span>
                                            {{ item[1].hp?.hpn || item[1]?.hp?.hps }}
                                        </span>
                                        <i
                                            class="border-r border-mainText mx-2 h-3"
                                            :class="{ '!border-[#8C8C8C]': isGrey(item[1]) }"
                                        ></i>
                                        <span class="line-clamp-1 break-all">
                                            {{ rightText(item[1]) }}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex-shrink-0 pl-5 min-w-[90px] flex justify-end">
                                    <template
                                        v-if="
                                            matchStatus(
                                                Number(item[1]?.match?.mhs),
                                                item[1]?.hl?.hs,
                                                Number(item[1]?.oddsStatus)
                                            ) == 'Opened'
                                        "
                                    >
                                        <BetOv
                                            :first-ov="`${item[1]?.ov}`"
                                            :hsw="item[1]?.hp?.hsw"
                                            :key="`${item[1]?.odds}`"
                                            :item="item[1]?.odds"
                                            class="!mr-0"
                                        />
                                    </template>
                                    <span v-else class="text-[#BF3D36] font-medium text-sm">
                                        盘口已关闭
                                    </span>
                                </div>
                            </div>
                        </div>
                    </TransitionGroup>
                </div>
            </div>
        </div>
        <VanPopup
            position="bottom"
            :overlay="showSeries"
            v-model:show="showSeriesMode"
            :close-on-click-overlay="false"
            @click-overlay="setShowSeries"
            overlay-class="transform-gpu transition-all"
            class="w-full bg-[#F9FCFF] max-h-[80vh] rounded-t-xl transition-all duration-[400ms] transform-gpu will-change-auto"
            :class="{
                'h-16 overflow-hidden': !showSeries,
                'h-[509px]': showSeries && betAmountInfo.size >= 3,
                'h-[458px]': showSeries && betAmountInfo.size == 2,
                'h-[410px]': showSeries && betAmountInfo.size == 1,
            }"
        >
            <div class="h-full flex flex-col">
                <div class="pl-4 flex-shrink-0">
                    <PublicHead
                        title="串关方式"
                        :border="false"
                        class="!text-mainText h-16"
                        :class="{ '!h-[50px]': showSeries }"
                    >
                        <template #right>
                            <VanButton
                                :disabled="countLoading"
                                class="p-0 w-20 border-0 text-txt"
                                @click.stop="setShowSeries"
                            >
                                <i
                                    class="iconfont icon-arrow-up-bold transition-all inline-block"
                                    :class="{ 'rotate-180': showSeries }"
                                ></i>
                                <span class="font-medium ml-[9px]">
                                    {{ showSeries ? "收起" : "展开" }}
                                </span>
                            </VanButton>
                        </template>
                    </PublicHead>
                </div>
                <div class="flex-1 relative bg-[#F6F8F8]">
                    <div
                        @scroll="scroll"
                        class="relative"
                        :class="{
                            'h-[406px] !flex-auto !overflow-y-auto':
                                Number(betAmountInfo.size) > 7 && !showKeyboard,
                            'h-[147px] !flex-auto !overflow-y-auto':
                                showKeyboard && Number(betAmountInfo.size) >= 3,
                        }"
                    >
                        <div
                            :key="index"
                            @click.stop="selectItem"
                            v-for="(item, index) in betAmountInfo"
                            class="h-12 flex items-center pl-4 first-of-type:border-t first-of-type:border-t-[#E7E7E7] pr-4 border-b border-b-[#E7E7E7]"
                            :class="{
                                '!bg-[#F9FCFF] first-of-type:!border-t-0 pointer-events-none opacity-0':
                                    !showSeries,
                            }"
                        >
                            <div class="flex-1 overflow-hidden flex items-center h-full">
                                <p class="font-medium mr-[5px] pointer-events-none">
                                    {{ seriesType(item[1].type) }}
                                </p>
                                <span
                                    class="font-OPPO min-w-[25px] text-center text-xs bg-[#255AD8] rounded text-white -translate-y-1 pointer-events-none px-1"
                                >
                                    x{{ item[1].num }}
                                </span>
                            </div>
                            <div class="h-full flex items-center" @click="selectOrder(item[1])">
                                <div
                                    class="flex items-center after:inline-block after:h-4 after:w-[2px] after:rounded after:mx-[2px] text-15px pointer-events-none font-OPPO_M"
                                    :class="{
                                        'after:bg-main cursor': item[1]?.showKeyboard,
                                        'text-mainText font-medium font-OPPO !text-[18px]':
                                            item[1]?.betAmount,
                                    }"
                                >
                                    <span
                                        class="text-[#7E8A8A] mr-10px text-15px"
                                        v-show="!item[1]?.betAmount"
                                    >
                                        限额
                                    </span>
                                    <span
                                        class="text-[#A9A9A9] font-OPPO_B"
                                        :class="{ '!text-mainText': item[1]?.betAmount }"
                                    >
                                        {{
                                            item[1]?.betAmount
                                                ? addThousandSeparator(Number(item[1]?.betAmount))
                                                : `${addThousandSeparator(
                                                      Number(item[1]?.minBet)
                                                  )}~${addThousandSeparator(
                                                      Number(item[1]?.orderMaxPay)
                                                  )}`
                                        }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img
                        v-show="showKeyboard && Number(betAmountInfo.size) > 3"
                        class="w-10px h-10px object-contain mx-auto tlw_arrow_down absolute bottom-10px left-1/2 -translate-x-1/2 opacity-0 transition-all"
                        :class="{ 'opacity-100': !showAtBottom }"
                        :src="ic_arrow_InSeriesPopup"
                        alt=""
                    />
                </div>
                <Keyboard
                    @change="change"
                    v-show="showKeyboard"
                    @close="showKeyboard = false"
                    :value="betAmountInfo.get(selectType)?.betAmount || ''"
                />
                <div class="h-28 flex-shrink-0 px-[18px]">
                    <div class="flex items-center justify-between text-mainText text-15px py-10px">
                        <div
                            class="flex-1 overflow-hidden pr-2 relative before:absolute before:right-0 before:h-4 before:border-r before:border-r-[#ccc] flex items-center justify-between"
                        >
                            <span class="whitespace-nowrap">可赢额</span>
                            <span
                                class="font-OPPO_M pl-1 text-13px text-[#BF3D36] break-all line-clamp-1"
                            >
                                {{ betWinTotal }}
                            </span>
                        </div>
                        <div class="flex-1 overflow-hidden flex items-center justify-between pl-2">
                            <span class="whitespace-nowrap">共投注</span>
                            <span
                                class="font-OPPO_M text-13px text-[#BF3D36] break-all line-clamp-1"
                            >
                                {{ betTotal }}
                            </span>
                        </div>
                    </div>
                    <VanButton
                        :loading="loading"
                        @click.stop="submit"
                        :disabled="loading"
                        class="w-full h-12 bg-[#A0A0A0] text-white rounded-xl border-0 text-17px"
                        :class="{ 'tlw_btn_linear ': Number(betTotal) > 0 }"
                    >
                        {{ Number(betTotal) > 0 ? "确定投注" : "请输入投注金额" }}
                    </VanButton>
                </div>
            </div>
        </VanPopup>
    </VanPopup>
</template>

<script setup lang="ts">
import { useBets } from "@/stores/useBets";
import { storeToRefs } from "pinia";
import NavBar from "../NavBar.vue";
import PublicHead from "../PublicHead.vue";
import { ref, nextTick, watch, computed, onMounted } from "vue";
import ic_refresh from "@/assets/svg/ic_refresh.svg?raw";
import BetOv from "./BetOv.vue";
import { useAsync } from "@/stores/useAsync";
import { ellipsis, throttle } from "@/utils";
import Keyboard from "./Keyboard.vue";
import { API } from "@/api/index";
import {
    addThousandSeparator,
    getScoresOrigin,
    marketTypeFinally,
    matchStatus,
    rightText,
    seriesType,
} from "@/utils/match";
import { IcountJointNumber, LatestMarketInfoDtoList } from "@/api/obsportend/obSport/interface";
import { ovTransition, transitionMatchType } from "@/utils/match";
import { BetAmountInfo } from "@/api/obsportend/obSport/types";
import { IBetParlay, IClientBet, PSeriesOrder } from "@/api/obsportend/obMarket/interface";
import { showFailToast } from "vant";
import { useHomeWorker } from "@/worker";
import { useStore } from "@/stores/index";
import { ClientBet } from "@/api/obsportend/obMarket/types";
import { Value } from "@/stores/types";
import ic_arrow_InSeriesPopup from "@/assets/icon/ic_arrow_InSeriesPopup.png";

const loopLoading = ref<boolean>();
const { balance } = storeToRefs(useAsync());
const { sports, normal, betTimeKey } = storeToRefs(useAsync());
const {
    setShowSeriesPopup,
    deleteBetList,
    editBetList,
    clearBetList,
    setShowFailPopup,
    setFailOrderDetail,
    setOrderDetail,
    saveBetsStorage,
    setShowSuccessPopup,
} = useBets();
const { line } = storeToRefs(useStore());
const { showSeriesPopup, betList } = storeToRefs(useBets());
const showSeries = ref<boolean>(false);
const showSeriesMode = ref<boolean>(true);
const animate = ref<boolean | string>();
const showKeyboard = ref<boolean>(false);
const betAmountInfo = ref<Map<string, BetAmountInfo>>(new Map());
const selectType = ref<string>("");
const loading = ref<boolean>(false);
const countLoading = ref<boolean>(false);
const showAtBottom = ref<boolean>(false);

const change = (e: string) => {
    const item = betAmountInfo.value.get(selectType.value);
    if (item) item.betAmount = e;
};

const isClose = computed(() => {
    // 有盘口已经关闭
    const arr = Array.from(betList.value.values());
    return arr?.some(
        item =>
            matchStatus(item?.match?.mhs!, item?.hl?.hs, item?.odds?.os) != "Opened" ||
            item?.hp?.hids == 0
    );
});

const setShowSeries = () => {
    // 展开闯关选项
    if (showSeries.value && betList.value.size == 1) showSeries.value = !showSeries.value;
    if (betList.value.size <= 1) return showFailToast("请至少选择两场比赛");
    if (isClose.value && !showSeries.value)
        return showFailToast("串关中存在已关闭或不可串关的选项");
    showSeries.value = !showSeries.value;
};

const selectItem = async (e: Event) => {
    // 当选择某个串关 滚动
    showKeyboard.value = true;
    nextTick(() => {
        (e.target as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
    });
};

const isGrey = computed(() => (item: Value) => {
    // 不可串关 || 盘口已关闭
    return (
        item?.hp?.hids == 0 || matchStatus(item.match?.mhs!, item.hl?.hs, item.odds?.os) != "Opened"
    );
});

const betTotal = computed(() => {
    // 总下注金额
    return Array.from(betAmountInfo.value.values()).reduce((prev, item) => {
        return (+prev + (Number(item.betAmount) || 0) * item.num).toFixed(2);
    }, "0");
});

const betWinTotal = computed(() => {
    // 可赢总额
    return Array.from(betAmountInfo.value.values()).reduce((prev, item) => {
        return (+prev + (Number(item.betAmount) || 0) * +item.seriesOdds).toFixed(2);
    }, "0");
});

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
    if (isClose.value) return showFailToast("串关中存在已关闭或不可串关的选项");
    const status = Array.from(betAmountInfo.value.values())?.some(item => {
        if (item.betAmount) {
            if (
                Number(item.betAmount) < Number(item.minBet) ||
                Number(item.betAmount) > Number(item.orderMaxPay)
            ) {
                showFailToast({
                    message: `输入金额不能超过最小最大额度`,
                    icon: "warning",
                    className: "warning",
                });
                return true;
            }
        }
    });
    if (status) return;
    let params: IClientBet | IBetParlay = {
        acceptOdds: sports.value?.bet || 1,
        deviceType: "1",
        currencyCode: "",
        deviceImei: "",
        seriesOrders: [],
        openMiltSingle: 0,
    };
    Array.from(betAmountInfo.value.values())?.forEach(v => {
        let betParlayData: PSeriesOrder;
        if (+v.betAmount! > 0) {
            betParlayData = {
                fullBet: +betTotal.value == +balance.value?.coin! ? 1 : 0,
                orderDetailList: [],
                seriesSum: v.num,
                seriesType: +v.type,
                seriesOdds: v.seriesOdds,
            };
            Array.from(betList.value.values())?.forEach(item => {
                betParlayData.orderDetailList!.push({
                    betAmount: v?.betAmount!,
                    marketId: item?.hid,
                    matchId: item?.hp?.mid || "",
                    marketTypeFinally: marketTypeFinally(item.hp?.hsw),
                    matchType: transitionMatchType(item?.hp?.hl?.[0]?.hmt!),
                    oddFinally: ovTransition(item?.odds.ov, item.hp.hsw).toString(),
                    odds: item?.odds.ov,
                    playId: item?.hp?.hpid,
                    playOptionsId: item?.oid,
                    placeNum: item.hp?.hl?.[0]?.hn!,
                    scoreBenchmark: getScoresOrigin(item.match?.msc!),
                });
            });
        }
        if (betParlayData!) params.seriesOrders?.push(betParlayData);
    });
    if (!params.seriesOrders?.[0]) {
        return;
    }
    betParlay(params);
};

const betParlay = async (params: IBetParlay) => {
    // 串關
    loading.value = true;
    const res = await API.betParlay(params);
    loading.value = false;
    showSeries.value = false;
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
                    seriesOrderRespList: [],
                    maxWinMoneyTotal: `${+betWinTotal.value * 100}`,
                    betMoneyTotal: `${+betTotal.value * 100}`,
                };
                Array.from(betList.value.values())?.forEach(item => {
                    data.orderDetailRespList?.push({
                        betMoney: `${+item.betAmount! * 100}`,
                        maxWinMoney: (+maxWinMoney * 100)?.toFixed(2),
                        oddsValues: ovTransition(item?.odds.ov, item.hp.hsw).toString(),
                        playOptionsId: item.oid,
                        playName: item.hp.hpn,
                        playOptionName: rightText(item),
                    });
                });
                Array.from(betAmountInfo.value.values())?.forEach(item => {
                    if (item?.betAmount) {
                        data.seriesOrderRespList?.push({
                            seriesSum: item.num,
                            seriesValue: seriesType(item.type),
                            seriesOdds: item.seriesOdds,
                        });
                    }
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
        Array.from(betAmountInfo.value)?.forEach(item => {
            item[1].betAmount = "";
        });
        return;
    }
    return res;
};

const queryLatestMarketInfoList = async () => {
    // 查询赔率 以及开盘状态
    const params: LatestMarketInfoDtoList[] = Array.from(betList.value).map(item => ({
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
            JSON.stringify(Array.from(betList.value.entries()) || []),
            JSON.stringify(res.data || [])
        );
        editBetList(data);
        saveBetsStorage(data);
    }
    return res;
};

const selectOrder = (item: BetAmountInfo) => {
    // 选中单注
    betAmountInfo.value?.forEach(v => (v.showKeyboard = false));
    item.showKeyboard = true;
    showKeyboard.value = true;
    selectType.value = item.type;
};

const deleteItem = (item: string) => {
    deleteBetList(item);
    countJointNumber();
};

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

const clickLeft = () => {
    setShowSeriesPopup(false);
};

const closed = () => {};

const clear = () => {
    setShowSeriesPopup(false);
    nextTick(() => {
        clearBetList();
    });
};

const countJointNumber = async (isLoading: boolean = true) => {
    const data: IcountJointNumber[] = [];
    Array.from(betList.value).forEach(item => {
        data.push({
            deviceType: 1,
            marketId: item[1]?.hid,
            matchId: item[1].hp.mid,
            matchType: transitionMatchType(item[1]?.hp?.hl?.[0]?.hmt),
            oddsFinally: ovTransition(item[1]?.odds?.ov, item[1]?.hp?.hsw).toString(),
            oddsValue: +item[1]?.odds?.ov,
            openMiltSingle: 0,
            playId: item[1]?.hp.hpid,
            playOptionId: item[1]?.odds.oid,
            seriesType: 1,
        });
    });
    if (isLoading) countLoading.value = true;
    const res = await API.countJointNumber(data);
    countLoading.value = false;
    if (res.code == 0) {
        if (isLoading) betAmountInfo.value.clear();
        const data = await useHomeWorker.countJointNumber(
            JSON.stringify(Array.from(betAmountInfo.value.entries()) || []),
            JSON.stringify(res.data?.betAmountInfo || [])
        );
        betAmountInfo.value = data;
    }
};

const scroll = (e: Event) => {
    throttle(() => {
        const target = e.target as HTMLElement;
        showAtBottom.value = target.clientHeight + target.scrollTop + 8 > target.scrollHeight;
    }, 50)();
};

watch(
    () => betTimeKey.value,
    async () => {
        // 定时器轮巡 多個查询最新盘口数据
        if (loopLoading.value || !line.value || !normal.value || !showSeriesPopup.value) return;
        countJointNumber(false);
        queryLatestMarketInfoList();
    }
);

watch(
    () => showSeriesPopup.value,
    n => {
        if (!n) {
            return;
        }
        countJointNumber();
        queryLatestMarketInfoList();
    }
);
</script>
