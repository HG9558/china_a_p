<!-- 转账 -->
<template>
    <VanPopup
        position="right"
        teleport="body"
        @closed="closed"
        v-model:show="showBottom"
        style="width: 100%; height: 100%"
    >
        <div class="h-full w-full flex flex-col tlw_top_bg">
            <NavBar transparent :click-left="close" :nav-bar-props="{ title: '转账' }" />
            <div
                class="flex-1 flex flex-col px-10px overflow-hidden rounded-t-20px z-0 relative bg-mainBg"
            >
                <div class="bg-white rounded-20px mt-10px px-10px pb-[12px]">
                    <div class="flex h-11 items-center justify-between">
                        <span class="text-15px font-medium">进入场馆时自动转入金额</span>
                        <van-switch
                            :size="20"
                            active-color="#4b6cdb"
                            :model-value="autoTransfer"
                            :disabled="switchLoading"
                            :loading="switchLoading"
                            @change="switchTransfer"
                            @update:model-value="switchTransfer"
                        />
                    </div>
                    <div class="flex items-center h-[104px] border-y border-y-mainBg">
                        <div class="flex flex-col text-xs text-mainText flex-shrink-0">
                            <span>从</span>
                            <ul class="h-11 flex flex-col items-center justify-center">
                                <li
                                    :key="index"
                                    v-for="index in 4"
                                    class="w-[3px] h-[3px] rounded-full bg-[#86A2FF] mb-1 last-of-type:mb-0"
                                ></li>
                            </ul>
                            <span>到</span>
                        </div>
                        <div class="flex-1 ml-10px mr-15px flex">
                            <div class="h-[104px]">
                                <div class="h-[52px] flex items-center border-b border-b-mainBg">
                                    <span
                                        class="px-[5px] flex-shrink-0 text-xs rounded bg-[#E9F0FA] text-txt"
                                    >
                                        转出
                                    </span>
                                </div>
                                <div class="h-[52px] flex items-center border-b border-b-mainBg">
                                    <span
                                        class="px-[5px] flex-shrink-0 text-xs rounded bg-[#E3F1E9] text-fz_g"
                                    >
                                        转入
                                    </span>
                                </div>
                            </div>
                            <div
                                class="h-[104px] flex flex-col flex-1"
                                :class="{ 'flex-col-reverse': isReverse }"
                            >
                                <div class="h-[52px] flex items-center border-b border-b-mainBg">
                                    <div class="ml-10px flex-1 flex flex-col justify-center">
                                        <p class="text-15px font-medium text-mainText">中心钱包</p>
                                    </div>
                                </div>
                                <div class="h-[52px] flex items-center border-b border-b-mainBg">
                                    <div
                                        class="ml-10px flex-1 flex flex-col justify-center"
                                        @click="selectWallet()"
                                    >
                                        <p
                                            class="text-15px font-medium"
                                            :class="{ 'text-txt_d': !activeItem?.id }"
                                        >
                                            {{ activeItem?.walletName || "选择游戏钱包" }}
                                        </p>
                                        <p
                                            class="text-xs text-txt_d flex items-center"
                                            v-show="activeItem?.id"
                                        >
                                            现有 {{ activeItem?.coin || "0.00" }}
                                            <span v-if="activeItem?.activityUserStatus == 3">
                                                (参与活动中)
                                            </span>
                                        </p>
                                    </div>
                                    <i class="icon-arrow-right-bold flex-shrink-0 text-[#999]"></i>
                                </div>
                            </div>
                        </div>
                        <img
                            alt=""
                            class="w-7 h-7 flex-shrink-0"
                            :src="ic_transition"
                            @click="switchWallet"
                        />
                    </div>
                    <p class="h-11 text-15px mt-10px text-mainText font-medium flex items-center">
                        转账金额
                    </p>
                    <div
                        class="flex items-center h-11 overflow-hidden rounded-10px border border-mainBg"
                    >
                        <div class="flex items-center flex-1 overflow-hidden pl-3">
                            <span class="flex-shrink-0 text-[20px] font-AH font-extrabold">¥</span>
                            <van-field
                                autosize
                                type="number"
                                autocomplete="off"
                                :maxlength="/(.)/.test(`${params.coin}`) ? 11 : 8"
                                v-model="params.coin"
                                :formatter="formatterCoin"
                                class="flex-1 text-17px font-OPPO text-sm !bg-transparent"
                                placeholder="请输入转账金额"
                            />
                        </div>
                        <VanButton
                            class="border-0 flex-shrink-0 h-full text-sm text-txt"
                            @click="allTransfer"
                        >
                            全部金额
                        </VanButton>
                    </div>
                    <p
                        v-if="Number(params?.coin) > +maxCoin && maxCoin != 0"
                        class="h-11 text-13px text-tip font-medium flex items-center"
                    >
                        最多可转{{ maxCoin }}元
                    </p>
                    <p v-else class="h-11 text-13px text-mainText font-medium flex items-center">
                        中心钱包现有
                        <span class="font-OPPO">
                            {{ balanceLoading ? ellipsis(balance?.coin) : balance?.coin || "0.00" }}
                        </span>
                        元
                    </p>
                    <div class="h-10 mt-10px">
                        <VanButton
                            class="rounded-xl w-full text-sm border-0 tlw_btn_linear text-white"
                            @click="activeItem?.activityUserStatus ? checkStatus() : submitBtn()"
                            :disabled="disabled"
                        >
                            {{ loading ? "正在转账..." : "立即转账" }}
                            <template #icon>
                                <VanLoading color="#4B6CDB" v-show="loading" :size="20" />
                            </template>
                        </VanButton>
                    </div>
                    <div class="h-10 mt-10px">
                        <VanButton
                            :disabled="!!recycleLoading || loading"
                            class="rounded-xl w-full border-txt text-txt text-sm"
                            @click="allCoinDown"
                        >
                            {{ recycleLoading ? "正在回收..." : "一键回收" }}
                            <template #icon>
                                <VanLoading color="#4B6CDB" v-show="recycleLoading" :size="20" />
                            </template>
                        </VanButton>
                    </div>
                </div>
                <p class="h-10 mt-[30px] text-gz text-sm flex items-center justify-center">
                    如需帮助，请联系
                    <span class="text-txt" @click="toService">在线客服</span>
                </p>
            </div>
            <TransferPopup
                :options="list"
                v-model="showPopup"
                :active="activeItem"
                @change="selectGameItem"
            />
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { API } from "@/api";
import { useStore } from "@/stores";
import { useAsync } from "@/stores/useAsync";
import { storeToRefs } from "pinia";
import { computed, ref, watch, watchEffect } from "vue";
import ic_transition from "@/assets/icon/ic_transition.png";
import type { PlatList, AList } from "@/api/platform/types";
import type { IcoinTransfer } from "@/api/platform/interface";
import { ellipsis, toService } from "@/utils";
import { showFailToast, showSuccessToast } from "vant";
import { formatterCoin } from "@/utils/validate";
import TransferPopup from "./TransferPopup.vue";
import NavBar from "@/components/NavBar.vue";
import { ItrialCoinTransferApplyActivity } from "@/api/promoActivity/interface";

const { user, loading, oneTime } = storeToRefs(useStore());
const { userProfile } = useAsync();
const { balance, promoActivityList } = storeToRefs(useAsync());
const { setLoading, setDialogTip, oneTimeStart } = useStore();

const switchLoading = ref<boolean>();
const autoTransfer = ref<boolean>();
const gameList = ref<Partial<PlatList>[]>();
const activeItem = ref<Partial<PlatList>>();
const isReverse = ref<boolean>(false);
const showPopup = ref<boolean>(false);
const recycleLoading = ref<boolean>(false); //loading
const balanceLoading = ref<boolean>(false);

const props = defineProps<{
    modelValue: boolean;
    list?: Partial<PlatList>[];
    active?: Partial<PlatList>;
    allQueryBalance?: (status?: number) => Promise<Partial<PlatList>[] | undefined>;
}>();

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: string): void;
}>();

const list = computed(() => (props.allQueryBalance ? props.list : gameList.value));

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set() {
        close();
    },
});

const closed = () => {
    params.value.coin = "";
};

const close = () => {
    emits("update:modelValue", false);
};

const params = ref<IcoinTransfer>({
    coin: "",
    direction: 0,
    id: 0,
    name: "",
});

const disabled = computed(() => {
    return !!(
        loading.value ||
        recycleLoading.value ||
        !params.value?.coin ||
        !activeItem.value?.id ||
        +params.value?.coin! > +maxCoin.value
    );
});

const maxCoin = computed(() => {
    return !isReverse.value ? Number(balance.value?.coin) : Number(activeItem.value?.coin);
});

const allTransfer = () => {
    //全部转入
    if (!balance.value?.coin) return;
    params.value.coin = `${maxCoin.value?.toFixed(2)}`;
};

const trialCoinTransferApplyActivity = async (data: ItrialCoinTransferApplyActivity) => {
    const res = await API.trialCoinTransferApplyActivity(data);
    return res;
};

const checkStatus = async () => {
    if (activeItem.value?.activityUserStatus == 3) {
        setLoading(true);
        promoActivityList;
        const orderId = promoActivityList?.value?.find(
            item => item.platListId == activeItem.value?.id
        )?.orderId;
        if (!orderId) {
            coinTransfer();
            return;
        }
        const res = await trialCoinTransferApplyActivity({
            orderId: Number(orderId),
            transferCoin: Number(params.value.coin),
        });
        setLoading(false);
        if (res.code == 0) {
            setDialogTip(
                true,
                "温馨提示",
                `您还在参与该场馆活动，转账成功后，共需完成${res.data?.targetAmount}活动流水后才能转出，您是否确认继续转入？`,
                () => {
                    submitBtn();
                }
            );
        }
    }
};

const submitBtn = async () => {
    const paramsCoin = Number(params.value.coin);
    if (paramsCoin <= 0 || paramsCoin > maxCoin.value) return showFailToast("余额不足");
    const direction = !isReverse.value ? 0 : 1;
    params.value.id = +activeItem.value?.id!;
    params.value.direction = direction;
    coinTransfer();
};

const switchWallet = () => {
    // 钱包切换
    isReverse.value = !isReverse.value;
    const direction = params.value.direction === 0 ? 1 : 0;
    params.value.direction = direction;
};

const coinTransfer = async () => {
    //立即转账
    if (!+params.value.coin!) return;
    setLoading(true);
    const res = await useAsync().coinTransfer({ ...params.value });
    if (res.code === 0) {
        params.value.coin = "";
        const data = await (props.allQueryBalance ? props.allQueryBalance() : allQueryBalance());
        if (data) showSuccessToast("转账成功");
    }
    setLoading(false);
    return res;
};

const selectWallet = () => {
    showPopup.value = !showPopup.value;
};

const selectGameItem = (item: Partial<PlatList>) => {
    //底部弹出 选中返回 item
    activeItem.value = item;
    showPopup.value = !showPopup.value;
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

const allCoinDown = async () => {
    // 三方游戏平台->一键回收
    if (+balance.value?.gameCoin! <= 0) return showSuccessToast("已全部回收");
    if (oneTime.value) return showFailToast("操作过于频繁,请稍后重试");
    recycleLoading.value = true;
    const res = await useAsync()?.allCoinDown();
    switch (res?.code) {
        case 0:
            oneTimeStart();
            const data = await (props.allQueryBalance
                ? props.allQueryBalance()
                : allQueryBalance());
            if (data) showSuccessToast("已全部回收");
            break;
        default:
            break;
    }
    recycleLoading.value = false;
};

const platList = async () => {
    // 平台列表
    if (props.allQueryBalance) setLoading(true);
    const res = await API.platList();
    if (res.code === 0) {
        gameList.value = res.data!;
        allQueryBalance();
    }
};

const allQueryBalance = async (status?: number) => {
    // 查詢全部三方游戏平台餘額
    const { queryUserWallet } = useAsync();
    const res = await (status == 2 ? useAsync()?.allQueryBalance() : queryUserWallet());
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

watch(
    () => user.value?.autoTransfer,
    n => {
        autoTransfer.value = !!n;
    },
    { immediate: true }
);

watchEffect(() => {
    (props.allQueryBalance ? props.list : gameList.value)?.find(item => {
        if (item.id === activeItem.value?.id) {
            activeItem.value!.coin = item.coin;
            return true;
        }
    });
});

watch(
    () => props.active,
    n => {
        if (!n) return;
        activeItem.value = n;
    }
);

if (!props.allQueryBalance && user.value) platList();
</script>
