<!-- 交易详情 -->
<template>
    <VanPopup v-model:show="showBottom" position="right" style="width: 100%; height: 100%">
        <div class="h-full tlw_top_bg flex flex-col">
            <NavBar
                :transparent="true"
                :click-left="clickLeft"
                :nav-bar-props="{ title: '交易详情' }"
                @click-right="clickRight"
            >
                <template #right>
                    <i class="icon-erji text-lg text-white" @click="toService" />
                </template>
            </NavBar>
            <div class="flex-1 flex-col overflow-hidden rounded-t-20px bg-mainBg z-0">
                <div class="bg-white rounded-20px px-10px">
                    <div class="h-[84px] flex items-center justify-center">
                        <p class="font-medium text-center">
                            <span class="font-OPPO text-[40px]" v-if="/[0-9]/.test(`${active}`)">
                                {{
                                    `${active == "0" ? "+" : active == "1" ? "-" : ""}${
                                        item?.coinApply || item?.coin || "0.00"
                                    }`
                                }}
                            </span>
                            <span class="font-OPPO text-[40px]" v-else>
                                {{
                                    `${item?.outIn == 0 ? "-" : item?.outIn == 1 ? "+" : ""}${
                                        item?.coinApply || item?.coin || "0.00"
                                    }`
                                }}
                            </span>
                            <span>元</span>
                        </p>
                    </div>
                    <template v-if="type == 1">
                        <div
                            v-if="item?.status"
                            class="text-sm flex items-center justify-between h-[50px] border-b border-mainBg"
                        >
                            <span class="flex-shrink-0 text-mainText">交易状态</span>
                            <div
                                class="flex items-center text-gz"
                                :class="{
                                    '!text-fz_g': item.status == 2,
                                    '!text-tip': item.status == 3,
                                }"
                            >
                                {{ status[item?.status] }}
                            </div>
                        </div>
                        <div
                            class="text-sm flex items-center justify-between h-[50px] border-b border-mainBg"
                        >
                            <span class="flex-shrink-0 text-mainText">交易时间</span>
                            <div class="flex items-center text-gz" v-if="item?.createdAt">
                                {{ formatTime(item.createdAt) }}
                            </div>
                        </div>
                        <div
                            class="text-sm flex items-center justify-between h-[50px] border-b border-mainBg"
                        >
                            <span class="flex-shrink-0 text-mainText">交易类型</span>
                            <div class="flex items-center text-gz">
                                {{ item?.transactionType || item?.payTypeName }}
                            </div>
                        </div>
                        <div
                            class="text-sm flex items-center justify-between h-[50px] border-b border-mainBg"
                        >
                            <span class="flex-shrink-0 text-mainText">交易方式</span>
                            <div class="flex items-center text-gz">
                                {{ item?.payChannelName || item?.transactionMethod }}
                            </div>
                        </div>
                        <div class="text-sm flex items-center justify-between h-[50px]">
                            <span class="flex-shrink-0 text-mainText">订单编号</span>
                            <div
                                class="flex items-center justify-end text-gz"
                                @click="copyText(item?.orderNo || item?.referIds)"
                            >
                                <span class="mr-1">
                                    {{ item?.orderNo || item?.referId }}
                                </span>
                                <div class="w-[18px] h-[18px]" v-html="ic_copy" alt="" />
                            </div>
                        </div>
                    </template>
                    <template v-if="type == 2">
                        <div
                            class="text-sm flex items-center justify-between h-[50px] border-b border-mainBg"
                        >
                            <span class="flex-shrink-0 text-mainText">交易时间</span>
                            <div class="flex items-center text-gz" v-if="item?.createdAt">
                                {{ formatTime(item.createdAt) }}
                            </div>
                        </div>
                        <div
                            class="text-sm flex items-center justify-between h-[50px] border-b border-mainBg"
                        >
                            <span class="flex-shrink-0 text-mainText">交易类型</span>
                            <div class="flex items-center text-gz">
                                {{ item?.transactionType || "" }}
                            </div>
                        </div>
                        <div
                            class="text-sm flex items-center justify-between h-[50px] border-b border-mainBg"
                        >
                            <span class="flex-shrink-0 text-mainText">交易明细</span>
                            <div class="flex items-center text-gz">
                                {{ item?.transactionDetails || "" }}
                            </div>
                        </div>
                        <div
                            class="text-sm flex items-center justify-between h-[50px] border-b border-mainBg"
                        >
                            <span class="flex-shrink-0 text-mainText">订单号</span>
                            <div
                                class="flex items-center justify-end text-gz"
                                @click="copyText(item?.orderNo || item?.referId)"
                            >
                                <span class="mr-1">
                                    {{ item?.orderNo || item?.referId }}
                                </span>
                                <div class="w-[18px] h-[18px]" v-html="ic_copy" />
                            </div>
                        </div>
                        <!-- <div
                            class="text-sm flex items-center justify-between h-[50px] border-b border-mainBg"
                        >
                            <span class="flex-shrink-0 text-mainText">备注</span>
                            <div class="flex items-center text-gz"></div>
                        </div> -->
                    </template>
                </div>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { copyText, formatTime, toService } from "@/utils";
import { computed } from "vue";
import NavBar from "@/components/NavBar.vue";
import { DList, WList } from "@/api/depositAndWithdrawal/types";
import { FList } from "@/api/funds/types";
import ic_copy from "@/assets/svg/ic_copy.svg?raw";

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: string): void;
}>();

interface Istatus {
    [name: number]: any;
}

const status: Istatus = {
    1: "待处理",
    2: "成功",
    3: "失败",
};

const props = defineProps<{
    modelValue: boolean;
    item: DList | WList | FList | undefined;
    type: 1 | 2; //充提记录,2资金明细
    active?: string;
}>();

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set() {
        close();
    },
});

const clickLeft = () => {
    close();
};

const clickRight = () => {
    close();
};

const close = () => {
    emits("update:modelValue", false);
};
</script>
