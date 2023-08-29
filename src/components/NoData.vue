<!-- 缺省组件 -->
<template>
    <div
        class="flex z-[1] flex-col items-center w-full pb-10"
        :class="{ 'absolute top-1/2 -translate-y-1/2': absolute }"
    >
        <img class="w-[180px] h-[89px]" :src="src" alt="" />
        <p class="text-sm text-center text-txt_d leading-5">
            {{ text }}
        </p>
        <VanButton
            class="h-9 mt-2 tlw_btn_linear border-0 text-white whitespace-nowrap text-xs rounded-full px-5"
            @click="emits('click')"
            v-if="buttonText"
        >
            {{ buttonText }}
        </VanButton>
    </div>
</template>

<script setup lang="ts">
import ic_no_deta from "@/assets/defult/ic_no_data.png";
import { computed, toRefs } from "vue";

const emits = defineEmits<{ (e: "click"): void }>();

const src = computed(() => {
    switch (type?.value) {
        default:
            return ic_no_deta;
    }
});

const props = withDefaults(
    defineProps<{
        text?: string;
        buttonText?: string | boolean;
        absolute?: boolean;
        type?: 1 | 2;
    }>(),
    {
        text: "暂无数据",
        absolute: true,
    }
);

const { text, buttonText, absolute, type } = toRefs(props);
</script>
