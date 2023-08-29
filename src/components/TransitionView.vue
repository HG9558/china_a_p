<template>
    <transition :name="transitionName" :css="!!transitionName" appear>
        <slot></slot>
    </transition>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { DirectionType } from "@/router/routeTransition";
import { useRoute } from "vue-router";

const route = useRoute();
const transitionName = computed(() => {
    if (route.meta.direction === DirectionType.None) return DirectionType.None;
    return `page-${
        route.meta.direction === DirectionType.In ? DirectionType.In : DirectionType.Out
    }`;
});
</script>

<style lang="scss" scoped>
.page-out-enter-active,
.page-out-leave-active,
.page-in-enter-active,
.page-in-leave-active {
    transition: transform 0.2s ease;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    backface-visibility: hidden;
    perspective: 1000;
}

.page-in-enter-from,
.page-out-leave-active {
    transform: translateX(100%);
}

.page-out-enter-from,
.page-in-leave-active {
    transform: translateX(-100%);
}
</style>
