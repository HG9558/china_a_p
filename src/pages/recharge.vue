<!-- 充值 -->
<template>
    <div class="h-full w-full flex flex-col tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '充值' }">
            <template #right>
                <div class="flex items-center" @click="router.push('/transactionRecord')">
                    <VanButton class="h-5 px-1 border-0 text-white">
                        <template #icon>
                            <img class="w-[18px] h-[18px]" :src="ic_funding" alt="" />
                        </template>
                        充提记录
                    </VanButton>
                </div>
            </template>
        </NavBar>
        <div class="flex-1 overflow-hidden rounded-t-20px bg-mainBg z-0">
            <SwiperBox ref="swiperRef">
                <div v-if="subList?.[0]" class="rounded-t-20px overflow-hidden bg-white pb-10px">
                    <div class="rounded-20px bg-white overflow-hidden">
                        <PublicHead
                            title="充值方式"
                            class="px-3 pl-3 h-14 text-17px !text-mainText"
                            :border="false"
                            :right="false"
                            :show-left="false"
                        >
                            <template #right>
                                <div
                                    class="rounded-2xl flex-shrink-0 flex items-center overflow-hidden text-mainText"
                                    :class="{ 'pointer-events-none': !!animate }"
                                    @click="allQueryBalance"
                                >
                                    <span
                                        class="px-1 text-sm inline-block font-OPPO_B align-bottom flex-1 text-right max-[100px] text-txt line-clamp-1 break-all break-words"
                                    >
                                        {{
                                            animate
                                                ? ellipsis(balance?.coin)
                                                : balance?.coin || "0.00"
                                        }}
                                    </span>
                                    <i
                                        v-html="ic_refresh"
                                        class="w-[14px] h-[14px] pointer-events-none text-mainText"
                                        :class="{ 'animate-spin opacity-50': !!animate }"
                                        @animationiteration="animationiteration"
                                    />
                                </div>
                            </template>
                        </PublicHead>
                        <ul
                            class="grid grid-cols-4 grid-rows-[82px] pt-1 justify-evenly gap-3 text-xs w-full box-border px-3 max-h-[280px] overflow-y-auto overflow-x-hidden"
                            @scroll.stop
                        >
                            <li
                                :key="index"
                                v-for="(item, index) in subList"
                                @click="selectActive(item, index)"
                                class="relative flex flex-col items-center rounded-xl border border-mainBg justify-end w-[77px] h-[82px] bg-mainBg cursor-pointer"
                                :class="{
                                    '!border-txt': params.id === item.id,
                                }"
                            >
                                <span
                                    v-show="item.recommend"
                                    class="absolute -right-1 -top-1 text-center w-5 h-4 text-xs text-white bg-gradient-to-b from-[#EC8B32] to-[#EC3232] rounded-[5px] rounded-bl-none"
                                >
                                    荐
                                </span>
                                <img
                                    class="w-[26px] h-[26px] rounded object-cover"
                                    v-lazy="item.icon"
                                    alt=""
                                />
                                <p
                                    class="text-center text-xs mt-1 text-gz line-clamp-1 break-all"
                                    :class="{
                                        'text-txt font-semibold': params.id === item.id,
                                    }"
                                >
                                    {{ item.payChannelName }}
                                </p>
                                <div class="pb-[5px] h-4 w-full overflow-hidden text-center">
                                    <p
                                        class="text-[#BF3D36] font-medium line-clamp-1 scale-90"
                                        v-show="item.discountStatus == 1"
                                    >
                                        {{ item.offerDescription }}
                                    </p>
                                </div>
                                <div
                                    v-if="false"
                                    class="h-[31.4px] w-[31.4px] absolute right-0 bottom-0"
                                    v-show="params.id === item.id"
                                    v-html="ic_select"
                                />
                            </li>
                        </ul>
                    </div>
                </div>
                <template v-if="payChannelRange">
                    <div class="bg-white mt-2 pt-1">
                        <PublicHead
                            title="充值金额"
                            class="px-3 pl-3 !text-mainText text-17px"
                            :border="false"
                            :right="false"
                            :show-left="false"
                        >
                            <template #right>
                                <div
                                    v-show="!user?.realName && current?.realName == 1"
                                    class="text-xs whitespace-nowrap text-[#3C83ED] flex items-center flex-shrink-0"
                                >
                                    <img class="w-[14px] h-[14px]" :src="ic_gantan" alt="" />
                                    <span class="text-sm ml-1 m-2">请先完成实名认证</span>
                                    <VanButton
                                        @click="showCard = !showCard"
                                        class="w-[54px] tlw_btn_linear h-6 border-0 rounded-[5px] tlw_btn_linear text-white text-sm"
                                    >
                                        去实名
                                    </VanButton>
                                </div>
                            </template>
                        </PublicHead>

                        <div class="px-3" v-if="current?.customAmount == 0">
                            <div
                                class="h-10 flex items-center text-[20px] border-b overflow-hidden pr-10px"
                            >
                                <VanField
                                    :center="true"
                                    type="number"
                                    :maxlength="8"
                                    :border="false"
                                    autocomplete="off"
                                    @focus="isFocus = true"
                                    :formatter="formatterNum"
                                    class="flex-1 !pl-0 text-[#909090] !py-0 placeholder:text-sm placeholder:text-[#8F8F8F] bg-transparent"
                                    :class="{ 'text-lg !font-OPPO_B': payAmounts[params.id] }"
                                    v-model="payAmounts[params.id]"
                                    placeholder="请输入充值金额"
                                    style="--van-field-placeholder-text-color: #909090"
                                />
                                <span
                                    class="text-sm text-[#909090] flex-shrink-0"
                                    v-show="!payAmounts[params.id]"
                                >
                                    {{
                                        `限额 ${addThousandSeparator(
                                            Number(current?.payChannelMin)
                                        )} ~ ${addThousandSeparator(
                                            Number(current?.payChannelMax)
                                        )}元`
                                    }}
                                </span>
                            </div>
                        </div>
                        <p
                            v-show="amountTip && isFocus"
                            class="text-tip translate-y-2 text-sm pl-10px font-medium"
                        >
                            {{ amountTip }}
                        </p>
                        <ul class="grid grid-cols-4 gap-2 px-3 py-4">
                            <li
                                :key="index"
                                @click="selectCoin(item)"
                                v-for="(item, index) in payChannelRange?.split(',')"
                                class="h-[30px] font-OPPO_B rounded-lg bg-[#F7F7F7] border border-[#F7F7F7] text-mainText text-center text-sm leading-[30px] relative"
                                :class="{
                                    '!border-txt font-medium': payAmounts[params.id] === item,
                                }"
                            >
                                {{ item }}
                            </li>
                        </ul>
                    </div>
                </template>
                <template v-if="!loading && subList?.[0]">
                    <div class="px-[20px] pb-8 mt-3">
                        <VanButton
                            :loading="payLoading"
                            :disabled="disabled || payLoading || !!amountTip"
                            class="h-11 w-full tlw_btn_linear text-white rounded-xl border-0"
                            @click="onlinePay()"
                        >
                            确认充值
                        </VanButton>
                        <ul
                            class="flex px-5 bg-mainBg flex-shrink-0 items-center pb-5 justify-evenly text-center w-full font-PFSCR mt-[30px]"
                        >
                            <li
                                class="flex-1 text-center relative before:absolute before:h-3 before:top-1/2 before:-translate-y-1/2 before:right-0 before:border-r before:border-r-txt_d before:rotate-12"
                            >
                                <VanButton
                                    class="border-0 text-txt text-sm border-r-txt_d"
                                    :disabled="loading"
                                    @click="router.push('/rechargeTutorial')"
                                    icon=""
                                >
                                    <template #icon>
                                        <img class="w-[18px] h-18px" :src="ic_recharge" alt="" />
                                    </template>
                                    充值教程
                                </VanButton>
                            </li>
                            <li class="flex-1 text-center">
                                <VanButton
                                    class="border-0 text-mainText text-sm border-r-txt_d"
                                    icon=""
                                    :disabled="loading"
                                    @click="toService"
                                >
                                    <template #icon>
                                        <i class="iconfont icon-erji mr-1 text-mainText"></i>
                                    </template>
                                    在线客服
                                </VanButton>
                            </li>
                        </ul>
                    </div>
                </template>
                <NoData :text="'暂无通道可用'" v-if="!loading && !subList?.[0]" />
            </SwiperBox>
        </div>
        <RechargePopup v-model="showPopup" ref="rechargePopupRef" />
        <CardAdd v-model="showCard" />
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { PayOnLineList, PayTypeList } from "@/api/pay/types";
import { useStore } from "@/stores";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import ic_refresh from "@/assets/svg/ic_refresh.svg?raw";
import ic_select from "@/assets/svg/ic_select.svg?raw";
import ic_funding from "@/assets/recharge/ic_funding.png";
import ic_gantan from "@/assets/recharge/ic_gantan.png";
import ic_recharge from "@/assets/recharge/ic_recharge.png";

import type { IofflinePay, IonlinePay, IpayOnLineList } from "@/api/pay/interface";
import type { RechargePopupRef, SwiperRef } from "@/components/types";
import { ellipsis, openLink, toService } from "@/utils";
import { showFailToast } from "vant";
import { storeToRefs } from "pinia";
import { formatterCoin, formatterNum } from "@/utils/validate";
import { useAsync } from "@/stores/useAsync";
import NavBar from "@/components/NavBar.vue";
import SwiperBox from "@/components/SwiperBox.vue";
import PublicHead from "@/components/PublicHead.vue";
import RechargePopup from "@/components/RechargePopup.vue";
import NoData from "@/components/NoData.vue";
import CardAdd from "@/components/Account/CardAdd.vue";
import { addThousandSeparator } from "@/utils/match";

const { setLoading, setDialogTip } = useStore();
const { loading, user } = storeToRefs(useStore());
const active = ref<number>(0);
const list = ref<PayTypeList[]>();
const subList = ref<PayOnLineList[]>();
const router = useRouter();
const swiperRef = ref<SwiperRef>();
const payLoading = ref<boolean>();
const showPopup = ref<boolean>(false);
const payChannelRange = ref<string>("");
const rechargePopupRef = ref<RechargePopupRef>();
const isFocus = ref<boolean>(false);

const { balance } = storeToRefs(useAsync());
const animate = ref<boolean | string>();
const showCard = ref<boolean>(false);

interface IpayAmounts {
    [name: string]: string;
}

const payOnLineParams = ref<IpayOnLineList>({
    payTypeCode: "",
});

const payAmounts = ref<IpayAmounts>({});

const params = ref<IonlinePay>({
    id: "",
});

const offlineParams = ref<IofflinePay>({
    coin: "",
    payChannelType: "",
    payType: "",
});

const disabled = computed(() => !payAmounts.value[params.value.id]); // 判断立即充值按钮是否禁用

const current = computed(() => subList.value?.[active.value]);

const amountTip = computed(() => {
    const value = payAmounts.value[params.value.id];
    const { payChannelMin, payChannelMax } = current.value!;
    const min = Number(payChannelMin || 0);
    const max = Number(payChannelMax || 0);
    if (!value.trim()) return "*请输入整数金额";
    if (+value < +min) {
        return `单笔最小存款金额:${+min.toFixed(2)}`;
    }
    if (+value > +max) {
        return `单笔最大存款金额:${+max.toFixed(2)}`;
    }
    return;
});

const allQueryBalance = async () => {
    animate.value = true;
    await useAsync()?.allQueryBalance();
    animate.value = "over";
};

const animationiteration = () => {
    if (animate.value === "over") {
        animate.value = false;
    }
};

const selectActive = (item: PayOnLineList, index: number) => {
    // 选择充值方式
    isFocus.value = false;
    params.value.id = item.id;
    active.value = index;
    payChannelRange.value = item.payChannelRange;
    swiperRef.value?.update?.();
};

const selectCoin = (item: string) => {
    // 选择充值金额
    payAmounts.value[params.value.id] = item;
    offlineParams.value.coin = item;
};

const payTypeList = async () => {
    // 支付列表
    setLoading(true);
    const res = await API.payTypeList({ queryType: "1" });
    setLoading(false);
    if (res.code === 0) {
        list.value = res.data!;
        const item = res.data?.[0];
        payOnLineParams.value.payTypeCode = item?.payType!;
    }
    if (payOnLineParams.value.payTypeCode) payOnLineList();
};

const payOnLineList = async () => {
    setLoading(true);
    const res = await API.payOnLineList(payOnLineParams.value);
    setLoading(false);
    payAmounts.value = {};
    if (res.code === 0) {
        subList.value = res.data!;
        const item = res.data?.[0];
        if (item) {
            params.value.id = item?.id;
            payChannelRange.value = item.payChannelRange;
            payAmounts.value = subList.value?.reduce((prev: any, item) => {
                prev[item.id] = "";
                return prev;
            }, {});
        }
    }
    swiperRef.value?.update?.();
};

const onlinePay = async () => {
    // 在线支付
    if (!user.value?.realName && current.value?.realName == 1) {
        return setDialogTip(
            true,
            "去实名",
            "尚未实名,前往添加银行卡绑定实名",
            () => (showCard.value = !showCard.value)
        );
    }
    const payAmount = payAmounts.value[params.value.id];
    const { payChannelMin, payChannelMax } = current.value!;
    if (!payAmount) return showFailToast("金额不能为空");
    if (+payAmount < +payChannelMin! || +payAmount > +payChannelMax!) {
        showFailToast(`充值金额为 ${payChannelMin} - ${payChannelMax} 之间`);
        return;
    }
    setLoading(true);
    payLoading.value = true;
    const res = await API.onlinePay({
        ...params.value,
        payAmount: payAmount,
    });
    setLoading(false);
    payLoading.value = false;
    if (res.code === 0) {
        res.data?.url && openLink(res.data?.url);
    }
};

const offlinePay = async () => {
    // 离线支付
    // 后端说二期实现 O(∩_∩)O哈哈~
    payLoading.value = true;
    const res = await API.offlinePay(offlineParams.value);
    payLoading.value = false;
    if (res.code === 0) {
        showPopup.value = true;
        rechargePopupRef.value?.start?.();
    }
};

payOnLineList();
</script>
