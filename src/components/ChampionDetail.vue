<template>
    <VanPopup
        class="!z-40"
        position="right"
        v-model:show="showBottom"
        :overlay-style="{ 'z-index': 40 }"
        style="width: 100%; height: 100%"
    >
        <div class="h-full w-full tlw_top_bg flex flex-col">
            <NavBar
                class="flex-shrink-0"
                :transparent="true"
                :click-left="close"
                :nav-bar-props="{ title: data?.tn }"
            />
            <div class="bg-mainBg rounded-t-20px">
                <div
                    class="h-20 flex-shrink-0 text-center bg-gradient-to-b to-[#FEFEFE] from-[#F8F9FF] font-medium flex shadow-sm flex-col items-center justify-center rounded-20px"
                >
                    <p class="text-[15px] text-main">冠军投注</p>
                    <p class="text-15px font-medium text-mainText" v-if="data">
                        {{ formatTime(+data?.med / 1000, "YYYY/MM/DD HH:MM") }}
                    </p>
                </div>
            </div>
            <div class="h-12 flex-shrink-0 px-3 bg-mainBg flex items-center justify-between">
                <div class="flex items-center text-mainText">
                    <img class="w-[14px] h-3 mr-[5px]" :src="ic_all" alt="" />
                    <span class="text-15px font-medium">全部</span>
                </div>
                <div
                    class="w-6 h-6 ml-10px rounded-full bg-gradient-to-t from-icon_a to-icon_a_t flex items-center justify-center transition-all"
                    :class="{ 'rotate-180': receiveStatus }"
                    @click="receive"
                >
                    <i class="icon-arrow-up-filling text-white text-xs" />
                </div>
            </div>
            <div class="bg-mainBg flex-1 overflow-hidden">
                <SwiperBox v-if="data" ref="swiperRef">
                    <div
                        v-for="(item, index) in data.hps"
                        :key="index"
                        class="mt-2"
                        :class="{ '!mt-0': index == 0 }"
                    >
                        <div class="pl-5 bg-white rounded-t-20px z-0 overflow-hidden">
                            <PublicHead
                                :title="item.hps"
                                :border="false"
                                class="px-4 !text-mainText rounded-t-xl"
                            >
                                <template #right>
                                    <span
                                        class="icon-arrow-up-filling text-[#999] text-xs transition-all"
                                        :class="{ 'rotate-180': item.isHide }"
                                        @click="setIsHide(item)"
                                    ></span>
                                </template>
                            </PublicHead>
                        </div>
                        <ul
                            class="px-4 bg-white pt-3 pb-4 border-t-[3px] rounded-b-20px"
                            v-show="!item.isHide"
                        >
                            <li
                                :key="i"
                                v-for="(v, i) in item.ol"
                                class="flex h-[42px] items-center mb-3 rounded-xl justify-between px-4 pr-5 bg-mainBg last-of-type:mb-0 text-mainText"
                                :class="{ '!bg-txt text-white': betActive(v.oid) }"
                                @click="selectItem(data, item, v)"
                            >
                                <p class="text-sm">
                                    {{ v.on }}
                                </p>
                                <p class="font-AbhayaLibreSemiBold">
                                    {{ Number(ovTransition(v.ov, item.hsw))?.toFixed?.(2) }}
                                </p>
                            </li>
                        </ul>
                    </div>
                </SwiperBox>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import type { TList, HP, Ol } from "@/api/obsportend/obHome/types";
import { formatTime } from "@/utils";
import { betActive, ovTransition } from "@/utils/match";
import { computed, ref, toRefs } from "vue";
import NavBar from "@/components/NavBar.vue";
import type { SwiperRef } from "./types";
import SwiperBox from "@/components/SwiperBox.vue";
import PublicHead from "@/components/PublicHead.vue";
import ic_all from "@/assets/icon/ic_all.png";
import { useBets } from "@/stores/useBets";
import { storeToRefs } from "pinia";

const props = defineProps<{ modelValue: boolean; data: TList | undefined }>();
const receiveStatus = ref<boolean>();
const swiperRef = ref<SwiperRef>();
const { setBetList } = useBets();
const { betList } = storeToRefs(useBets());

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set() {
        close();
    },
});

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const selectItem = (data: TList, item: HP, v: Ol) => {
    const hps = [
        {
            hpid: "",
            mid: data.mid,
            hpn: "",
            hpon: item.hpon,
            hsw: item.hsw,
            hl: data.hps,
        },
    ];

    const _data = { ...data, msc: [], mhn: "", man: "", hps };
    const _item = { ...item, mid: data.mid, hl: data.hps };
    setBetList(_data, _item, v);
};

const setIsHide = (item: HP) => {
    item.isHide = !item.isHide;
    swiperRef.value?.update?.();
};

const receive = () => {
    const newStatus = !receiveStatus.value ? true : false;
    data.value?.hps?.forEach(item => (item.isHide = newStatus)!);
    receiveStatus.value = newStatus;
    swiperRef.value?.update?.();
};

const close = () => {
    emits("update:modelValue", false);
};

const { data } = toRefs(props);
</script>
