<!-- 场馆活动 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg" :style="{ paddingTop: `${top || 0}px` }">
        <NavBar transparent class="flex-shrink-0" :nav-bar-props="{ title: info?.title }" />
        <div
            class="flex-1 overflow-hidden bg-[url('@/assets/activity/activity_bg.png')] bg-[center_top] z-0 overflow-y-auto"
        >
            <div class="relative pb-[120.80%] bg-[#E0E2E6] overflow-hidden mb-10px">
                <img
                    v-if="info?.mobileDetailPic"
                    class="object-cover absolute top-0 left-0 w-full h-full"
                    v-lazy="lazy(info?.mobileDetailPic)"
                    alt=""
                />
            </div>
            <div class="px-10px">
                <div class="rounded-20px">
                    <div
                        class="relative pb-[21.97%] bg-[url('@/assets/activity/ic_activity_bg.png')] bg-[length:100%] bg-no-repeat"
                    >
                        <div class="absolute top-0 left-0 w-full h-full flex items-center px-5">
                            <div
                                class="flex flex-col flex-1 text-sm text-[#875628]"
                                :class="{ 'pointer-events-none': !!animate }"
                            >
                                <p class="font-medium">中心钱包（元）</p>
                                <div
                                    class="flex items-center text-17px mt-10px"
                                    @click="allQueryBalance()"
                                >
                                    <span class="mr-1"> ¥ </span>
                                    <p class="mr-1 font-OPPO_B">
                                        {{
                                            animate
                                                ? ellipsis(balance?.coin)
                                                : balance?.coin || "0.00"
                                        }}
                                    </p>
                                    <i
                                        class="iconfont w-4 h-4"
                                        v-html="ic_refresh"
                                        :class="{
                                            'animate-spin': animate,
                                            'opacity-50': !!animate,
                                        }"
                                        @animationiteration="animationiteration"
                                    ></i>
                                </div>
                            </div>
                            <VanButton
                                :disabled="!!recycleLoading"
                                class="bg-[#966D47] flex-shrink-0 border-0 h-[28px] rounded-full text-xs text-white font-medium"
                                @click="allCoinDown"
                            >
                                {{ recycleLoading ? "正在回收..." : "一键回收" }}
                                <template #icon>
                                    <VanLoading v-show="recycleLoading" :size="20" />
                                </template>
                            </VanButton>
                        </div>
                    </div>
                </div>
                <div
                    class="rounded-20px bg-white relative min-h-[356px] mt-10px bg-[url('@/assets/activity/ic_venue_bg.png')] bg-[length:100%] bg-no-repeat sm:rounded-t-[32px]"
                >
                    <img class="absolute w-[73px] -top-1 right-[28px]" :src="ic_top_right" alt="" />
                    <div
                        class="top-0 left-0 w-full h-full px-10px pt-[20px] sm:flex sm:flex-col sm:justify-evenly pb-10px"
                    >
                        <img class="w-[38%]" :src="ic_text" alt="" />
                        <div class="mt-3 mb-4">
                            <template v-if="info?.bonusType == 1">
                                <p
                                    v-if="Number(info?.scoreLevelList?.length) > 1"
                                    class="inline-block bg-txt text-white px-2 text-xs rounded-20px py-2"
                                >
                                    <!-- 多档位 -->
                                    存{{ info?.scoreLevelList?.[0]?.amount || "0" }}元即送{{
                                        info?.scoreLevelList?.[0]?.percentage || "0"
                                    }}%,最高送{{ info?.scoreLevelList?.[0]?.limitMax || "0" }}元,{{
                                        info?.scoreLevelList?.[0]?.multiple || "0"
                                    }}倍流水,存的越多送的越多
                                </p>
                                <p
                                    v-else-if="info?.scoreLevelList"
                                    class="inline-block bg-txt text-white px-2 text-xs rounded-20px py-2"
                                >
                                    存{{ info?.scoreLevelList?.[0]?.amount || "0" }}元及以上送{{
                                        info?.scoreLevelList?.[0]?.percentage || "0"
                                    }}%，最高送{{
                                        info?.scoreLevelList?.[0]?.limitMax || "0"
                                    }}元，{{ info?.scoreLevelList?.[0]?.multiple || "0" }}倍流水
                                </p>
                            </template>
                            <template v-if="info?.bonusType == 2">
                                <p
                                    v-if="Number(info?.scoreLevelList?.length) > 1"
                                    class="inline-block bg-txt text-white px-2 text-xs rounded-20px py-2"
                                >
                                    <!-- 多档位 -->
                                    存{{ info?.scoreLevelList?.[0]?.amount || "0" }}元即送{{
                                        info?.scoreLevelList?.[0]?.bonus || "0"
                                    }}元,{{
                                        info?.scoreLevelList?.[0]?.multiple || "0"
                                    }}倍流水,存的越多送的越多
                                </p>
                                <p
                                    v-else-if="info?.scoreLevelList"
                                    class="inline-block bg-txt text-white px-2 text-xs rounded-20px py-2"
                                >
                                    存{{ info?.scoreLevelList?.[0]?.amount || "0" }}元及以上送{{
                                        info?.scoreLevelList?.[0]?.bonus || "0"
                                    }}元，{{ info?.scoreLevelList?.[0]?.multiple || "0" }}倍流水
                                </p>
                            </template>
                        </div>
                        <div
                            class="h-[38px] border border-[#BAC3D3] rounded-xl flex items-center justify-between pl-10px"
                        >
                            <span class="text-13px font-medium mr-10px line-clamp-1">
                                {{ active?.name || "选择场馆" }}
                            </span>
                            <VanButton
                                :icon-position="'right'"
                                class="border-0 h-full"
                                @click="setShowGameList"
                            >
                                请选择
                                <template #icon>
                                    <i
                                        class="icon-arrow-down-bold inline-block transition-all"
                                        :class="{ 'rotate-180': showGameList }"
                                    ></i>
                                </template>
                            </VanButton>
                        </div>
                        <div
                            class="h-[38px] border border-[#BAC3D3] rounded-xl mt-3 flex items-center pl-10px w-full overflow-x-hidden"
                        >
                            <span class="text-13px font-medium mr-10px whitespace-nowrap">
                                申请金额
                            </span>
                            <van-field
                                type="number"
                                :maxlength="/(.)/.test(applyAmount) ? 11 : 8"
                                :formatter="formatterNum"
                                class="text-xs font-OPPO h-full !py-0 flex-1 bg-transparent"
                                :class="{
                                    '!text-15px !text-mainText !font-OPPO_B': applyAmount.length,
                                }"
                                autocomplete="off"
                                v-model="applyAmount"
                                @focus="isFocus = true"
                                @blur="blur"
                                placeholder="请输入金额"
                            />
                        </div>
                        <p
                            v-if="isFocus && Number(balance?.coin) <= 0"
                            class="mt text-13px mt-4 text-tip font-medium flex items-center"
                        >
                            中心钱包余额不足
                        </p>
                        <p
                            v-else
                            v-show="tip"
                            class="mt text-13px mt-4 text-tip font-medium flex items-center"
                        >
                            {{ tip }}
                        </p>
                        <div class="flex items-center mt-4">
                            <span class="text-13px mr-10px">可得红利</span>
                            <p class="font-OPPO_B text-17px text-tip">
                                ¥ {{ calcInfo?.applyBonus || "0.00" }}
                            </p>
                        </div>
                        <div class="flex items-center mt-10px">
                            <span class="text-13px mr-10px">流水要求</span>
                            <p class="font-OPPO_B text-17px">
                                ¥ {{ calcInfo?.statementAmount || "0.00" }}
                            </p>
                        </div>
                        <VanButton
                            :loading="loading"
                            @click="applyPromoActivity"
                            :disabled="disabled || loading || !!statusText || isFocus || !!tip"
                            class="h-[38px] mt-3 text-white font-medium text-sm w-full tlw_btn_linear border-0 rounded-xl"
                        >
                            {{ statusText || "立即参与" }}
                        </VanButton>
                        <p class="text-xs font-medium flex items-center mt-10px">
                            <span class="text-tip">温馨提示：</span>
                            <span class="text-gz">此活动仅可参加一次，不可重复</span>
                        </p>
                    </div>
                </div>
                <div
                    class="bg-white rounded-20px mt-10px border border-[#E5EBFF] shadow-[0px_4px_4px_0px rgba(102,133,192,0.05)]s"
                >
                    <div class="px-10px">
                        <div
                            class="border-b border-b-mainBg border-solid flex flex-col justify-evenly text-mainText text-sm font-medium"
                        >
                            <ActivityTitle title="活动内容" class="mt-5 mb-10px" />
                            <p class="text-sm whitespace-nowrap mb-2">
                                活动时间：{{
                                    info?.periodType == 0
                                        ? "长期活动"
                                        : `${formatTime(
                                              info?.activityStartTime || 0,
                                              "YYYY-MM-DD HH:mm"
                                          )} - ${formatTime(
                                              info?.activityEndTime || 0,
                                              "YYYY-MM-DD HH:mm"
                                          )}`
                                }}
                            </p>
                        </div>
                        <div class="rounded-xl border border-mainBg border-solid">
                            <ul class="h-11 flex rounded-t-xl overflow-hidden">
                                <li
                                    :key="index"
                                    v-for="(item, index) in list"
                                    class="flex items-center flex-1 flex-col justify-center text-white border-r border-r-white last-of-type:border-r-0 bg-txt text-sm font-medium text-center"
                                >
                                    <p>
                                        {{ item.title }}
                                    </p>
                                </li>
                            </ul>
                            <div
                                :key="index"
                                class="h-11 flex overflow-hidden text-center text-txt text-sm border-b border-b-mainBg last-of-type:border-b-0 font-OPPO_B"
                                v-for="(item, index) in info?.scoreLevelList"
                            >
                                <span class="flex-1 leading-[44px] border-r border-r-mainBg">
                                    ≥{{ item.amount }}
                                </span>
                                <span class="flex-1 leading-[44px] border-r border-r-mainBg">
                                    {{ info?.bonusType == 1 ? item.percentage : item.bonus }}
                                </span>
                                <span
                                    v-show="info?.bonusType == 1"
                                    class="flex-1 leading-[44px] border-r border-r-mainBg"
                                >
                                    {{ item.limitMax }}
                                </span>
                                <span class="flex-1 leading-[44px]"> {{ +item.multiple }}倍 </span>
                            </div>
                        </div>
                        <div class="text-gz text-sm font-medium leading-6 py-10px">
                            申请方式：请在此活动页面的下拉选项中，选择参加活动的场馆，并确认中心钱包的余额充足，输入金额点击立即参与即可。（参与前，请不要将申请金额转入场馆钱包）
                        </div>
                    </div>
                </div>
                <div
                    class="mt-10px bg-white px-10px pb-10px rounded-20px mb-10px border border-[#E5EBFF] shadow-[0px_4px_4px_0px rgba(102,133,192,0.05)]"
                >
                    <ActivityTitle title="活动规则" class="mt-5 mb-10px" />
                    <div
                        class="description text-sm text-gz leading-6 break-all whitespace-pre-line"
                        v-html="info?.detailText"
                    ></div>
                </div>
            </div>
        </div>
        <ActivityGameList
            v-if="platLists"
            v-model="showGameList"
            :list="platLists"
            :active="active"
            @submit="selectItem"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import ic_activity from "@/assets/logo/ic_activity.png";
import ic_top_right from "@/assets/activity/ic_top_right.png";
import ic_text from "@/assets/activity/ic_text.png";
import ic_refresh from "@/assets/svg/ic_refresh.svg?raw";
import { ellipsis, formatTime } from "@/utils";
import { PopoverPlacement, showFailToast, showSuccessToast, showToast } from "vant";
import { storeToRefs } from "pinia";
import { useStore } from "@/stores";
import { useAsync } from "@/stores/useAsync";
import NavBar from "@/components/NavBar.vue";
import { useApp } from "@/stores/useApp";
import { API } from "@/api/index";
import { useRoute } from "vue-router";
import ActivityGameList from "@/components/Activity/ActivityGameList.vue";
import ActivityTitle from "@/components/Activity/ActivityTitle.vue";
import {
    CalculateApplyPromoActivity,
    GameListDto,
    GetPromoActivity,
} from "@/api/promoActivity/types";
import { formatterCoin, formatterNum } from "@/utils/validate";

const list1 = ref([
    { title: "申请金额" },
    { title: "红利（%）" },
    { title: "红利上限" },
    { title: "流水倍数" },
]);
const list2 = ref([
    //2是固定金额
    { title: "活动金额" },
    { title: "赠送金额" },
    { title: "流水倍数" },
]);

// activityStatus 0敬请期待,1立即参与,2活动已结束,3暂未开放,4已參与
// haveApplied 活动已完成
// userApplyStatus 0暂未开放,1可申请

const placement = ref<PopoverPlacement>("top-end");
const { balance } = storeToRefs(useAsync());
const showPopover = ref<boolean>(false);
const active = ref<GameListDto>();
const animate = ref<boolean | string>();
const { token, oneTime, loading } = storeToRefs(useStore());
const { oneTimeStart, setLoading } = useStore();
const { top } = storeToRefs(useApp());
const info = ref<GetPromoActivity>();
const route = useRoute();
const applyAmount = ref<string>("");
const platLists = ref<GameListDto[]>();
const calcInfo = ref<CalculateApplyPromoActivity>();
const { user } = storeToRefs(useStore());
const isFocus = ref<boolean>(false);
const showGameList = ref<boolean>(false);
const recycleLoading = ref<boolean>(false); //一键回收

const lazy = computed(() => (src?: string) => ({
    src,
    error: ic_activity,
    loading: ic_activity,
}));

const list = computed(() => {
    switch (info?.value?.bonusType) {
        case 1:
            return list1.value;
        case 2:
            return list2.value;
        default:
            break;
    }
});

const statusText = computed(() => {
    switch (info.value?.activityStatus) {
        case 0:
            return "敬请期待";
        case 2:
            return "活动已结束";
        case 3:
            return "暂未开放";
        case 4:
            return "已参与";
        default:
            break;
    }
    if (info.value?.haveApplied) return "活动已完成";
    if (info.value?.userApplyStatus == 0) return "暂未开放";
    switch (active.value?.status) {
        case 0:
            return "场馆已停用";
        case 2:
            return "场馆维护中";
        case 3:
            return "该场馆已参与活动";
        default:
            break;
    }
});

const tip = computed(() => {
    const scoreLevelListLength = info.value?.scoreLevelList.length;
    const min = info.value?.scoreLevelList?.[0]?.amount;
    const max = info.value?.scoreLevelList?.[scoreLevelListLength! - 1]?.amount;
    if (+applyAmount.value && !isFocus.value && +applyAmount.value < +min!) {
        return `最低申请金额为${min}元`;
    }
    if (+balance.value?.coin! < +applyAmount.value) {
        applyAmount.value = Number(balance.value?.coin)?.toFixed(0);
        return;
    }
    if (+applyAmount.value && !isFocus.value && +applyAmount.value > +max!) {
        return `最高申请金额为${max}元`;
    }
    if (info.value?.bonusType == 1) {
        if (+applyAmount.value && !isFocus.value && +balance.value?.coin! < +min!) {
            return `最低申请金额为${min}元`;
        }
    }
    if (info.value?.bonusType == 2) {
        if (+balance.value?.coin! < +min!) return `最低申请金额为${min}元`;
    }
});

const scoreArr = computed(() => {
    const data = info?.value?.scoreLevelList?.map(item => +item.amount)?.sort((a, b) => b - a);
    return data;
});

const matchNumber = (arr: number[]) => {
    for (const num of arr) {
        if (+applyAmount.value == num) return;
        if (+balance.value?.coin! > num && +applyAmount.value >= num) {
            showToast(`当前最高申请金额为${num}`);
            applyAmount.value = num?.toFixed(0);
            return num;
        }
    }
};

const disabled = computed(() => {
    if (!active.value?.id) return true;
    if (!applyAmount.value) return true;
    if (/(0|2|3)/.test(`${active.value.status}`)) return true;
    return false;
});

const blur = () => {
    isFocus.value = false;
    if (scoreArr.value && info.value?.bonusType == 2) matchNumber(scoreArr.value!);
    if (active.value?.name && applyAmount.value) calculateApplyPromoActivity();
};

const setShowGameList = () => {
    if (!info.value?.gameListDto?.length) return showFailToast("暂无场馆");
    showGameList.value = true;
};

const selectItem = async (item: GameListDto) => {
    active.value = item;
    showPopover.value = false;
    // await checkApplyPlatPromoActivity();
    if (applyAmount.value) calculateApplyPromoActivity();
    if (scoreArr.value && info.value?.bonusType == 2) matchNumber(scoreArr.value!);
};

const allCoinDown = async () => {
    // 三方游戏平台->一键回收
    if (+balance.value?.gameCoin! <= 0) return showSuccessToast("已全部回收");
    if (oneTime.value) return showFailToast("操作过于频繁,请稍后重试");
    recycleLoading.value = true;
    const res = await useAsync()?.allCoinDown();
    recycleLoading.value = false;
    switch (res?.code) {
        case 0:
            allQueryBalance();
            oneTimeStart();
            break;
        default:
            animate.value = "over";
            break;
    }
};

const allQueryBalance = async () => {
    animate.value = true;
    await useAsync()?.allQueryBalance();
    animate.value = "over";
};

const animationiteration = async () => {
    if (animate.value === "over") {
        animate.value = false;
    }
};

const getPromoActivity = async () => {
    setLoading(true);
    const res = await API.getPromoActivity({ type: 1, id: route.query?.id as string });
    setLoading(false);
    if (res.code == 0) {
        info.value = res.data!;
        platLists.value = res.data?.gameListDto;
        if (!res.data) showFailToast("暂无此活动");
    }
};

const applyPromoActivity = async () => {
    if (Number(balance.value?.coin) <= 0) return showFailToast("中心钱包余额不足");
    if (!active.value?.id) return showFailToast("请选择场馆");
    if (!applyAmount.value) return showFailToast("申请金额不能为空");
    // await calculateApplyPromoActivity();
    setLoading(true);
    const res = await API.applyPromoActivity({
        id: route.query?.id as string,
        gameListId: active.value?.id!,
        applyAmount: applyAmount.value,
    });
    setLoading(false);
    if (res.code == 0) {
        res.msg && showSuccessToast(res.msg);
        active.value = undefined;
        applyAmount.value = "";
        if (typeof calcInfo.value == "object") {
            Object.keys(calcInfo.value)?.forEach(item => (calcInfo.value![item] = ""));
        }
        getPromoActivity();
        useAsync()?.queryUserWallet();
    }
};

const checkApplyPlatPromoActivity = async () => {
    //  檢查是否申首存場館优惠活动
    setLoading(true);
    const res = await API.checkApplyPlatPromoActivity({
        platListId: +active.value?.id!,
        uid: user.value?.id!,
    });
    setLoading(false);
    if (res.code === 0) {
        console.log(res.data);
    }
    return res;
};

const calculateApplyPromoActivity = async () => {
    if (Number(balance.value?.coin) <= 0) return showFailToast("中心钱包余额不足");
    setLoading(true);
    const res = await API.calculateApplyPromoActivity({
        id: route.query?.id as string,
        gameListId: active.value?.id!,
        applyAmount: applyAmount.value,
    });
    isFocus.value = false;
    setLoading(false);
    if (res.code === 0) {
        calcInfo.value = res.data!;
    }
    return res;
};

getPromoActivity();
if (token.value) useAsync()?.queryUserWallet();
</script>

<style lang="scss" scoped>
::v-deep(.description) {
    img,
    video {
        margin: 0 auto;
    }
}
</style>
