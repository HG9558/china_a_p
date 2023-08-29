<!-- 合营计划 -->
<template>
    <div class="h-full w-full flex flex-col tlw_top_bg">
        <NavBar class="flex-shrink-0" transparent :nav-bar-props="{ title: '合营计划' }" />
        <div
            class="flex-1 rounded-t-20px overflow-y-auto bg-[url('@/assets/marketing/ic_bg_t.png')] bg-no-repeat bg-top bg-fixed bg-cover z-0"
        >
            <div class="h-32 flex flex-col items-center justify-center">
                <img class="w-[305px] h-[56px]" :src="ic_text_t" alt="" />
                <span class="text-[#4064F5] font-medium"> 成为传奇，还是成为传奇的歌颂者？ </span>
            </div>
            <div class="px-5">
                <div class="relative pb-[100%]">
                    <img class="absolute top-0 left-0 w-full h-full" :src="ic_figure" alt="" />
                </div>
            </div>
            <div class="px-10px relative z-[1] bg-bottom bg-no-repeat bg-cover">
                <ul class="rounded-20px -mt-5">
                    <li
                        :key="index"
                        v-show="item.content"
                        v-for="(item, index) in cooperates"
                        class="flex px-4 bg-mainBg border border-white rounded-10px items-center justify-between h-[59px] mb-10px last-of-type:mb-0 relative shadow-[0px_4px_6px_0px_rgba(174,190,205,0.30)]"
                    >
                        <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
                            <p class="w-[252px] pointer-events-none h-16 absolute bg_left"></p>
                            <p class="w-[252px] pointer-events-none h-16 absolute bg_right"></p>
                        </div>
                        <div class="flex-1 flex items-center relative z-10">
                            <img class="w-6 h-6 mr-10px flex-shrink-0" :src="item.icon" alt="" />
                            <div class="flex flex-col flex-1 overflow-hidden">
                                <p class="text-[13px] text-[#79797C]">
                                    {{ item.title }}
                                </p>
                                <span class="text-mainText text-sm">
                                    {{ item.content }}
                                </span>
                            </div>
                        </div>
                        <VanButton
                            v-if="item.tel"
                            class="h-8 w-[58px] border-0 bg-[#688BFF] text-white rounded-xl whitespace-nowrap text-sm border-[#688BFF] relative z-10"
                        >
                            <a
                                @click="cooperatePhone(item, $event)"
                                class="absolute top-0 left-0 w-full h-full leading-8"
                                :href="`tel:${item.content}`"
                            >
                                咨询
                            </a>
                        </VanButton>
                        <VanButton
                            v-else
                            @click="copyText(item.content)"
                            class="h-8 w-[58px] border-0 bg-[#688BFF] text-white rounded-xl whitespace-nowrap text-sm border-[#688BFF] relative z-10"
                        >
                            复制
                        </VanButton>
                    </li>
                </ul>
            </div>
            <div class="bg-no-repeat bg-contain relative z-20">
                <div class="absolute top-0 left-0 w-full h-full flex flex-col">
                    <div class="relative pt-5 pb-10px">
                        <div class="h-11 sm:h-14 flex items-center">
                            <img class="w-full h-full" :src="ic_text_m" alt="" />
                        </div>
                        <p class="text-sm text-[#4064F5] text-center">
                            会员统计实时更新，实时数据，分析报表，清晰简单
                        </p>
                    </div>
                    <div class="flex-1 flex flex-col mt-2 justify-evenly pb-5">
                        <ul class="px-5 grid grid-cols-2">
                            <li
                                :key="index"
                                v-for="(item, index) in list"
                                class="relative pb-[117.93%]"
                            >
                                <img
                                    class="absolute top-0 left-0 w-full h-full"
                                    :src="item"
                                    alt=""
                                />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { copyText, isStandalone } from "@/utils";
import ic_figure from "@/assets/marketing/ic_figure.png";
import ic_list_1 from "@/assets/marketing/ic_list_1.png";
import ic_list_2 from "@/assets/marketing/ic_list_2.png";
import ic_list_3 from "@/assets/marketing/ic_list_3.png";
import ic_list_4 from "@/assets/marketing/ic_list_4.png";
import ic_text_t from "@/assets/logo/ic_text_t.png";
import ic_text_m from "@/assets/logo/ic_text_m.svg?url";
import ic_line from "@/assets/marketing/ic_line.png";
import ic_mobile from "@/assets/marketing/ic_mobile.png";
import ic_skype from "@/assets/marketing/ic_skype.png";
import ic_telegram from "@/assets/marketing/ic_telegram.png";
import ic_whatapp from "@/assets/marketing/ic_whatapp.png";
import { storeToRefs } from "pinia";
import { useAsync } from "@/stores/useAsync";
import NavBar from "@/components/NavBar.vue";
import { useApp } from "@/stores/useApp";

const list = ref([ic_list_1, ic_list_2, ic_list_3, ic_list_4]);
const { init } = storeToRefs(useAsync());
const { isApp } = storeToRefs(useApp());

interface Ilist {
    icon: any;
    title: string;
    content: string;
    key: string;
    tel?: boolean;
}

const cooperates = ref<Ilist[]>([
    { icon: ic_mobile, title: "合营部咨询电话", content: "", key: "cooperatePhone", tel: true },
    { icon: ic_whatapp, title: "合营部WhatApp", content: "", key: "cooperateWhatapp", tel: false },
    { icon: ic_line, title: "合营部line", content: "", key: "cooperateLine", tel: false },
    { icon: ic_skype, title: "合营部Skype", content: "", key: "cooperateSkype", tel: false },
    {
        icon: ic_telegram,
        title: "合营部Telegram",
        content: "",
        key: "cooperateTelegram",
        tel: false,
    },
]);

const cooperatePhone = (item: Ilist, e: Event) => {
    if (/[0-9]/.test(isApp.value)) {
        (window as any)?.testInterface?.cooperatePhone?.(item.content);
        (window as any)?.webkit?.messageHandlers?.cooperatePhone?.postMessage?.(item.content);
        e.stopPropagation();
        e.preventDefault();
        return;
    }
};

if (typeof init?.value?.pub_setting == "object") {
    Object.keys(init.value.pub_setting).forEach(item => {
        cooperates.value.some(v => {
            if (v.key == item) {
                v.content = init.value?.pub_setting[item]!;
                return true;
            }
        });
    });
}
</script>

<style lang="scss" scoped>
.bg_left {
    position: absolute;
    left: -6.86%;
    right: 1.55%;
    top: 50%;
    bottom: -128.57%;
    background: linear-gradient(270.8deg, #e8eeff 42.77%, rgba(231, 241, 255, 0) 91.91%);
    opacity: 0.4;
    transform: matrix(0.71, -0.7, 0.71, 0.7, 0, 0);
}
.bg_right {
    position: absolute;
    left: 27.8%;
    right: -6.94%;
    top: 50%;
    bottom: -137.8%;

    background: linear-gradient(
        270.91deg,
        #dce4fb -32.99%,
        #ced9fb -32.98%,
        rgba(231, 241, 255, 0) 91.85%
    );
    opacity: 0.4;
    transform: matrix(0.71, -0.7, 0.71, 0.7, 0, 0);
}
</style>
