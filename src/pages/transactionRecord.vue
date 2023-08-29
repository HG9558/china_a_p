<!-- 充提记录 -->
<template>
    <div class="h-full w-full flex flex-col tlw_top_bg bg-mainBg">
        <NavBar class="flex-shrink-0" :transparent="true" :nav-bar-props="{ title: '充提记录' }">
            <template #right>
                <i class="z-10 text-white ml-2 icon-erji text-lg" @click="toService" />
            </template>
        </NavBar>
        <div
            class="flex-1 rounded-t-2xl bg-mainBg flex flex-col overflow-hidden z-0"
            :class="{ '!rounded-b-none': isOpenDropdown }"
        >
            <div class="bg-white px-10px">
                <div class="mt-10px rounded-10px border border-[#ECECEC]">
                    <div class="flex items-center justify-between">
                        <VanButton
                            :key="item.value"
                            v-for="item in category"
                            @click="setActive(item)"
                            class="h-9 text-15px flex-1 rounded-lg border-0"
                            :class="{
                                '!tlw_btn_linear font-medium  text-white border-transparent':
                                    categoryActive == item.value,
                            }"
                        >
                            {{ item.text }}
                        </VanButton>
                    </div>
                </div>
                <div class="w-20 pl-1">
                    <p
                        class="flex items-center text-sm h-[34px]"
                        @click.stop="dropdownRef?.toggle()"
                    >
                        <span class="mr-1 text-[#4A4A4A]">筛选</span>
                        <i
                            class="text-xs scale-75 icon-arrow-down-filling text-[#4A4A4A]"
                            :class="{ 'rotate-180': isOpenDropdown }"
                        ></i>
                    </p>
                </div>
                <div
                    class="flex-1 flex whitespace-nowrap rounded-10px border border-[#ECECEC] mb-10px"
                >
                    <VanButton
                        :key="item.value"
                        v-for="item in timeOptions"
                        @click="setActive(item, 'time')"
                        class="rounded-lg h-8 flex-1 text-sm px-10px text-[#4A4A4A] text-13px border-transparent"
                        :class="{
                            'tlw_btn_linear !text-white font-medium border-0':
                                params[categoryActive].data?.queryTime === item.value,
                        }"
                    >
                        {{ item.text }}
                    </VanButton>
                </div>
                <van-dropdown-menu
                    style="
                        --van-dropdown-menu-shadow: transparent;
                        --van-dropdown-menu-background: transparent;
                    "
                >
                    <van-dropdown-item
                        ref="dropdownRef"
                        @open="isOpenDropdown = true"
                        @close="isOpenDropdown = false"
                    >
                        <template #default>
                            <div class="bg-white rounded-b-20px overflow-hidden z-0">
                                <div class="px-10px">
                                    <p class="text-sm text-txt font-medium">交易状态</p>
                                    <div
                                        class="flex-1 grid grid-cols-4 gap-10px whitespace-nowrap pt-2 pb-10px justify-between"
                                    >
                                        <VanButton
                                            :key="item.value"
                                            v-for="item in statusOptions"
                                            @click="setActive(item, 'status')"
                                            class="rounded-lg h-[26px] text-sm text-[#4A4A4A] text-13px bg-mainBg border-transparent"
                                            :class="{
                                                '!bg-[#F7F7F7] !text-txt font-medium border-[0.5px] border-txt':
                                                    params[categoryActive].data
                                                        ?.transactionStatus == item.value,
                                            }"
                                        >
                                            {{ item.text }}
                                        </VanButton>
                                    </div>
                                </div>
                                <div class="px-10px mb-[5px]" v-if="types?.[0]">
                                    <p
                                        class="text-sm pt-10px text-txt font-medium border-t border-t-mainBg"
                                    >
                                        交易类型
                                    </p>
                                    <div
                                        class="flex-1 grid grid-cols-4 gap-10px whitespace-nowrap pt-2 pb-10px"
                                    >
                                        <VanButton
                                            :key="item.payType"
                                            v-for="item in types"
                                            @click="setType(item)"
                                            class="rounded-lg h-[26px] text-sm px-10px text-[#4A4A4A] text-13px bg-[#F7F7F7] border-transparent"
                                            :class="{
                                                '!bg-[#F7F7F7] !text-txt font-medium border-[0.5px] border-txt':
                                                    params[categoryActive].data?.transactionType ==
                                                    item.payType,
                                            }"
                                        >
                                            {{ item.payName }}
                                        </VanButton>
                                    </div>
                                </div>
                                <div class="flex items-center px-10px pb-10px">
                                    <VanButton
                                        @click="dropdownRef?.toggle()"
                                        class="w-[73px] bg-[#E7EDFD] text-txt rounded-xl mr-10px h-11 border-0 text-15px"
                                    >
                                        取消
                                    </VanButton>
                                    <VanButton
                                        @click="submit"
                                        class="flex-1 h-11 border-0 text-15px rounded-xl tlw_btn_linear text-white"
                                    >
                                        确定
                                    </VanButton>
                                </div>
                            </div>
                        </template>
                    </van-dropdown-item>
                </van-dropdown-menu>
            </div>
            <div class="flex-1 overflow-y-auto relative">
                <PullRefreshList
                    v-if="list?.[0]"
                    :onLoad="onLoad"
                    :refresh="onRefresh"
                    :finished="finished"
                    :list-props="{ immediateCheck: false }"
                >
                    <div
                        class="bg-white rounded-20px bg-gradient-to-b from-white from-66% via-[#f7f7f9] via-92% to-white mb-10px"
                    >
                        <ul class="px-10px border-t-mainBg" :class="{ 'mt-10px': list?.length }">
                            <li
                                class="h-16 flex items-center border-b border-b-minborder-t-mainBg border-solid last-of-type:border-b-0"
                                @click="toDetail(item)"
                                v-for="(item, index) in list"
                                :key="index"
                            >
                                <div class="flex items-center flex-1 overflow-hidden">
                                    <img
                                        class="w-[34px] h-[34px] rounded-full"
                                        v-lazy="finances(item.payType)"
                                        alt=""
                                    />
                                    <div class="ml-3 flex flex-col flex-1 overflow-hidden">
                                        <p
                                            class="line-clamp-1 text-sm text-mainText font-medium font-PFSC"
                                        >
                                            {{ item.payChannelName || item.transactionType }}
                                        </p>
                                        <span class="text-xs text-gz">
                                            {{ formatTime(item.createdAt, "MM-DD HH:mm") }}
                                        </span>
                                    </div>
                                </div>
                                <div class="text-right flex flex-col">
                                    <p class="text-17px font-bold font-AH">
                                        {{ item.coinApply }}
                                    </p>
                                    <span
                                        class="text-xs text-gz"
                                        :class="{
                                            '!text-fz_g': item.status == 2,
                                            '!text-tip': item.status == 3,
                                        }"
                                    >
                                        {{ status[item.status] || "-" }}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </PullRefreshList>
                <NoData
                    :text="'暂无记录'"
                    v-show="
                        !loading &&
                        ((categoryActive == '0' && !dList?.[0]) ||
                            (categoryActive == '1' && !wList?.[0]))
                    "
                    @click="router.push('/match')"
                />
            </div>
        </div>
        <TransactionDetail
            :type="1"
            v-model="showDetail"
            :item="detailItem"
            :active="categoryActive"
        />
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import { useStore } from "@/stores";
import { formatTime, timeOut, toService } from "@/utils";
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import type { SwiperRef } from "@/components/types";
import type { DropdownItemInstance } from "vant";
import NavBar from "@/components/NavBar.vue";
import NoData from "@/components/NoData.vue";
import TransactionDetail from "@/components/TransactionDetail.vue";
import { IdepositRecords } from "@/api/depositAndWithdrawal/interface";
import { DList, DepositTransactionType } from "@/api/depositAndWithdrawal/types";
import { WList } from "@/api/depositAndWithdrawal/types";
import PullRefreshList from "@/components/PullRefreshList.vue";
import { finances } from "@/utils/icons";

interface Item {
    text: string;
    value: string;
    endDate?: number;
    startDate?: number;
    [name: string]: any;
}

interface Itypes {
    text: string;
    value: string;
}

const dropdownRef = ref<DropdownItemInstance>();
const swiperRef = ref<SwiperRef>();
const router = useRouter();
const { setLoading } = useStore();
const { loading } = storeToRefs(useStore());
const showDetail = ref<boolean>(false);
const detailItem = ref<DList | WList>();
const dList = ref<DList[]>([]);
const wList = ref<WList[]>([]);
const categoryActive = ref("0");
const finished = ref<boolean>(false);
const isOpenDropdown = ref<boolean>(false);
const category: Itypes[] = [
    { text: "充值", value: "0" },
    { text: "提现", value: "1" },
];

const timeOptions: Item[] = [
    { text: "今日", value: "0" },
    { text: "昨日", value: "1" },
    { text: "近7日", value: "2" },
    { text: "近30日", value: "3" },
];

const typeOptions = ref<DepositTransactionType[]>([{ payName: "全部", payType: "ALL" }]);

const wTypeOptions: DepositTransactionType[] = [
    { payName: "全部", payType: "ALL" },
    { payName: "银行转帐", payType: "BANK_TRANSFER" },
    { payName: "数字货币", payType: "DIGITAL_CURRENCY" },
];

const statusOptions: Itypes[] = [
    { text: "全部", value: "0" },
    { text: "待处理", value: "1" },
    { text: "成功", value: "2" },
    { text: "失败", value: "3" },
];

interface Istatus {
    [name: number]: any;
}
const status: Istatus = {
    1: "待处理",
    2: "成功",
    3: "失败",
};

const params = ref<{ [name: string]: IdepositRecords }>({
    0: {
        current: 1,
        data: {
            queryTime: "",
            transactionStatus: "",
            transactionType: "",
        },
        size: 20,
        sortField: [],
        sortKey: "DESC",
    },
    1: {
        current: 1,
        data: {
            queryTime: "",
            transactionStatus: "",
            transactionType: "",
        },
        size: 20,
        sortField: [],
        sortKey: "DESC",
    },
});

params.value[categoryActive.value].data!.queryTime = timeOptions[0].value;
params.value[categoryActive.value].data!.transactionStatus = statusOptions[0].value;
params.value[categoryActive.value].data!.transactionType = typeOptions.value[0].payType;
params.value[1].data!.queryTime = timeOptions[0].value;
params.value[1].data!.transactionStatus = statusOptions[0].value;
params.value[1].data!.transactionType = typeOptions.value[0].payType;

const list = computed(() => (categoryActive.value == "0" ? dList.value : wList.value));
const types = computed(() => (categoryActive.value == "0" ? typeOptions.value : wTypeOptions));

const submit = () => {
    params.value[categoryActive.value].current = 1;
    finished.value = false;
    clearData();
    getData();
    dropdownRef.value?.toggle();
};

const setActive = (item: Item, type?: "time" | "status") => {
    switch (type) {
        case "time":
            params.value[categoryActive.value].data!.queryTime = item.value;
            finished.value = false;
            clearData();
            getData();
            break;
        case "status":
            params.value[categoryActive.value].data!.transactionStatus = item.value;
            break;
        default:
            categoryActive.value = item.value;
            finished.value = false;
            clearData();
            getData();
            break;
    }
};

const setType = (item: DepositTransactionType) => {
    params.value[categoryActive.value].data!.transactionType = item.payType;
};

const getData = async (status?: boolean) => {
    const res = await (categoryActive.value == "0"
        ? depositRecords(status)
        : withdrawalRecords(status));
    return res;
};

const toDetail = (item: DList | WList) => {
    showDetail.value = true;
    detailItem.value = item;
};

const clearData = () => {
    params.value[categoryActive.value].current = 1;
    dList.value = [];
    wList.value = [];
};

const onRefresh = async () => {
    params.value[categoryActive.value].current = 1;
    finished.value = false;
    return await getData();
};

const onLoad = async () => {
    return await getData(false);
};

const depositTransactionType = async () => {
    // 存款交易类型
    setLoading(true);
    const res = await API.depositTransactionType();
    if (res.code == 0) {
        if (res.data) typeOptions.value = [...typeOptions.value, ...res.data];
        params.value[categoryActive.value].data!.transactionType = typeOptions.value?.[0]?.payType!;
        depositRecords();
    }
};

const depositRecords = async (isLoading: boolean = true) => {
    // 充值
    if (isLoading) setLoading(true);
    const res = await API.depositRecords(params.value[categoryActive.value]);
    setLoading(false);
    if (res.code === 0) {
        const list = res.data?.list || [];
        const isConcat = {
            true: [...dList.value, ...list!],
            false: list,
        };
        dList.value = isConcat[`${params.value[categoryActive.value].current != 1}`];
        if (res.data?.pages! <= params.value[categoryActive.value].current || res.data?.pages == 0)
            finished.value = true;
        params.value[categoryActive.value].current++;
    }
    swiperRef.value?.update?.();
    return res;
};

const withdrawalRecords = async (isLoading: boolean = true) => {
    // 提现
    if (isLoading) setLoading(true);
    const res = await API.withdrawalRecords(params.value[categoryActive.value]);
    setLoading(false);
    if (res.code === 0) {
        const list = res.data?.list || [];
        const isConcat = {
            true: [...wList.value, ...list!],
            false: list,
        };
        wList.value = isConcat[`${params.value[categoryActive.value].current != 1}`];
        if (res.data?.pages! <= params.value[categoryActive.value].current || res.data?.pages == 0)
            finished.value = true;
        params.value[categoryActive.value].current++;
    }
    swiperRef.value?.update?.();
    return res;
};

depositTransactionType();
</script>

<style lang="scss" scoped>
::v-deep(.van-dropdown-menu) {
    .van-popup {
        background: transparent;
    }
    .van-dropdown-menu__bar {
        height: initial;
    }
    .van-dropdown-menu__item {
        justify-content: start;
    }
    .van-dropdown-menu__title {
        padding-left: 0;
        &::after {
            content: inherit;
        }
    }
}
</style>
