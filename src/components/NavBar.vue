<!-- Navbar组件 -->
<template>
    <div class="top-0 sticky z-20" v-show="isApp != '1'">
        <VanNavBar
            :style="`--van-nav-bar-arrow-size: 1.25rem;${style};--van-nav-bar-height:2.75rem;--van-nav-bar-arrow-size:1.5rem;${
                transparent
                    ? 'background-color: transparent;--van-nav-bar-title-text-color:#fff;--van-nav-bar-icon-color:#fff;--van-nav-bar-text-color:#fff'
                    : ''
            }`"
            v-bind="navBarProps"
            @clickLeft="goBack"
            :leftArrow="leftArrow"
            :border="!transparent"
            @clickRight="emits('clickRight')"
        >
            <template #title v-if="slots.title">
                <slot name="title"></slot>
            </template>
            <template #left v-if="slots.left">
                <slot name="left"></slot>
            </template>
            <template #right v-if="slots.right">
                <slot name="right"></slot>
            </template>
        </VanNavBar>
    </div>
</template>

<script setup lang="ts">
import { useApp } from "@/stores/useApp";
import { storeToRefs } from "pinia";
import type { NavBarProps } from "vant";
import { toRefs, useSlots } from "vue";
import { useRouter } from "vue-router";

type Iprops = Partial<NavBarProps>;

const { isApp } = storeToRefs(useApp());
const slots = useSlots();
const router = useRouter();
const emits = defineEmits<{ (e: "clickRight"): void }>();

const props = withDefaults(
    defineProps<{
        clickLeft?: () => void;
        navBarProps?: Iprops;
        leftArrow?: boolean;
        style?: string;
        transparent?: boolean;
    }>(),
    {
        leftArrow: true,
    }
);

const goBack = () => {
    if (clickLeft?.value) {
        clickLeft?.value();
        return;
    }
    if (history.length <= 1) {
        router.push("/");
        return;
    }
    router.go(-1);
};

const { navBarProps, style, leftArrow, clickLeft, transparent } = toRefs(props);
</script>

<style lang="scss" scoped>
::v-deep(.van-nav-bar) {
    .van-nav-bar__left {
        padding: 0 0 0 3px;
    }
    .van-nav-bar__title {
        font-weight: 500;
    }
}
</style>
