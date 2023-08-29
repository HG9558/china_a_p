<!-- 公共组件头部 -->
<template>
    <header
        class="h-9 flex items-center pl-1 text-base border-b text-txt justify-between font-bold"
        :class="{ '!border-b-fz_b': !data.isHide, '!border-b-transparent': data.isHide }"
    >
        <div class="pr-1 flex items-center overflow-hidden">
            <slot v-if="solts.left" name="left"></slot>
            <span
                v-else-if="left"
                class="icon-arrow-up-bold text-mainText text-[20px] transition-all"
                @click="emits('clickLeft')"
            ></span>
            <span class="flex-1 line-clamp-1 ml-10px text-sm font-medium">
                {{ data.hpn }}
            </span>
        </div>
        <VanButton
            loading-type="spinner"
            :loading="data.htonLoading"
            :disabled="data.htonLoading"
            class="p-0 border-0 h-5 mr-1"
            @click="emits('clickRight')"
        >
            <div
                class="text-sm text-[#BF3B34] font-normal whitespace-nowrap"
                :class="{ '!text-[#8A8A8D]': /[0]/.test(`${data.hton}`) }"
            >
                置顶
            </div>
        </VanButton>
    </header>
</template>

<script setup lang="ts">
import { toRefs, useSlots } from "vue";
import type { HP } from "@/api/obsportend/obMatches/types";

const emits = defineEmits<{ (e: "clickLeft"): void; (e: "clickRight"): void }>();
const solts = useSlots();

const props = withDefaults(
    defineProps<{
        left?: boolean;
        leftClass?: object;
        data: HP;
    }>(),
    {
        border: true,
        left: true,
    }
);

const { left, data } = toRefs(props);
</script>
