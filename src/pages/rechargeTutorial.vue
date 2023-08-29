<!-- 充值教程 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg relative" :style="{ paddingTop: `${top || 0}px` }">
        <NavBar transparent :nav-bar-props="{ title: '充值教程' }" />
        <div class="flex-1 rounded-t-20px overflow-hidden bg-mainBg z-0 flex flex-col">
            <van-cell
                is-link
                class="py-[13px] flex-shrink-0 rounded-t-20px bg-white"
                @click="showDepositPopup = !showDepositPopup"
            >
                <template #icon>
                    <img class="w-7 mr-10px" :src="icons(item?.icon)" alt="" />
                </template>
                <template #title>
                    <p class="leading-7">
                        {{ item?.title }}
                    </p>
                </template>
            </van-cell>
            <div class="flex-1 overflow-hidden">
                <VanTabs
                    v-if="item?.tabs"
                    v-model:active="active"
                    :swipe-threshold="4"
                    swipeable
                    style="
                        --van-tabs-bottom-bar-width: 1.125rem;
                        --van-tabs-bottom-bar-height: 0.25rem;
                    "
                >
                    <VanTab v-for="(v, i) in item?.tabs" :title="v.title" :key="i">
                        <template #title>
                            <span class="text-15px">
                                {{ v.title }}
                            </span>
                        </template>
                        <SwiperBox id="swiper" ref="swiperRef" v-if="active == i" @scroll="scroll">
                            <div v-for="(k, j) in v?.list" :key="j">
                                <p class="text-13px mt-[30px] text-center">
                                    {{ "步骤" }}
                                    {{ `${j + 1}/${v?.list?.length}` }}
                                </p>
                                <img class="w-full" v-lazy="lazy(depositImgs(k.img))" alt="" />
                            </div>
                            <p ref="bottomRef" class="h-10 w-full"></p>
                        </SwiperBox>
                    </VanTab>
                </VanTabs>
                <SwiperBox id="swiper" v-else ref="swiperRef" :key="item?.title" @scroll="scroll">
                    <div v-for="(v, i) in item?.list" :key="i">
                        <p class="text-13px mt-[30px] text-center">
                            {{ "步骤" }} {{ `${i + 1}/${item?.list?.length}` }}
                        </p>
                        <img class="w-full" v-lazy="lazy(depositImgs(v.img))" alt="" />
                    </div>
                    <p ref="bottomRef" class="h-10 w-full"></p>
                </SwiperBox>
            </div>
        </div>
        <div
            class="tlw_arrow_down z-10 absolute bottom-10 w-full h-5 bg-[url('@/assets/icon/ic_arrow_down.png')] bg-contain bg-center bg-no-repeat pointer-events-none duration-700 transition-all"
            :class="{ 'opacity-0': arrow_down }"
        ></div>
        <van-back-top
            v-if="showBack && item?.title"
            :key="`${item?.title + active}`"
            target="#swiper"
            bottom="10vh"
            class="active:!bg-txt"
            style="--van-back-top-background: #6f737b50"
        />
        <DepositPopup
            v-model="showDepositPopup"
            :list="deposits"
            @submit="submit"
            :current="item"
        />
    </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import { useApp } from "@/stores/useApp";
import { storeToRefs } from "pinia";
import { ref, nextTick, onMounted, computed } from "vue";
import DepositPopup from "@/components/DepositPopup.vue";
import SwiperBox from "@/components/SwiperBox.vue";
import type { Ideposits, SwiperRef } from "@/components/types";
import { useAsync } from "@/stores/useAsync";
import { throttle } from "@/utils";
import ic_deposit from "@/assets/defult/ic_deposit.png";

const { init } = storeToRefs(useAsync());
const showDepositPopup = ref<boolean>(false);
const swiperRef = ref<SwiperRef>();
const item = ref<Ideposits>();
const active = ref<number>(0);
const showBack = ref<boolean>(false);
const arrow_down = ref<boolean>(false);
const bottomRef = ref();

const icons = computed(() => (img: string) => {
    return new URL(`/src/assets/helpCenter/icon_${img}.png`, import.meta.url).href;
});

const depositImgs = computed(() => (img: string) => {
    return `${init?.value?.oss_server}/deposit/${img}`;
});

const lazy = computed(() => (src: string) => ({
    src: src,
    error: ic_deposit,
    loading: ic_deposit,
}));

const deposits = ref<Ideposits[]>([
    {
        title: "网银支付",
        icon: "1",
        list: [
            { img: "ic_deposit_1_1.png" },
            { img: "ic_deposit_1_2.png" },
            { img: "ic_deposit_1_3.png" },
            { img: "ic_deposit_1_4.png" },
        ],
    },
    {
        title: "银行卡转账",
        icon: "2",
        list: [
            { img: "ic_deposit_2_1.png" },
            { img: "ic_deposit_2_2.png" },
            { img: "ic_deposit_2_3.png" },
            { img: "ic_deposit_2_4.png" },
        ],
    },
    {
        title: "银行卡转卡",
        icon: "3",
        list: [
            { img: "ic_deposit_3_1.png" },
            { img: "ic_deposit_2_2.png" },
            { img: "ic_deposit_2_3.png" },
            { img: "ic_deposit_2_4.png" },
        ],
    },
    {
        title: "网银转账",
        icon: "4",
        list: [
            { img: "ic_deposit_4_1.png" },
            { img: "ic_deposit_2_2.png" },
            { img: "ic_deposit_2_3.png" },
            { img: "ic_deposit_2_4.png" },
        ],
    },
    {
        title: "极速转卡",
        icon: "5",
        list: [
            { img: "ic_deposit_5_1.png" },
            { img: "ic_deposit_5_2.png" },
            { img: "ic_deposit_5_3.png" },
            { img: "ic_deposit_5_4.png" },
            { img: "ic_deposit_5_5.png" },
            { img: "ic_deposit_5_6.png" },
            { img: "ic_deposit_5_7.png" },
            { img: "ic_deposit_5_8.png" },
        ],
    },
    {
        title: "支付宝转卡",
        icon: "6",
        list: [
            { img: "ic_deposit_6_1.png" },
            { img: "ic_deposit_6_2.png" },
            { img: "ic_deposit_6_3.png" },
            { img: "ic_deposit_6_4.png" },
            { img: "ic_deposit_6_5.png" },
            { img: "ic_deposit_6_6.png" },
            { img: "ic_deposit_6_7.png" },
        ],
    },
    {
        title: "支付宝转账",
        icon: "7",
        list: [
            { img: "ic_deposit_7_1.png" },
            { img: "ic_deposit_7_2.png" },
            { img: "ic_deposit_7_3.png" },
            { img: "ic_deposit_7_4.png" },
            { img: "ic_deposit_7_5.png" },
            { img: "ic_deposit_7_6.png" },
            { img: "ic_deposit_7_7.png" },
        ],
    },
    {
        title: "微信",
        icon: "8",
        list: [
            { img: "ic_deposit_8_1.png" },
            { img: "ic_deposit_8_2.png" },
            { img: "ic_deposit_8_3.png" },
            { img: "ic_deposit_8_4.png" },
            { img: "ic_deposit_8_5.png" },
            { img: "ic_deposit_8_6.png" },
        ],
    },
    {
        title: "支付宝",
        icon: "9",
        tabs: [
            {
                title: "飞行模式",
                list: [
                    { img: "ic_deposit_9_a_1.png" },
                    { img: "ic_deposit_9_a_2.png" },
                    { img: "ic_deposit_9_a_3.png" },
                    { img: "ic_deposit_9_a_4.png" },
                    { img: "ic_deposit_9_a_5.png" },
                    { img: "ic_deposit_9_a_6.png" },
                    { img: "ic_deposit_9_a_7.png" },
                    { img: "ic_deposit_9_a_8.png" },
                ],
            },
            {
                title: "仿原生",
                list: [
                    { img: "ic_deposit_9_b_1.png" },
                    { img: "ic_deposit_9_b_2.png" },
                    { img: "ic_deposit_9_b_3.png" },
                    { img: "ic_deposit_9_b_4.png" },
                ],
            },
            {
                title: "二次输入",
                list: [
                    { img: "ic_deposit_9_c_1.png" },
                    { img: "ic_deposit_9_c_2.png" },
                    { img: "ic_deposit_9_c_3.png" },
                    { img: "ic_deposit_9_c_4.png" },
                    { img: "ic_deposit_9_c_5.png" },
                    { img: "ic_deposit_9_c_6.png" },
                    { img: "ic_deposit_9_c_7.png" },
                    { img: "ic_deposit_9_c_8.png" },
                    { img: "ic_deposit_9_c_9.png" },
                ],
            },
            {
                title: "截图扫码",
                list: [
                    { img: "ic_deposit_9_d_1.png" },
                    { img: "ic_deposit_9_d_2.png" },
                    { img: "ic_deposit_9_d_3.png" },
                    { img: "ic_deposit_9_d_4.png" },
                    { img: "ic_deposit_9_d_5.png" },
                    { img: "ic_deposit_9_d_6.png" },
                ],
            },
            {
                title: "存款错误",
                list: [
                    { img: "ic_deposit_9_e_1.png" },
                    { img: "ic_deposit_9_e_2.png" },
                    { img: "ic_deposit_9_e_3.png" },
                    { img: "ic_deposit_9_e_4.png" },
                    { img: "ic_deposit_9_e_5.png" },
                ],
            },
        ],
    },
    {
        title: "银联快捷",
        icon: "10",
        list: [
            { img: "ic_deposit_10_1.png" },
            { img: "ic_deposit_10_2.png" },
            { img: "ic_deposit_10_3.png" },
        ],
    },
    {
        title: "京东支付",
        icon: "11",
        list: [
            { img: "ic_deposit_11_1.png" },
            { img: "ic_deposit_11_2.png" },
            { img: "ic_deposit_11_3.png" },
            { img: "ic_deposit_11_4.png" },
            { img: "ic_deposit_11_5.png" },
            { img: "ic_deposit_11_6.png" },
        ],
    },
    {
        title: "银联扫码",
        icon: "12",
        list: [
            { img: "ic_deposit_12_1.png" },
            { img: "ic_deposit_12_2.png" },
            { img: "ic_deposit_12_3.png" },
            { img: "ic_deposit_12_4.png" },
            { img: "ic_deposit_12_5.png" },
            { img: "ic_deposit_12_6.png" },
        ],
    },
    {
        title: "大额充值",
        icon: "13",
        list: [
            { img: "ic_deposit_13_1.png" },
            { img: "ic_deposit_13_2.png" },
            { img: "ic_deposit_13_3.png" },
            { img: "ic_deposit_13_4.png" },
        ],
    },
    {
        title: "代客充值",
        icon: "14",
        list: [
            { img: "ic_deposit_14_1.png" },
            { img: "ic_deposit_14_2.png" },
            { img: "ic_deposit_14_3.png" },
        ],
    },
    {
        title: "云闪付转卡",
        icon: "15",
        list: [
            { img: "ic_deposit_15_1.png" },
            { img: "ic_deposit_15_2.png" },
            { img: "ic_deposit_15_3.png" },
            { img: "ic_deposit_15_4.png" },
        ],
    },
    {
        title: "云闪付转账",
        icon: "16",
        list: [
            { img: "ic_deposit_16_1.png" },
            { img: "ic_deposit_16_2.png" },
            { img: "ic_deposit_16_3.png" },
            { img: "ic_deposit_16_4.png" },
        ],
    },
    {
        title: "微信转卡",
        icon: "17",
        list: [
            { img: "ic_deposit_17_1.png" },
            { img: "ic_deposit_17_2.png" },
            { img: "ic_deposit_17_3.png" },
            { img: "ic_deposit_17_4.png" },
            { img: "ic_deposit_17_5.png" },
            { img: "ic_deposit_17_6.png" },
        ],
    },
    {
        title: "微信转账",
        icon: "18",
        list: [
            { img: "ic_deposit_18_1.png" },
            { img: "ic_deposit_18_2.png" },
            { img: "ic_deposit_18_3.png" },
            { img: "ic_deposit_18_4.png" },
            { img: "ic_deposit_18_5.png" },
        ],
    },
    {
        title: "虚拟币充值",
        icon: "19",
        list: [
            { img: "ic_deposit_19_1.png" },
            { img: "ic_deposit_19_2.png" },
            { img: "ic_deposit_19_3.png" },
            { img: "ic_deposit_19_4.png" },
            { img: "ic_deposit_19_5.png" },
        ],
    },
    {
        title: "数字人民币",
        icon: "20",
        list: [
            { img: "ic_deposit_20_1.png" },
            { img: "ic_deposit_20_2.png" },
            { img: "ic_deposit_20_3.png" },
            { img: "ic_deposit_20_4.png" },
            { img: "ic_deposit_20_5.png" },
            { img: "ic_deposit_20_6.png" },
            { img: "ic_deposit_20_7.png" },
        ],
    },
    {
        title: "京东转卡",
        icon: "21",
        list: [
            { img: "ic_deposit_21_1.png" },
            { img: "ic_deposit_21_2.png" },
            { img: "ic_deposit_21_3.png" },
            { img: "ic_deposit_21_4.png" },
            { img: "ic_deposit_21_5.png" },
            { img: "ic_deposit_21_6.png" },
            { img: "ic_deposit_21_7.png" },
            { img: "ic_deposit_21_8.png" },
        ],
    },
    {
        title: "AstroPay",
        icon: "22",
        list: [
            { img: "ic_deposit_22_1.png" },
            { img: "ic_deposit_22_2.png" },
            { img: "ic_deposit_22_3.png" },
            { img: "ic_deposit_22_4.png" },
        ],
    },
    {
        title: "极速零钱",
        icon: "23",
        list: [
            { img: "ic_deposit_23_1.png" },
            { img: "ic_deposit_23_2.png" },
            { img: "ic_deposit_23_3.png" },
            { img: "ic_deposit_23_4.png" },
            { img: "ic_deposit_23_5.png" },
            { img: "ic_deposit_23_6.png" },
            { img: "ic_deposit_23_7.png" },
            { img: "ic_deposit_23_8.png" },
            { img: "ic_deposit_23_9.png" },
        ],
    },
    {
        title: "EBpay",
        icon: "24",
        list: [
            { img: "ic_deposit_24_1.png" },
            { img: "ic_deposit_24_2.png" },
            { img: "ic_deposit_24_3.png" },
            { img: "ic_deposit_24_4.png" },
            { img: "ic_deposit_24_5.png" },
            { img: "ic_deposit_24_6.png" },
            { img: "ic_deposit_24_7.png" },
            { img: "ic_deposit_24_8.png" },
        ],
    },
    {
        title: "KOIpay",
        icon: "25",
        list: [
            { img: "ic_deposit_25_1.png" },
            { img: "ic_deposit_25_2.png" },
            { img: "ic_deposit_25_3.png" },
            { img: "ic_deposit_25_4.png" },
            { img: "ic_deposit_25_5.png" },
            { img: "ic_deposit_25_6.png" },
            { img: "ic_deposit_25_7.png" },
            { img: "ic_deposit_25_8.png" },
        ],
    },
    {
        title: "TX转卡",
        icon: "26",
        list: [
            { img: "ic_deposit_26_1.png" },
            { img: "ic_deposit_26_2.png" },
            { img: "ic_deposit_26_3.png" },
            { img: "ic_deposit_26_4.png" },
            { img: "ic_deposit_26_5.png" },
        ],
    },
    {
        title: "QQ扫码",
        icon: "27",
        list: [
            { img: "ic_deposit_27_1.png" },
            { img: "ic_deposit_27_2.png" },
            { img: "ic_deposit_27_3.png" },
            { img: "ic_deposit_27_4.png" },
            { img: "ic_deposit_27_5.png" },
            { img: "ic_deposit_27_6.png" },
            { img: "ic_deposit_27_7.png" },
        ],
    },
    {
        title: "易币付虚拟币",
        icon: "28",
        list: [
            { img: "ic_deposit_28_1.png" },
            { img: "ic_deposit_28_2.png" },
            { img: "ic_deposit_28_3.png" },
            { img: "ic_deposit_28_4.png" },
            { img: "ic_deposit_28_5.png" },
        ],
    },
]);

const scroll = () => {
    throttle(() => {
        if (!bottomRef.value) return;
        const bodyH = document.body.clientHeight;
        const top = bottomRef.value?.getBoundingClientRect()?.top!;
        arrow_down.value = bodyH >= top;
    }, 100)();
};

const submit = (v: Ideposits) => {
    item.value = v;
    showBack.value = false;
    arrow_down.value = false;
    swiperRef.value?.update?.();
    nextTick(() => (showBack.value = true));
};

item.value = deposits.value?.[0];
const { top } = storeToRefs(useApp());

onMounted(() => {
    nextTick(() => (showBack.value = true));
});
</script>

<style lang="scss" scoped>
::v-deep(.van-tabs) {
    height: 100%;
    display: flex;
    flex-direction: column;
    .van-tabs__wrap {
        flex-shrink: 0;
    }
    .van-tabs__content {
        overflow: hidden;
        .van-tab__panel {
            height: 100%;
            overflow: hidden;
        }
    }
}
</style>
