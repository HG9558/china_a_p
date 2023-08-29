<!-- VIP特权 -->
<template>
    <div
        class="h-full bg-[#f4f4f4] tlw_vip_top_bg bg-[center_top_-10%] sm:bg-[center_top_-30%] flex flex-col"
    >
        <NavBar
            :transparent="true"
            class="flex-shrink-0"
            :nav-bar-props="{ title: 'VIP特权', rightText: '详情' }"
            @click-right="toDetail"
        />
        <div class="flex-1 rounded-t-20px overflow-hidden z-0 flex flex-col">
            <SwiperBox ref="swiperRef">
                <div class="rounded-2xl vips">
                    <div class="px-7">
                        <div class="h-full flex flex-1 overflow-hidden items-center">
                            <div
                                class="w-12 h-12 mr-10px relative rounded-full border border-white/70"
                            >
                                <img
                                    v-if="user?.avatar"
                                    class="w-[43px] h-[43px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                    v-lazy="lazyAvatar(user.avatar)"
                                    alt=""
                                />
                            </div>
                            <div
                                class="text-white h-full flex flex-col justify-center flex-1 overflow-hidden"
                            >
                                <div class="flex items-center overflow-hidden">
                                    <p class="text-15px font-medium mr-2 line-clamp-1 max-w-[90%]">
                                        {{ user?.nickname || user?.username }}
                                    </p>
                                    <div class="flex items-end">
                                        <img
                                            class="h-4 flex-shrink-0"
                                            v-if="typeof user?.levelId == 'number'"
                                            :src="left_vips(user?.levelId)"
                                            alt=""
                                        />
                                        <img
                                            class="h-3 flex-shrink-0 -ml-[2px] -mb-[1px]"
                                            v-if="typeof user?.levelId == 'number'"
                                            :src="right_vips(user?.levelId)"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-end w-full mt-6">
                            <div class="flex items-end h-5 w-[50px]">
                                <img
                                    class="h-5 flex-shrink-0"
                                    v-if="typeof user?.levelId == 'number'"
                                    :src="left_vips(user?.levelId)"
                                    alt=""
                                />
                                <img
                                    class="h-4 flex-shrink-0 -ml-[2px] -mb-[1px]"
                                    v-if="typeof user?.levelId == 'number'"
                                    :src="right_vips(user?.levelId)"
                                    alt=""
                                />
                            </div>
                            <div class="text-sm flex-1 text-main mx-2 sm:mx-9 relative">
                                <p
                                    class="absolute transition-all duration-300 -translate-x-1/2 bottom-2 text-white flex flex-col items-center justify-center"
                                    :style="{
                                        left: `${percentage(
                                            Number(vipInfo?.score),
                                            Number(vipInfo?.upScore)
                                        )}%`,
                                    }"
                                >
                                    <span
                                        class="tlw_text_linear bg-gradient-to-b from-[#fff] to-[#ffffff50] font-DINAlternateBold translate-y-[6px]"
                                    >
                                        {{
                                            `${percentage(
                                                Number(vipInfo?.score),
                                                Number(vipInfo?.upScore)
                                            )}%`
                                        }}
                                    </span>
                                    <i
                                        class="iconfont icon-zelvxuanzefeiyongdaosanjiaoxingfandui text-white text-xs"
                                    ></i>
                                </p>
                                <div
                                    class="bg-[url('@/assets/svg/ic_progress_bg.svg')] bg-[#EAF1FE] bg-repeat-x rounded-full"
                                >
                                    <van-progress
                                        class="w-full"
                                        color="linear-gradient(to bottom,#7E9AFF,#3074F6)"
                                        :stroke-width="8"
                                        style="--van-progress-background: transparent"
                                        pivot-text=" "
                                        :percentage="
                                            percentage(
                                                Number(vipInfo?.score),
                                                Number(vipInfo?.upScore)
                                            )
                                        "
                                    />
                                </div>
                            </div>
                            <div class="flex items-end h-5 w-[50px]">
                                <img
                                    class="h-5 flex-shrink-0"
                                    v-if="typeof user?.levelId == 'number'"
                                    :src="
                                        left_vips(
                                            user?.levelId == 10 ? user?.levelId : user?.levelId + 1
                                        )
                                    "
                                    alt=""
                                />
                                <img
                                    class="h-4 flex-shrink-0 -ml-[2px] -mb-[1px]"
                                    v-if="typeof user?.levelId == 'number'"
                                    :src="
                                        right_vips(
                                            user?.levelId == 10 ? user?.levelId : user?.levelId + 1
                                        )
                                    "
                                    alt=""
                                />
                            </div>
                        </div>
                        <div class="flex items-end text-white text-xs mt-10px">
                            <span class="font-medium">成长值:</span>
                            <span class="font-DINAlternateBold text-17px ml-[2px]">
                                {{ vipInfo?.score || "0" }}
                            </span>
                            <span class="font-DIN text-xs leading-none">
                                （{{ vipInfo?.score || "0" }}/{{ vipInfo?.upScore || "0" }}）
                            </span>
                        </div>
                    </div>
                    <SwiperBox
                        :key="vipInfo?.rules?.length"
                        type="default"
                        class="h-full"
                        ref="vipSwiperRef"
                        :slidesPerView="1.1"
                        :list="vipInfo?.rules || ['']"
                        @slide-change="change"
                        :spaceBetween="isPc ? -35 : -20"
                        :slides-offset-before="isPc ? 30 : 16"
                        :slides-offset-after="isPc ? 30 : 16"
                    >
                        <template v-slot="{ item }">
                            <div
                                class="pb-[53.01%] relative bg-[url('@/assets/vip/ic_vip_bg.png')] bg-[length:100%_100%] bg-no-repeat"
                                :class="{ active_bg: hide(item.id) }"
                            >
                                <div
                                    class="pt-2 absolute top-0 w-full h-full px-10px sm:px-10 flex flex-col justify-evenly"
                                >
                                    <div class="pl-[25px] min-h-[45px]">
                                        <img class="h-[21px] mb-1" :src="vipIcon(item)" alt="" />
                                        <p class="text-[#9BA1AE] text-sm">
                                            <span>保级期限日期:</span>
                                            <span>{{ current?.["scoreValidityDate"] || 0 }}天</span>
                                        </p>
                                    </div>
                                    <ul class="grid grid-cols-3 h-11">
                                        <li
                                            v-for="(v, i) in list"
                                            :key="i"
                                            class="flex-1 overflow-hidden"
                                        >
                                            <p
                                                class="font-DINAlternateBold text-center break-all text-lg line-clamp-1"
                                            >
                                                {{ current?.[v.key] || "0" }}
                                            </p>
                                            <p class="text-[#79797C] text-center text-xs">
                                                {{ v.title }}
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </template>
                    </SwiperBox>
                </div>
                <div class="flex-1 mt-1 px-10px rounded-t-20px pb-5">
                    <div
                        class="px-4 pb-5 relative rounded-20px bg-gradient-to-b from-[#fff] to-[#F2F8FF] from/4.6% to/67% shadow-[0px_4px_4px_rgba(102,133,192,0.05),inset_0px_-3px_6px_rgba(255,255,255,0.8)] border border-white"
                    >
                        <div
                            class="w-[280px] h-10 absolute top-[-1px] left-1/2 -translate-x-1/2 tlw_vip_title_bg text-white text-center leading-10 font-semibold"
                        >
                            VIP会员特权服务
                        </div>
                        <div class="relative z-10 mt-10">
                            <ul class="grid grid-cols-2 gap-10px whitespace-nowrap">
                                <li
                                    class="flex items-center h-[74px] rounded-2xl overflow-hidden"
                                    v-for="(item, index) in list_c"
                                    :key="index"
                                >
                                    <div
                                        class="w-[60px] h-[60px] flex-shrink-0 rounded-full flex items-center justify-center"
                                        :class="{ '!justify-end': index == list_c.length - 1 }"
                                    >
                                        <img class="w-[60px] h-[60px]" :src="item.icon" alt="" />
                                    </div>
                                    <div class="flex flex-col flex-1 overflow-hidden">
                                        <p
                                            class="font-semibold font-DIN flex items-center text-17px line-clamp-1"
                                        >
                                            <CountUp
                                                v-if="/[0-9]/.test(current?.[item.key])"
                                                :end-val="+current?.[item.key]"
                                                :decimal-places="2"
                                                :duration="0.5"
                                            />
                                            <span v-else>
                                                {{ current?.[item.key] || "0.00" }}
                                            </span>
                                        </p>
                                        <span class="text-xs text-txt_d">
                                            {{ item.title }}
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div
                        v-show="current?.id != 0 && current?.groupId?.[0]"
                        class="relative px-2 pb-4 mt-[14px] rounded-20px bg-gradient-to-b from-[#fff] to-[#F2F8FF] from/4.6% to/67% shadow-[0px_4px_4px_rgba(102,133,192,0.05),inset_0px_-3px_6px_rgba(255,255,255,0.8)] border border-white"
                    >
                        <div class="px-1 z-10 relative">
                            <div class="h-[54px] flex items-center justify-center">
                                <img class="max-w-[320px]" :src="ic_vip_title" alt="" />
                            </div>
                            <p class="text-xs text-[#79797C] text-center mb-4 mt-1">
                                {{
                                    `最低转账${
                                        current?.minTransfer || "0"
                                    }元至指定场馆，即可获得以下奖励`
                                }}
                            </p>
                            <ul class="h-20 flex items-center rounded-2xl">
                                <li
                                    :key="index"
                                    v-for="(item, index) in promotion"
                                    class="text-center flex-1 flex flex-col items-center justify-center overflow-hidden relative"
                                >
                                    <img class="w-9 h-9" :src="item.icon" alt="" />
                                    <p
                                        class="text-[18px] font-DINAlternateBold flex items-end mt-[6px]"
                                    >
                                        <CountUp
                                            v-if="/[0-9]/.test(current?.[item.key])"
                                            :end-val="+current?.[item.key]"
                                            :decimal-places="index == 2 ? 0 : 2"
                                            :duration="0.5"
                                        />
                                        <span v-else>
                                            {{ current?.[item.key] || "0" }}
                                        </span>
                                        <span class="text-xs -translate-y-1">
                                            {{ item.unit }}
                                        </span>
                                    </p>
                                    <p class="text-xs text-[#79797C]">
                                        {{ item.title }}
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div
                            class="h-[38px] mt-4 bg-[#FDFDFD] rounded-10px flex items-center justify-between px-10px"
                            @click="platLists?.[0] && setShowGameList()"
                        >
                            <span
                                class="text-sm text-[#79797C] font-medium mr-10px line-clamp-1"
                                :class="{ 'text-mainText': activeGame?.name }"
                            >
                                {{ activeGame?.name || "选择场馆" }}
                            </span>
                            <i
                                class="icon-arrow-down-bold inline-block text-[#8A8A8A] transition-all"
                            ></i>
                        </div>
                        <div
                            class="h-[38px] bg-[#FDFDFD] rounded-10px mt-3 flex items-center pl-10px w-full overflow-x-hidden"
                        >
                            <span
                                class="text-sm text-[#79797C] font-medium mr-10px whitespace-nowrap"
                            >
                                申请金额
                            </span>
                            <van-field
                                type="number"
                                autocomplete="off"
                                @input="setAmount"
                                :disabled="disabled"
                                class="text-xs font-OPPO h-full !py-0 flex-1 bg-transparent"
                                :class="{
                                    '!text-sm !text-mainText !font-OPPO_B': params.amount,
                                }"
                                :maxlength="/(.)/.test(params.amount) ? 11 : 8"
                                :formatter="formatterNum"
                                v-model="params.amount"
                                placeholder="请输入金额"
                            />
                        </div>
                        <VanButton
                            @click="activity"
                            :loading="loading"
                            :disabled="disabled"
                            class="h-[38px] tlw_btn_linear text-white border-0 w-full mt-4 rounded-xl"
                        >
                            {{ btnText || "参与活动" }}
                        </VanButton>
                    </div>
                </div>
            </SwiperBox>
        </div>
        <ActivityGameList
            v-if="platLists"
            v-model="showGameList"
            :list="platLists"
            :active="activeGame"
            @submit="selectItem"
        />
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { VipInfo, Rule, groupId } from "@/api/vip/types";
import { useStore } from "@/stores";
import { computed, nextTick, ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import ic_cake from "@/assets/vip/ic_cake.png";
import ic_card from "@/assets/vip/ic_card.png";
import ic_dollar_circle from "@/assets/vip/ic_dollar_circle.png";
import ic_upgrade from "@/assets/vip/ic_upgrade.png";
import ic_rewardsMonthly from "@/assets/vip/ic_rewardsMonthly.png";
import ic_rewardsMonthlyMid from "@/assets/vip/ic_rewardsMonthlyMid.png";
import ic_bonusRate from "@/assets/vip/ic_bonusRate.png";
import ic_maxBonus from "@/assets/vip/ic_maxBonus.png";
import ic_multiple from "@/assets/vip/ic_multiple.png";
import NavBar from "@/components/NavBar.vue";

import { lazyAvatar, percentage } from "@/utils";
import { storeToRefs } from "pinia";
import type { SwiperRef } from "@/components/types";
import CountUp from "vue-countup-v3";
import type { Swiper } from "swiper/types";
import SwiperBox from "@/components/SwiperBox.vue";
import { Iactivity } from "@/api/vip/interface";
import ic_vip_title from "@/assets/vip/ic_vip_title.png";
import ActivityGameList from "@/components/Activity/ActivityGameList.vue";
import { formatterNum } from "@/utils/validate";
import { showFailToast, showSuccessToast } from "vant";
import { useAsync } from "@/stores/useAsync";

const { setLoading } = useStore();
const { globelKey, loading, user } = storeToRefs(useStore());
const { balance } = storeToRefs(useAsync());
const router = useRouter();
const active = ref<number>(0);
const swiperRef = ref<SwiperRef>();
const vipSwiperRef = ref<SwiperRef>();
const vipInfo = ref<VipInfo>();
const showGameList = ref<boolean>(false);
const activeGame = ref<groupId>();
const params = ref<Iactivity>({
    amount: "",
    id: 0,
});

const list = ref<{ title: string; key: string }[]>([
    { title: "累计存款", key: "scoreDeposit" },
    { title: "流水要求", key: "scoreUpgrade" },
    { title: "保级流水", key: "scoreRelegation" },
]);
const list_c = ref<{ icon: any; title: string; key: string; key2?: string }[]>([
    { icon: ic_card, title: "每日提款次数", key: "withdrawalNums" },
    { icon: ic_dollar_circle, title: "每日提款额度(元)", key: "withdrawalTotalCoin" },
    { icon: ic_upgrade, title: "升级礼金", key: "rewardsUpgrade" },
    { icon: ic_cake, title: "生日礼金", key: "rewardsBirthday" },
    {
        icon: ic_rewardsMonthly,
        title: "上半月礼金红包",
        key: "rewardsMonthly",
    },
    {
        icon: ic_rewardsMonthlyMid,
        title: "下半月礼金红包",
        key: "rewardsMonthlyMid",
    },
]);
const promotion = ref<{ icon: any; title: string; key: string; unit?: string }[]>([
    { icon: ic_bonusRate, title: "红利比例", key: "bonusRate", unit: "%" },
    { icon: ic_maxBonus, title: "最高奖励", key: "maxBonus", unit: "" },
    { icon: ic_multiple, title: "流水倍数", key: "multiple", unit: "倍" },
]);

const current = computed(() => {
    activeGame.value = undefined;
    params.value.amount = "";
    return vipInfo.value?.rules?.[active.value];
});

const disabled = computed(() => {
    return (
        loading.value ||
        !!btnText.value ||
        !platLists.value?.[0] ||
        vipInfo.value?.nowId == 0 ||
        Number(vipInfo.value?.nowId) < +Number(current.value?.id)
    );
});

const setAmount = () => {
    if (+params.value.amount > Number(balance.value?.coin)) {
        params.value.amount = (Number(balance.value?.coin) || 0)?.toFixed(0);
    }
};

const isPc = computed(() => globelKey.value > 640);

const btnText = computed(() => {
    switch (current.value?.status) {
        case 0:
            return "活动已参与";
        case 1:
            return "活动已完成";
        default:
            if (Number(vipInfo.value?.nowId) < +Number(current.value?.id)) return "等级不符";
            break;
    }
});

const vipIcon = computed(() => (item: Rule) => {
    if (item?.id == vipInfo.value?.nowId) {
        return new URL(`/src/assets/vip/VIP${item.id}.png`, import.meta.url).href;
    }
    return new URL(`/src/assets/vip/VIP${item.id}-1.png`, import.meta.url).href;
});

const left_vips = computed(() => (vip: number = 0) => {
    return new URL(`/src/assets/vip/l_vip_${vip}.png`, import.meta.url).href;
});

const right_vips = computed(() => (vip: number = 0) => {
    return new URL(`/src/assets/vip/r_vip_${vip}.png`, import.meta.url).href;
});

const hide = computed(() => (id: number) => vipInfo.value?.nowId! == id);

const platLists = computed(() => {
    return current.value?.groupId || [];
});

const change = (e: Swiper) => {
    active.value = e.activeIndex;
};

const setShowGameList = () => {
    if (Number(vipInfo.value?.nowId) < +Number(current.value?.id)) return "等级不符";
    showGameList.value = !showGameList.value;
};

const selectItem = (item: groupId) => {
    activeGame.value = item;
    params.value.id = item.id;
};

const toDetail = () => {
    router.push("/vipDetail");
};

const activity = async () => {
    // 晋级活动
    if (!activeGame.value?.name) return showFailToast("请选择场馆");
    if (!params.value.amount) return showFailToast("申请金额不能为空");
    if (
        Number(balance.value?.coin) <= 0 ||
        Number(balance.value?.coin) < Number(current.value?.minTransfer) ||
        Number(params.value.amount || 0) < Number(current.value?.minTransfer)
    ) {
        showFailToast(`最低申请金额不能低于${current.value?.minTransfer}元`);
        return;
    }
    setLoading(true);
    const res = await API.activity(params.value);
    setLoading(false);
    if (res.code == 0) {
        res.msg && showSuccessToast(res.msg);
        getVipInfo();
        useAsync()?.queryUserWallet();
    }
};

const getVipInfo = async () => {
    setLoading(true);
    const res = await API.vipInfo();
    setLoading(false);
    if (res.code === 0) {
        vipInfo.value = res.data!;
        nextTick(() => {
            if (typeof user.value?.levelId == "number") {
                vipSwiperRef.value?.swiperRef?.slideTo?.(user.value?.levelId);
            }
        });
    }
};

watch(
    () => current.value?.id,
    () => {
        nextTick(() => {
            swiperRef.value?.update?.();
        });
    }
);

getVipInfo();
</script>

<style lang="scss" scoped>
.vips {
    ::v-deep(.swiper) {
        .swiper-slide {
            transition: all 0.3s;
            transform: scale(0.9);
            &.swiper-slide-active {
                transform: scale(1);
            }
        }
    }
    .active_bg {
        background-image: url("@/assets/vip/ic_vip_bg_active.png");
    }
    ::v-deep(.van-progress) {
        .van-progress__pivot {
            width: 15px;
            height: 14px;
            padding: 0;
            min-width: initial;
            max-width: initial;
            margin-left: -2px;
            border-radius: initial;
            background: url("@/assets/svg/progress__pivot.svg") no-repeat center !important;
            background-size: cover;
            border-radius: 8px 0 0 8px;
        }
    }
}
</style>
