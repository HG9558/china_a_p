<!-- VIP详情 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg">
        <NavBar :nav-bar-props="{ title: 'VIP详情' }" transparent />
        <div class="flex-1 overflow-hidden rounded-t-20px bg-mainBg z-0">
            <div class="h-full rounded-t-20px overflow-hidden z-0">
                <SwiperBox ref="swiperRef" id="swiper">
                    <template v-if="loading ? skList : vips?.weals">
                        <div class="bg-white mb-10px">
                            <VipTitle title="VIP权益" />
                            <ul class="text-sm text-[#1E4CA8]">
                                <li class="grid grid-cols-4 items-center h-11 bg-[#526BD4]">
                                    <span
                                        class="flex-1 text-center text-white relative before:absolute before:right-0 before:h-3 before:rounded-sm before:w-[2px] before:bg-[#4860C5] before:top-1/2 before:-translate-y-1/2"
                                        v-for="(item, index) in weals"
                                        :key="index"
                                    >
                                        {{ item }}
                                    </span>
                                </li>
                                <li
                                    :key="index"
                                    :class="{ tlw_skeleton: loading }"
                                    class="h-11 odd:bg-[#F8F8FA] flex items-center font-bold"
                                    v-for="(item, index) in loading ? skList : vips?.weals"
                                >
                                    <span class="flex-1 items-center text-center">
                                        {{ item?.name || "" }}
                                    </span>
                                    <span
                                        class="flex-1 items-center text-center bg-[#B4C3F510] overflow-hidden"
                                    >
                                        {{ item?.rewardsUpgrade || "" }}
                                    </span>
                                    <span class="flex-1 items-center text-center">
                                        {{ item?.rewardsBirthday || "" }}
                                    </span>
                                    <span
                                        class="flex-1 items-center text-center bg-[#B4C3F510] overflow-hidden"
                                    >
                                        {{ item?.withdrawalTotalCoin || "" }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </template>
                    <template v-if="loading ? skList : vips?.reds">
                        <div class="bg-white mb-10px">
                            <VipTitle title="每月红包" />
                            <ul class="text-sm text-[#1E4CA8]">
                                <li class="grid grid-cols-4 items-center h-11 bg-[#526BD4]">
                                    <span
                                        class="flex-1 text-center text-white relative before:absolute before:right-0 before:h-3 before:rounded-sm before:w-[2px] before:bg-[#4860C5] before:top-1/2 before:-translate-y-1/2"
                                        v-for="(item, index) in reds"
                                        :key="index"
                                    >
                                        {{ item }}
                                    </span>
                                </li>

                                <li
                                    :key="index"
                                    :class="{ tlw_skeleton: loading }"
                                    class="h-11 odd:bg-[#F8F8FA] flex items-center font-bold"
                                    v-for="(item, index) in loading ? skList : vips?.reds"
                                >
                                    <span class="flex-1 items-center text-center">
                                        {{ item?.name || "" }}
                                    </span>
                                    <span
                                        class="flex-1 items-center text-center bg-[#B4C3F510] overflow-hidden"
                                    >
                                        {{ item?.rewardsMonthly || "" }}
                                    </span>
                                    <span class="flex-1 items-center text-center">
                                        {{ item?.rewardsMonthlyMid || "" }}
                                    </span>
                                    <span
                                        class="flex-1 items-center text-center bg-[#B4C3F510] overflow-hidden"
                                    >
                                        {{ item?.threshold || "" }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </template>
                    <template v-if="loading ? skList : vips?.levels">
                        <div class="mb-10px bg-white overflow-hidden">
                            <VipTitle title="VIP等级条件" />
                            <ul class="text-sm text-[#1E4CA8]">
                                <li class="grid grid-cols-4 h-11 bg-[#526BD4]">
                                    <p
                                        :key="index"
                                        v-for="(item, index) in levels"
                                        class="flex relative before:absolute before:right-0 before:h-3 before:rounded-sm before:w-[2px] before:bg-[#4860C5] before:top-1/2 before:-translate-y-1/2"
                                    >
                                        <span
                                            class="flex max-sm:w-14 max-sm:mx-auto items-center justify-center text-center text-white"
                                        >
                                            {{ item }}
                                        </span>
                                    </p>
                                </li>
                                <li
                                    :key="index"
                                    :class="{ tlw_skeleton: loading }"
                                    class="h-11 odd:bg-[#F8F8FA] flex items-center font-bold"
                                    v-for="(item, index) in loading ? skList : vips?.levels"
                                >
                                    <span
                                        class="flex-1 flex items-center justify-center text-center"
                                    >
                                        {{ item?.name || "" }}
                                    </span>
                                    <span
                                        class="flex-1 flex items-center justify-center text-center bg-[#B4C3F510]"
                                    >
                                        {{ item?.scoreDeposit || "" }}
                                    </span>
                                    <span
                                        class="flex-1 flex items-center justify-center text-center"
                                    >
                                        {{ item?.scoreUpgrade || "" }}
                                    </span>
                                    <span
                                        class="flex-1 flex items-center justify-center text-center bg-[#B4C3F510]"
                                    >
                                        {{ item?.scoreRelegation || "" }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </template>
                    <template v-if="loading ? skList : vips?.reds">
                        <div class="bg-white mb-10px overflow-hidden vip_swiper">
                            <VipTitle title="VIP返水比例" />
                            <SwiperBox
                                type="default"
                                :list="Array(Math.ceil(rebates?.length / 4))"
                                pagination
                            >
                                <template v-slot="{ index: i }">
                                    <ul class="text-sm text-[#1E4CA8] pb-6">
                                        <li class="flex h-11 bg-[#526BD4]">
                                            <span
                                                class="w-24 flex-1 flex items-center text-center justify-center text-white relative before:absolute before:right-0 before:h-3 before:rounded-sm before:w-[2px] before:bg-[#4860C5] before:top-1/2 before:-translate-y-1/2"
                                                v-for="(item, index) in rebates?.slice(
                                                    i * 4,
                                                    i * 4 + 4
                                                )"
                                                :key="index"
                                            >
                                                {{ item?.title }}
                                            </span>
                                        </li>
                                        <li
                                            :class="{ tlw_skeleton: loading }"
                                            class="h-11 odd:bg-[#F8F8FA] flex items-center justify-center font-bold"
                                            :key="index"
                                            v-for="(item, index) in loading
                                                ? skList
                                                : vips?.rebates"
                                        >
                                            <span
                                                :key="j"
                                                class="w-24 flex-1 flex items-center justify-center text-center even:bg-[#B4C3F510]"
                                                v-for="(k, j) in rebates?.slice(i * 4, i * 4 + 4)"
                                            >
                                                {{
                                                    k.key == "name"
                                                        ? item?.[k.key]
                                                        : `${item?.[k.key]}%` || ""
                                                }}
                                            </span>
                                        </li>
                                    </ul>
                                </template>
                            </SwiperBox>
                            <div class="text-13px flex items-center scale-90 pb-10px font-medium">
                                <span class="text-tip">注：</span>
                                <p class="text-[#1E4CA8]">
                                    以上各场馆最高返水，具体返水金额以实际游戏为准
                                </p>
                            </div>
                        </div>
                    </template>
                    <div class="pb-8">
                        <div class="bg-white rounded-b-20px">
                            <div class="py-[3px]">
                                <VipTitle title="VIP条款与规则" />
                            </div>
                            <ul class="px-6">
                                <li
                                    :key="index"
                                    v-for="(item, index) in rules"
                                    class="relative mb-[14px]"
                                >
                                    <p class="text-[#1E4CA8] leading-5 relative z-10 break-all">
                                        <span class="text-13px font-medium pb-1 z-10">
                                            {{ item?.title }}：
                                        </span>
                                        <span class="text-mainText text-xs">
                                            {{ item?.content }}
                                        </span>
                                    </p>
                                </li>
                            </ul>
                            <p class="text-13px font-medium text-[#2A2A2A] mt-4 pb-10 px-6">
                                平台保留对活动的修改、停止以及最终解释权
                            </p>
                        </div>
                    </div>
                    <van-back-top
                        target="#swiper"
                        bottom="10vh"
                        style="--van-back-top-background: transparent"
                    >
                        <div class="w-11 h-11" v-html="ic_back_top"></div>
                    </van-back-top>
                </SwiperBox>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { Level, Rebate, Red, VipDetails, Weal } from "@/api/vip/types";
import type { SwiperRef } from "@/components/types";
import { useStore } from "@/stores";
import { ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import SwiperBox from "@/components/SwiperBox.vue";
import ic_back_top from "@/assets/svg/ic_back_top.svg?raw";

import { storeToRefs } from "pinia";
import VipTitle from "@/components/VipTitle.vue";

interface Ilist {
    title: string;
    key: string;
}

const { setLoading } = useStore();
const weals = ref<string[]>(["VIP等级", "晋级礼金", "生日礼金", "每日提现额度"]);
const reds = ref<string[]>(["VIP等级", "1号", "15号", "领取需求"]);
const levels = ref<string[]>(["VIP等级", "晋级需 累计充值", "晋级需 累计投注", "保级需 累计投注"]);
const rebates = ref<Ilist[]>([
    { title: "VIP等级", key: "name" },
    { title: "篮球", key: "basketball" },
    { title: "棋牌", key: "chess" },
    { title: "捕鱼", key: "fishion" },
    { title: "真人", key: "live" },
    { title: "彩票", key: "lottery" },
    { title: "电子", key: "slot" },
    { title: "体育", key: "sports" },
]);
const skList = ref<Partial<Level | Rebate | Red | Weal>[]>(Array(11).fill(null));

const swiperRef = ref<SwiperRef>();
const vips = ref<VipDetails>();
const { loading } = storeToRefs(useStore());

const rules = ref<{ title: string; content: string }[]>([
    {
        title: "晋升标准",
        content: `会员的累计投注额和累计存款达到相应的级别要求，即可在次日24点晋级至相应的VIP等级。`,
    },
    {
        title: "保级要求",
        content: `会员在达到某VIP等级后，三个月内投注需要完成保级要求。如果在此期间完成晋升，保级要求重新按照当前等级计算。`,
    },
    {
        title: "降级标准",
        content: `如果会员在三个月内没有完成相应的保级要求流水，系统会自动降级一个等级，相应的返水及其它优惠也会随之调整至降级后的等级。`,
    },
    {
        title: "升级礼金",
        content: `升级礼金在会员达到该会员级别后，系统自动派发升级礼金，会员需在红利页面手动领取，每个级别的升级礼金仅能领取一次。`,
    },
    {
        title: "生日礼金",
        content: `会员在注册三个月内过生日，今年将不能领取生日礼金。另注册时间大于三个月的会员在生日当天，可在红利页面自行领取，每年仅可领取一次。`,
    },
    {
        title: "每月红包",
        content: `会员在上个月的累计存款额度达到最低月累计存款额度要求，即可在本月1号和15号去红利页面领取相应等级的红包彩金（每月红包彩金1倍流水即可提款）。`,
    },
    {
        title: "晋级优惠",
        content: `可在福利中心自助领取，领取晋级优惠活动后开始计算活动有效流水，此优惠不与平台其它优惠共享，仅与返水优惠共享。`,
    },
    {
        title: "VIP返水说明",
        content: `若会员的返水总额超出对应VIP等级返水上限时，则按照对应等级的最高返水派发。VIP返水将在次日派发，如未到帐，请咨询客服。`,
    },
]);

const vipDetails = async () => {
    setLoading(true);
    const res = await API.vipDetails();
    setLoading(false);
    if (res?.code === 0) {
        vips.value = res.data!;
        swiperRef.value?.update?.();
    }
};
vipDetails();
</script>

<style lang="scss" scoped>
::v-deep(.vip_swiper) {
    .swiper-pagination {
        .swiper-pagination-bullet {
            width: 14px;
            height: 3px;
            border-radius: 3px;
            &.swiper-pagination-bullet-active {
                background: #475dcd;
            }
        }
    }
}
</style>
