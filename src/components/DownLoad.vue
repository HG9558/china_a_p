<!-- 下载悬浮组件 -->
<template>
    <div
        class="h-12 flex-shrink-0 opacity-1 transition-all bg-white bg-[url('@/assets/home/download_bg.png')] bg-[length:100%_100%] z-20 flex items-center justify-between"
        :class="{ '!h-0 opacity-0': show || isStandalone() }"
    >
        <div class="pl-4 pr-10px h-full rounded-[5px] flex items-center justify-between">
            <i class="icon-close-bold text-lg text-[#79797C]" @click="close" />
            <img class="w-10 h-10 ml-[6px] translate-y-1" :src="ic_home_download_logo" alt="" />
            <p class="text-sm ml-1 text-mainText">更多精彩游戏，请安装APP</p>
        </div>
        <VanButton
            icon-position="right"
            class="text-txt border-0 p-0 px-10px text-sm"
            @click="router.push('/download')"
        >
            立即下载
            <template #icon>
                <i class="icon-arrow-right-bold ml-1"></i>
            </template>
        </VanButton>
    </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
import { isStandalone } from "@/utils";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import ic_home_download_logo from "@/assets/logo/ic_home_download_logo.png";
import { useRouter } from "vue-router";

const now = dayjs();
const show = ref<boolean>(false);
const router = useRouter();
const today = now.format("YYYY/MM/DD");
const { setToDayNoTip } = useStore();
const { toDayNoTip } = storeToRefs(useStore());

const close = () => {
    show.value = !show.value;
    // setToDayNoTip(today); //关闭当天不再显示
};
</script>
