<!-- 公共组件头部 -->
<template>
    <header
        class="h-11 flex items-center pl-1 text-base border-b text-txt justify-between font-bold"
        :class="{ '!border-b-fz_b': border, '!border-b-transparent': !border }"
    >
        <div class="pr-1 flex items-center overflow-hidden">
            <i
                v-show="showLeft"
                class="w-[3px] flex-shrink-0 inline-block h-[13px] bg-txt mr-10px rounded"
            />
            <span class="flex-1 line-clamp-1">
                {{ title }}
            </span>
        </div>
        <slot v-if="solts.right" name="right"></slot>
        <span
            v-else-if="right"
            class="icon-arrow-up-bold text-[#D4D4D4] text-lg transition-all"
            @click="emits('clickRight')"
        ></span>
    </header>
</template>

<script setup lang="ts">
import { toRefs, useSlots } from "vue";

const emits = defineEmits<{ (e: "clickRight"): void }>();
const solts = useSlots();

const props = withDefaults(
    defineProps<{
        title?: string;
        border?: boolean;
        right?: boolean;
        rightClass?: object;
        showLeft?: boolean;
    }>(),
    {
        border: true,
        right: true,
        showLeft: true,
    }
);

const { title, border, right } = toRefs(props);
</script>
