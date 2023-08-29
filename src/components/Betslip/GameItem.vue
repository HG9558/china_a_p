<!-- 注单 游戏 游戏详情 单个Item -->
<template>
    <div class="pb-10px px-2">
        <div class="flex flex-col px-10px rounded-10px relative">
            <div class="tlw_game_bg absolute top-0 left-0 w-full h-full"></div>
            <header class="h-8 flex items-center justify-between text-mainText">
                <div
                    class="w-[88px] h-8 pt-[6px] flex items-center justify-center text-xs -ml-3 font-bold"
                >
                    <span class="text-white -translate-y-[2px] line-clamp-1 px-[2px]">
                        {{ item.gameName }}
                    </span>
                </div>
                <div class="flex-1 flex items-center justify-between relative z-10 translate-y-2">
                    <span class="text-sm text-mainText font-medium -translate-y-[7px] pl-2">
                        {{ item.gameTypeName }}
                    </span>
                    <div class="flex flex-col text-xs">
                        <p class="text-txt_d text-right">有效投注</p>
                        <p class="text-17px font-bold font-OPPO">
                            {{ item.validBet }}
                        </p>
                    </div>
                </div>
            </header>
            <div class="relative rounded-md mt-6 grid grid-cols-3">
                <div
                    class="col-span-2 py-2 rounded-md flex relative border border-[#F1F2F6] mr-[2px]"
                >
                    <div class="flex flex-1 flex-col pl-4 text-xs text-[#121212]">
                        <span class="text-txt_d"> 本金 </span>
                        <p class="text-lg leading-6 font-medium font-OPPO line-clamp-1 break-all">
                            {{ item.stake }}
                        </p>
                    </div>
                    <div class="flex flex-1 flex-col pl-4 text-xs text-[#121212]">
                        <span class="text-txt_d"> 返还额 </span>
                        <p class="text-lg leading-6 font-medium font-OPPO line-clamp-1 break-all">
                            {{ item.payout }}
                        </p>
                    </div>
                </div>
                <div
                    class="flex flex-1 rounded-md border border-[#F1F2F6] flex-col py-2 pl-4 text-xs text-[#121212] relative"
                >
                    <span class="text-txt_d"> 输/赢 </span>
                    <p
                        class="text-lg leading-6 font-medium font-OPPO line-clamp-1 break-all"
                        :class="{
                            'text-[#F14646]': +item.xbProfit > 0,
                            'text-fz_g': /(-)/.test(`${item.xbProfit}`),
                        }"
                    >
                        {{ item.xbProfit }}
                    </p>
                    <img
                        v-show="page != 1 && Number(item.xbStatus) == 1"
                        class="w-[27.5px] h-6 absolute right-2 -top-[3px]"
                        :src="betStatusB(item.xbProfit)"
                        alt=""
                    />
                </div>
            </div>
            <div
                class="text-xs text-[#666] leading-5 my-2 flex items-center whitespace-nowrap justify-between"
            >
                <div
                    class="flex items-center scale-90 flex-1"
                    @click="copyText(item.transactionId)"
                >
                    <p class="mr-1 line-clamp-1">
                        单号：
                        {{ item.transactionId }}
                    </p>
                    <img class="w-3 h-3" :src="icon_copy" alt="" />
                </div>
                <p class="scale-90 flex-shrink-0">
                    {{ formatTime(item.updatedAt) }}
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
import icon_copy from "@/assets/icon/icon_copy.png";

const props = defineProps<{ item: DList; page?: number }>();

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
