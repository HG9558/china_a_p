<!-- 赛事详情 玩法模块hpt -->
<template>
    <div class="px-3 bg-white pt-1" v-show="data.hshow === 'Yes'">
        <PublicHead class="!text-mainText" :data="data" @click-right="emits('clickRight', data)">
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
        <ul class="text-center text-sm pb-10px mt-10px" v-show="!data.isHide">
            <li v-for="(v, i) in data?.hl" :key="i">
                <div v-for="(k, j) in v?.ol" :key="j" class="h-7 mt-10px relative">
                    <div
                        class="h-full px-10px flex items-center justify-center bg-mainBg cursor-pointer rounded"
                        @click="
                            matchStatus(details.mhs, v.hs, k.os) == 'Opened' &&
                                setBetList(details, data, k)
                        "
                        :class="{
                            '!justify-between': matchStatus(details.mhs, v.hs, k.os) == 'Opened',
                            '!bg-txt ': betActive(k.oid),
                        }"
                    >
                        <span
                            class="text-[#8B8B8B] line-clamp-1 font-OPPO text-13px"
                            v-show="matchStatus(details.mhs, v.hs, k.os) == 'Opened'"
                            :class="{ '!text-white': betActive(k.oid) }"
                        >
                            {{ hpid(data.hpid) ? k.on : k.otv }}
                        </span>
                        <div
                            class="text-right text-sm font-bold text-mainText whitespace-nowrap"
                            :class="{ '!text-white': betActive(k.oid) }"
                        >
                            <OvItem
                                :item="k"
                                :hsw="data.hsw"
                                v-if="matchStatus(details.mhs, v.hs, k.os) == 'Opened'"
                            />
                            <p
                                v-else
                                @click.stop
                                class="absolute top-0 left-0 w-full h-full rounded bg-mainBg flex items-center justify-center"
                            >
                                <img
                                    v-if="matchStatus(details.mhs, v.hs, k.os)"
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
import { storeToRefs } from "pinia";
import PublicHead from "./PublicHead.vue";
import { toRefs, computed } from "vue";
import OvItem from "./OvItem.vue";
import { betActive, hpid, matchStatus } from "@/utils/match";
import ic_lock from "@/assets/icon/ic_lock.png";
import ic_arrow_up from "@/assets/details/ic_arrow_up.png";

const { setBetList } = useBets();
const { betList } = storeToRefs(useBets());

const props = defineProps<{ data: HP; details: Datum }>();
const emits = defineEmits<{
    (e: "clickLeft", value?: boolean): void;
    (e: "clickRight", value: HP): void;
}>();

const setIsHide = () => {
    data.value.isHide = !data.value.isHide;
    emits("clickLeft", data.value.isHide);
};
const { data, details } = toRefs(props);
</script>
