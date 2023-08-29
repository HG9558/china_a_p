<template>
    <TransitionGroup :name="name" :tag="tag">
        <slot></slot>
    </TransitionGroup>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ name?: string; tag?: string }>(), {
    name: "list",
    tag: "div",
});
</script>

<style lang="scss">
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
    transform: translate3d(0, 0, 0);
    will-change: transform;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    will-change: transform;
}
.list-leave-active {
    position: absolute;
}

.sort-move,
.sort-enter-active,
.sort-leave-active {
    transition: all 0.5s ease;
}

.sort-enter-from,
.sort-leave-to {
    transform: translate(0, 0);
}

.sort-leave-active {
    position: absolute;
}
</style>
