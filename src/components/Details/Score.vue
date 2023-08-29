<!-- 赛事详情 比分组件 -->
<template>
    <div class="h-full flex flex-col">
        <div class="flex items-center justify-between flex-shrink-0 pl-[18px] pr-14px min-h-[22px]">
            <p class="text-xs rounded leading-[22px] text-white">
                <template v-if="details?.mmp == '0'">
                    开赛时间 {{ formatTime(+details.mgt / 1000, "MM-DD HH:mm") }}
                </template>
                <span
                    v-show="false"
                    class="flex-1 text-right pr-1 whitespace-nowrap"
                    :class="{
                        '!text-center !pr-0': noStart || Number(details?.mst) <= 0,
                    }"
                >
                    <template v-if="details?.csid">
                        {{ mmpToString(details?.csid, details?.mmp) || "-" }}
                    </template>
                </span>
                <span
                    class="flex-1 text-left pl-1 font-OPPO"
                    v-if="!noStart && +Number(details?.mst) && !/(31|33)/.test(`${details?.mmp}`)"
                >
                    <Timer :mst="Number(details?.mst)" />
                </span>
            </p>
            <VanButton
                v-show="isPlayAnim"
                class="h-5 py-0 px-1 flex items-center justify-center border-0 rounded text-xs whitespace-nowrap text-white mr-10px"
                @click="headerTabs({ type: 'Animation' })"
            >
                <template #icon>
                    <div class="h-5" v-html="ic_animation" />
                </template>
                <span class="inline-block -ml-[2px]">动画</span>
            </VanButton>
        </div>
        <div class="flex-1 flex text-white flex-col items-center justify-center rounded-xl">
            <div class="flex items-center relative w-full px-[18px]">
                <div class="relative flex-1 flex flex-col items-start justify-center">
                    <img class="w-9 h-9 rounded-full" v-lazy="details?.mhlu?.[0]" alt="" />
                    <div class="text-sm text-left line-clamp-1 mt-2 min-h-[20px] flex items-center">
                        <p class="line-clamp-1">
                            {{ details?.mhn || "" }}
                        </p>
                        <div
                            v-show="!noStart"
                            class="flex flex-shrink-0 items-center justify-center opacity-0"
                            :class="{ 'opacity-100': isFootBall }"
                        >
                            <span
                                v-show="details?.mscs?.S12?.[0] && details?.mscs?.S12?.[0] != '0'"
                                class="rounded-sm bg-[#FFA700] mx-1 font-OPPO text-xs text-white scale-90 min-w-[12px] text-center"
                            >
                                {{ details?.mscs?.S12?.[0] || "-" }}
                            </span>
                            <span
                                v-show="details?.mscs?.S11?.[0] && details?.mscs?.S11?.[0] != '0'"
                                class="rounded-sm bg-[#FF7161] font-OPPO text-xs text-white scale-90 min-w-[12px] text-center"
                            >
                                {{ details?.mscs?.S11?.[0] || "-" }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex-1 w-32">
                    <template v-if="/[0-9]/.test(`${details?.csid}`)">
                        <p class="w-full relative flex items-center justify-between font-OPPO_M">
                            <span class="text-center flex-1 pr-1 text-[36px]">
                                {{ details?.mscs?.S1?.[0] || "-" }}
                            </span>
                            <span class="text-base" v-if="details?.mmp == '0'">
                                {{ mmpToString(details?.csid, details?.mmp) || "-" }}
                            </span>
                            <span v-else class="text-[28px]">:</span>
                            <span class="text-center flex-1 pl-1 text-[36px]">
                                {{ details?.mscs?.S1?.[1] || "-" }}
                            </span>
                        </p>
                        <p class="h-5 text-center -translate-y-1">
                            <span class="opacity-70 text-sm font-OPPO" v-if="current">
                                [{{ details?.mscs?.[current.key]?.[0] }}-{{
                                    details?.mscs?.[current.key]?.[1]
                                }}]
                            </span>
                        </p>
                    </template>
                </div>
                <div class="relative flex-1 flex flex-col items-end justify-center">
                    <img class="w-9 h-9 rounded-full" v-lazy="details?.malu?.[0]" alt="" />
                    <div
                        class="text-right text-sm line-clamp-1 mt-2 min-h-[20px] flex items-center"
                    >
                        <div
                            v-show="!noStart"
                            class="flex-shrink-0 flex items-center justify-center opacity-0"
                            :class="{ 'opacity-100': isFootBall }"
                        >
                            <span
                                v-show="details?.mscs?.S12?.[1] && details?.mscs?.S12?.[1] != '0'"
                                class="rounded-sm bg-[#FFA700] font-OPPO text-xs text-white scale-90 min-w-[12px] text-center"
                            >
                                {{ details?.mscs?.S12?.[1] || "-" }}
                            </span>
                            <span
                                v-show="details?.mscs?.S11?.[1] && details?.mscs?.S11?.[1] != '0'"
                                class="rounded-sm bg-[#FF7161] mx-1 font-OPPO text-xs text-white scale-90 min-w-[12px] text-center"
                            >
                                {{ details?.mscs?.S11?.[1] || "-" }}
                            </span>
                        </div>
                        <p class="line-clamp-1">
                            {{ details?.man || "" }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="h-[42px] relative w-full text-white">
            <div class="tlw_detail_bg_footer sm:sm_slice absolute top-0 left-0 w-full h-full"></div>
            <div
                v-if="isFootBall"
                class="pl-10px w-3/5 flex-1 h-full absolute bottom-0 left-0 flex rounded-sm text-xs whitespace-nowrap"
            >
                <template v-if="!noStart">
                    <div class="flex items-center justify-center mr-10px">
                        <img
                            class="flex-shrink-0 mr-1 w-[14px] h-[14px] object-contain"
                            :src="ic_ht"
                            alt=""
                        />
                        <span class="font-OPPO">
                            {{ details?.mscs?.S2?.[0] || "0" }}-{{ details?.mscs?.S2?.[1] || "0" }}
                        </span>
                    </div>
                    <div class="flex items-center justify-center">
                        <img
                            class="flex-shrink-0 mr-1 w-[14px] h-[14px] object-contain"
                            :src="ic_corner_kick"
                            alt=""
                        />
                        <span class="font-OPPO">
                            {{ details?.mscs?.S5?.[0] || "0" }}-{{ details?.mscs?.S5?.[1] || "0" }}
                        </span>
                    </div>
                </template>
            </div>
            <div
                v-if="isBasketball"
                class="pl-10px w-3/5 flex-1 h-full absolute font-medium bottom-0 left-0 flex items-center flex-wrap rounded-sm text-xs whitespace-nowrap"
            >
                <template v-if="!noStart && details">
                    <div
                        class="flex items-center justify-center mr-10px last-of-type:mr-0 last-of-type:text-[#FFE600]"
                        v-for="(item, index) in listFilter"
                        :key="index"
                    >
                        <span class="font-OPPO">
                            {{ details?.mscs?.[item.key]?.[0] || "0" }}-{{
                                details?.mscs?.[item.key]?.[1] || "0"
                            }}
                        </span>
                    </div>
                </template>
            </div>
            <div class="w-2/5 h-full flex items-center justify-center absolute bottom-0 right-0">
                <VanButton
                    :class="{ '!opacity-100': isPlayVideo }"
                    class="py-0 px-1 flex items-center justify-center border-0 rounded text-xs whitespace-nowrap text-white mr-10px opacity-50"
                    @click="isPlayVideo && headerTabs({ type: 'Video' })"
                >
                    <template #icon>
                        <img class="mr-1 w-[25px] h-[25px]" :src="ic_video" alt="" />
                    </template>
                    <span class="inline-block font-light text-15px">视频</span>
                </VanButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { mmpToString, durationTime } from "@/utils/match";
import { computed, toRefs, ref } from "vue";
import ic_ht from "@/assets/details/ic_ht.png";
import ic_corner_kick from "@/assets/details/ic_corner_kick.png";
import ic_video from "@/assets/details/ic_video.png";
import ic_animation from "@/assets/svg/ic_animation.svg?raw";
import { IheaderTab } from "./types";
import { Datum } from "@/api/obsportend/obMatches/types";
import Timer from "../Timer.vue";
import { formatTime } from "@/utils";

interface Ilistmmp {
    key: string;
    mmp?: string;
}

const props = defineProps<{ details?: Datum; headerTabs: (item: IheaderTab) => void }>();

const { details, headerTabs } = toRefs(props);

const isFootBall = computed(() => details?.value?.csid == "1");
const isBasketball = computed(() => details?.value?.csid == "2");
const isPlayVideo = computed(() => details?.value?.mms == 2);
const isPlayAnim = computed(() => Number(details?.value?.mvs) >= 1);
const noStart = computed(() => details?.value?.mmp == "0");

const listFilter = computed(() => {
    return listmmp2.value?.filter(v => /[0-9]/.test(`${details?.value?.mscs?.[v.key]?.[0]}`));
});

const listmmp2 = ref<Ilistmmp[]>([{ key: "S19" }, { key: "S20" }, { key: "S21" }, { key: "S22" }]);

const current = computed(() => listFilter.value?.[listFilter.value.length - 1]);
</script>
