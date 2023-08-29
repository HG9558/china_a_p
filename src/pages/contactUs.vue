<!-- 联系我们 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg" :style="{ paddingTop: `${top || 0}px` }">
        <NavBar transparent class="flex-shrink-0" :nav-bar-props="{ title: '联系我们' }">
            <template #right>
                <i class="z-10 text-white ml-2 icon-erji text-lg" @click="toService" />
            </template>
        </NavBar>
        <div class="flex-1 rounded-t-20px overflow-hidden bg-mainBg z-0">
            <div class="bg-white rounded-20px px-10px">
                <PublicHead
                    :right="false"
                    :border="false"
                    title="反馈或建议"
                    class="!text-mainText"
                />
                <ul class="px-[6px]">
                    <li
                        :key="index"
                        v-show="item.content"
                        v-for="(item, index) in feedbacks"
                        class="flex items-center justify-between h-[70px] border-b border-b-mainBg last-of-type:border-b-0"
                    >
                        <div class="flex-1 flex items-center">
                            <img class="w-10 h-10 mr-10px flex-shrink-0" :src="item.icon" alt="" />
                            <div class="flex flex-col flex-1 overflow-hidden">
                                <p class="text-[15px] text-mainText font-medium">
                                    {{ item.title }}
                                </p>
                                <span class="text-txt_d text-13px">
                                    {{ item.content }}
                                </span>
                            </div>
                        </div>
                        <VanButton
                            @click="copyText(item.content)"
                            class="h-7 w-[58px] rounded-xl whitespace-nowrap text-sm border-txt text-txt"
                        >
                            复制
                        </VanButton>
                    </li>
                </ul>
            </div>
            <div class="bg-white rounded-20px px-10px mt-10px">
                <PublicHead
                    :right="false"
                    :border="false"
                    title="合作关系"
                    class="!text-mainText"
                />
                <ul class="px-[6px]">
                    <li
                        :key="index"
                        v-show="item.content"
                        v-for="(item, index) in cooperates"
                        class="flex items-center justify-between h-[70px] border-b border-b-mainBg last-of-type:border-b-0"
                    >
                        <div class="flex-1 flex items-center">
                            <img class="w-10 h-10 mr-10px flex-shrink-0" :src="item.icon" alt="" />
                            <div class="flex flex-col flex-1 overflow-hidden">
                                <p class="text-[15px] text-mainText font-medium">
                                    {{ item.title }}
                                </p>
                                <span class="text-txt_d text-13px">
                                    {{ item.content }}
                                </span>
                            </div>
                        </div>
                        <VanButton
                            @click="copyText(item.content)"
                            class="h-7 w-[58px] rounded-xl whitespace-nowrap text-sm border-txt text-txt"
                        >
                            复制
                        </VanButton>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ic_message from "@/assets/helpCenter/ic_message.png";
import ic_email from "@/assets/helpCenter/ic_email.png";
import ic_tel from "@/assets/helpCenter/ic_tel.png";
import ic_skype from "@/assets/helpCenter/ic_skype.png";
import ic_tg from "@/assets/helpCenter/ic_tg.png";
import ic_wa from "@/assets/helpCenter/ic_wa.png";
import { copyText, toService } from "@/utils";
import NavBar from "@/components/NavBar.vue";
import PublicHead from "@/components/PublicHead.vue";
import { useAsync } from "@/stores/useAsync";
import { storeToRefs } from "pinia";
import { useApp } from "@/stores/useApp";

interface Ilist {
    icon: any;
    title: string;
    content: string;
    key: string;
}

const { init } = storeToRefs(useAsync());
const { top } = storeToRefs(useApp());

const feedbacks = ref<Ilist[]>([
    {
        icon: ic_message,
        title: "投诉建议邮箱",
        content: "",
        key: "suggestionsEmail",
    },
    { icon: ic_email, title: "客服邮箱", content: "", key: "customerServiceEmail" },
]);

const cooperates = ref<Ilist[]>([
    { icon: ic_tel, title: "合营部联系电话", content: "", key: "cooperatePhone" },
    { icon: ic_skype, title: "合营部Skype", content: "", key: "cooperateSkype" },
    { icon: ic_tg, title: "合营部Telegram", content: "", key: "cooperateTelegram" },
    { icon: ic_wa, title: "合营部WhatApp", content: "", key: "cooperateWhatapp" },
]);

if (typeof init?.value?.pub_setting == "object") {
    Object.keys(init.value.pub_setting).forEach(item => {
        feedbacks.value.some(v => {
            if (v.key == item) {
                v.content = init.value?.pub_setting[item]!;
                return true;
            }
        });
        cooperates.value.some(v => {
            if (v.key == item) {
                v.content = init.value?.pub_setting[item]!;
                return true;
            }
        });
    });
}
</script>
