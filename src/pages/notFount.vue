<!-- 404 -->
<template>
    <div
        class="NotFount bg-white font-PFSC h-full relative flex flex-col items-center justify-evenly"
    >
        <LottieAnimation ref="anim" loop :animationData="animation" />
        <VanButton
            class="h-9 mt-2 tlw_btn_linear border-0 text-white whitespace-nowrap text-xs rounded-xl px-5"
            @click="goBack()"
        >
            返回首页
        </VanButton>
    </div>
</template>

<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue";
import * as animation from "@/json/404-not-found.json";
import { storeToRefs } from "pinia";
import { useApp } from "@/stores/useApp";
import { useRouter } from "vue-router";

const { isApp } = storeToRefs(useApp());
const router = useRouter();

const goBack = () => {
    if (/[0-9]/.test(isApp.value)) {
        (window as any)?.testInterface?.goBackPage();
        (window as any)?.webkit?.messageHandlers?.goBackPage?.postMessage("xxx");
        return;
    }
    router.replace("/");
};
</script>
