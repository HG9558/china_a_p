<!-- 赛事详情 NavBarTitle -->
<template>
    <div
        class="flex items-center justify-center text-xs text-center h-11 details_navbar overflow-hidden"
    >
        <div class="flex text-center items-center flex-1 justify-start h-full overflow-hidden">
            <img
                class="w-5 h-5 rounded-full mr-1 flex-shrink-0"
                v-lazy="details?.mhlu?.[0]"
                alt=""
            />
            <p class="font-bold line-clamp-1">
                {{ details?.mhn || "-" }}
            </p>
        </div>
        <div class="flex flex-col items-center font-OPPO justify-evenly w-20 h-full flex-nowrap">
            <p class="opacity-90" v-show="false">
                <template v-if="details?.csid">
                    {{ mmpToString(details?.csid, details?.mmp) || "-" }}
                </template>
                <span class="font-OPPO" v-if="!/(31|33)/.test(`${details?.mmp}`)">
                    <Timer :mst="Number(details?.mst)" />
                </span>
            </p>
            <p class="flex items-center font-OPPO text-[20px]">
                <span class="font-black">
                    {{ details?.mscs?.S1?.[0] || "-" }}
                </span>
                <span class="opacity-90 mx-1">-</span>
                <span class="font-black">
                    {{ details?.mscs?.S1?.[1] || "-" }}
                </span>
            </p>
        </div>
        <div
            class="flex text-center items-center justify-end flex-1 h-full overflow-hidden flex-nowrap"
        >
            <img
                class="w-5 h-5 rounded-full order-1 ml-1 flex-shrink-0"
                v-lazy="details?.malu?.[0]"
                alt=""
            />
            <p class="font-bold line-clamp-1">
                {{ details?.man || "-" }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Datum } from "@/api/obsportend/obMatches/types";
import { durationTime, mmpToString } from "@/utils/match";
import { toRefs } from "vue";
import Timer from "../Timer.vue";

const props = defineProps<{ details?: Datum }>();

const { details } = toRefs(props);
</script>
