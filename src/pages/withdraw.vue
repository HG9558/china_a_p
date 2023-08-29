<!-- 提现 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '提现' }">
            <template #right>
                <div class="flex items-center" @click="router.push('/withdrawTutorial')">
                    <VanButton class="h-5 px-1 border-0 text-white"> 提现教程 </VanButton>
                </div>
            </template>
        </NavBar>
        <div class="rounded-t-20px flex-1 bg-mainBg overflow-hidden z-0">
            <SwiperBox class="px-10px" ref="swiperRef">
                <div class="mt-10px rounded-20px bg-white px-10px">
                    <div class="h-[71px] border-b border-b-mainBg flex text-center text-sm">
                        <div
                            class="flex-1 overflow-hidden flex flex-col justify-center relative before:absolute before:h-[22px] before:right-0 before:top-1/2 before:-translate-y-1/2 before:border-r before:border-r-mainBg"
                        >
                            <span>中心钱包</span>
                            <p class="text-[17px] mt-1 font-OPPO_B">
                                {{ balance?.coin }}
                            </p>
                        </div>
                        <div class="flex-1 overflow-hidden flex flex-col justify-center">
                            <span>游戏钱包</span>
                            <p class="text-[17px] mt-1 font-OPPO_B">
                                {{ balance?.gameCoin }}
                            </p>
                        </div>
                    </div>
                    <div class="h-[38px] text-xs flex items-center text-mainText">
                        游戏钱包的资金必须转移到中心钱包才能提现。
                    </div>
                </div>
                <div class="mt-10px p-10px bg-white rounded-20px">
                    <div class="h-9 bg-mainBg rounded-10px flex">
                        <VanButton
                            :key="item.id"
                            v-for="item in tabs"
                            @click="changeTab(item)"
                            class="h-9 border-0 flex-1 rounded-10px"
                            :class="{ 'tlw_btn_linear text-white': active == item.id }"
                        >
                            {{ item.label }}
                        </VanButton>
                    </div>
                    <p class="h-11 mt-10px text-[15px] font-medium flex items-center">
                        选择到账银行
                    </p>
                    <template v-if="active == 1">
                        <div
                            v-if="bankItem?.accountNo"
                            @click="!loading && selectItem()"
                            class="h-11 active:scale-95 transition-all bg-mainBg rounded-10px px-10px flex items-center justify-between"
                        >
                            <img
                                class="w-6 h-6 flex-shrink-0"
                                v-lazy="active === 1 ? bankItem?.icon : ic_usdt"
                                alt=""
                            />
                            <div
                                class="text-sm text-txt_d mx-10px flex-1 flex items-center"
                                v-show="active == 1"
                            >
                                <p class="line-clamp-1 break-all w-full">
                                    <span class="text-mainText font-medium">
                                        {{ bankItem.bankName }}
                                    </span>
                                    {{ desensitizeCard(`${bankItem.accountNo}`, 4, 4) }}
                                </p>
                            </div>
                            <i class="icon-arrow-right-bold text-txt_d flex-shrink-0"></i>
                        </div>
                        <div
                            v-else
                            @click="selectItem()"
                            class="h-11 active:scale-95 transition-all bg-mainBg rounded-10px px-10px flex items-center justify-between"
                        >
                            <img class="w-6 h-6 flex-shrink-0" :src="ic_cash" alt="" />
                            <p class="text-sm text-txt_d mx-10px flex-1">请点击添加银行卡</p>
                            <i class="icon-arrow-right-bold text-txt_d flex-shrink-0"></i>
                        </div>
                    </template>
                    <template v-if="active == 0">
                        <div
                            v-if="virtualItem?.usdtAddress"
                            @click="!loading && selectItem()"
                            class="h-11 active:scale-95 transition-all bg-mainBg rounded-10px px-10px flex items-center justify-between"
                        >
                            <img class="w-6 h-6 flex-shrink-0" v-lazy="ic_usdt" alt="" />
                            <div class="text-sm text-txt_d mx-10px flex-1 flex items-center">
                                <p class="line-clamp-1 break-all w-full">
                                    <span class="text-mainText font-medium">
                                        {{ virtualItem.usdtName }}
                                    </span>
                                    {{ desensitize(`${virtualItem.usdtAddress}`, 5, 5, 5) }}
                                </p>
                            </div>
                            <i class="icon-arrow-right-bold text-txt_d flex-shrink-0"></i>
                        </div>
                        <div
                            v-else
                            @click="selectItem()"
                            class="h-11 active:scale-95 transition-all bg-mainBg rounded-10px px-10px flex items-center justify-between"
                        >
                            <img class="w-6 h-6 flex-shrink-0" :src="ic_cash" alt="" />
                            <p class="text-sm text-txt_d mx-10px flex-1">请点击添加提币地址</p>
                            <i class="icon-arrow-right-bold text-txt_d flex-shrink-0"></i>
                        </div>
                    </template>
                </div>
                <div class="mt-10px bg-white rounded-10px px-10px pb-10px">
                    <p class="h-11 text-[15px] font-medium flex items-center">输入提现金额</p>
                    <div
                        class="h-11 rounded-10px border border-mainBg flex items-center justify-between px-10px overflow-hidden"
                    >
                        <span class="font-AH text-[20px] flex-shrink-0 font-extrabold">¥</span>
                        <VanField
                            autocomplete="off"
                            class="flex-1 mx-[5px] !px-0 font-OPPO text-mainText"
                            :maxlength="/(.)/.test(params.coin) ? 11 : 8"
                            :disabled="loading"
                            v-model="params.coin"
                            :formatter="formatterCoin"
                            @blur="coinBlur"
                            placeholder="请输入提现金额"
                        />
                        <span v-if="active == 0" class="text-sm text-txt font-medium flex-shrink-0">
                            限额
                            {{ addThousandSeparator(Number(hints?.virtualMin)) }}~{{
                                addThousandSeparator(Number(hints?.virtualMax))
                            }}
                            元
                        </span>
                        <span v-else class="text-sm text-txt font-medium flex-shrink-0">
                            限额
                            {{ addThousandSeparator(Number(hints?.bankMin)) }}~{{
                                addThousandSeparator(Number(hints?.bankMax))
                            }}
                            元
                        </span>
                    </div>
                    <div
                        v-show="active == 0"
                        class="flex items-center justify-between text-xs mt-10px"
                    >
                        <span class="font-medium text-mainText">
                            ≈ {{ Math.round((rate + Number.EPSILON) * 100) / 100 || "0" }} USDT
                        </span>
                        <span class="text-txt_d">
                            参考汇率：1USDT={{ hints?.usdtrate || "-" }}RMB
                        </span>
                    </div>
                    <div class="flex items-center h-9 text-xs" v-show="Number(hints?.userFlow) > 0">
                        *还需
                        <span class="text-tip">
                            {{ hints?.userFlow }}
                        </span>
                        流水可提现，
                        <span class="text-txt font-medium" @click="showDetail = !showDetail">
                            查看详情
                        </span>
                    </div>
                    <p class="h-11 text-[15px] font-medium flex items-center">安全密码</p>
                    <div
                        class="h-11 border-b border-b-mainBg flex items-center justify-between px-10px"
                    >
                        <van-field
                            :maxlength="6"
                            :type="type"
                            :border="false"
                            :disabled="loading"
                            autocomplete="off"
                            v-model="params.securePassword"
                            :formatter="formatterNum"
                            class="!p-0 flex-1 font-OPPO text-sm"
                            placeholder="请输入6位数安全密码"
                        />
                        <img
                            class="w-5 h-5"
                            :src="type === 'number' ? icon_browse : icon_biyan"
                            @click="type = type === 'password' ? 'number' : 'password'"
                            alt=""
                        />
                    </div>
                    <VanButton
                        :loading="loading"
                        :disabled="disabled || loading"
                        class="h-11 rounded-xl border-0 tlw_btn_linear w-full text-white mt-[30px]"
                        @click="withdrawal"
                    >
                        确定
                    </VanButton>
                    <div
                        class="bg-mainBg rounded-xl text-xs text-mainText leading-[22px] mt-10px p-10px"
                    >
                        <p>
                            *今日可提现次数
                            <span class="text-tip">
                                {{ hints?.dailyNum || "-" }}
                            </span>
                            次
                        </p>
                        <p>
                            *今日可提现额度
                            <span class="text-tip">
                                {{ hints?.dailyCoin || "-" }}
                            </span>
                            元
                        </p>
                        <p>
                            *单笔最高可提
                            <span class="text-tip">
                                {{ active == 1 ? hints?.bankMax || "-" : hints?.virtualMax || "-" }}
                            </span>
                            元
                        </p>
                    </div>
                </div>
                <p class="text-sm text-gz py-6 text-center">
                    如需帮助，请联系<span class="text-txt font-medium" @click="toService">
                        在线客服
                    </span>
                </p>
            </SwiperBox>
        </div>

        <van-dialog v-model:show="showDetail" confirmButtonText="知道了">
            <template #title>
                <span class="text-[17px] font-normal">流水详情</span>
            </template>
            <div class="text-sm text-txt_d mt-10px pb-5 px-5">
                <p class="flex justify-between">
                    <span>所需流水</span>
                    <span class="flex-shrink-0">
                        {{ hints?.userFlow }}
                    </span>
                </p>
                <p class="flex mt-1 justify-between">
                    <span>已完成流水</span>
                    <span class="flex-shrink-0">
                        {{ hints?.completedUserFlow }}
                    </span>
                </p>
            </div>
        </van-dialog>
        <van-dialog v-model:show="showSuccess" confirmButtonText="知道了">
            <div
                class="w-[58px] h-[58px] mt-6 mb-5 mx-auto bg-mainBg rounded-full flex items-center justify-center"
            >
                <div class="w-12 h-12 mt-2" v-html="ic_w_money" />
            </div>
            <div class="px-5 text-center">
                <p class="text-[17px] text-mainText mb-10px">提现申请已提交</p>
                <p class="text-sm mb-5 text-txt_d">请稍后查询是否到账</p>
            </div>
        </van-dialog>
        <WithdrawPopup
            :list="active == 1 ? bankList : virtualList"
            v-model="showPopup"
            :active="active"
            :title="title"
            :btn-text="btnText"
            :bankItem="bankItem"
            :virtualItem="virtualItem"
            @submit="submit"
            @callBack="callBack"
        />
        <CardAdd v-model="showCard" :userBankList="userBankList" />
        <DIGICCYAdd v-model="showDIGICCY" :userVirtualBankList="userVirtualBankList" />
    </div>
</template>

<script setup lang="ts">
import { desensitize, desensitizeCard, toService } from "@/utils";
import { useRouter } from "vue-router";
import ic_cash from "@/assets/wallet/ic_cash.png";
import ic_usdt from "@/assets/icon/ic_usdt.png";
import ic_w_money from "@/assets/svg/ic_w_money.svg?raw";
import { computed, ref } from "vue";
import { useAsync } from "@/stores/useAsync";
import { storeToRefs } from "pinia";
import { formatterNum, formatterCoin } from "@/utils/validate";
import { useStore } from "@/stores";
import { API } from "@/api";
import type {
    BankNums,
    UserBankList,
    UserVirtualBankList,
    WithdrawalHint,
} from "@/api/wallet/types";
import type { Iwithdrawal } from "@/api/pay/interface";
import { showDialog, showFailToast } from "vant";
import { encrypt } from "@/utils/cryptoJS";
import type { SwiperRef } from "@/components/types";
import NavBar from "@/components/NavBar.vue";
import SwiperBox from "@/components/SwiperBox.vue";
import WithdrawPopup from "@/components/WithdrawPopup.vue";
import CardAdd from "@/components/Account/CardAdd.vue";
import DIGICCYAdd from "@/components/Account/DIGICCYAdd.vue";
import icon_browse from "@/assets/icon/icon_browse.png";
import icon_biyan from "@/assets/icon/icon_biyan.png";
import { addThousandSeparator } from "@/utils/match";

const { balance } = storeToRefs(useAsync());
const { allQueryBalance } = useAsync();
const { user } = storeToRefs(useStore());
const { setDialogTip, setLoading, setUser } = useStore();
const type = ref<"password" | "number">("password");

interface Itabs {
    id: number;
    label: string;
}

const active = ref<number>(1);
const tabs = ref<Itabs[]>([
    { id: 1, label: "银行卡提现" },
    { id: 0, label: "提现到USDT " },
]);

const showCard = ref<boolean>(false);
const showDIGICCY = ref<boolean>(false);
const loading = ref<boolean>(false);
const swiperRef = ref<SwiperRef>();
const bankList = ref<UserBankList[] | undefined>(undefined);
const virtualList = ref<UserVirtualBankList[] | undefined>(undefined);
const hints = ref<WithdrawalHint | undefined>(undefined);
const showPopup = ref<boolean>(false);
const bankNum = ref<BankNums>();
const showDetail = ref<boolean>(false);
const showSuccess = ref<boolean>(false);
const bankItem = ref<UserBankList>();
const virtualItem = ref<UserVirtualBankList>();

const params = ref<Iwithdrawal>({
    id: 0,
    coin: "",
    securePassword: "",
    withdrawalType: 1,
});

const router = useRouter();

const rate = computed(() => (+params.value.coin || 0) / (+hints?.value?.usdtrate! || 0));

const title = computed(() => (active.value == 1 ? "选择到账银行卡" : "选择提币地址"));

const btnText = computed(() => (active.value == 1 ? "添加银行卡" : "添加提币地址"));

const disabled = computed(() => {
    if (!params.value.coin) return true;
    if (!params.value.securePassword) return true;
});

const coinBlur = (e: InputEvent) => {
    if (/[0-9]/.test(params.value.coin)) {
        params.value.coin = `${Number((<HTMLInputElement>e.target).value).toFixed?.(2)}`;
        return;
    }
    params.value.coin = "";
};

const changeTab = (item: Itabs) => {
    active.value = item.id;
    params.value.withdrawalType = item.id;
    if (!bankItem.value) {
        bankItem.value = bankList.value?.[0];
        params.value.id = bankItem.value?.id!;
    }
    if (!virtualItem.value) {
        virtualItem.value = virtualList.value?.[0];
        params.value.id = virtualItem.value?.id!;
    }
    swiperRef.value?.update?.();
};

const submit = (item: UserBankList | UserVirtualBankList) => {
    params.value.id = item.id;
    if (active.value == 1) bankItem.value = item as UserBankList;
    if (active.value == 0) virtualItem.value = item as UserVirtualBankList;
};

const callBack = () => {
    switch (active.value) {
        case 1:
            showCard.value = !showCard.value;
            break;
        case 0:
            showDIGICCY.value = !showDIGICCY.value;
            break;
        default:
            break;
    }
    showPopup.value = false;
};

const selectItem = () => {
    if (bankNum?.value?.bank! <= 0 && active.value == 1) {
        callBack();
        return;
    }
    if (bankNum?.value?.virtual! <= 0 && active.value == 0) {
        callBack();
        return;
    }
    showPopup.value = !showPopup.value;
};

const withdrawal = async () => {
    // 提现申请
    const { securePassword, coin } = params.value;
    const { bankMin, bankMax, virtualMin, virtualMax } = hints.value!;
    if (active.value == 1 && !bankItem.value?.accountNo) return showFailToast("请选择到账银行");
    if (active.value == 0 && !virtualItem.value?.usdtAddress)
        return showFailToast("请选择到账银行");
    if (!params.value.coin) return showFailToast("金额不能为空");
    if (active.value == 1 && !(+coin >= +bankMin && +coin <= +bankMax)) {
        showFailToast(`提现金额为${bankMin}~${bankMax}之间`);
        return;
    }
    if (active.value == 0 && !(+coin >= +virtualMin && +coin <= +virtualMax)) {
        showFailToast(`提现金额为${virtualMin}~${virtualMax}之间`);
        return;
    }
    if (!params.value.securePassword) return showFailToast("请输入安全密码");
    if (Number(hints?.value?.userFlow) > 0) {
        showDialog({
            title: "温馨提示",
            message: `还需${hints?.value?.userFlow}流水才可以进行提款。`,
            confirmButtonText: "我知道了",
        });
        return;
    }
    if (active.value == 1) params.value.id = bankItem.value?.id!;
    if (active.value == 0) params.value.id = virtualItem.value?.id!;
    loading.value = true;
    const res = await API.withdrawal({
        ...params.value,
        securePassword: encrypt(securePassword),
    });
    loading.value = false;
    if (res.code === 0) {
        showSuccess.value = !showSuccess.value;
        params.value.coin = "";
        params.value.securePassword = "";
        allQueryBalance();
    }
};

const withdrawalHint = async () => {
    // 提款提示信息
    const res = await API.withdrawalHint();
    if (res.code === 0) {
        hints.value = res.data!;
    }
};

const userBankList = async () => {
    // 银行卡列表
    setLoading(true);
    const res = await API.userBankList();
    setLoading(false);
    if (res.code === 0) {
        bankList.value = res.data!;
        if (bankList.value?.[0]?.accountName) {
            user.value!.realName = bankList.value?.[0]?.accountName;
            setUser(user.value);
        }
        if (active.value == 1) {
            bankItem.value = bankList.value?.[0];
            params.value.id = bankItem.value?.id;
            bankNums();
        }
    }
};
const userVirtualBankList = async () => {
    // 数字货币列表
    setLoading(true);
    const res = await API.userVirtualBankList();
    setLoading(false);
    if (res.code === 0) {
        virtualList.value = res.data!;
        if (virtualList.value?.[0]?.usdtAddress) {
            user.value!.realName = bankList.value?.[0]?.accountName;
            setUser(user.value);
        }
        if (active.value == 0) {
            virtualItem.value = virtualList.value?.[0];
            params.value.id = virtualItem.value?.id;
            bankNums();
        }
    }
};

const bankNums = async () => {
    // 钱包-银行卡数量
    const res = await API.bankNums();
    if (res.code === 0) {
        bankNum.value = res.data!;
    }
};

bankNums();
userBankList();
userVirtualBankList();
withdrawalHint();
</script>
