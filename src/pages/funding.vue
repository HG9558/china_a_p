<!-- 资金明细 -->
<template>
    <div class="h-full w-full flex flex-col tlw_top_bg bg-mainBg">
        <NavBar class="flex-shrink-0" :transparent="true" :nav-bar-props="{ title: '资金明细' }">
            <template #right>
                <i class="z-10 text-white ml-2 icon-erji text-lg" @click="toService" />
            </template>
        </NavBar>
        <div class="flex-1 rounded-2xl bg-mainBg flex flex-col overflow-hidden">
            <div
                class="bg-white rounded-t-20px px-10px"
                :class="{ '!rounded-b-none': isOpenDropdown }"
            >
                <div class="border-t border-t-mainBg">
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
                            v-for="(item, index) in timeOptions"
                            @click="setActive(index, 'time')"
                            class="rounded-lg h-8 flex-1 text-sm px-10px text-[#4A4A4A] text-13px border-transparent"
                            :class="{
                                'tlw_btn_linear !text-white font-medium border-0':
                                    timeOptions[timeActive].value === item.value,
                            }"
                        >
                            {{ item.text }}
                        </VanButton>
                    </div>
                    <van-dropdown-menu
                        style="
                            --van-dropdown-menu-shadow: transparent;
                            --van-dropdown-menu-background: transparent;
                            --van-overlay-background: #00000030;
                        "
                    >
                        <van-dropdown-item
                            ref="dropdownRef"
                            @open="isOpenDropdown = true"
                            @close="isOpenDropdown = false"
                        >
                            <template #default>
                                <div class="bg-white rounded-b-20px overflow-hidden">
                                    <div class="px-10px">
                                        <p class="text-sm text-txt font-medium">交易类型</p>
                                        <div
                                            class="flex-1 grid grid-cols-4 gap-10px whitespace-nowrap pt-2 pb-10px"
                                        >
                                            <VanButton
                                                :key="item.value"
                                                v-for="(item, index) in typeOptions"
                                                @click="setActive(index, 'type')"
                                                class="rounded-lg h-[26px] text-sm px-10px text-[#4A4A4A] text-13px bg-[#F7F7F7] border-transparent"
                                                :class="{
                                                    '!bg-[#F7F7F7] !text-txt font-medium border-[0.5px] border-txt':
                                                        typeOptions[typeActive].value == item.value,
                                                }"
                                            >
                                                {{ item.text }}
                                            </VanButton>
                                        </div>
                                        <div class="flex items-center pb-10px">
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
                                </div>
                            </template>
                        </van-dropdown-item>
                    </van-dropdown-menu>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto relative">
                <PullRefreshList
                    v-if="fList?.[0]"
                    :onLoad="onLoad"
                    :refresh="onRefresh"
                    :finished="finished"
                    :list-props="{ immediateCheck: false }"
                >
                    <div
                        class="bg-white rounded-20px bg-gradient-to-b from-white from-66% via-[#f7f7f9] via-92% to-white mb-10px"
                    >
                        <ul class="px-10px border-t-mainBg" :class="{ 'mt-10px': fList?.length }">
                            <li
                                class="h-16 px-3 flex items-center border-b border-b-minborder-t-mainBg border-solid"
                                v-for="(item, index) in fList"
                                @click="toDetail(item)"
                                :key="index"
                            >
                                <div class="flex items-center flex-1 overflow-hidden">
                                    <img
                                        class="w-[34px] h-[34px] rounded-full"
                                        v-lazy="finances(item.iconType)"
                                        alt=""
                                    />
                                    <div class="ml-3 flex flex-col flex-1 overflow-hidden">
                                        <p class="line-clamp-1 text-sm font-medium">
                                            {{ item.transactionType || "-" }}
                                        </p>
                                        <span class="text-xs text-gz">
                                            {{ formatTime(item.createdAt, "MM-DD HH:mm") }}
                                        </span>
                                    </div>
                                </div>
                                <div class="px-3 text-right flex flex-col">
                                    <p
                                        class="text-17px font-bold"
                                        :class="{
                                            '!text-[#5FC253]': item?.outIn == 0,
                                            '!text-tip': item?.outIn == 1,
                                        }"
                                    >
                                        {{
                                            `${item.outIn == 0 ? "-" : item.outIn == 1 ? "+" : ""}${
                                                item.coin || "0.00"
                                            }`
                                        }}
                                    </p>
                                    <span class="text-xs text-gz">
                                        余额 {{ item.coinNow || "-" }}
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </PullRefreshList>
                <NoData
                    :text="'暂无记录'"
                    v-show="!loading && !fList?.[0]"
                    @click="router.push('/match')"
                />
            </div>
        </div>
        <TransactionDetail v-model="showDetail" :item="detailItem" :type="2" />
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import { useStore } from "@/stores";
import { formatTime, toService } from "@/utils";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import type { DropdownItemInstance } from "vant";
import NavBar from "@/components/NavBar.vue";
import NoData from "@/components/NoData.vue";
import TransactionDetail from "@/components/TransactionDetail.vue";
import { finances } from "@/utils/icons";
import { IfundsDetailsList } from "@/api/funds/interface";
import { FList } from "@/api/funds/types";
import PullRefreshList from "@/components/PullRefreshList.vue";

interface Item {
    text: string;
    value: string;
    endDate?: number;
    startDate?: number;
    [name: string]: any;
}

const dropdownRef = ref<DropdownItemInstance>();
const router = useRouter();
const { setLoading } = useStore();
const { loading } = storeToRefs(useStore());
const showDetail = ref<boolean>(false);
const detailItem = ref<FList>();
const fList = ref<FList[]>([]);
const timeActive = ref<number>(0);
const typeActive = ref<number>(0);
const isOpenDropdown = ref<boolean>(false);
const finished = ref<boolean>(false);
const timeOptions: Item[] = [
    { text: "今日", value: "0" },
    { text: "昨日", value: "1" },
    { text: "近7日", value: "2" },
    { text: "近30日", value: "3" },
];

const typeOptions = [
    { text: "全部", value: "0" },
    { text: "充值", value: "1" },
    { text: "提现", value: "2" },
    { text: "转账", value: "3" },
    { text: "返水", value: "4" },
    { text: "活动", value: "5" },
    { text: "福利", value: "6" },
    { text: "调账", value: "7" },
    { text: "优惠", value: "8" },
    { text: "其他", value: "9" },
];

const params = ref<IfundsDetailsList>({
    current: 1,
    data: {
        queryTime: "",
        queryType: "",
    },
    size: 20,
    sortField: [],
    sortKey: "DESC",
});

params.value.data!.queryTime = timeOptions[timeActive.value].value;
params.value.data!.queryType = typeOptions[typeActive.value].value;

const setActive = (index: number, type?: "time" | "type") => {
    params.value.current = 1;
    switch (type) {
        case "time":
            params.value.data.queryTime = timeOptions[index].value;
            params.value.current = 1;
            fList.value = [];
            finished.value = false;
            timeActive.value = index;
            fundsDetailsList();
            break;
        case "type":
            params.value.data.queryType = typeOptions[index].value;
            typeActive.value = index;
            break;
        default:
            break;
    }
};

const submit = () => {
    fList.value = [];
    params.value.current = 1;
    finished.value = false;
    dropdownRef.value?.toggle();
    fundsDetailsList();
};

const toDetail = (item: FList) => {
    showDetail.value = true;
    detailItem.value = item;
};

const onRefresh = async () => {
    params.value.current = 1;
    finished.value = false;
    return await fundsDetailsList();
};

const onLoad = async () => {
    return await fundsDetailsList(false);
};

const fundsDetailsList = async (isLoading: boolean = true) => {
    if (isLoading) setLoading(true);
    const res = await API.fundsDetailsList(params.value);
    setLoading(false);
    if (res.code === 0) {
        const list = res.data?.list || [];
        const isConcat = {
            true: [...fList.value, ...list!],
            false: list,
        };
        fList.value = isConcat[`${params.value.current != 1}`];
        if (res.data?.pages! <= params.value.current || res.data?.pages == 0) {
            finished.value = true;
        }
        params.value.current++;
    }
    return res;
};
fundsDetailsList();
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
