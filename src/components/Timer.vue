<!-- 定时器累加 -->
<template>
    {{ time }}
</template>

<script setup lang="ts">
import { useAsync } from "@/stores/useAsync";
import { durationTime } from "@/utils/match";
import { storeToRefs } from "pinia";
import { watch, ref, watchEffect } from "vue";

const { countTimer } = storeToRefs(useAsync());

interface Props {
    mst: number;
}
const props = defineProps<Props>();

const time = ref<string>("");
const seconds = ref<number>(0);

watchEffect(() => {
    if (props.mst <= 0) return;
    seconds.value = props.mst;
});

watch(
    () => countTimer.value,
    (n, o) => {
        if (seconds.value <= 0) return;
        seconds.value++;
        time.value = durationTime(`${seconds.value}`);
    }
);
</script>
