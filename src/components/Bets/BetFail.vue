<!-- 下注 失败 -->
<template>
    <VanPopup
        :round="true"
        position="bottom"
        v-model:show="showFailPopup"
        :safe-area-inset-bottom="true"
        style="--van-popup-background: transparent"
    >
        <div class="h-full flex flex-col relative">
            <!-- 勿删 -->
            <div class="h-5"></div>
            <div
                class="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center top-0 pointer-events-none"
            >
                <div
                    class="w-[42px] h-[42px] bg-mainBg rounded-full flex items-center justify-center"
                >
                    <img class="w-9 h-9" :src="ic_fail" alt="" />
                </div>
                <p class="font-medium translate-y-3 text-17px text-[#BF3B34]">下注失败</p>
            </div>
            <div class="bg-[#FAFCFF] rounded-t-xl">
                <div class="flex-1 px-5 pt-[78px] pb-1">
                    <div class="bg-[#f4f4f4] rounded-t-xl max-h-[65vh] overflow-y-auto">
                        <div
                            :key="index"
                            class="min-h-[65px]"
                            v-for="(item, index) in failOrderDetail?.orderDetailRespList"
                        >
                            <div class="flex flex-col justify-center h-full">
                                <div
                                    class="border-b h-[65px] flex flex-col justify-center border-b-[#ccc] px-3"
                                >
                                    <PublicHead
                                        :showLeft="false"
                                        :title="`${item?.playOptionName}`"
                                        :border="false"
                                        class="h-9 text-lg !pl-0 font-semibold !text-mainText"
                                    >
                                        <template #right>
                                            <div
                                                class="flex items-center translate-y-2 text-[#255AD8]"
                                            >
                                                <span>@</span>
                                                <span class="font-OPPO text-[19px]">
                                                    {{ item?.oddsValues }}
                                                </span>
                                            </div>
                                        </template>
                                    </PublicHead>
                                    <div
                                        class="flex text-mainText text-xs items-center justify-between"
                                    >
                                        <p>
                                            {{ item.playName }}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    v-if="!isSeries"
                                    class="h-10 flex items-center justify-between whitespace-nowrap px-3"
                                >
                                    <div
                                        class="flex flex-1 items-center justify-between overflow-hidden relative before:absolute before:right-0 before:h-4 before:top-1/2 before:-translate-y-1/2 before:border-r before:border-r-[#ccc]"
                                    >
                                        <p class="text-17px flex-1">可赢额</p>
                                        <p
                                            class="flex-1 font-OPPO_M text-17px pr-2 line-clamp-1 text-right text-[#BF3D36]"
                                        >
                                            {{ (Number(item.maxWinMoney) / 100).toFixed(2) }}
                                        </p>
                                    </div>
                                    <div
                                        class="flex flex-1 items-center justify-between overflow-hidden"
                                    >
                                        <p class="text-17px flex-1 text-center pl-1">共投注</p>
                                        <p
                                            class="flex-1 font-OPPO_M text-17px text-right line-clamp-1 text-[#BF3D36]"
                                        >
                                            {{ (Number(item.betMoney) / 100).toFixed(2) }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            :key="index"
                            class="min-h-[65px]"
                            v-for="(item, index) in failOrderDetail?.seriesOrderRespList"
                        >
                            <div class="flex flex-col justify-center h-full">
                                <div
                                    class="border-b h-[65px] flex flex-col justify-center border-b-[#ccc] px-3"
                                >
                                    <PublicHead
                                        :showLeft="false"
                                        :title="`${item?.seriesValue}`"
                                        :border="false"
                                        class="h-9 text-lg !pl-0 font-semibold !text-mainText"
                                    >
                                        <template #right>
                                            <div class="flex items-center text-[#255AD8]">
                                                <span>@</span>
                                                <span class="font-OPPO text-[19px]">
                                                    {{ item?.seriesValue }}
                                                </span>
                                            </div>
                                        </template>
                                    </PublicHead>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="isSeries"
                            class="h-10 flex items-center justify-between whitespace-nowrap px-3"
                        >
                            <div
                                class="flex flex-1 items-center justify-between overflow-hidden relative before:absolute before:right-0 before:h-4 before:top-1/2 before:-translate-y-1/2 before:border-r before:border-r-[#ccc]"
                            >
                                <p class="text-17px whitespace-nowrap flex-shrink-0">可赢额</p>
                                <p
                                    class="flex-1 font-OPPO_M text-17px pr-2 line-clamp-1 text-right text-[#BF3D36]"
                                >
                                    {{
                                        (Number(failOrderDetail?.maxWinMoneyTotal) / 100).toFixed(2)
                                    }}
                                </p>
                            </div>
                            <div class="flex flex-1 items-center justify-between overflow-hidden">
                                <p
                                    class="text-17px whitespace-nowrap flex-shrink-0 text-center pl-2"
                                >
                                    共投注
                                </p>
                                <p
                                    class="flex-1 font-OPPO_M text-17px text-right line-clamp-1 text-[#BF3D36]"
                                >
                                    {{ (Number(failOrderDetail?.betMoneyTotal) / 100).toFixed(2) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-center pt-10px bg-white pb-3">
                    <VanButton
                        class="border-0 pb-1 text-17px rounded-xl bg-mainBg w-[160px] h-12 mr-6 font-medium"
                        @click="keepBet"
                    >
                        继续投注此单
                    </VanButton>
                    <VanButton
                        class="border-0 pb-1 text-17px rounded-xl w-[160px] h-12 tlw_btn_linear text-white font-medium"
                        @click="close"
                    >
                        确定
                    </VanButton>
                </div>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { useBets } from "@/stores/useBets";
import { storeToRefs } from "pinia";
import ic_fail from "@/assets/bets/ic_fail.png";
import { computed } from "vue";
import PublicHead from "@/components/PublicHead.vue";

const { showFailPopup, failOrderDetail, betList } = storeToRefs(useBets());
const { setShowFailPopup, setShowBetPopup, setShowSeriesPopup } = useBets();

const isSeries = computed(() => failOrderDetail?.value?.seriesOrderRespList?.[0]?.seriesSum);

const keepBet = () => {
    // 继续投注
    setShowFailPopup(false);
};

const close = () => {
    // 点确定时删除已投注成功的投注项
    Array.from(betList.value.values()).forEach(item =>
        failOrderDetail?.value?.orderDetailRespList?.some(v => {
            if (item.oid == v.playOptionsId) {
                betList.value.delete(v.playOptionsId);
                return true;
            }
        })
    );
    setShowFailPopup(false);
    if (betList.value.size == 0) {
        setShowBetPopup(false);
        setShowSeriesPopup(false);
    }
};
</script>
