<!-- 发送验证码btn组件 -->
<template>
    <VanButton
        :loading="props.loading"
        :disabled="props.disabled || disabled"
        :class="{
            '!bg-gradient-to-r !from-[#E4E4EC] !to-[#E4E4EC] !text-[#6F737B]':
                disabled && !props?.login,
            '!bg-gradient-to-r !from-[#E4E4EC] !to-[#E4E4EC] !text-[#6F737B] !border-0':
                disabled && props?.login,
        }"
        @click="emits('submit')"
    >
        {{ btnText }}
    </VanButton>
</template>

<script setup lang="ts">
import { useAsync } from "@/stores/useAsync";
import { storeToRefs } from "pinia";
import { ref, watch, onBeforeUnmount, WatchStopHandle } from "vue";

const { countTimer } = storeToRefs(useAsync());
const disabled = ref<boolean>(false);
const props = withDefaults(
    defineProps<{
        disabled?: boolean;
        loading?: boolean;
        login?: boolean; //登录页btn
    }>(),
    {
        login: false,
    }
);
const emits = defineEmits<{ (e: "submit"): void }>();
const btnText = ref<string>("获取验证码");
const times = ref<number>(60);
const stopWatch = ref<WatchStopHandle>();

const timeStart = () => {
    stopWatch.value = watch(
        () => countTimer.value,
        () => {
            times.value--;
            btnText.value = `${times.value}s`;
            disabled.value = true;
            if (times.value <= 0) {
                btnText.value = "重新获取";
                stopWatch.value?.();
                disabled.value = false;
                times.value = 60;
            }
        }
    );
};

const clearTime = () => {
    stopWatch.value?.();
    btnText.value = "重新获取";
    times.value = 60;
    disabled.value = false;
};

defineExpose({ timeStart, clearTime });

onBeforeUnmount(() => {
    stopWatch.value?.();
});
</script>
