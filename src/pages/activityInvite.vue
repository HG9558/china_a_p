<!-- 好友邀请 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '好友邀请' }">
            <template #right>
                <i class="icon-zhuanfa text-white text-[20px] font-medium" @click="share"></i>
            </template>
        </NavBar>
        <div
            class="flex flex-col flex-1 overflow-hidden rounded-t-20px bg-mainBg z-0 overflow-y-auto"
        >
            <div class="relative pb-[120.80%] mb-10px bg-[#E0E2E6]">
                <img
                    v-if="info?.h5MainImage"
                    class="object-cover absolute top-0 left-0 w-full h-full"
                    v-lazy="lazy(info?.h5MainImage)"
                    alt=""
                />
            </div>
            <div class="px-10px">
                <div
                    class="rounded-20px bg-white border border-[#E5EBFF] shadow-[0px_4px_4px_0px_rgba(102,133,192,0.05)]"
                >
                    <div class="h-[99px] flex items-center pt-10px">
                        <div class="flex flex-1 flex-col items-center justify-center">
                            <p class="text-sm text-txt_d">我的收益</p>
                            <p class="flex items-end text-txt font-OPPO">
                                <span class="text-2xl -translate-y-2 flex-shrink-0">¥</span>
                                <span
                                    class="text-[36px] font-DINAlternateBold line-clamp-1 break-all"
                                >
                                    {{
                                        (
                                            Number(info?.inviteFirstRecharge || 0) +
                                            Number(info?.inviteGame || 0) +
                                            Number(info?.inviteLvUp || 0)
                                        ).toFixed(2)
                                    }}
                                </span>
                            </p>
                        </div>
                        <div class="flex flex-1 flex-col items-center justify-center">
                            <p class="text-sm text-txt_d">邀请人数</p>
                            <p class="flex items-end">
                                <span
                                    class="text-[36px] font-DINAlternateBold line-clamp-1 break-all"
                                >
                                    {{ info?.inviteNum || 0 }}
                                </span>
                                <span class="text-sm -translate-y-3 font-semibold flex-shrink-0">
                                    人
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="h-[156px] relative">
                        <div class="tlw_invite_bg absolute top-0 left-0 w-full h-full" />
                        <div class="w-full h-[88px] absolute top-14 px-5 overflow-hidden">
                            <div class="h-full flex items-center">
                                <div
                                    :key="index"
                                    v-for="(item, index) in topList"
                                    class="flex flex-1 flex-col items-center justify-center"
                                >
                                    <p class="text-2xl text-txt font-OPPO_M line-clamp-1 break-all">
                                        {{ info?.[item.key] || "0.00" }}
                                    </p>
                                    <p class="text-xs scale-90 text-txt_d line-clamp-1">
                                        {{ item.title }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="text-xs text-mainText text-center -translate-y-2 leading-6">
                        活动时间：{{ info?.activityStart }} ～ {{ info?.activityEnd }}
                    </p>
                </div>
                <div
                    class="px-10px mt-10px bg-white rounded-20px pb-6 pt-5 border border-[#E5EBFF] shadow-[0px_4px_4px_0px_rgba(102,133,192,0.05)]"
                >
                    <ActivityTitle title="邀请链接" class="mb-10px" />
                    <div class="rounded-lg h-[38px] bg-[#EEEFF3] pl-3 flex items-center">
                        <p class="line-clamp-1 flex-1 text-xs">
                            {{ `${origin}${info?.inviteLink}` }}
                        </p>
                        <VanButton
                            class="h-full border-0 rounded-l-none rounded-r-lg flex-shrink-0 w-24 tlw_btn_linear text-white text-17px"
                            @click="copyText(`${origin}${info?.inviteLink}`)"
                        >
                            复制
                        </VanButton>
                    </div>
                </div>
                <div
                    class="px-10px mt-10px bg-white rounded-20px pb-3 pt-5 border border-[#E5EBFF] shadow-[0px_4px_4px_0px_rgba(102,133,192,0.05)]"
                >
                    <ActivityTitle title="首存送福利" class="mb-10px" />
                    <div class="rounded-xl border border-mainBg border-solid">
                        <ul class="h-11 flex rounded-t-xl overflow-hidden">
                            <li
                                :key="index"
                                v-for="(item, index) in inviteList"
                                class="flex items-center flex-1 flex-col justify-center text-white border-r border-r-[#EAECF020] last-of-type:border-r-0 bg-txt text-xs font-medium text-center"
                            >
                                <p>
                                    {{ item.title }}
                                </p>
                            </li>
                        </ul>
                        <div
                            class="h-11 flex overflow-hidden text-center text-txt text-sm font-bold border-b border-b-mainBg last-of-type:border-b-0"
                        >
                            <span
                                class="flex-1 flex items-center justify-center border-r border-r-mainBg"
                            >
                                {{ info?.firstDepositMin }} ~ {{ info?.firstDepositMax }}
                            </span>
                            <span
                                class="flex-1 flex items-center justify-center border-r border-r-mainBg"
                            >
                                {{ info?.inviteFirstDepositRate || 0 }}%
                            </span>
                            <span
                                class="flex-1 flex items-center justify-center border-r border-r-mainBg"
                            >
                                {{ info?.inviteesFirstDepositRate || 0 }}%
                            </span>
                            <span class="flex-1 flex items-center justify-center">
                                {{ info?.withdrawMultiple || 0 }}倍
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    class="px-10px mt-10px bg-white rounded-20px pb-3 pt-5 border border-[#E5EBFF] shadow-[0px_4px_4px_0px_rgba(102,133,192,0.05)]"
                >
                    <ActivityTitle title="天天拿彩金" class="mb-10px" />
                    <div class="rounded-xl border border-mainBg border-solid">
                        <ul class="h-11 flex rounded-t-xl overflow-hidden">
                            <li
                                :key="index"
                                v-for="(item, index) in gameList"
                                class="flex items-center flex-1 flex-col justify-center text-white border-r border-r-[#EAECF020] last-of-type:border-r-0 bg-txt text-xs font-medium text-center"
                            >
                                <p>
                                    {{ item.title }}
                                </p>
                            </li>
                        </ul>
                        <div
                            :key="index"
                            class="h-11 flex overflow-hidden text-center text-txt text-sm font-bold border-b border-b-mainBg last-of-type:border-b-0"
                            v-for="(item, index) in info?.gameDtoList"
                        >
                            <span
                                class="flex-1 flex items-center justify-center border-r border-r-mainBg"
                            >
                                {{ item?.gameName || "-" }}
                            </span>
                            <span
                                class="flex-1 flex items-center justify-center border-r border-r-mainBg"
                            >
                                {{ Number(item?.gameRate) || 0 }}%
                            </span>
                            <span class="flex-1 flex items-center justify-center">
                                {{ item?.gameWithdrawMultiple || 0 }}倍
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    class="px-10px mt-10px bg-white rounded-20px pb-3 pt-5 border border-[#E5EBFF] shadow-[0px_4px_4px_0px_rgba(102,133,192,0.05)]"
                >
                    <ActivityTitle title="晋级有惊喜" class="mb-10px" />
                    <div class="rounded-xl border border-mainBg border-solid">
                        <ul
                            class="h-[61px] grid grid-cols-[1fr_35%_25%] rounded-t-xl overflow-hidden"
                        >
                            <li
                                :key="index"
                                v-for="(item, index) in promotionList"
                                class="flex items-center flex-col justify-center text-white border-r border-r-[#EAECF020] last-of-type:border-r-0 bg-txt text-xs font-medium text-center"
                            >
                                <p>
                                    {{ item.title }}
                                </p>
                            </li>
                        </ul>
                        <div
                            :key="index"
                            class="h-11 grid grid-cols-[1fr_35%_25%] overflow-hidden text-center text-txt text-sm font-bold border-b border-b-mainBg last-of-type:border-b-0"
                            v-for="(item, index) in info?.promotionDtoList"
                        >
                            <span class="flex items-center justify-center border-r border-r-mainBg">
                                {{ item?.vipLevelName }}
                            </span>
                            <span class="flex items-center justify-center border-r border-r-mainBg">
                                {{ Number(item?.vipReward) || 0 }}
                            </span>
                            <span class="flex items-center justify-center">
                                {{ item?.promotionWithdrawMultiple || 0 }}倍
                            </span>
                        </div>
                    </div>
                </div>
                <div
                    class="mt-10px bg-white px-10px pb-10px rounded-20px mb-10px pt-5 border border-[#E5EBFF] shadow-[0px_4px_4px_0px_rgba(102,133,192,0.05)]"
                >
                    <ActivityTitle title="活动规则" class="mb-10px" />
                    <div
                        class="description text-sm text-gz leading-6 break-all whitespace-pre-line"
                        v-html="info?.description"
                    ></div>
                </div>
            </div>
        </div>
        <div
            class="flex-shrink-0 py-4 flex items-center justify-center shadow-[0px_-2px_2px_rgba(75,108,219,0.06)]"
        >
            <VanButton
                class="border-txt border-[1.4px] w-40 h-11 mr-4 rounded-xl text-txt bg-white"
                to="/recordActivity"
            >
                活动记录
            </VanButton>
            <VanButton
                class="w-40 h-11 tlw_btn_linear border-0 text-white rounded-xl"
                @click="share"
            >
                立即分享
            </VanButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import ic_activity from "@/assets/logo/ic_activity.png";
import { computed, ref } from "vue";
import { copyText } from "@/utils";
import { API } from "@/api";
import { useStore } from "@/stores/index";
import ActivityTitle from "@/components/Activity/ActivityTitle.vue";
import { GetInvitationData } from "@/api/invitation/types";
import { storeToRefs } from "pinia";
import { useApp } from "@/stores/useApp";

export interface GameReward {
    id: number;
    name: string;
    val: number;
}

export interface VipReward {
    level: number;
    reward: number;
}

const topList = ref([
    { title: "累计好友首存收益", key: "inviteFirstRecharge" },
    { title: "累计好友流水分成", key: "inviteGame" },
    { title: "累计好友晋级奖励", key: "inviteLvUp" },
]);

const inviteList = ref([
    { title: "推荐用户首存", key: "firstDepositMin~firstDepositMax" },
    { title: "邀请人彩金", key: "inviteFirstDepositRate" },
    { title: "被邀请人彩金", key: "inviteesFirstDepositRate" },
    { title: "流水要求", key: "withdrawMultiple" },
]);

const gameList = ref([
    { title: "游戏类型", key: "gameName" },
    { title: "返水比例", key: "gameRate" },
    { title: "流水要求", key: "gameWithdrawMultiple" },
]);

const promotionList = ref([
    { title: "受邀好友达到VIP等级", key: "vipLevelName" },
    { title: "邀请者得到的奖励", key: "vipReward" },
    { title: "流水要求", key: "promotionWithdrawMultiple" },
]);

const info = ref<GetInvitationData>();
const { setLoading } = useStore();
const { isApp } = storeToRefs(useApp());
const origin = ref<string>(location.origin);

const lazy = computed(() => (src?: string) => ({ src, error: ic_activity, loading: ic_activity }));

const getInvitationData = async () => {
    setLoading(true);
    const res = await API.getInvitationData();
    setLoading(false);
    if (res.code === 0) {
        info.value = res.data!;
    }
};

const share = () => {
    if (/[0-9]/.test(isApp.value)) {
        (window as any)?.testInterface?.inviteFriendEvent?.();
        (window as any)?.webkit?.messageHandlers?.inviteFriendEvent?.postMessage?.("xxx");
        return;
    }
    copyText(`${origin.value}${info.value?.inviteLink}`);
};

getInvitationData();
</script>

<style lang="scss" scoped>
::v-deep(.description) {
    img,
    video {
        margin: 0 auto;
    }
}
</style>
