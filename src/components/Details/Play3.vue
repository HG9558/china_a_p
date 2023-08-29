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
        <ul class="mt-10px text-sm pb-10px" v-show="!data.isHide">
            <li>
                <div
                    :key="index"
                    v-for="(item, index) in data.hl"
                    class="grid grid-cols-2 gap-x-2 gap-y-10px mt-10px first-of-type:mt-0"
                >
                    <div
                        :key="i"
                        v-for="(v, i) in item.ol"
                        @click="
                            matchStatus(details.mhs, item.hs, v.os) == 'Opened' &&
                                setBetList(details, data, v)
                        "
                        class="px-10px flex items-center justify-between bg-mainBg cursor-pointer rounded h-7 relative"
                        :class="{
                            '!justify-center':
                                matchStatus(details.mhs, item.hs, v.os) != 'Opened' || v.on,
                            '!bg-txt ': betActive(v.oid),
                        }"
                    >
                        <span
                            v-show="matchStatus(details.mhs, item.hs, v.os) == 'Opened'"
                            class="text-[#8B8B8B] line-clamp-1 font-OPPO text-13px"
                            :class="{ '!text-white': betActive(v.oid) }"
                        >
                            {{ v.on || v.otv }}
                        </span>
                        <div
                            class="text-right text-sm text-mainText flex-shrink-0 font-bold"
                            :class="{ '!text-white': betActive(v.oid) }"
                        >
                            <OvItem
                                v-if="matchStatus(details.mhs, item.hs, v.os) == 'Opened'"
                                :hsw="data.hsw"
                                :item="v"
                            />
                            <p
                                v-else
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
import { betActive, matchStatus } from "@/utils/match";
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
