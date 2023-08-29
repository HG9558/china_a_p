<!-- 下注 赔率 -->
<template>
    <div>
        <div
            class="relative text-[#255AD8] iconfont font-medium flex items-center"
            :class="{
                '!text-[#BF3D36]': item?.value == 'up',
                '!text-[#1DAA45]': item?.value == 'down',
            }"
        >
            <span class="font-semibold font-OPPO_B">@</span>
            <span class="text-[19px] font-OPPO_B">
                {{ ovTransition(item?.ov, props.hsw) }}
            </span>
            <i
                v-show="item?.value"
                class="text-xs icon-arrow-up-filling ml-1"
                :class="{ 'rotate-180': item.value == 'down' }"
            />
            <template v-if="false">
                <i
                    v-show="item.value == 'up'"
                    class="w-[6px] h-10px tlw_up_animation ml-[2px]"
                    v-html="ic_up"
                />
                <i
                    v-show="item.value == 'down'"
                    class="w-[6px] h-10px tlw_down_animation ml-[2px]"
                    v-html="ic_down"
                />
            </template>
            <i
                class="absolute right-0 scale-0 pointer-events-none"
                :class="{ 'animate-pulse duration-[4s]': !!item.value }"
                @animationiteration="animationiteration"
            />
        </div>
        <p
            v-show="item?.value"
            class="text-xs text-right font-medium"
            :class="{
                '!text-[#BF3D36]': item?.value == 'up',
                '!text-[#1DAA45]': item?.value == 'down',
            }"
        >
            赔率已变更
        </p>
    </div>
</template>

<script setup lang="ts">
import { ovTransition } from "@/utils/match";
import type { Ol } from "@/api/obsportend/obMatches/types";
import { toRefs, watch } from "vue";
import ic_up from "@/assets/svg/ic_up.svg?raw";
import ic_down from "@/assets/svg/ic_down.svg?raw";

// firstOv 下注选中时候的赔率
const props = defineProps<{ item: Ol; hsw: string; firstOv?: string }>();

const { item } = toRefs(props);

const animationiteration = () => {
    item.value.value = "";
};

watch(
    () => item?.value,
    (n, o) => {
        if (o?.ov) {
            if (n.ov == o.ov) return (n.value = "");
            n.ov > o.ov ? (n.value = "up") : (n.value = "down");
        }
    }
);
</script>
