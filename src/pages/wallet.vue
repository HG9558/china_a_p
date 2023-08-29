<!-- 我的钱包 -->
<template>
    <div class="h-full w-full bg-white flex flex-col tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '我的钱包' }" />
        <div
            class="flex-1 flex flex-col px-10px overflow-hidden rounded-t-20px z-0 relative bg-mainBg"
        >
            <div class="bg-white rounded-20px mt-10px">
                <div class="flex h-11 items-center justify-between px-10px">
                    <span class="text-15px font-medium">进入场馆时自动转入金额</span>
                    <van-switch
                        :size="20"
                        active-color="#4b6cdb"
                        :model-value="autoTransfer"
                        :disabled="switchLoading"
                        :loading="switchLoading"
                        @change="switchTransfer"
                    />
                </div>
                <div class="rounded-xl px-10px relative">
                    <div
                        class="flex h-[75px] items-center justify-between border-y border-y-mainBg"
                    >
                        <div class="flex flex-col flex-1 overflow-hidden text-mainText font-medium">
                            <p class="text-sm mr-1">钱包总额（元）</p>
                            <div class="flex items-center text-17px flex-1">
                                ¥
                                <p class="pl-1 font-OPPO_B line-clamp-1 break-all mr-1">
                                    {{
                                        animate
                                            ? ellipsis(balance?.sumCoin)
                                            : balance?.sumCoin || "0.00"
                                    }}
                                </p>
                                <i
                                    v-html="ic_refresh"
                                    class="text-txt w-4 h-4 flex-shrink-0"
                                    :class="{
                                        'pointer-events-none opacity-50': !!animate,
                                        'animate-spin': animate,
                                    }"
                                    @click="allQueryBalance(2)"
                                    @animationiteration="animationiteration"
                                />
                            </div>
                        </div>
                        <ul class="flex-1 overflow-hidden flex items-center justify-end">
                            <li
                                :key="index"
                                v-for="(item, index) in pList"
                                @click="toPage(item)"
                                class="mr-3 last-of-type:mr-0 text-center flex flex-col active:scale-90 transition-all"
                            >
                                <img class="w-10 h-10" :src="item.icon" alt="" />
                                <span class="text-xs text-mainText -mt-1">
                                    {{ item.label }}
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="flex items-center justify-between py-15px text-mainText">
                        <div
                            class="flex flex-1 overflow-hidden flex-col items-center relative before:absolute before:top-1/2 before:-translate-y-1/2 before:right-0 before:h-[22px] before:border-r before:border-r-mainBg"
                        >
                            <span class="text-xs">中心钱包</span>
                            <div class="flex items-center flex-1">
                                <p class="pl-1 line-clamp-1 break-all font-OPPO_B">
                                    {{
                                        animate ? ellipsis(balance?.coin) : balance?.coin || "0.00"
                                    }}
                                </p>
                            </div>
                        </div>
                        <div
                            class="flex flex-1 overflow-hidden flex-col items-center relative before:absolute before:top-1/2 before:-translate-y-1/2 before:right-0 before:h-[22px] before:border-r before:border-r-mainBg"
                        >
                            <span class="text-xs">游戏钱包</span>
                            <div class="flex items-center flex-1">
                                <p class="ml-1 line-clamp-1 break-all font-OPPO_B">
                                    {{
                                        animate
                                            ? ellipsis(balance?.gameCoin)
                                            : balance?.gameCoin || "0.00"
                                    }}
                                </p>
                            </div>
                        </div>
                        <div class="flex-1 flex flex-shrink-0 items-center justify-center">
                            <VanButton
                                class="text-xs px-10px h-7 border-0 tlw_btn_linear text-white rounded-full whitespace-nowrap"
                                :disabled="!!recycleAnimate"
                                @click="allCoinDown(1)"
                            >
                                {{ recycleLoading ? "正在回收..." : "一键回收" }}
                                <template #icon>
                                    <img
                                        class="w-[14px] h-[14px]"
                                        :class="{
                                            'animate-spin':
                                                recycleAnimate && recycleAnimate != 'over',
                                        }"
                                        :src="ic_refresh_1"
                                        alt=""
                                    />
                                </template>
                            </VanButton>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pt-1 mt-10px flex-1 overflow-hidden rounded-t-20px bg-white">
                <SwiperBox ref="swiperRef">
                    <div class="relative z-10">
                        <ul class="grid grid-cols-4 text-txt_d">
                            <li
                                class="h-[85px] flex flex-col text-center justify-center border-b border-b-mainBg relative before:absolute before:top-1/2 before:-translate-y-1/2 before:right-0 before:h-[13px] before:border-r before:border-r-mainBg"
                                :class="{ 'before:!h-0': (index + 1) % 4 == 0 }"
                                @click="item.status == 1 && selectItem(item)"
                                v-for="(item, index) in gameList"
                                :key="index"
                            >
                                <div class="text-xs flex items-center justify-center">
                                    <span class="line-clamp-1">
                                        {{ item.walletName }}
                                    </span>
                                    <div
                                        v-show="item.activityUserStatus"
                                        class="w-3 h-3 flex-shrink-0"
                                        v-html="ic_gantan"
                                    />
                                </div>
                                <p
                                    class="text-sm font-medium"
                                    v-if="/(0|2)/.test(`${item.status}`)"
                                >
                                    --
                                </p>
                                <p
                                    v-else
                                    class="text-sm font-OPPO_B line-clamp-1 break-all"
                                    :class="{ 'text-mainText': Number(item.coin) > 0 }"
                                >
                                    {{ item.coin || "0.00" }}
                                </p>
                                <div
                                    class="flex items-center justify-center"
                                    v-if="item.activityUserStatus == 3"
                                >
                                    <p
                                        class="text-xs px-[5px] text-mainText scale-90 h-[18px] bg-mainBg rounded-10px"
                                    >
                                        参与活动中
                                    </p>
                                </div>
                                <div
                                    class="flex items-center justify-center"
                                    v-else-if="/(0|2)/.test(`${item.status}`)"
                                >
                                    <p
                                        class="text-xs px-[5px] text-mainText scale-90 h-[18px] bg-mainBg rounded-10px"
                                    >
                                        维护中
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <NoData class="mt-5" text="暂无钱包数据" v-show="!loading && !gameList?.[0]" />
                </SwiperBox>
            </div>
        </div>
        <Transfer
            v-model="showTransfer"
            :list="gameList"
            :active="activeItem"
            :allQueryBalance="allQueryBalance"
        />
        <van-dialog v-model:show="showTip" confirmButtonText="我知道了">
            <template #title>
                <span class="text-[17px] font-normal">流水详情</span>
            </template>
            <div class="text-sm text-txt_d mt-10px pb-5 px-5">
                <p class="flex justify-between">
                    <span>活动名称</span>
                    <span class="flex-shrink-0">
                        {{ activity?.title }}
                    </span>
                </p>
                <p class="flex mt-1 justify-between">
                    <span>所需流水</span>
                    <span class="flex-shrink-0">
                        {{ activity?.targetAmount }}
                    </span>
                </p>
                <p class="flex mt-1 justify-between">
                    <span>已完成流水</span>
                    <span class="flex-shrink-0">
                        {{ activity?.requireCoinFulfill }}
                    </span>
                </p>

                <p class="text-xs mt-4 leading-5">
                    1.完成场馆活动流水后，可将场馆钱包中的金额转出至中心钱包。<br />
                    2.场馆活动流水未完成前，转账将导致场馆活动流水要求增加，且未完成场馆活动流水无法将场馆钱包中的金额转出。<br />
                    3.活动场馆中的流水不与其他活动流水重复计算。
                </p>
            </div>
        </van-dialog>
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { PlatList, AList } from "@/api/platform/types";
import type { SwiperRef } from "@/components/types";
import { useStore } from "@/stores";
import { useAsync } from "@/stores/useAsync";
import { ellipsis, toRecharge } from "@/utils";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import ic_recharge from "@/assets/home/ic_recharge.png";
import ic_w_money from "@/assets/home/ic_w_money.png";
import ic_transfer from "@/assets/home/ic_transfer.png";
import ic_refresh from "@/assets/svg/ic_refresh.svg?raw";
import ic_refresh_1 from "@/assets/icon/ic_refresh_1.png";
import ic_gantan from "@/assets/svg/ic_gantan.svg?raw";
import { showFailToast, showSuccessToast, showToast } from "vant";
import NavBar from "@/components/NavBar.vue";
import SwiperBox from "@/components/SwiperBox.vue";
import NoData from "@/components/NoData.vue";
import Transfer from "@/components/Transfer.vue";

const { user, loading, oneTime } = storeToRefs(useStore());
const { balance } = storeToRefs(useAsync());
const { userProfile } = useAsync();
const switchLoading = ref<boolean>();
const autoTransfer = ref<boolean>();
const activeItem = ref<Partial<PlatList>>({});
const { setLoading, setDialogTip, oneTimeStart } = useStore();
const animate = ref<string | boolean>();
const gameList = ref<Partial<PlatList>[]>();
const swiperRef = ref<SwiperRef>();
const route = useRoute();
const path = ref<string>("");
const recycleLoading = ref<boolean>(false); //loading
const recycleAnimate = ref<boolean | string>(); //动画
const showTransfer = ref<boolean>(false);
const router = useRouter();
const showTip = ref<boolean>(false);
const activity = ref<Partial<PlatList>>();

path.value = route.path;

watch(
    () => user.value?.autoTransfer,
    n => {
        autoTransfer.value = !!n;
    },
    { immediate: true }
);

interface IpList {
    icon: any;
    label: string;
    to: string;
}

const pList = ref<IpList[]>([
    { icon: ic_recharge, label: "充值", to: "/recharge" },
    { icon: ic_w_money, label: "提现", to: "/withdraw" },
    { icon: ic_transfer, label: "转账", to: "/transfer" },
]);

const toPage = (item: IpList) => {
    switch (item.to) {
        case "/transfer":
            if (!gameList.value?.[0]) return showToast("暂无钱包数据");
            activeItem.value = {};
            showTransfer.value = !showTransfer.value;
            break;
        case "/recharge":
            if (!user.value?.mobile) {
                toRecharge();
                return;
            }
            router.push(item.to);
            break;
        default:
            router.push(item.to);
            break;
    }
};

const update = () => {
    // 滚动更新
    swiperRef.value?.update?.();
};

const animationiteration = async () => {
    // 刷新动画处理
    if (animate.value === "over") {
        animate.value = false;
    }
    if (recycleAnimate.value === "over") {
        recycleAnimate.value = false;
        recycleLoading.value = false;
    }
};

const platList = async () => {
    // 平台列表
    setLoading(true);
    const res = await API.platList();
    if (res.code === 0) {
        gameList.value = res.data!;
        update();
        allQueryBalance();
    }
};

const selectItem = async (item: Partial<PlatList>) => {
    if (item.activityUserStatus == 3) {
        setLoading(true);
        const res = await getApplyPlatPromoActivityList();
        setLoading(false);
        if (res.code == 0) {
            if (res.data?.length) {
                showTip.value = true;
                activity.value = item!;
            }
        }
        return;
    }
    activeItem.value = item;
    showTransfer.value = !showTransfer.value;
};

const allCoinDown = async (status: number) => {
    // 三方游戏平台->一键回收
    if (+balance.value?.gameCoin! <= 0) return showSuccessToast("已全部回收");
    if (oneTime.value) return showFailToast("操作过于频繁,请稍后重试");
    recycleLoading.value = true;
    recycleAnimate.value = true;
    const res = await useAsync()?.allCoinDown();
    switch (res?.code) {
        case 0:
            allQueryBalance(status);
            oneTimeStart();
            break;
        default:
            recycleAnimate.value = "over";
            break;
    }
};

const allQueryBalance = async (status?: number) => {
    // 查詢全部三方游戏平台餘額
    const { queryUserWallet } = useAsync();
    animate.value = true;
    const res = await (status == 2 ? useAsync()?.allQueryBalance() : queryUserWallet());
    animate.value = "over";
    recycleAnimate.value = "over";
    let data;
    if (res.code === 0) {
        data = res.data;
        data?.list?.forEach((item: AList) => {
            gameList.value?.find((v, i) => {
                if (item?.id == +v.id!) {
                    gameList.value![i] = { ...gameList.value![i], ...item };
                    return true;
                }
            });
        });
        await getApplyPlatPromoActivityList();
        gameList.value?.sort((a, b) => {
            let coinA = parseFloat(a.coin!);
            let coinB = parseFloat(b.coin!);
            if (coinA === coinB) {
                let nameA = a.name!.toUpperCase();
                let nameB = b.name!.toUpperCase();
                if (nameA < nameB) return -1;
                else if (nameA > nameB) return 1;
                else return 0;
            } else return coinB - coinA;
        });
        if (status == 1) showSuccessToast("回收成功");
    }
    setLoading(false);
    return gameList.value;
};

const resetAutoTransfer = async () => {
    switchLoading.value = true;
    const _autoTransfer = user.value?.autoTransfer === 0 ? 1 : 0;
    const res = await API.resetAutoTransfer({ autoTransfer: _autoTransfer });
    if (res.code === 0) {
        const result = await userProfile();
        switchLoading.value = false;
        if (result?.code === 0) {
            autoTransfer.value = !!result.data?.autoTransfer;
        }
    }
};

const getApplyPlatPromoActivityList = async () => {
    // 取得會員參加活動清單
    const res = await useAsync().getApplyPlatPromoActivityList();
    if (res.code == 0) {
        res?.data?.forEach(item => {
            gameList.value?.find((v, i) => {
                if (item?.platListId == +v.id!) {
                    gameList.value![i] = { ...gameList.value![i], ...item, activityUserStatus: 3 };
                    return true;
                }
            });
        });
        if (!res?.data?.[0]) {
            gameList.value?.forEach(item => {
                if (item.activityUserStatus == 3) {
                    item.activityUserStatus = 1;
                }
            });
        }
    }
    return res;
};

const switchTransfer = async () => {
    if (switchLoading.value) return;
    if (autoTransfer.value) {
        setDialogTip(
            true,
            "温馨提示",
            "关闭自动免转后，您将需要手动操作各个游戏钱包的余额，确定关闭自动免转？",
            async () => {
                resetAutoTransfer();
            }
        );
        return;
    }
    resetAutoTransfer();
};

platList();
</script>
