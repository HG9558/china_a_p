<!-- 首页 我的 -->
<template>
    <div class="h-full bg-mainBg flex flex-col tlw_top_bg bg-[center_top_-32%] relative">
        <div
            class="min-h-[70px] z-10 sticky top-0 px-4 flex items-center justify-between"
            :class="{ 'h-16': token }"
        >
            <div
                class="h-full flex flex-1 overflow-hidden items-center"
                @click="router.push('/userInfo')"
            >
                <div class="w-12 h-12 mr-10px relative border border-white rounded-full">
                    <img
                        class="w-[43px] h-[43px] border border-txt absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                        v-lazy="lazyAvatar(user?.avatar)"
                        alt=""
                    />
                </div>
                <div class="text-white h-full flex flex-col justify-center flex-1 overflow-hidden">
                    <template v-if="token">
                        <div class="flex items-center overflow-hidden">
                            <p class="text-15px font-medium mr-2 line-clamp-1 max-w-[90%]">
                                {{ user?.nickname || user?.username }}
                            </p>
                            <img class="w-[14px] h-[14px]" :src="ic_edit" alt="" />
                        </div>
                        <p class="text-xs line-clamp-1 flex items-center opacity-70">
                            这是您成为{{ NAME }}会员的第
                            <span class="font-OPPO">
                                {{ user?.days || 0 }}
                            </span>
                            天
                        </p>
                    </template>
                    <template v-else>
                        <span class="text-sm font-medium">立即登录/注册</span>
                        <p class="text-xs font-PFSCS opacity-70 mt-[2px]">抢先体验{{ APP_NAME }}</p>
                    </template>
                </div>
            </div>
            <div class="grid items-center grid-cols-[24px_24px] gap-10px">
                <i class="icon-erji text-lg text-white" @click="toService()" />
                <i
                    class="icon-shezhi text-2xl text-white"
                    @click="toPage({ title: '', to: '/setting' })"
                />
            </div>
        </div>
        <div class="flex-1 overflow-hidden flex flex-col">
            <div class="px-10px">
                <div
                    class="relative bg-center bg-contain"
                    :class="{ ic_login: token, ic_no_login: !token }"
                >
                    <div
                        v-if="token"
                        class="w-[76px] h-[21px] absolute -right-1 top-3 bg-[url('@/assets/profile/but_vip.png')] bg-[length:100%] bg-no-repeat"
                    ></div>
                    <div class="absolute top-0 h-full w-full flex flex-col justify-evenly">
                        <div class="relative" :class="{ '!h-[87px]': !token }">
                            <div
                                v-if="token"
                                class="h-full flex flex-col items-center px-10px relative -translate-y-1"
                                @click="toPage({ title: '', to: '/vip' })"
                            >
                                <p
                                    class="linear h-[22px] font-medium leading-[22px] text-txt absolute top-4 left-0 px-4 text-sm"
                                >
                                    成长值
                                    <span class="text-sm font-DINAlternateBold font-normal">
                                        {{ vipInfo?.score || "0.00" }}/
                                    </span>
                                    <span
                                        class="text-xs font-DINAlternateBold -ml-[2px] font-normal text-[#8C5028]"
                                    >
                                        {{ vipInfo?.upScore || "0.00" }}
                                    </span>
                                </p>
                                <div class="flex items-center w-full pt-10">
                                    <div
                                        class="text-sm flex-1 text-main mx-2 sm:mr-9 relative translate-y-1"
                                    >
                                        <div
                                            class="bg-[url('@/assets/svg/ic_progress_bg.svg')] bg-repeat-x rounded-full"
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
                                    <div class="flex items-end h-[23px]">
                                        <img
                                            class="w-8 h-[23px] flex-shrink-0"
                                            v-if="typeof user?.levelId == 'number'"
                                            :src="
                                                left_vips(
                                                    user?.levelId == 10
                                                        ? user?.levelId
                                                        : user?.levelId + 1
                                                )
                                            "
                                            alt=""
                                        />
                                        <img
                                            class="min-w-[32px] h-[21px] flex-shrink-0 -ml-[2px] translate-y-[2px]"
                                            v-if="typeof user?.levelId == 'number'"
                                            :src="
                                                right_vips(
                                                    user?.levelId == 10
                                                        ? user?.levelId
                                                        : user?.levelId + 1
                                                )
                                            "
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <ul class="flex w-full justify-evenly mt-10px">
                                    <li
                                        :key="index"
                                        v-for="(item, index) in growings"
                                        class="text-[#495FCD] text-xs whitespace-nowrap flex items-center justify-center flex-1"
                                    >
                                        <div
                                            class="w-3 h-3 object-cover mr-1"
                                            v-html="ic_blue_300"
                                        />

                                        <span class="text-xs">
                                            {{ item }}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div
                                v-else
                                class="flex flex-col justify-evenly h-full"
                                @click="router.push('/login')"
                            >
                                <div class="flex items-center justify-between ml-10px">
                                    <div class="flex items-center">
                                        <img
                                            class="w-[37px] h-[30px] object-cover"
                                            :src="ic_vip"
                                            alt=""
                                        />
                                        <span class="ml-2 text-17px font-semibold text-mainText">
                                            成为{{ NAME }}VIP
                                        </span>
                                    </div>
                                    <div
                                        class="whitespace-nowrap flex-1 flex items-center justify-end pr-4"
                                    >
                                        <VanButton
                                            class="w-14 h-7 bg-[url('@/assets/profile/ic_login_btn.png')] bg-no-repeat bg-center bg-contain border-0 text-xs font-medium text-[#883C00] mr-1"
                                            to="/login"
                                        >
                                        </VanButton>
                                        <VanButton
                                            class="w-14 h-7 bg-[url('@/assets/profile/ic_register_btn.png')] bg-no-repeat bg-center bg-contain border-0 text-xs font-medium text-[#883C00]"
                                            to="/register"
                                        >
                                        </VanButton>
                                    </div>
                                </div>
                                <ul class="flex mt-1 px-10px">
                                    <li
                                        :key="index"
                                        v-for="(item, index) in growings"
                                        class="text-[#495FCD] text-xs whitespace-nowrap flex items-center justify-center flex-1"
                                    >
                                        <div class="w-3 h-3 object-cover" v-html="ic_blue_300" />
                                        <span class="ml-1">
                                            {{ item }}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="pl-10px pr-2">
                            <template v-if="token">
                                <div class="flex items-center">
                                    <div
                                        @click="toPage({ title: '', to: '/wallet' })"
                                        class="w-[45%] relative flex flex-col justify-center h-20 bg-[length:100%] bg-top bg-no-repeat transition-all pl-10px"
                                    >
                                        <p class="flex items-center">
                                            <span class="mr-1 text-sm"> 钱包总额 </span>
                                            <i
                                                v-html="ic_refresh"
                                                @click.stop="allQueryBalance"
                                                class="w-[14px] h-[14px] flex-shrink-0 text-mainText text-sm"
                                                :class="{
                                                    'animate-spin': animate,
                                                    'opacity-50': !!animate,
                                                }"
                                                @animationiteration="animationiteration"
                                            />
                                        </p>
                                        <div
                                            class="flex w-full items-end text-sm font-OPPO"
                                            :class="{ 'pointer-events-none': !!animate }"
                                        >
                                            <span class="font-AH font-bold">¥</span>
                                            <p
                                                class="mr-1 text-[22px] line-clamp-1 mt-[7px] break-all font-DINAlternateBold ml-[2px]"
                                            >
                                                {{
                                                    animate
                                                        ? ellipsis(balance?.sumCoin)
                                                        : balance?.sumCoin || "0.00"
                                                }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="w-[55%]">
                                        <van-grid
                                            :border="false"
                                            :column-num="accounts.length"
                                            style="
                                                --van-grid-item-content-background: transparent;
                                                --van-grid-item-content-padding: 0;
                                            "
                                        >
                                            <van-grid-item
                                                :key="index"
                                                v-for="(item, index) in accounts"
                                                @click="toPage(item)"
                                            >
                                                <template #icon>
                                                    <img
                                                        class="w-10 h-10"
                                                        :src="item.icon"
                                                        alt=""
                                                    />
                                                </template>
                                                <template #text>
                                                    <span
                                                        class="text-xs translate-y-[-2px] font-medium text-mainText"
                                                    >
                                                        {{ item.title }}
                                                    </span>
                                                </template>
                                            </van-grid-item>
                                        </van-grid>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white flex-1 overflow-hidden mt-[2px]">
                <SwiperBox ref="swiperRef" class="rounded-t-20px overflow-hidden">
                    <div class="items-center">
                        <p class="h-11 pl-4 text-mainText font-medium flex items-center">
                            更多服务
                        </p>
                        <van-grid
                            class="grid_box"
                            style="
                                --van-grid-item-content-background: transparent;
                                --van-grid-item-content-padding: 0.625rem;
                            "
                        >
                            <van-grid-item
                                :key="index"
                                @click="toPage(item)"
                                v-for="(item, index) in list"
                                :dot="item.to == '/messageCenter' && isMessage"
                            >
                                <template #icon>
                                    <img class="w-9 h-9 object-contain" :src="item.icon" alt="" />
                                </template>
                                <template #text>
                                    <span class="text-xs text-[#2A2A2A] leading-5">
                                        {{ item.title }}
                                    </span>
                                </template>
                            </van-grid-item>
                        </van-grid>
                    </div>
                </SwiperBox>
            </div>
        </div>
        <MatchResults v-model="showResult" />
        <Transfer v-model="showTransfer" />
        <img
            v-show="init?.inviteSwitch"
            @click="toPage({ title: '', to: '/activityInvite' })"
            class="w-[132px] tlw_zy z-10 h-[59px] absolute right-4 bottom-5 cursor-pointer"
            :src="ic_activityInvite"
            alt=""
        />
    </div>
</template>
<script setup lang="ts">
import { API } from "@/api";
import type { VipInfo } from "@/api/vip/types";

import ic_blue_300 from "@/assets/svg/ic_blue_300.svg?raw";
import ic_refresh from "@/assets/svg/ic_refresh.svg?raw";
import ic_matchSetting from "@/assets/profile/ic_matchSetting.png";
import ic_messageCenter from "@/assets/profile/ic_messageCenter.png";
import ic_bettingRules from "@/assets/profile/ic_bettingRules.png";
import ic_about from "@/assets/profile/ic_about.png";
import ic_download from "@/assets/profile/ic_download.png";
import ic_helpCenter from "@/assets/profile/ic_helpCenter.png";
import ic_marketing from "@/assets/profile/ic_marketing.png";
import ic_activityInvite from "@/assets/profile/ic_activityInvite.png";
import ic_vip from "@/assets/profile/ic_vip.png";
import ic_recharge from "@/assets/home/ic_recharge.png";
import ic_w_money from "@/assets/home/ic_w_money.png";
import ic_transfer from "@/assets/home/ic_transfer.png";
import ic_activity from "@/assets/home/ic_activity.png";
import ic_betslip from "@/assets/profile/ic_betslip.png";
import ic_transactionRecord from "@/assets/profile/ic_transactionRecord.png";
import ic_funding from "@/assets/profile/ic_funding.png";
import ic_securityCenter from "@/assets/profile/ic_securityCenter.png";
import ic_matchNotice from "@/assets/profile/ic_matchNotice.png";
import ic_tutorial from "@/assets/profile/ic_tutorial.png";
import ic_results from "@/assets/profile/ic_results.png";
import ic_account from "@/assets/profile/ic_account.png";
import ic_edit from "@/assets/icon/ic_edit.png";

import { useStore } from "@/stores";
import { useAsync } from "@/stores/useAsync";
import { authToPage, ellipsis, lazyAvatar, percentage, toRecharge, toService } from "@/utils";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Local from "@/utils/Local";
import type { SwiperRef } from "@/components/types";
import SwiperBox from "@/components/SwiperBox.vue";
import MatchResults from "@/components/MatchResults/MatchResults.vue";
import { useHome } from "@/stores/useHome";
import Transfer from "@/components/Transfer.vue";
import { showFailToast } from "vant";

const NAME = ref<string>(import.meta.env.VITE_NAME);
const APP_NAME = ref<string>(import.meta.env.VITE_APP_NAME);
const { setDialogTip, setLoginInfo } = useStore();
const { balance } = storeToRefs(useAsync());
const { token, user } = storeToRefs(useStore());
const { init } = storeToRefs(useAsync());
const { setActive } = useHome();
const router = useRouter();
const vipInfo = ref<VipInfo>();
const animate = ref<boolean | string>();
const loading = ref<boolean>();
const swiperRef = ref<SwiperRef>();
const showResult = ref<boolean>(false);
const showTransfer = ref<boolean>(false);
const isMessage = ref<boolean>(false); //是否有消息

interface ItoPage {
    title: string;
    to: string;
    icon?: any;
}

const growings = ref<string[]>(["晋级礼金", "每月红包", "生日礼金", "专属活动"]);

const accounts = ref<ItoPage[]>([
    { title: "充值", to: "/recharge", icon: ic_recharge },
    { title: "提现", to: "/withdraw", icon: ic_w_money },
    { title: "转账", to: "/transfer", icon: ic_transfer },
    { title: "优惠", to: "/", icon: ic_activity },
]);

const list = ref<ItoPage[]>([
    { title: "投注记录", to: "/betslip", icon: ic_betslip },
    { title: "充提记录", to: "/transactionRecord", icon: ic_transactionRecord },
    { title: "资金明细", to: "/funding", icon: ic_funding },
    { title: "安全中心", to: "/securityCenter", icon: ic_securityCenter },
    { title: "账户管理", to: "/account", icon: ic_account },
    { title: "赛事公告", to: "/matchNotice", icon: ic_matchNotice },
    { title: "加入合营", to: "/marketing", icon: ic_marketing },
    { title: "消息中心", to: "/messageCenter", icon: ic_messageCenter },
    { title: "赛事设置", to: "/matchSetting", icon: ic_matchSetting },
    { title: "盘口教程", to: "/tutorial", icon: ic_tutorial },
    { title: "投注规则", to: "/bettingRules", icon: ic_bettingRules },
    { title: "赛果查询", to: "/results", icon: ic_results },
    { title: "帮助中心", to: "/helpCenter", icon: ic_helpCenter },
    { title: `关于${NAME.value}`, to: "/about", icon: ic_about },
    { title: "下载APP", to: "/download", icon: ic_download },
]);

const left_vips = computed(() => (vip: number = 0) => {
    return new URL(`/src/assets/vip/l_vip_${vip}.png`, import.meta.url).href;
});

const right_vips = computed(() => (vip: number = 0) => {
    return new URL(`/src/assets/vip/r_vip_${vip}.png`, import.meta.url).href;
});

const toPage = async (item: ItoPage) => {
    switch (item.to) {
        case "/":
            setActive(1);
            router.replace("/home");
            break;
        case "/tutorial":
        case "/bettingRules":
        case "/about":
        case "/helpCenter":
        case "/download":
        case "/marketing":
            router.push(item.to);
            break;
        case "/results":
            showResult.value = !showResult.value;
            break;
        default:
            const status = authToPage();
            if (status) {
                // 已登录
                if (item.to == "/withdraw") {
                    if (!user.value?.passwordCoin) {
                        setDialogTip(
                            true,
                            "温馨提示",
                            "为了您的账户安全,请优先设置安全密码",
                            async () => {
                                router.push("/passwordWith");
                            }
                        );
                        return;
                    }
                    router.push(item.to);
                }
                if (item.to == "/transfer") {
                    showTransfer.value = !showTransfer.value;
                    return;
                }
                item.to == "/betslip" ? router.replace(item.to) : router.push(item.to);
            }
            break;
    }
};

const getVipInfo = async () => {
    const res = await API.vipInfo();
    if (res.code === 0) {
        vipInfo.value = res.data!;
    }
};

const allQueryBalance = async () => {
    animate.value = true;
    await useAsync()?.allQueryBalance();
    animate.value = "over";
};

const transitionend = () => {
    swiperRef.value?.update?.();
};

const animationiteration = async () => {
    if (animate.value === "over") {
        animate.value = false;
    }
};

const firstLogout = () => {
    setDialogTip(true, "退出登录", "是否确定退出登录", () => logout());
};

const unreadCount = async () => {
    const res = await API.unreadCount();
    if (res.code == 0) {
        isMessage.value = res.data?.some(item => item.count > 0)!;
    }
};

const logout = async () => {
    loading.value = true;
    const res = await API.logout();
    loading.value = false;
    if (res.code === 0) {
        const loginInfo = Local.get("loginInfo");
        Local.clear();
        if (loginInfo) {
            setLoginInfo(loginInfo);
            Local.set("loginInfo", loginInfo);
        }
        router.push("/login");
    }
};

if (token.value) {
    getVipInfo();
    unreadCount();
    useAsync()?.userProfile();
}
</script>

<style lang="scss" scoped>
.ic_login {
    padding-bottom: 49.85%;
    background-image: url("@/assets/profile/ic_login_bg.png");
}
.ic_no_login {
    padding-bottom: 29.41%;
    background-image: url("@/assets/profile/ic_no_login_bg.png");
}
::v-deep(.grid_box) {
    .van-badge--top-right {
        top: 5px;
        right: 5px;
    }
}
::v-deep(.van-progress) {
    .van-progress__portion {
        border: 1px solid #fff;
    }
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
</style>
