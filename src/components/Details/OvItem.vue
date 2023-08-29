<!-- 赛事详情 赔率组件 -->
<template>
    <span
        class="text-[13.5px] font-OPPO_M flex items-center relative"
        :class="{
            'text-tip': item.value == 'up',
            'text-[#5FC253]': item.value == 'down',
        }"
    >
        {{ ovTransition(item.ov, props.hsw) }}
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
        <i
            class="absolute right-0 scale-0 pointer-events-none"
            :class="{ 'animate-pulse duration-[3s]': !!item.value }"
            @animationiteration="animationiteration"
        />
    </span>
</template>

<script setup lang="ts">
import type { Ol } from "@/api/obsportend/obMatches/types";
import { ovTransition } from "@/utils/match";
import { toRefs, watch } from "vue";
import ic_up from "@/assets/svg/ic_up.svg?raw";
import ic_down from "@/assets/svg/ic_down.svg?raw";

const props = defineProps<{ item: Ol; hsw: string }>();
const { item } = toRefs(props);

const animationiteration = () => {
    item.value.value = "";
};

watch(
    () => item.value,
    (n, o) => {
        if (o?.ov) {
            if (n.ov == o.ov) return (n.value = "");
            n.ov > o.ov ? (n.value = "up") : (n.value = "down");
        }
    }
);
</script>
