<!-- 系统与装置 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg">
        <NavBar class="flex-shrink-0" transparent :nav-bar-props="{ title: '系统与装置' }">
            <template #right>
                <i class="icon-erji text-lg text-white" @click="toService" />
            </template>
        </NavBar>
        <div class="rounded-t-20px flex-1 bg-mainBg">
            <div class="bg-white rounded-t-20px overflow-hidden">
                <van-cell-group :border="false" style="--van-cell-line-height: 2.375rem">
                    <van-cell title="会员账号" :value="user?.username" />
                    <van-cell title="手机型号" :value="platform?.product || ''" />
                    <van-cell title="登录IP" :value="`${ip?.countryCode || ''} ${ip?.ip}`" />
                    <van-cell
                        title="手机版本系统"
                        :value="`${platform.os?.family || ''} ${platform.os?.version}`"
                    />
                    <van-cell
                        title="浏览器版本"
                        :value="`${platform.name || ''} ${platform.version || ''}`"
                    />
                    <van-cell title="当前时间" :value="currentTime" />
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
import { toService } from "@/utils";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import NavBar from "@/components/NavBar.vue";
import platform from "platform";
import { ref, watch } from "vue";
import { useAsync } from "@/stores/useAsync";

const { user } = storeToRefs(useStore());
const { ip, countTimer } = storeToRefs(useAsync());
const currentTime = ref<string>("");

currentTime.value = dayjs().format("YYYY-MM-DD HH:mm:ss");

watch(
    () => countTimer.value,
    () => {
        currentTime.value = dayjs().format(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    }
);
</script>
