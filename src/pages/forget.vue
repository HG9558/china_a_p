<!-- 忘记密码 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '忘记密码' }" />
        <div class="rounded-t-20px flex-1 bg-mainBg overflow-hidden z-0 relative">
            <van-swipe
                ref="swipeRef"
                :touchable="false"
                :show-indicators="false"
                :initial-swipe="active"
                @change="change"
            >
                <van-swipe-item>
                    <FirstStep :nextStep="nextStep" />
                </van-swipe-item>
                <van-swipe-item>
                    <Success ref="successRef" />
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FirstStep from "@/components/Forget/FirstStep.vue";
import Success from "@/components/Forget/Success.vue";
import type { SwipeInstance } from "vant/es/swipe/types";
import NavBar from "@/components/NavBar.vue";

const swipeRef = ref<SwipeInstance>();
const successRef = ref();
const active = ref<number>(0);

const change = (index: number) => {
    active.value = index;
};

const nextStep = () => {
    swipeRef.value?.next();
    successRef.value?.startTime?.();
};
</script>

<style lang="scss" scoped>
::v-deep(.van-swipe) {
    height: 100%;
}
</style>
