<!-- 帮助中心 -->
<template>
    <div class="h-full w-full flex flex-col bg-white" :style="{ paddingTop: `${top || 0}px` }">
        <div
            class="relative h-56 bg-[url('@/assets/helpCenter/ic_bg.png')] bg-no-repeat bg-bottom bg-cover"
        >
            <NavBar transparent :nav-bar-props="{ title: '帮助中心' }">
                <template #right>
                    <i class="z-10 text-white ml-2 icon-erji text-lg" @click="toService" />
                </template>
            </NavBar>
            <div class="w-[70px] h-[70px] mx-auto relative border border-white/70 rounded-full">
                <img
                    v-lazy="user?.avatar"
                    class="w-[61px] h-[61px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    alt=""
                />
            </div>
            <div
                class="flex mt-1 pb-3 border-b border-b-[#F0F1F64D] text-white flex-col items-center justify-center w-4/5 mx-auto"
            >
                <p class="text-sm">Hi，尊敬的会员</p>
                <span class="text-xs">欢迎来到帮助中心～</span>
            </div>
            <div
                class="text-white text-xs text-center h-14 flex items-center justify-center opacity-70"
            >
                7x24小时专线服务，贴心至上，竭诚为您服务～
            </div>
        </div>
        <div class="bg-white rounded-t-20px flex-1">
            <div class="rounded-20px overflow-hidden">
                <div class="h-[53px] px-10px bg-white mt-10px">
                    <p class="h-full flex items-center text-mainText font-semibold text-17px">
                        常见问题
                    </p>
                </div>
                <van-cell-group style="--van-cell-line-height: 2rem">
                    <van-cell
                        is-link
                        :key="index"
                        class="py-[13px]"
                        @click="toPage(item)"
                        v-for="(item, index) in cells"
                    >
                        <template #icon>
                            <div class="flex items-center">
                                <div
                                    class="w-[33px] h-[33px] mr-3 flex items-center justify-center rounded-full bg-gradient-to-br from-[#3A5ED8] to-[#7090FC]"
                                >
                                    <div class="w-5" v-html="item.icon" alt="" />
                                </div>
                            </div>
                        </template>
                        <template #title>
                            <div class="flex flex-col">
                                <p class="text-sm">
                                    {{ item.title }}
                                </p>
                                <span class="text-xs mt-1">
                                    {{ item.label }}
                                </span>
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ic_rechargeTutorial from "@/assets/svg/ic_rechargeTutorial.svg?raw";
import ic_withdrawTutorial from "@/assets/svg/ic_withdrawTutorial.svg?raw";
import ic_contactUs from "@/assets/svg/ic_contactUs.svg?raw";
import NavBar from "@/components/NavBar.vue";
import { useRouter } from "vue-router";
import { useApp } from "@/stores/useApp";
import { storeToRefs } from "pinia";
import { useStore } from "@/stores/index";
import { toService } from "@/utils";
import { useAsync } from "@/stores/useAsync";
import { lazyAvatar } from "@/utils/index";

interface Icells {
    title: string;
    to: string;
    icon: any;
    label: string;
    type?: number; // 是否显示客服按钮 给App的
}

const { top } = storeToRefs(useApp());
const { user, token } = storeToRefs(useStore());
const router = useRouter();

const cells = ref<Icells[]>([
    {
        title: "充值教程",
        to: "/rechargeTutorial",
        icon: ic_rechargeTutorial,
        label: "即刻充值秒到账，无忧玩游戏",
        type: 1,
    },
    {
        title: "提现教程",
        to: "/withdrawTutorial",
        icon: ic_withdrawTutorial,
        label: "多种提现方式，存款转账不迷路",
        type: 1,
    },
    {
        title: "联系我们",
        to: "/contactUs",
        icon: ic_contactUs,
        label: "全心全意为您服务",
        type: 1,
    },
]);

const toPage = (item: Icells) => {
    const result = {
        title: item.title,
        type: item.type,
    };
    (window as any)?.testInterface?.webTitleBar(JSON.stringify(result));
    (window as any)?.webkit?.messageHandlers?.webTitleBar?.postMessage(result);
    router.push(item.to);
};
</script>
