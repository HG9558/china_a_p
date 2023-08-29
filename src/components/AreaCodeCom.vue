<!-- 手机区号组件 -->
<template>
    <VanButton
        :disabled="props.disabled"
        class="border-0 text-txt h-[26px] px-[6px] bg-[#F8F7FC] rounded-md"
        @click="showPopup = !showPopup"
    >
        <span class="flex items-center">
            <span class="font-medium">
                {{ current?.name }}
            </span>
            <i
                class="iconfont icon-zelvxuanzefeiyongdaosanjiaoxingfandui ml-1 text-xs scale-75"
            ></i>
        </span>
        <AreaCodePopup v-model="showPopup" @submit="current = $event" />
    </VanButton>
</template>

<script setup lang="ts">
import AreaCodePopup from "./AreaCodePopup.vue";
import { ref, watch } from "vue";
import { AreaCode } from "@/api/home/types";

const emits = defineEmits<{ (e: "submit", value: AreaCode): void }>();
const props = withDefaults(defineProps<{ disabled?: boolean }>(), { disabled: false });
const showPopup = ref<boolean>(false);
const current = ref<AreaCode>();

watch(
    () => current.value,
    n => {
        emits("submit", n!);
    },
    { immediate: true }
);
</script>
