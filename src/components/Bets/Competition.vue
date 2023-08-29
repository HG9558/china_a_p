<!-- 赛事列表组件 单个Item -->
<template>
    <div class="overflow-hidden z-10 relative px-2 pt-1" :class="{ '!pt-0': index == 0 }">
        <div
            class="h-[33px] flex items-center bg-white rounded-t-xl pr-10px"
            @click.stop="clickRight(source)"
        >
            <div class="flex-1 h-full overflow-hidden p-[3px] pl-[5px] py-[5px]">
                <div class="flex-1 w-full h-full overflow-hidden rounded-tl-lg rounded-b-md pl-2">
                    <div
                        class="w-full h-full skew-x-[-25deg] rounded-t-xl rounded-b-sm bg-[#EDEDED] flex items-center -translate-x-5 pl-[18px]"
                    >
                        <img
                            class="w-5 h-5 rounded-[4px] flex-shrink-0 mr-1 skew-x-[25deg]"
                            v-lazy="source?.lurl"
                            alt=""
                        />
                        <p class="text-[#79797C] skew-x-[25deg] text-sm line-clamp-1">
                            {{ source?.tn }}
                        </p>
                    </div>
                </div>
            </div>
            <div
                class="p-0 flex items-center justify-center border-0 w-6 h-6 active:scale-90 transition-all"
            >
                <i
                    class="icon-arrow-up-bold font-bold flex-shrink-0 text-[#8A8A8D] text-base transition-all"
                    :class="{ 'rotate-180': source?.isHide }"
                ></i>
            </div>
        </div>
        <div
            :key="index"
            v-for="(item, index) in source.list"
            class="pr-10px pl-[5px] bg-white rounded-lg mt-[2px] flex flex-col justify-between h-[121px]"
            @click="router.push(`/details/${item.csid}/${item.mid}`)"
            v-show="!source.isHide"
        >
            <div class="flex flex-1 pb-2">
                <div class="flex-1 overflow-hidden flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between h-7">
                            <div
                                class="flex items-center bg-[#f2f2f2] h-[22px] px-2 rounded-[5px] rounded-br-xl"
                            >
                                <p
                                    class="text-xs text-tip flex-1 break-all font-OPPO_M line-clamp-1"
                                    :class="{ '!text-txt_d': item.mmp == '0' }"
                                >
                                    <template v-if="item.mmp == '0'">
                                        {{ formatTime(+item.mgt / 1000, "MM-DD HH:mm") }}
                                    </template>
                                    <template v-if="+item.mmp > 0">
                                        {{ mmpToString(item.csid, item.mmp) }}
                                        <template v-if="/(6|7|41|42)/.test(item.mmp)">
                                            <Timer :mst="+item.mst" />
                                        </template>
                                    </template>
                                </p>
                                <div
                                    class="w-4 h-4 ml-[6px]"
                                    v-if="item.mms == 2"
                                    v-html="ic_camera"
                                />
                                <div
                                    class="w-4 h-4 ml-[6px] object-contain"
                                    v-if="item.mvs >= 1"
                                    v-html="ic_anima"
                                />
                            </div>
                            <span class="font-OPPO text-xs scale-95 text-txt_d mr-2">
                                {{ item.mc }}>
                            </span>
                        </div>
                        <div class="h-8 flex items-center text-mainText pl-1">
                            <div class="flex items-center flex-1 overflow-hidden">
                                <img
                                    class="w-5 h-5 mr-1 object-contain flex-shrink-0"
                                    v-lazy="item.mhlu?.[0]"
                                    alt=""
                                />
                                <span class="text-13px flex-1 line-clamp-1 font-medium">
                                    {{ item.mhn }}
                                </span>
                            </div>
                            <div class="flex items-center flex-shrink-0">
                                <i
                                    class="w-2 h-2 rounded-full bg-[#3EBA46] mx-1"
                                    v-if="item.mat == 'home'"
                                ></i>
                                <template v-if="isFootBall(item.csid)">
                                    <span
                                        v-show="Number(item.mscs?.['S12']?.[0]) >= 1"
                                        class="rounded-sm bg-[#FFA700] font-OPPO text-xs text-white scale-90 min-w-[12px] text-center"
                                    >
                                        {{ item.mscs?.["S12"]?.[0] }}
                                    </span>
                                    <span
                                        v-show="Number(item.mscs?.['S11']?.[0]) >= 1"
                                        class="rounded-sm bg-[#FF7161] font-OPPO text-xs text-white scale-90 ml-[2px] min-w-[12px] text-center"
                                    >
                                        {{ item.mscs?.["S11"]?.[0] }}
                                    </span>
                                </template>
                                <span class="text-center font-OPPO_B text-lg mx-1 min-w-[12px]">
                                    {{ score(item.msc, 0) }}
                                </span>
                            </div>
                        </div>
                        <div class="h-8 flex items-center text-mainText pl-1 mt-[2px]">
                            <div class="flex items-center flex-1 overflow-hidden">
                                <img
                                    class="w-5 h-5 mr-1 object-contain flex-shrink-0"
                                    v-lazy="item.malu?.[0]"
                                    alt=""
                                />
                                <span class="text-13px flex-1 line-clamp-1 font-medium">
                                    {{ item.man }}
                                </span>
                            </div>
                            <div class="flex items-center flex-shrink-0">
                                <i
                                    class="w-2 h-2 rounded-full bg-[#3EBA46] mx-1"
                                    v-if="item.mat == 'away'"
                                ></i>
                                <template v-if="isFootBall(item.csid)">
                                    <span
                                        v-show="Number(item.mscs?.['S12']?.[1]) >= 1"
                                        class="rounded-sm bg-[#FFA700] font-OPPO text-xs text-white scale-90 min-w-[12px] text-center"
                                    >
                                        {{ item.mscs?.["S12"]?.[1] }}
                                    </span>
                                    <span
                                        v-show="Number(item.mscs?.['S11']?.[1]) >= 1"
                                        class="rounded-sm bg-[#FF7161] font-OPPO text-xs text-white scale-90 ml-[2px] min-w-[12px] text-center"
                                    >
                                        {{ item.mscs?.["S11"]?.[1] }}
                                    </span>
                                </template>
                                <span class="text-center font-OPPO_B text-lg mx-1 min-w-[12px]">
                                    {{ score(item.msc, 1) }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="text-xs flex items-center pl-1">
                        <VanButton
                            :loading-size="14"
                            loading-type="spinner"
                            :disabled="item.mfLoading"
                            :loading="item.mfLoading"
                            @click.stop="addOrCancelMatch(item)"
                            class="w-4 h-4 p-0 border-0 flex-shrink-0 mr-1"
                        >
                            <div class="w-4 h-4" v-html="item.mf ? ic_collected : ic_star" />
                        </VanButton>
                        <div class="flex items-center flex-nowrap">
                            <!-- 足球 -->
                            <div v-if="isFootBall(item.csid)" class="flex">
                                <template v-if="!(item.mmp == '0')">
                                    <div
                                        class="flex items-center justify-center mr-2 whitespace-nowrap ml-2"
                                    >
                                        <div class="flex-shrink-0 mr-1" v-html="ic_ht" />
                                        <span class="font-OPPO text-txt_d">
                                            {{ item?.mscs?.S2?.[0] || "0" }}-{{
                                                item?.mscs?.S2?.[1] || "0"
                                            }}
                                        </span>
                                    </div>
                                    <div
                                        class="flex items-center justify-center mr-1 whitespace-nowrap"
                                    >
                                        <div
                                            class="flex-shrink-0 mr-1 w-[14px] h-[14px]"
                                            v-html="ic_corner_kick"
                                        />
                                        <span class="font-OPPO text-txt_d">
                                            {{ item?.mscs?.S5?.[0] || "0" }}-{{
                                                item?.mscs?.S5?.[1] || "0"
                                            }}
                                        </span>
                                    </div>
                                </template>
                            </div>
                            <!-- 篮球 -->
                            <div
                                v-if="isBasketball(item.csid)"
                                class="font-medium bottom-0 left-0 flex rounded-sm text-xs whitespace-nowrap"
                            >
                                <template v-if="!(item.mmp == '0')">
                                    <div
                                        class="flex items-center justify-center mr-1 last-of-type:mr-0 text-txt_d last-of-type:text-mainText"
                                        v-for="(v, i) in listFilter(listmmp2, item)"
                                        :key="i"
                                    >
                                        <span class="font-OPPO scale-95">
                                            {{ item?.mscs?.[v.key]?.[0] || "0" }}-{{
                                                item?.mscs?.[v.key]?.[1] || "0"
                                            }}
                                        </span>
                                    </div>
                                </template>
                            </div>
                            <!-- 冰球 -->
                            <div v-if="isPuck(item.csid) && false">
                                <template v-if="!(item.mmp == '0')">
                                    <div class="flex">
                                        <div
                                            class="flex items-center justify-center mr-1 last-of-type:mr-0 text-txt_d last-of-type:text-mainText"
                                            v-for="(v, i) in listFilter(listmmp4, item)"
                                            :key="i"
                                        >
                                            <span class="font-OPPO scale-95">
                                                {{ item?.mscs?.[v.key]?.[0] || "0" }}-{{
                                                    item?.mscs?.[v.key]?.[1] || "0"
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <!-- 网球 -->
                            <div v-if="isTennis(item.csid) && false">
                                <template v-if="!(item.mmp == '0')">
                                    <div class="flex">
                                        <div
                                            class="flex items-center justify-center mr-1 last-of-type:mr-0 text-txt_d last-of-type:text-mainText"
                                            v-for="(v, i) in listFilter(listmmp5, item)"
                                            :key="i"
                                        >
                                            <span class="font-OPPO scale-95">
                                                {{ item?.mscs?.[v.key]?.[0] || "0" }}-{{
                                                    item?.mscs?.[v.key]?.[1] || "0"
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex items-center" v-show="false">
                                        <span class="mr-1">
                                            {{ item.mfo }}
                                        </span>
                                    </div>
                                </template>
                            </div>
                            <!-- 乒乓球 -->
                            <div v-if="isPingpong(item.csid) && false">
                                <template v-if="!(item.mmp == '0')">
                                    <div class="flex">
                                        <div
                                            class="flex items-center justify-center mr-1 last-of-type:mr-0 text-txt_d last-of-type:text-mainText"
                                            v-for="(v, i) in listFilter(listmmp8, item)"
                                            :key="i"
                                        >
                                            <span class="font-OPPO scale-95">
                                                {{ item?.mscs?.[v.key]?.[0] || "0" }}-{{
                                                    item?.mscs?.[v.key]?.[1] || "0"
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex items-center" v-show="false">
                                        <span class="mr-1">
                                            {{ item.mfo }}
                                        </span>
                                        <span>
                                            {{
                                                `${Number(item.mscs?.S1110?.[0])}-${Number(
                                                    item.mscs?.S1110?.[1]
                                                )} (${
                                                    Number(item.mscs?.S1110?.[0]) +
                                                    Number(item.mscs?.S1110?.[1])
                                                })`
                                            }}
                                        </span>
                                    </div>
                                </template>
                            </div>
                            <!-- 排球 -->
                            <div v-if="isVolleyball(item.csid) && false">
                                <template v-if="!(item.mmp == '0')">
                                    <div class="flex">
                                        <div
                                            class="flex items-center justify-center mr-1 last-of-type:mr-0 text-txt_d last-of-type:text-mainText"
                                            v-for="(v, i) in listFilter(listmmp9, item)"
                                            :key="i"
                                        >
                                            <span class="font-OPPO scale-95">
                                                {{ item?.mscs?.[v.key]?.[0] || "0" }}-{{
                                                    item?.mscs?.[v.key]?.[1] || "0"
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="flex items-center" v-show="false">
                                        <span class="mr-1">
                                            {{ item.mfo }}
                                        </span>
                                        <span>
                                            {{
                                                `${Number(item.mscs?.S1110?.[0])}-${Number(
                                                    item.mscs?.S1110?.[1]
                                                )} (${
                                                    Number(item.mscs?.S1110?.[0]) +
                                                    Number(item.mscs?.S1110?.[1])
                                                })`
                                            }}
                                        </span>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div @touch.stop @click.stop class="w-1/2 competition relative">
                    <template v-if="item.hps.length">
                        <div class="w-full h-full overflow-hidden relative">
                            <template v-if="swiperNumber > 1 && false">
                                <i v-if="swipeActive == 0" class="tlw_left pointer-events-none" />
                                <i v-if="swipeActive == 1" class="tlw_right pointer-events-none" />
                            </template>
                            <div
                                class="flex duration-300 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-thin scrollbar-none"
                                @scroll="scroll($event, item)"
                            >
                                <div
                                    :key="i"
                                    v-for="(v, i) in item.hps"
                                    class="w-[calc(50%-1px)] flex-shrink-0 box-border mr-[2px] last-of-type:mr-0"
                                >
                                    <div
                                        class="h-7 text-center leading-8 text-xs whitespace-nowrap overflow-hidden"
                                    >
                                        <p class="text-center w-full line-clamp-1 text-[#797A7C]">
                                            {{ v.hpn }}
                                        </p>
                                    </div>
                                    <template v-if="v.hl?.[0]?.ol?.[0]?.ov">
                                        <div
                                            class="h-8 flex-1 overflow-hidden rounded-md border-[0.5px] border-[#ECECEC] flex flex-col justify-center items-center text-center cursor-pointer"
                                            :class="{
                                                'bg-txt !border-0': betActive(k.oid),
                                                'mb-[2px]': j == 0,
                                            }"
                                            v-for="(k, j) in v.hl?.[0]?.ol.slice(0, 2)"
                                            @click.stop="
                                                matchStatus(item.mhs, v.hl?.[0].hs, k.os) ==
                                                    'Opened' && setBetList(item, v, k)
                                            "
                                            :key="j"
                                        >
                                            <OlItem
                                                :k="k"
                                                :hsw="v.hsw"
                                                v-if="
                                                    matchStatus(item.mhs, v.hl?.[0].hs, k.os) ==
                                                    'Opened'
                                                "
                                            />
                                            <p v-else @click.stop>
                                                <img
                                                    v-if="matchStatus(item.mhs, v.hl?.[0].hs, k.os)"
                                                    class="w-6 h-6"
                                                    :src="ic_lock"
                                                    alt=""
                                                />
                                                <span v-else class="text-xs text-[#C2C2C2]">
                                                    --
                                                </span>
                                            </p>
                                        </div>
                                    </template>
                                    <div
                                        v-else
                                        class="flex-1 h-8 mb-[2px] overflow-hidden rounded border-[0.5px] border-[#ECECEC] flex flex-col justify-center items-center text-center"
                                        v-for="(k, j) in 2"
                                        @click.stop
                                        :key="j"
                                    >
                                        <p class="text-xs text-[#C2C2C2]">--</p>
                                    </div>
                                </div>
                            </div>
                            <div
                                class="translate-y-2 flex items-center justify-center pointer-events-none"
                                v-if="swiperNumber > 1"
                            >
                                <div class="w-7 bg-[#DEDEDE] rounded">
                                    <p
                                        class="bg-[#DEDEDE] h-[3px] flex items-center rounded w-[14px] relative"
                                    >
                                        <span
                                            class="w-[14px] absolute left-0 h-full bg-[#AEAEAE] rounded transition-all"
                                            :style="{ left: `${item.left || 0}%` }"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Datum, MatchValue } from "@/api/obsportend/obMatches/types";
import { computed, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import ic_star from "@/assets/svg/ic_star.svg?raw";
import ic_collected from "@/assets/svg/ic_collected.svg?raw";
import ic_camera from "@/assets/svg/ic_camera.svg?raw";
import ic_anima from "@/assets/svg/ic_anima.svg?raw";
import ic_ht from "@/assets/svg/ic_ht.svg?raw";
import ic_corner_kick from "@/assets/svg/ic_corner_kick.svg?raw";
import OlItem from "./OlItem.vue";
import Timer from "../Timer.vue";
import { API } from "@/api";
import { storeToRefs } from "pinia";
import { useStore } from "@/stores";
import { authToPage, formatTime, throttle } from "@/utils";
import { showSuccessToast, showToast } from "vant";
import { useBets } from "@/stores/useBets";
import ic_lock from "@/assets/icon/ic_lock.png";
import {
    betActive,
    isBasketball,
    isFootBall,
    isPingpong,
    isPuck,
    isTennis,
    isVolleyball,
    matchStatus,
    mmpToString,
} from "@/utils/match";
import { useMatch } from "@/stores/useMatch";
import { useWorker } from "@/worker";

const props = defineProps<{
    source: MatchValue;
    index: number;
    setMatchesCount?: (cd: number) => void;
}>();

const percentage = ref<number>(0);
const sliceNumber = ref<number>(2);
const router = useRouter();
const { setBetList } = useBets();
const { user } = storeToRefs(useStore());
const { swipeActive } = storeToRefs(useMatch());
const { betList } = storeToRefs(useBets());
const { setSwipeActive } = useMatch();

const emits = defineEmits<{
    (e: "clickRight"): void;
    (e: "setMatchesCount", count: number): void;
}>();

const handleSwipeLeft = () => {
    if (swipeActive.value + 1 >= swiperNumber.value) return;
    setSwipeActive(swipeActive.value + 1);
};

const handleSwipeRight = () => {
    if (swipeActive.value <= 0) return;
    setSwipeActive(swipeActive.value - 1);
};

const listFilter = (list: Ilistmmp[], item: Datum) => {
    return list?.filter(v => /[0-9]/.test(`${item?.mscs?.[v.key]?.[0]}`));
};

const scroll = (e: Event, item: Datum) => {
    throttle(() => {
        const target = e.target as HTMLElement;
        item.left = Math.floor(
            (target.scrollLeft / (target.scrollWidth - target.clientWidth)) * 100
        );
    }, 50)();
};

const swiperNumber = computed(() =>
    Math.ceil(source.value.list?.[0]?.hps?.length / sliceNumber.value)
);

const score = computed(
    () => (item: string[], index: number) => item?.[0]?.split("|")?.[1]?.split(":")[index] || "-"
);

const clickRight = (item: MatchValue) => {
    item.isHide = !item.isHide;
    emits("clickRight");
};

const addOrCancelMatch = async (item: Datum) => {
    const status = authToPage();
    if (!status) return;
    const cf = item.mf ? 0 : 1;
    item.mfLoading = true;
    const res = await API.addOrCancelMatch({ cf, cuid: user.value?.id, mid: +item.mid });
    item.mfLoading = false;
    if (res.code === 0) {
        emits("setMatchesCount", cf);
        showSuccessToast(cf == 1 ? "关注成功" : "取消成功");
        props.setMatchesCount?.(cf);
        if (res.data?.data !== 0) {
            item.mf = !item.mf;
            return;
        }
        if (res.data.msg) showToast(res.data.msg);
    }
};

interface Ilistmmp {
    key: string;
    mmp?: string;
}

const listmmp2 = ref<Ilistmmp[]>([{ key: "S19" }, { key: "S20" }, { key: "S21" }, { key: "S22" }]);

const listmmp4 = ref<Ilistmmp[]>([{ key: "S120" }, { key: "S121" }, { key: "S122" }]);

const listmmp5 = ref<Ilistmmp[]>([
    { key: "S23" },
    { key: "S39" },
    { key: "S55" },
    { key: "S71" },
    { key: "S87" },
]);

const listmmp8 = ref<Ilistmmp[]>([
    { key: "S120" },
    { key: "S121" },
    { key: "S122" },
    { key: "S123" },
    { key: "S124" },
]);

const listmmp9 = ref<Ilistmmp[]>([
    { key: "S120" },
    { key: "S121" },
    { key: "S122" },
    { key: "S123" },
]);

const { source } = toRefs(props);
</script>
