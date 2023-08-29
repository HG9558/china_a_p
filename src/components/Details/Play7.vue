<!-- 赛事详情 玩法模块hpt -->
<template>
    <div class="px-3 bg-white pt-1" v-show="data.hshow === 'Yes'">
        <PublicHead class="!text-mainText font-semibold" :data="data">
            <template #left>
                <img
                    class="text-lg transition-all w-4 h-4"
                    :class="{ 'rotate-180': data.isHide }"
                    :src="ic_arrow_up"
                    @click="setIsHide"
                    alt=""
                />
            </template>
        </PublicHead>
        <ul class="text-sm pb-10px" v-show="!data.isHide">
            <li
                v-if="data.title?.[0]"
                v-show="hpid(data.hpid)"
                class="grid grid-cols-1 text-center items-center h-9 gap-2 text-[#666] font-medium"
                :class="{
                    '!grid-cols-2': data.title.length == 2,
                    '!grid-cols-3': data.title.length == 3,
                }"
            >
                <span class="flex-1 line-clamp-1" v-for="(item, index) in data.title" :key="index">
                    {{ item.osn }}
                </span>
            </li>
            <li
                :key="index"
                v-for="(item, index) in data?.hl"
                :class="{
                    '!grid-cols-3': data?.title?.length == 3,
                    '!mt-0': hpid(data.hpid) && index == 0,
                }"
                class="grid grid-cols-2 gap-x-2 gap-y-10px mt-10px"
            >
                <div v-for="(v, i) in data.title" :key="i">
                    <div
                        :class="{ '!mt-0': j == 0 }"
                        class="h-7 flex flex-col mt-10px relative"
                        v-for="(k, j) in item.ol?.filter(key => Number(key.otd) == Number(v.otd))"
                        :key="j"
                    >
                        <div
                            class="h-full px-10px flex items-center justify-between bg-mainBg cursor-pointer rounded"
                            :class="{
                                '!justify-center':
                                    matchStatus(details.mhs, item.hs, k.os) != 'Opened' || !k.on,
                                '!bg-txt': betActive(k.oid),
                            }"
                            @click="
                                matchStatus(details.mhs, item.hs, k.os) == 'Opened' &&
                                    setBetList(details, data, k)
                            "
                        >
                            <span
                                v-show="matchStatus(details.mhs, item.hs, k.os) == 'Opened' && k.on"
                                class="text-[#8B8B8B] line-clamp-1 font-OPPO text-13px"
                                :class="{ '!text-white': betActive(k.oid) }"
                            >
                                {{ hpid(data.hpid) ? k.on : k.otv }}
                            </span>
                            <div
                                class="text-right text-sm font-bold text-mainText flex-shrink-0"
                                :class="{ '!text-white': betActive(k.oid) }"
                            >
                                <OvItem
                                    v-if="matchStatus(details.mhs, item.hs, k.os) == 'Opened'"
                                    :hsw="data.hsw"
                                    :item="k"
                                />
                                <p
                                    @click.stop
                                    class="absolute top-0 left-0 w-full h-full rounded bg-mainBg flex items-center justify-center"
                                >
                                    <img
                                        v-if="matchStatus(details.mhs, item.hs, k.os)"
                                        class="w-6 h-6"
                                        :src="ic_lock"
                                        alt=""
                                    />
                                    <span v-else class="text-xs text-[#C2C2C2]">--</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li :key="index" v-for="(item, index) in data?.hl" class="grid grid-cols-1 gap-2">
                <div
                    class="h-7 flex flex-col mt-10px relative"
                    v-for="(v, i) in item.ol?.filter(key => key.ot == 'Other')"
                    :key="i"
                >
                    <div
                        class="h-full px-10px flex items-center justify-between bg-mainBg cursor-pointer rounded"
                        :class="{
                            '!justify-center': matchStatus(details.mhs, item.hs, v.os) != 'Opened',
                            '!bg-txt': betActive(v.oid),
                        }"
                        @click="
                            matchStatus(details.mhs, item.hs, v.os) == 'Opened' &&
                                setBetList(details, data, v)
                        "
                    >
                        <span
                            v-show="matchStatus(details.mhs, item.hs, v.os) == 'Opened' && v.on"
                            class="text-[#8B8B8B] line-clamp-1 font-OPPO text-13px"
                            :class="{ '!text-white': betActive(v.oid) }"
                        >
                            {{ hpid(data.hpid) ? v.on : v.otv }}
                        </span>
                        <div
                            class="text-right text-sm font-bold text-mainText flex-shrink-0"
                            :class="{ '!text-white': betActive(v.oid), '!text-center': !v.on }"
                        >
                            <OvItem
                                v-if="matchStatus(details.mhs, item.hs, v.os) == 'Opened'"
                                :hsw="data.hsw"
                                :item="v"
                            />
                            <p
                                @click.stop
                                class="absolute top-0 left-0 w-full h-full rounded bg-mainBg flex items-center justify-center"
                            >
                                <img
                                    v-if="matchStatus(details.mhs, item.hs, v.os)"
                                    class="w-6 h-6"
                                    :src="ic_lock"
                                    alt=""
                                />
                                <span v-else class="text-xs text-[#C2C2C2]">--</span>
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { HP, Datum } from "@/api/obsportend/obMatches/types";
import { useBets } from "@/stores/useBets";
import { toRefs } from "vue";
import PublicHead from "./PublicHead.vue";
import OvItem from "./OvItem.vue";
import { betActive, hpid, matchStatus } from "@/utils/match";
import ic_lock from "@/assets/icon/ic_lock.png";
import ic_arrow_up from "@/assets/details/ic_arrow_up.png";

const { setBetList } = useBets();

const props = defineProps<{ data: HP; details: Datum }>();
const emits = defineEmits<{
    (e: "clickLeft", value?: boolean): void;
    (e: "clickRight", value: HP): void;
}>();
const setIsHide = () => {
    data.value.isHide = !data.value.isHide;
    emits("clickLeft", data.value.isHide);
};
const { data } = toRefs(props);
</script>
