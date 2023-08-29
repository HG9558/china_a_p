<!-- 赛果组件 单个Item -->
<template>
    <div class="px-2 pb-[5px]" :class="{ 'pt-1': index == 0 }">
        <div class="h-[38px] flex items-center bg-white rounded-t-xl pr-10px">
            <div class="flex-1 h-full overflow-hidden p-[3px]">
                <div class="flex-1 w-full h-full overflow-hidden rounded-t-lg">
                    <div
                        class="w-full h-full skew-x-[-25deg] rounded-t-lg rounded-b-sm bg-mainBg flex items-center -translate-x-5 pl-6"
                    >
                        <img
                            class="w-6 h-6 rounded-[4px] flex-shrink-0 mr-1 skew-x-[25deg]"
                            v-lazy="source?.lurl"
                            alt=""
                        />
                        <p class="text-[#707070] skew-x-[25deg] text-15px font-bold line-clamp-1">
                            {{ source?.tn }}
                        </p>
                    </div>
                </div>
            </div>
            <div
                @click="source.isHide = !source?.isHide"
                class="p-0 flex items-center justify-center border-0 w-6 h-6 active:scale-90 transition-all"
            >
                <i
                    class="icon-arrow-up-bold flex-shrink-0 text-[#CDCFD4] text-xl transition-all"
                    :class="{ 'rotate-180': source?.isHide }"
                ></i>
            </div>
        </div>
        <div
            :key="index"
            v-show="!source?.isHide"
            v-for="(item, index) in source.list"
            class="h-28 rounded-lg px-10px mt-[3px] bg-white flex flex-col"
        >
            <div class="flex items-center text-xs mt-[11px] mb-3 text-[#707070] font-medium">
                <div class="flex-1 overflow-hidden font-OPPO">
                    {{ formatTime(+item?.mgt / 1000, "MM月DD日 HH:mm") }}
                </div>
                <div class="flex items-center flex-shrink-0 whitespace-nowrap font-OPPO">
                    <div
                        :class="{ 'w-8': euid == 2, 'w-10': euid == 1 }"
                        class="sm:w-10 flex items-center justify-center text-center"
                    >
                        <span v-if="euid == 1" class="w-3 h-[17px] bg-[#FFA700] rounded-sm"></span>
                        <span v-else>1</span>
                    </div>
                    <div
                        :class="{ 'w-8': euid == 2, 'w-10': euid == 1 }"
                        class="sm:w-10 flex items-center justify-center text-center"
                    >
                        <span v-if="euid == 1" class="w-3 h-[17px] bg-[#FF7161] rounded-sm"></span>
                        <span v-else>2</span>
                    </div>
                    <div
                        :class="{ 'w-8': euid == 2, 'w-10': euid == 1 }"
                        class="sm:w-10 flex items-center justify-center text-center"
                    >
                        <div v-if="euid == 1" class="h-5 w-5" v-html="ic_corner_kick" />
                        <span v-else>3</span>
                    </div>
                    <template v-if="euid == 2">
                        <div
                            :class="{ 'w-8': euid == 2 }"
                            class="sm:w-10 flex items-center justify-center text-center font-OPPO"
                        >
                            4
                        </div>
                        <div
                            :class="{ 'w-8': euid == 2 }"
                            class="sm:w-10 flex items-center justify-center text-center"
                        >
                            OT
                        </div>
                    </template>
                </div>
                <div class="w-2/12 text-center flex-shrink-0 whitespace-nowrap">半场/全场</div>
            </div>
            <div class="flex items-center text-sm mb-[15px]">
                <div class="flex items-center flex-1 overflow-hidden">
                    <img
                        class="w-[22px] h-[22px] flex-shrink-0 mr-2"
                        v-lazy="item?.mhlu?.[0]"
                        alt=""
                    />
                    <p class="text-mainText font-bold flex-1 line-clamp-1 break-all">
                        {{ item?.mhn }}
                    </p>
                </div>
                <div class="flex items-center flex-shrink-0 whitespace-nowrap font-OPPO">
                    <span
                        :class="{ 'w-8': euid == 2, 'w-10': euid == 1 }"
                        class="sm:w-10 text-center"
                    >
                        {{ item.mscs?.["S12"]?.[0] || item.mscs?.["S19"]?.[0] }}
                    </span>
                    <span
                        :class="{ 'w-8': euid == 2, 'w-10': euid == 1 }"
                        class="sm:w-10 text-center"
                    >
                        {{ item.mscs?.["S11"]?.[0] || item.mscs?.["S20"]?.[0] }}
                    </span>
                    <span
                        :class="{ 'w-8': euid == 2, 'w-10': euid == 1 }"
                        class="sm:w-10 text-center"
                    >
                        {{ item.mscs?.["S5"]?.[0] || item.mscs?.["S21"]?.[0] }}
                    </span>
                    <template v-if="euid == 2">
                        <span :class="{ 'w-8': euid == 2 }" class="sm:w-10 text-center">
                            {{ item.mscs?.["S22"]?.[0] }}
                        </span>
                        <span :class="{ 'w-8': euid == 2 }" class="sm:w-10 text-center">
                            {{ item.mscs?.["S7"]?.[0] || "--" }}
                        </span>
                    </template>
                </div>
                <div
                    class="w-2/12 text-center flex-shrink-0 line-clamp-1 whitespace-nowrap font-OPPO"
                >
                    {{ item.mscs?.["S2"]?.[0] }}/{{ item.mscs?.["S1"]?.[0] }}
                </div>
            </div>
            <div class="flex items-center text-sm">
                <div class="flex items-center flex-1 overflow-hidden">
                    <img
                        class="w-[22px] h-[22px] flex-shrink-0 mr-2"
                        v-lazy="item?.malu?.[0]"
                        alt=""
                    />
                    <p class="text-mainText font-bold flex-1 line-clamp-1">
                        {{ item?.man }}
                    </p>
                </div>
                <div class="flex items-center flex-shrink-0 whitespace-nowrap font-OPPO">
                    <span
                        :class="{ 'w-8': euid == 2, 'w-10': euid == 1 }"
                        class="sm:w-10 text-center"
                    >
                        {{ item.mscs?.["S12"]?.[1] || item.mscs?.["S19"]?.[1] }}
                    </span>
                    <span
                        :class="{ 'w-8': euid == 2, 'w-10': euid == 1 }"
                        class="sm:w-10 text-center"
                    >
                        {{ item.mscs?.["S11"]?.[1] || item.mscs?.["S20"]?.[1] }}
                    </span>
                    <span
                        :class="{ 'w-8': euid == 2, 'w-10': euid == 1 }"
                        class="sm:w-10 text-center"
                    >
                        {{ item.mscs?.["S5"]?.[1] || item.mscs?.["S21"]?.[1] }}
                    </span>
                    <template v-if="euid == 2">
                        <span :class="{ 'w-8': euid == 2 }" class="sm:w-10 text-center">
                            {{ item.mscs?.["S22"]?.[1] }}
                        </span>
                        <span :class="{ 'w-8': euid == 2 }" class="sm:w-10 text-center">
                            {{ item.mscs?.["S7"]?.[1] || "--" }}
                        </span>
                    </template>
                </div>
                <div
                    class="w-2/12 text-center flex-shrink-0 line-clamp-1 whitespace-nowrap font-OPPO"
                >
                    {{ item.mscs?.["S2"]?.[0] }}/{{ item.mscs?.["S1"]?.[1] }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Datum } from "@/api/obsportend/obMatches/types";
import { toRefs } from "vue";
import ic_corner_kick from "@/assets/svg/ic_corner_kick.svg?raw";
import { formatTime } from "@/utils";

const props = defineProps<{
    source: Datum;
    euid: number;
    index: number;
}>();
const emits = defineEmits<{
    (e: "clickRight"): void;
}>();

const clickRight = (item: Datum) => {
    item.isHide = !item.isHide;
    emits("clickRight");
};

const { source, index, euid } = toRefs(props);
</script>
