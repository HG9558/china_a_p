<!-- 下注 赔率 -->
<template>
    <div
        class="text-xs flex w-full text-black justify-between px-1 items-center"
        :class="{ 'text-white': betActive(k.oid), '!justify-center': !k.on }"
    >
        <span
            v-show="k.on"
            class="text-txt_d line-clamp-2 whitespace-pre-wrap break-all"
            :class="{ 'text-white': betActive(k.oid) }"
        >
            {{ k.on }}
        </span>
        <div class="flex items-center justify-center whitespace-nowrap relative flex-shrink-0">
            <p
                class="relative flex items-center"
                :class="{
                    'text-tip': k.value == 'up',
                    'text-fz_g': k.value == 'down',
                }"
            >
                <span class="font-OPPO_B font-medium">
                    {{ ovTransition(k.ov, props.hsw) }}
                </span>
                <i
                    v-show="k.value == 'up'"
                    class="w-[6px] h-10px tlw_up_animation ml-[2px]"
                    v-html="ic_up"
                />
                <i
                    v-show="k.value == 'down'"
                    class="w-[6px] h-10px tlw_down_animation ml-[2px]"
                    v-html="ic_down"
                />
            </p>
            <i
                class="absolute right-0 scale-0 pointer-events-none"
                :class="{ 'animate-pulse duration-[4s]': !!k.value }"
                @animationiteration="animationiteration"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Ol } from "@/api/obsportend/obMatches/types";
import { betActive, ovTransition } from "@/utils/match";
import { toRefs, watch } from "vue";
import ic_up from "@/assets/svg/ic_up.svg?raw";
import ic_down from "@/assets/svg/ic_down.svg?raw";

const props = defineProps<{ k: Ol; hsw: string }>();

const { k } = toRefs(props);

const animationiteration = () => {
    k.value.value = "";
};

watch(
    () => k.value,
    (n, o) => {
        if (o?.ov) {
            if (n.ov == o.ov) return (n.value = "");
            n.ov > o.ov ? (n.value = "up") : (n.value = "down");
        }
    }
);
</script>
