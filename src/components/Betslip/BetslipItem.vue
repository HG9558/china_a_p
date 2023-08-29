<!-- 注单列表组件 单个Item -->
<template>
    <div class="pb-3">
        <div class="flex flex-col px-4 rounded-10px relative">
            <div class="tlw_betslip_bg absolute top-0 left-0 w-full h-full"></div>
            <header class="h-8 flex items-center justify-between text-mainText font-bold"></header>
            <div
                class="pt-2 pb-3 border-b border-b-mainBg"
                :class="{ '!border-b-0': i == item?.viewSportJson?.length - 1 }"
                v-for="(v, i) in item.viewSportJson"
                :key="v.transactionId + i"
            >
                <div
                    class="w-24 h-8 pointer-events-none absolute pb-1 top-0 -left-[2px] flex items-center text-xs"
                >
                    <i class="ml-5 inline-block w-[3px] h-[13px] rounded bg-white"></i>
                    <span class="text-white ml-1">
                        {{ v.isParlay ? "串关" : "单注" }}
                    </span>
                </div>
                <span
                    class="absolute h-8 top-0 left-20 text-xs flex items-center text-mainText"
                    v-show="v.isParlay"
                >
                    {{ seriesType(`${v.seriesType}`) }}
                </span>
                <div class="relative w-full h-full">
                    <div class="flex items-center text-sm mb-10px">
                        <span class="mr-1">
                            {{ item.gameTypeName }}
                        </span>
                        <span>
                            {{ v.matchName }}
                        </span>
                    </div>
                    <div class="flex items-end justify-between mt-3 mb-[6px]">
                        <div class="flex-1 flex-col">
                            <p class="text-17px">
                                {{ v.betOptionName }}
                                <span class="font-medium"> @{{ v.odds }} </span>
                            </p>
                            <p class="text-sm text-txt_d leading-5 mt-2">
                                {{ `[${v?.isLive ? "滚球" : "早盘"}]` }}
                                {{ `[${v?.oddsTypeName}]` }}
                                {{ v.betName }}
                                {{ v.matchScore && `（${v.matchScore}）` }}
                            </p>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-sm font-semibold">
                            {{ v.matchTeamsName }}
                            <span class="text-13px font-normal ml-1">
                                {{ formatTime(v.matchTime, "MM/DD HH:mm") }}
                            </span>
                        </p>
                    </div>
                    <img
                        v-show="active_c === 1 && page != 1"
                        class="w-14 h-14 absolute right-4 top-1/2 -translate-y-1/2"
                        :src="betStatus[v.betStatus]"
                        alt=""
                    />
                </div>
            </div>
            <div class="relative rounded-md mt-3 grid grid-cols-3">
                <div class="col-span-2 py-2 rounded-md flex border-[#F1F2F6] border mr-[2px]">
                    <div class="flex flex-1 flex-col pl-4 text-xs text-[#121212]">
                        <span class="text-txt_d">投注</span>
                        <p class="text-lg leading-6 font-medium font-OPPO line-clamp-1 break-all">
                            {{ item.stake }}
                        </p>
                    </div>
                    <div class="flex flex-1 flex-col pl-4 text-xs text-[#121212]">
                        <span class="text-txt_d">
                            {{ active_c == 0 ? "预计可赢金额" : "返还金额" }}
                        </span>
                        <p class="text-lg leading-6 font-medium font-OPPO line-clamp-1 break-all">
                            {{ active_c == 0 ? item.viewSportJson?.[0]?.maxPayout : item.payout }}
                        </p>
                    </div>
                </div>
                <div
                    v-show="active_c === 1"
                    class="flex flex-1 rounded-md border-[#F1F2F6] border flex-col py-2 pl-4 text-xs text-[#121212] relative"
                >
                    <span class="text-txt_d">盈亏</span>
                    <p
                        class="text-lg leading-6 font-medium font-OPPO line-clamp-1 break-all"
                        :class="{
                            'text-[#F14646]': +item.xbProfit > 0,
                            'text-fz_g': /(-)/.test(`${item.xbProfit}`),
                        }"
                    >
                        {{
                            /(2|3)/.test(`${item.viewSportJson?.[0]?.betStatus}`)
                                ? item.xbProfit
                                : `+${item.xbProfit}`
                        }}
                    </p>
                    <img
                        v-show="page != 1"
                        class="w-[27.5px] h-6 absolute right-2 -top-[3px]"
                        :src="betStatusB(item.xbProfit)"
                        alt=""
                    />
                </div>
                <div
                    v-show="active_c === 0"
                    class="flex flex-1 items-center border-[#F1F2F6] border rounded-md py-2 text-sm justify-center whitespace-nowrap"
                    :class="{
                        'text-[#FB823E]': +item.xbStatus == 0,
                        'text-tip': +item.xbStatus == 1,
                    }"
                >
                    <i class="text-lg icon-chenggong mr-1" />
                    {{ +item.xbStatus == 0 ? "待结算" : "已确认" }}
                </div>
            </div>
            <div
                class="text-xs text-[#666] leading-5 my-2 flex items-center whitespace-nowrap justify-between"
            >
                <div
                    class="flex items-center scale-90 -translate-x-1"
                    @click="copyText(item.transactionId)"
                >
                    <p class="mr-1">
                        单号：
                        {{ item.transactionId }}
                    </p>
                    <img class="w-3 h-3" :src="icon_copy" alt="" />
                </div>
                <p class="scale-90 translate-x-1">
                    {{ formatTime(item.viewSportJson?.[0]?.betTime) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from "vue";
import { copyText, formatTime } from "@/utils";
import ic_win_a from "@/assets/home/ic_win_a.png";
import ic_lose_a from "@/assets/home/ic_lose_a.png";
import ic_draw_a from "@/assets/home/ic_draw_a.png";
import ic_win_b from "@/assets/home/ic_win_b.png";
import ic_lose_b from "@/assets/home/ic_lose_b.png";
import ic_draw_b from "@/assets/home/ic_draw_b.png";
import type { DList } from "@/api/platform/types";
import { seriesType } from "@/utils/match";
import icon_copy from "@/assets/icon/icon_copy.png";

const props = defineProps<{ item: DList; active_c: number; page?: number }>();

interface IbetStatus {
    [name: number]: any;
}

const betStatus: IbetStatus = {
    1: ic_win_a,
    2: ic_lose_a,
    3: ic_draw_a,
};
const betStatusB = computed(() => (xbProfit: number) => {
    switch (true) {
        case xbProfit > 0:
            return ic_win_b;
        case /(-)/.test(`${xbProfit}`):
            return ic_lose_b;
        default:
            return ic_draw_b;
    }
});

const { item } = toRefs(props);
</script>
