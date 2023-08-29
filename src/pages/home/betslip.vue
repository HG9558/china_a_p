<!-- 首页 注单 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg betslip">
        <div class="flex-shrink-0 h-[50px]">
            <HeaderTabs service v-if="platBetTabs?.[0]" @change="changeTab" :tabs="platBetTabs" />
        </div>
        <div class="flex-1 rounded-t-20px bg-mainBg flex flex-col overflow-hidden">
            <div class="bg-white overflow-hidden" :class="{ '!px-0': !params.data?.id }">
                <div class="flex min-h-[50px] items-center justify-between pr-10px">
                    <div class="flex px-10px py-[9px]" v-show="params.data?.id">
                        <VanButton
                            :key="item.id"
                            :disabled="loading"
                            v-for="(item, index) in tabs"
                            @click="changeStatus(item, index)"
                            class="h-8 w-[100px] mr-[6px] rounded-[10px] bg-[#F3F3F5] last-of-type:mr-0 border-[#EAEAEA] px-0"
                            :class="{
                                '!tlw_btn_linear text-white border-0 font-medium':
                                    active_c === index,
                            }"
                        >
                            {{ item.title }}
                            <span v-if="index == 0 && unsettledQuantity">
                                {{ unsettledQuantity }}
                            </span>
                        </VanButton>
                    </div>
                    <div
                        class="flex flex-col flex-1 py-10px overflow-hidden"
                        v-show="!params.data?.id && !tabsLoading"
                    >
                        <div class="flex items-center justify-between px-2">
                            <VanButton
                                :key="item.value"
                                class="h-9 w-[76px] rounded-10px border-0 whitespace-nowrap text-sm bg-gradient-to-b from-mainBg to-[#F1F1F1]"
                                :class="{
                                    '!tlw_btn_linear text-white': index == gameActive,
                                }"
                                v-for="(item, index) in timeOptions"
                                @click="selectGameTime(index)"
                            >
                                {{ item.text }}
                            </VanButton>
                        </div>
                    </div>
                    <VanPopover
                        v-if="params.data?.id && active_c != 0"
                        v-model:show="showPopover"
                        :actions="actions"
                        @select="onSelect"
                        placement="bottom-end"
                        style="--van-popover-action-height: 2.375rem"
                    >
                        <ul class="py-10px w-28">
                            <li
                                class="h-[31px] relative flex items-center px-10px"
                                :class="{ 'bg-mainBg': actionsActive == item.key }"
                                v-for="(item, index) in actions"
                                @click.stop="onSelect(item)"
                                :key="index"
                            >
                                <p
                                    class="flex-1 text-txt_d"
                                    :class="{
                                        '!text-main font-semibold': actionsActive == item.key,
                                    }"
                                >
                                    {{ item.text }}
                                </p>
                                <i
                                    v-show="actionsActive == item.key"
                                    class="icon-select-bold flex-shrink-0 text-main"
                                ></i>
                            </li>
                        </ul>
                        <template #reference>
                            <div class="flex items-center justify-center">
                                <VanButton class="px-10px h-8 rounded-[10px] pb-[2px]">
                                    <span class="mr-1 text-xs whitespace-nowrap">
                                        {{ actions[actionsActive].text }}
                                    </span>
                                    <i
                                        class="icon-arrow-down-filling text-[#9BA1AE] text-xs scale-75 inline-block transition-all"
                                        :class="{ 'rotate-180': showPopover }"
                                    />
                                </VanButton>
                            </div>
                        </template>
                    </VanPopover>
                </div>
                <div
                    v-show="!params.data?.id || active_c == 1"
                    class="flex items-center text-xs pl-2 flex-nowrap bg-gradient-to-b h-10 from-[#F0F3FE] to-[#fff]"
                >
                    <div
                        :key="item.key"
                        v-for="(item, index) in gameTabs"
                        class="last-of-type:mr-0 text-13px flex-shrink-0 overflow-hidden flex items-center"
                        :class="{ 'flex-[2]': index > 0, 'flex-[1.5]': index == 0 }"
                    >
                        <span class="mr-1 flex-shrink-0">
                            {{ item.title }}
                        </span>
                        <span class="text-mainText font-semibold break-all line-clamp-1">
                            {{ loading ? ellipsis(item.value) : item.value }}
                        </span>
                    </div>
                </div>
                <div
                    class="flex w-full items-center text-xs text-[#666] bg-[#F0F0F0] h-[38px]"
                    v-if="rotationNoticeList?.[0] && params.data?.id"
                    @click="router.push('/matchNotice')"
                    v-show="params.data?.id"
                >
                    <div class="flex items-center flex-shrink-0 whitespace-nowrap pl-10px">
                        <img class="w-5 h-5 mr-1 object-cover" :src="icon_noticeBar" alt="" />
                        <span class="text-mainText">赛事公告：</span>
                    </div>
                    <VanNoticeBar
                        color="#334ABF"
                        class="w-full"
                        left-icon="volume-o"
                        background="transparent"
                        style="
                            --van-notice-bar-height: 1.875rem;
                            --van-notice-bar-font-size: 0.75rem;
                            --van-notice-bar-padding: 0;
                        "
                    >
                        <template #left-icon> </template>
                        <span
                            class="text-txt_d"
                            v-for="(item, index) in rotationNoticeList"
                            :key="index"
                        >
                            {{ item.context }} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </span>
                    </VanNoticeBar>
                </div>
            </div>
            <div class="bg-mainBg flex-1 overflow-y-auto relative">
                <VanPullRefresh disabled>
                    <BetslipGame
                        v-if="!params.data?.id && !byDateLoading && gameList?.[0]"
                        :gameList="gameList"
                    />
                    <template v-else-if="list?.[0]">
                        <div class="px-2 h-full">
                            <DynamicScroller
                                :minItemSize="5"
                                :keyField="'id'"
                                :pageMode="true"
                                :items="list"
                                @scrollEnd="scrollEnd"
                                ref="dynamicScrollerRef"
                                class="overflow-y-auto h-full scrollbar-thin scrollbar-thumb-main_t/75 scrollbar-thumb-rounded-lg scrollbar-w-1"
                            >
                                <template v-slot="{ item, active }">
                                    <DynamicScrollerItem
                                        :item="item"
                                        :active="active"
                                        :data-index="item.cpn"
                                    >
                                        <BetslipItem
                                            :item="item"
                                            :active="active"
                                            :page="params.current"
                                            :active_c="active_c"
                                        />
                                    </DynamicScrollerItem>
                                </template>
                                <template #after>
                                    <div
                                        class="h-10 text-txt_d flex pt-2 justify-center text-xs w-full"
                                    >
                                        <van-loading size="20" type="spinner" v-show="!finished" />
                                        <span class="mx-1" v-show="finished && list?.[0]">
                                            没有更多了
                                        </span>
                                        <span class="mx-1" v-show="byDateLoading">加载中...</span>
                                    </div>
                                </template>
                            </DynamicScroller>
                        </div>
                    </template>
                </VanPullRefresh>
                <NoData @click="router.push('/match')" v-show="showNoData" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref, nextTick, onBeforeUnmount } from "vue";
import dayjs from "dayjs";
import { API } from "@/api";
import type { RotationNotice } from "@/api/notice/types";
import type { IgetBetListByDate } from "@/api/platform/interface";
import type {
    DList,
    GetBetListByGame,
    GetPlatBetTabs,
    GameList,
    GetBetListByDate,
} from "@/api/platform/types";
import { useStore } from "@/stores";
import { storeToRefs } from "pinia";
import type { SwiperRef } from "@/components/types";
import icon_noticeBar from "@/assets/icon/icon_noticeBar.png";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import BetslipItem from "@/components/Betslip/BetslipItem.vue";
import BetslipGame from "@/components/Betslip/BetslipGame.vue";
import NoData from "@/components/NoData.vue";
import HeaderTabs from "@/components/HeaderTabs.vue";
import { ellipsis, timeOut } from "@/utils";
import { useRouter } from "vue-router";
import { useHomeWorker } from "@/worker";
import { Fdata } from "@/api/obsportend/obSport/types";

interface IgameTabs {
    title: string;
    unit?: string;
    key: string;
    value?: string;
    [name: string]: any;
}

const now = dayjs();
const router = useRouter();
const dynamicScrollerRef = ref();
const { setLoading } = useStore();
const { loading } = storeToRefs(useStore());
const active = ref<number>(0);
const active_c = ref<number>(0);
const showPopover = ref(false);
const platBetTabs = ref<GetPlatBetTabs[]>();
const rotationNoticeList = ref<Fdata[]>();
const list = ref<DList[]>([]);
const swiperRef = ref<SwiperRef>();
const gameInfo = ref<GetBetListByGame>();
const finished = ref<boolean>(false); //判断是否加载完
const byDateLoading = ref<boolean>(false);
const isRender = ref<boolean>(false); //判断是否渲染完成,阻止重复请求
const gameActive = ref<number>(0);
const gameList = ref<GameList[]>();
const tabsLoading = ref<boolean>(false);
const unsettledQuantity = ref<number>();
const gameTabs = ref<IgameTabs[]>([
    { title: "总计(单):", key: "total", value: "" },
    { title: "投注金额:", key: "totalAmount", value: "" },
    { title: "输赢金额:", key: "totalProfit", value: "" },
]);

interface Iactions {
    text: string;
    startTime: number;
    endTime: number;
    key: number;
}
const actions: Iactions[] = [
    {
        text: "今天",
        startTime: now.startOf("date").unix(),
        endTime: now.endOf("days").unix(),
        key: 0,
    },
    {
        text: "昨天",
        startTime: now.subtract(1, "day").startOf("date").unix(),
        endTime: now.subtract(1, "day").endOf("date").unix(),
        key: 1,
    },
    {
        text: "近3天",
        startTime: now.subtract(2, "days").startOf("date").unix(),
        endTime: now.unix(),
        key: 2,
    },
    {
        text: "近7天",
        startTime: now.subtract(6, "days").startOf("date").unix(),
        endTime: now.unix(),
        key: 3,
    },
    {
        text: "本月",
        startTime: now.startOf("month").unix(),
        endTime: now.unix(),
        key: 4,
    },
    {
        text: "上月",
        startTime: now.subtract(1, "months").startOf("month").unix(),
        endTime: now.subtract(1, "month").endOf("month").unix(),
        key: 5,
    },
];

const timeOptions = ref([
    {
        text: "今日",
        value: 1,
        startDate: now.startOf("date").unix(),
        endDate: now.endOf("days").unix(),
    },
    {
        text: "昨天",
        value: 2,
        startDate: now.subtract(1, "day").startOf("date").unix(),
        endDate: now.subtract(1, "day").endOf("date").unix(),
    },
    {
        text: "近7天",
        value: 4,
        startDate: now.subtract(6, "days").startOf("date").unix(),
        endDate: now.unix(),
    },
    {
        text: "近30天",
        value: 5,
        startDate: now.subtract(29, "days").startOf("date").unix(),
        endDate: now.unix(),
    },
]);

const actionsActive = ref<number>(0);
interface Itabs {
    title: string;
    id: number;
}
const tabs: Itabs[] = [
    { title: "未结算", id: 0 },
    { title: "已结算", id: 1 },
];
const params = ref<IgetBetListByDate>({
    current: 1,
    size: 10,
    data: {
        id: 0,
        status: tabs[0].id,
        startTime: actions[0].startTime,
        endTime: actions[0].endTime,
    },
});

const showNoData = computed(() => {
    return params.value.data?.id && !loading.value && !list.value?.[0];
});

const onSelect = (action: Iactions) => {
    actionsActive.value = action.key;
    params.value.data!.startTime = action.startTime;
    params.value.data!.endTime = action.endTime;
    finished.value = false;
    params.value.current = 1;
    showPopover.value = false;
    getBetListByDate();
};

const changeStatus = (item: Itabs, index: number) => {
    list.value = [];
    active_c.value = index;
    params.value.data!.status = item.id;
    finished.value = false;
    params.value.current = 1;
    getBetListByDate();
};

const changeTab = (index: number) => {
    gameList.value = platBetTabs.value?.[index]?.gameList!;
    if (!platBetTabs.value?.[index]?.id) {
        params.value.data!.id = null;
        params.value.data!.startTime = timeOptions.value[gameActive.value].startDate;
        params.value.data!.endTime = timeOptions.value[gameActive.value].endDate;
        getBetListByGame();
        return;
    }
    finished.value = false;
    params.value.current = 1;
    params.value.data!.status = tabs[active_c.value]?.id;
    params.value.data!.startTime = actions[actionsActive.value].startTime;
    params.value.data!.endTime = actions[actionsActive.value].endTime;
    params.value.data!.id = platBetTabs.value?.[index]?.id;
    params.value.data!.groupId = platBetTabs.value?.[index]?.groupId;
    getBetListByDate();
};

const selectGameTime = async (index: number) => {
    gameActive.value = index;
    params.value.data!.startTime = timeOptions.value[index].startDate;
    params.value.data!.endTime = timeOptions.value[index].endDate;
    getBetListByGame();
};

const getPlatBetTabs = async () => {
    setLoading(true);
    tabsLoading.value = true;
    const res = await API.getPlatBetTabs();
    tabsLoading.value = false;
    if (res.code === 0) {
        const data = res.data;
        platBetTabs.value = data!;
        params.value.data!.id = platBetTabs.value?.[active.value]?.id;
        params.value.data!.groupId = platBetTabs.value?.[active.value]?.groupId;
        getBetListByDate();
    }
};

const scrollEnd = async () => {
    if (isRender.value) getBetListByDate(false);
};

const setGameTabs = (data?: GetBetListByDate | GetBetListByGame | null) => {
    gameTabs.value.forEach((item, index) => {
        if (data?.[item.key]) {
            gameTabs.value[index].value! = data?.[item.key];
        }
    });
};

const getBetListByDate = async (isLoading: boolean = true) => {
    if (finished.value) return;
    if (isLoading) setLoading(true);
    byDateLoading.value = true;
    isRender.value = false;
    const startTime =
        active_c.value == 0 ? actions[4].startTime : actions[actionsActive.value].startTime;
    const endTime = active_c.value == 0 ? actions[4].endTime : actions[actionsActive.value].endTime;
    const res = await API.getBetListByDate({
        ...params.value,
        data: {
            ...params.value.data,
            startTime,
            endTime,
        },
    });
    if (res.code === 0) {
        setGameTabs(res.data);
        const _list =
            res.data?.list?.map(item => ({
                ...item,
                id: `${item.transactionId + item.createdAt}`,
            })) || [];
        const current = params.value.current;
        const isConcat = {
            true: [...list.value, ..._list!],
            false: _list,
        };
        list.value = isConcat[`${current != 1}`]!;
        if (active_c.value == 0) unsettledQuantity.value = res.data?.total;
        if (!_list.length && current == 1) list.value = []; //没有数据置空
        if (current == 1) nextTick(() => dynamicScrollerRef.value?.scrollToItem?.(0));
        if (_list.length! < params.value.size) finished.value = true; // 加载完所有数据
        if (!isLoading || current == 1) params.value.current++;
    }
    setLoading(false);
    byDateLoading.value = false;
    nextTick(async () => {
        await timeOut(0);
        isRender.value = true;
    });
    swiperRef.value?.update?.();
    if (res.code === 502) {
        finished.value = false;
        isRender.value = true;
    }
};

const getBetListByGame = async () => {
    setLoading(true);
    const data = params.value;
    delete data.data?.id;
    delete data.data?.status;
    delete data.data?.groupId;
    const res = await API.getBetListByGame({ ...data, size: 50 });
    if (res.code === 0) {
        setGameTabs(res.data);
        gameInfo.value = res.data!;

        const data = await useHomeWorker.getBetListByGame(
            JSON.stringify(gameList.value || []),
            JSON.stringify(res.data?.list || [])
        );

        if (data?.[0]) gameList.value = data;
    }
    setLoading(false);
    swiperRef.value?.update?.();
};

const frontListPB = async () => {
    setLoading(true);
    const res = await API.frontListPB();
    setLoading(false);
    if (res.code === 0) {
        rotationNoticeList.value = res.data?.nb!;
    }
    swiperRef.value?.update?.();
};

frontListPB();
getPlatBetTabs();
onBeforeUnmount(() => {
    gameList.value = [];
});
</script>
