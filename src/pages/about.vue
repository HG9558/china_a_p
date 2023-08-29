<!-- 关于 -->
<template>
    <div class="flex flex-col h-full tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '关于我们' }" />
        <div class="rounded-t-20px flex-1 bg-mainBg overflow-hidden z-0">
            <div class="flex flex-col items-center justify-center mt-8 mb-4">
                <img class="w-[104px] h-[104px] mb-5" src="/ic_launcher_192.png" alt="" />
                <p v-show="version" class="font-medium text-mainText">版本V{{ version }}</p>
                <span class="text-txt_d text-xs mt-2 text-center px-3">
                    {{ APP_NAME }}拥有每月平均30000现场滚球投注及赛事直播，以及零时
                    差的无缝接轨滚球赛事投注，是亚洲地区顶级的体育博彩平台。
                </span>
            </div>
            <div class="rounded-20px bg-white overflow-hidden">
                <van-cell-group :border="false" style="--van-cell-line-height: 2.375rem">
                    <van-cell :title="`${APP_NAME}介绍`" is-link to="/aboutItd" />
                    <van-cell title="用户使用协议" is-link to="/aboutUse" />
                    <van-cell :border="false" title="用户隐私协议" is-link to="/aboutPrivacy" />
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const APP_NAME = ref<string>(import.meta.env.VITE_APP_NAME);
const version = useRoute().query?.version as string;
</script>
