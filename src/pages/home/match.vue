<!-- 首页 赛事 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg">
        <HomeHeader class="flex-shrink-0" />
        <!-- <HeaderTabs /> -->
        <div class="bg-white flex-1 flex flex-col relative rounded-t-20px overflow-hidden z-0">
            <template v-if="normal">
                <div
                    class="shadow"
                    :class="{
                        '!pb-0': params.type == 6,
                        'border-b-fz_b border-b': params.type == 100,
                    }"
                >
                    <div class="h-[52px]">
                        <VanTabs
                            shrink
                            ref="tabRef"
                            line-width="0"
                            @change="changeTab"
                            v-model:active="active"
                            :beforeChange="beforeChange"
                            style="
                                --van-tabs-line-height: initial;
                                --van-tabs-nav-background: transparent;
                                --van-tabs-bottom-bar-width: 0;
                                --van-tab-disabled-text-color: #303033;
                            "
                        >
                            <VanTab
                                v-for="(item, index) in initPBList"
                                :key="item.menuId + item.matchesCount"
                                :disabled="loading"
                            >
                                <template #title>
                                    <div
                                        class="relative w-12 text-center flex flex-col items-center justify-center pt-[6px]"
                                    >
                                        <i
                                            v-if="initPBList"
                                            class="h-[11px] w-[1px] rounded-sm bg-[#E4E4EB] absolute -right-2"
                                            v-show="index != initPBList.length - 1"
                                        />
                                        <span
                                            class="whitespace-nowrap font-medium text-sm text-[#79797C]"
                                            :class="{
                                                '!text-base !font-semibold !text-mainText':
                                                    active === index,
                                            }"
                                        >
                                            {{ item?.menuName }}
                                        </span>
                                        <span
                                            class="w-[51px] h-[21px] rounded-lg font-OPPO_M text-13px text-[#79797C] -translate-y-1 z-10 pt-[2px]"
                                            :class="{
                                                '!text-mainText !font-OPPO_B font-normal line':
                                                    active === index,
                                            }"
                                        >
                                            {{ item?.matchesCount }}
                                        </span>
                                    </div>
                                </template>
                            </VanTab>
                        </VanTabs>
                    </div>
                    <div class="pt-1 pb-10px tabs_sports" v-show="params.type !== 6">
                        <VanTabs
                            shrink
                            animated
                            line-width="0"
                            class="tabs_c"
                            @change="tabChangeTwo"
                            v-model:active="active_c"
                            v-if="initLoading || subList?.[0]"
                            :style="{ height: whetherDown ? '2rem' : '3.625rem' }"
                            style="
                                --van-tabs-bottom-bar-width: 0;
                                --van-tabs-line-height: 3.625rem;
                                --van-tab-disabled-text-color: #303033;
                            "
                        >
                            <VanTab
                                v-for="(item, index) in initLoading ? skSubList : subList"
                                :disabled="loading"
                                :key="index"
                            >
                                <template #title>
                                    <template v-if="initLoading">
                                        <div
                                            class="w-[74px] h-full rounded-10px pl-2 tlw_skeleton"
                                        />
                                    </template>
                                    <template v-else>
                                        <div
                                            class="flex flex-col w-[74px] h-full pt-1 bg-no-repeat bg-[length:100%] relative text-txt_d border-[0.5px] border-[#eee] rounded-10px pl-3 justify-evenly"
                                            :class="{ '!border-0': active_c === index }"
                                        >
                                            <img
                                                v-show="active_c === index"
                                                class="absolute pointer-events-none z-0 top-0 left-0 w-full h-full object-cover rounded-10px"
                                                :src="ic_select_active"
                                                alt=""
                                            />
                                            <span
                                                class="absolute text-[#79797C] font-OPPO_M top-2 left-10 text-xs scale-95"
                                                :class="{
                                                    '!text-white': active_c === index,
                                                    'top-10px': whetherDown,
                                                }"
                                            >
                                                {{ item?.matchesCount || 0 }}
                                            </span>
                                            <img
                                                v-show="!whetherDown"
                                                class="w-5 h-5 z-10"
                                                :src="
                                                    active_c === index
                                                        ? sportsActive[item?.menuType]
                                                        : sportsUn[item?.menuType]
                                                "
                                                alt=""
                                            />
                                            <p
                                                class="w-full line-clamp-1 text-xs z-10 whitespace-nowrap my-[2px] text-[#79797C]"
                                                :class="{
                                                    '!text-white font-medium': active_c === index,
                                                    'leading-8': whetherDown,
                                                }"
                                            >
                                                {{ item?.menuName }}
                                            </p>
                                        </div>
                                    </template>
                                </template>
                            </VanTab>
                        </VanTabs>
                    </div>
                </div>
                <div
                    class="h-[34px] flex flex-shrink-0 items-center relative bg-[#f7f7f7] justify-between px-10px before:absolute before:left-3 before:right-3 before:border-fz_b before:top-0"
                    v-show="!/(6|100)/.test(params.type?.toString?.())"
                >
                    <div class="flex items-center">
                        <VanButton class="border-0 px-0 h-7 mr-3" @click="getMatches">
                            <template #icon>
                                <div
                                    v-html="ic_filter"
                                    class="flex items-center justify-center w-4 h-4 rounded-full"
                                ></div>
                            </template>
                            <span class="text-[#79797C] text-sm whitespace-nowrap !font-normal">
                                筛选
                            </span>
                        </VanButton>
                        <div class="flex items-center text-sm text-[#79797C] whitespace-nowrap">
                            <VanButton class="p-0 border-0 h-5" @click="changeSort(1)">
                                <span
                                    class="text-[#79797C] text-sm"
                                    :class="{ '!text-[#434343] font-semibold': params.sort === 1 }"
                                >
                                    联赛
                                </span>
                            </VanButton>
                            <img
                                class="mx-[2px] w-4 h-4 inline-block"
                                :class="{ 'rotate-180': params.sort === 2 }"
                                :src="ic_switch"
                                alt=""
                            />
                            <VanButton class="p-0 border-0 h-5" @click="changeSort(2)">
                                <span
                                    class="text-[#79797C] text-sm"
                                    :class="{ '!text-[#434343] font-semibold': params.sort === 2 }"
                                >
                                    时间
                                </span>
                            </VanButton>
                        </div>
                    </div>
                    <div class="flex items-center relative">
                        <van-dropdown-menu
                            v-if="dayList?.[0]"
                            style="
                                --van-dropdown-menu-shadow: transparent;
                                --van-dropdown-menu-background: transparent;
                                --van-dropdown-menu-title-padding: 0;
                                --van-dropdown-menu-height: 1.75rem;
                            "
                        >
                            <van-dropdown-item
                                teleport="body"
                                ref="dropdownRef"
                                @open="isOpenDropdown = true"
                                @close="isOpenDropdown = false"
                                style="--van-dropdown-item-z-index: 31"
                            >
                                <template #title>
                                    <VanButton class="border-0 px-0 h-7 mr-3" icon-position="right">
                                        <template #icon>
                                            <div
                                                v-html="ic_date"
                                                class="flex items-center justify-center w-4 h-4 rounded-full"
                                            ></div>
                                        </template>
                                        <span class="text-[#79797C] whitespace-nowrap"> 日期 </span>
                                    </VanButton>
                                </template>
                                <template #default>
                                    <div
                                        v-if="dayList?.[0]"
                                        class="bg-white w-full"
                                        :key="dayList?.[0]?.date"
                                    >
                                        <SwiperBox :direction="'horizontal'" ref="swiperRef">
                                            <div class="flex items-center h-[60px] px-10px">
                                                <div
                                                    class="h-11 w-[72px] mr-10px last-of-type:mr-0 rounded-10px border border-[#eee] flex flex-col items-center justify-center cursor-pointer"
                                                    :class="{
                                                        'bg-main_t !border-0': dayActive == null,
                                                    }"
                                                    @click="daySubmit(null)"
                                                >
                                                    <span
                                                        class="text-13px text-[#8A8A8D]"
                                                        :class="{
                                                            '!text-white': dayActive == null,
                                                        }"
                                                    >
                                                        全部
                                                    </span>
                                                </div>
                                                <div
                                                    class="h-11 w-[72px] mr-10px last-of-type:mr-0 rounded-10px border border-[#eee] flex flex-col items-center justify-center cursor-pointer"
                                                    :class="{
                                                        'bg-main_t !border-0': dayActive == item.md,
                                                    }"
                                                    v-for="(item, index) in dayList"
                                                    @click="daySubmit(item.md)"
                                                    :key="index"
                                                >
                                                    <p
                                                        class="text-13px text-[#8A8A8D] font-medium"
                                                        :class="{
                                                            '!text-white': dayActive == item.md,
                                                        }"
                                                    >
                                                        {{ item.week }}
                                                    </p>
                                                    <span
                                                        class="text-xs text-txt_d"
                                                        :class="{
                                                            'text-white': dayActive == item.md,
                                                        }"
                                                    >
                                                        {{ item.date }}
                                                    </span>
                                                </div>
                                            </div>
                                        </SwiperBox>
                                    </div>
                                </template>
                            </van-dropdown-item>
                        </van-dropdown-menu>
                        <VanButton
                            icon-position="right"
                            class="border-0 px-0 h-7 mr-3"
                            @click="showResult = !showResult"
                        >
                            <template #icon>
                                <div
                                    v-html="ic_match_results"
                                    class="flex items-center justify-center w-4 h-4 rounded-full"
                                ></div>
                            </template>
                            <span class="text-[#79797C] whitespace-nowrap"> 赛果 </span>
                        </VanButton>
                        <VanButton class="border-0 px-0 h-7" @click="receive" icon-position="right">
                            <template #icon>
                                <div
                                    v-html="ic_filter_filling"
                                    class="flex items-center justify-center w-4 h-4 rounded-full transition-all"
                                    :class="{ 'rotate-180': receiveStatus }"
                                ></div>
                            </template>
                            <span class="text-[#79797C] whitespace-nowrap"> 收起 </span>
                        </VanButton>
                    </div>
                </div>
                <div
                    :key="active + active_c"
                    class="flex-1 overflow-y-auto bg-[#f7f7f7] relative"
                    :class="{ '!bg-white': showNoData, '!overflow-hidden': params.type == 100 }"
                >
                    <template v-if="params.type == 100">
                        <ChampionItem
                            class="z-0"
                            v-if="championList && indexList"
                            @submit="submitCDetail"
                            :list="championList"
                            :indexList="indexList"
                        />
                    </template>
                    <VanPullRefresh disabled>
                        <div ref="atTopRef" class="h-[1px]"></div>
                        <template v-if="params.type != 100">
                            <template v-if="initLoading || loading">
                                <Skeleton :key="index" v-for="(item, index) in 2" />
                            </template>
                            <DynamicScroller
                                v-if="filterData?.size"
                                :buffer="500"
                                :minItemSize="5"
                                :keyField="'tid'"
                                :pageMode="true"
                                :emitUpdate="true"
                                :items="Array.from(filterData.values())"
                                @update="update"
                            >
                                <template v-slot="{ item, index, active }">
                                    <DynamicScrollerItem
                                        :item="item"
                                        :active="active"
                                        :data-index="item.cpn"
                                    >
                                        <Competition
                                            :source="item"
                                            :index="index || 0"
                                            @click-right="clickRight"
                                            @setMatchesCount="setMatchesCount"
                                        />
                                    </DynamicScrollerItem>
                                </template>
                            </DynamicScroller>
                        </template>
                        <div
                            ref="atBottomRef"
                            class="h-10 text-txt_d flex pt-2 justify-center text-xs w-full opacity-0"
                            :class="{ 'opacity-100': params.type != 6 }"
                        >
                            <van-loading size="20" type="spinner" v-show="pagePBLoading">
                                加载中...
                            </van-loading>
                            <VanButton
                                v-show="!finished && !pagePBLoading && matchesPagePBList.size"
                                @click="matchesPagePB(false)"
                                class="h-8 text-txt border-txt"
                            >
                                加载更多
                            </VanButton>
                            <span class="mx-1" v-show="finished && matchesPagePBList.size">
                                没有更多了
                            </span>
                        </div>
                    </VanPullRefresh>
                    <NoData v-show="showNoData" @click="router.push('/')" />
                </div>
            </template>
            <template v-else>
                <InMaintenance />
            </template>
        </div>
        <TournamentMatches ref="tournamentMatchesRef" @submit="submit" :euid="params?.euid" />
        <ChampionDetail :data="cDetailList" v-model="showCDetail" />
        <MatchResults v-model="showResult" />
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import { useStore } from "@/stores";
import {
    ref,
    computed,
    nextTick,
    onBeforeUnmount,
    onActivated,
    onDeactivated,
    watch,
    onMounted,
} from "vue";
import type { GetTournamentMatches, InitPB, TList } from "@/api/obsportend/obHome/types";
import type { ImatchesPagePB } from "@/api/obsportend/obMatches/interface";
import type { MatchValue } from "@/api/obsportend/obMatches/types";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { DropdownItemInstance, TabsInstance, showFailToast } from "vant";
import type { SwiperRef, TgetTournamentMatches } from "@/components/types";
import { useRouter } from "vue-router";
import ic_select_active from "@/assets/svg/ic_select_active.svg?url";
import ic_filter from "@/assets/svg/ic_filter.svg?raw";
import ic_filter_filling from "@/assets/svg/ic_filter_filling.svg?raw";
import ic_switch from "@/assets/home/ic_switch.png";
import ic_match_results from "@/assets/svg/ic_match_results.svg?raw";
import ic_date from "@/assets/svg/ic_date.svg?raw";
import TournamentMatches from "@/components/TournamentMatches.vue";
import NoData from "@/components/NoData.vue";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import { authToPage, debounce, timeOut } from "@/utils";
import { useBets } from "@/stores/useBets";
import { sportsActive, sportsUn } from "@/utils/icons";
import SwiperBox from "@/components/SwiperBox.vue";
import ChampionDetail from "@/components/ChampionDetail.vue";
import ChampionItem from "@/components/ChampionItem.vue";
import Competition from "@/components/Bets/Competition.vue";
import HomeHeader from "@/components/HomeHeader.vue";
import InMaintenance from "@/components/InMaintenance.vue";
import Skeleton from "@/components/Bets/Skeleton.vue";
import { useAsync } from "@/stores/useAsync";
import { useMatch } from "@/stores/useMatch";
import { useWorker } from "@/worker";
import MatchResults from "@/components/MatchResults/MatchResults.vue";

const router = useRouter();
const indexList = ref<string[]>();
const receiveStatus = ref<boolean>(false);
const keyword = ref<string>("");
const { setMatchType } = useAsync();
const { setSeriesIndex } = useBets();
const { normal, matchTimeKey, time30 } = storeToRefs(useAsync());
const { setLoading, setShowMatches } = useStore();
const { showBetPopup, showSeriesPopup, seriesIndex } = storeToRefs(useBets());
const { loading, line } = storeToRefs(useStore());
const swiperRef = ref<SwiperRef>();
const initLoading = ref<boolean>(false);
const subList = ref<InitPB[]>();
const skSubList = ref<InitPB[]>(Array(6).fill(null));
const championList = ref<GetTournamentMatches[]>();
const matchesPagePBList = ref<Map<string, MatchValue>>(new Map());
const searchData = ref<Map<string, MatchValue>>(new Map());
const dropdownRef = ref<DropdownItemInstance>(); //日期选择下拉框状态
const tournamentMatchesRef = ref<TgetTournamentMatches>();
const week = ["日", "一", "二", "三", "四", "五", "六"];
const showCDetail = ref<boolean>(false);
const cDetailList = ref<TList>();
const finished = ref<boolean>(false); //判断是否加载完
const pagePBLoading = ref<boolean>(false);
const isRender = ref<boolean>(false); //判断是否渲染完成,阻止重复请求
const atTopRef = ref();
const atBottomRef = ref();
const loopCpn = ref<number>(1);
const loopLoading = ref<boolean>(false);
const isActive = ref<boolean>(true);
const whetherDown = ref<boolean>(false);
const showResult = ref<boolean>(false); //赛果
const isOpenDropdown = ref<boolean>(false);
const tabRef = ref<TabsInstance>();
const observerT = ref<IntersectionObserver>();
const observerB = ref<IntersectionObserver>();

const {
    sort,
    active,
    active_c,
    dayActive,
    initPBList,
    dayList,
    params: sParams,
} = storeToRefs(useMatch());
const {
    setSort,
    setActive,
    setActive_c,
    setDayActive,
    setInitPBList,
    setDayList,
    setSwipeActive,
    setParams,
} = useMatch();
const params = ref<ImatchesPagePB>({
    cpn: 1, //页数
    cps: 15, //每页行数
    euid: "", //菜单ID
    device: "v2_h5_st", //设备
    sort: 2, //排序
    type: 0, //一级菜单筛选类型
    // tid: "",
});

params.value.sort = sort.value;
params.value.md = dayActive.value;
setParams(params.value);

const filterData = computed(() => {
    if (!keyword.value.trim()) searchData.value?.clear();
    return !keyword.value.trim() ? matchesPagePBList.value : searchData.value;
});

const showNoData = computed(() => {
    switch (params.value.type) {
        case 6:
            return !loading.value && !matchesPagePBList.value?.size;
        case 100:
            return !loading.value && !championList.value?.[0];
        default:
            return !loading.value && !filterData.value?.size;
    }
});

const submitCDetail = (item: TList) => {
    cDetailList.value = item;
    showCDetail.value = !showCDetail.value;
};

const update = (start: number, end: number, visibleStart: number, visibleEnd: number) => {
    // 获取当前滚动到的分页
    debounce(() => {
        const list = Array.from(matchesPagePBList.value.values());
        const min = Math.min(list.length - 1, visibleEnd);
        const _start = list?.[visibleStart]?.cpn || 1;
        const _end = list?.[min]?.cpn || 1;
        loopCpn.value = Math.max(_start, _end);
    }, 200)();
};

const intersectionT: IntersectionObserverCallback = entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            // whetherDown.value = true;
            return;
        }
        whetherDown.value = false;
    });
};

const intersectionB: IntersectionObserverCallback = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && params.value.type != 6) {
            if (isRender.value) matchesPagePB(false);
        }
    });
};

const changeSort = (sortValue: 1 | 2) => {
    // 联赛|时间 排序
    if (params.value.sort === sortValue) return;
    matchesPagePBList.value?.clear();
    keyword.value = "";
    params.value.cpn = 1;
    finished.value = false;
    params.value.sort = sortValue;
    setParams(params.value);
    setSort(sortValue);
    matchesPagePB();
};

const submit = async (tid: string) => {
    // 筛选联赛
    matchesPagePBList.value?.clear();
    keyword.value = "";
    params.value.tid = tid;
    params.value.cpn = 1;
    setParams(params.value);
    finished.value = false;
    await matchesPagePB();
};

const daySubmit = async (md: string | null) => {
    // 选择日期
    dropdownRef.value?.toggle();
    matchesPagePBList.value?.clear();
    keyword.value = "";
    setDayActive(md);
    params.value.md = md;
    params.value.cpn = 1;
    setParams(params.value);
    finished.value = false;
    await matchesPagePB();
};

const clickRight = () => {
    receiveStatus.value = Array.from(filterData.value.values())?.some(item => item.isHide)!;
};

const setMatchesCount = (number: number) => {
    // 修改关注数量
    initPBList?.value?.forEach(item => {
        if (item.menuType === 6) {
            if (number === 1 && item.matchesCount !== null) item.matchesCount++;
            if (number === 0 && item.matchesCount! > 0) item.matchesCount!--;
        }
    });
};

const beforeChange = async (index: number) => {
    if (initPBList?.value?.[index]?.menuType == 6) {
        const status = authToPage();
        if (!status) return false;
    }
    return true;
};

const changeTab = (index: number) => {
    // 一级菜单
    setActive(index);
    const dayList = initPBList?.value?.[index]?.topMenuList?.slice(0, -1)?.map(item => ({
        md: item.field1,
        date: item.menuName.replace("/", "-"),
        week: item.field1 == "0" ? "" : `周${week[dayjs.unix(+item.field1 / 1000).day()]}`,
    }));
    setDayList(dayList!);
    setDayActive(null);
    keyword.value = "";
    subList.value = initPBList?.value?.[index]?.subList!;
    params.value.euid = subList.value?.[active_c.value]?.menuId!;
    params.value.type = initPBList?.value?.[index]?.menuType!;
    setParams(params.value);
    setMatchType(params.value.type);
    if (!subList.value?.[active_c.value]) {
        setActive_c(0);
        params.value.euid = subList.value?.[0]?.menuId!;
        matchesPagePBList.value?.clear();
    }

    params.value.cpn = 1;
    finished.value = false;
    params.value.tid = null;
    params.value.md = null;
    if (index == seriesIndex.value) {
        dayActive.value = dayList?.[0].md!;
        params.value.md = dayActive.value;
    }
    setParams(params.value);
    matchesPagePBList.value?.clear();
    switch (initPBList?.value?.[index]?.menuType) {
        case 6:
            collectH5ListBottom();
            break;
        case 100:
            championMatchesPagePB();
            break;
        default:
            matchesPagePB();
            break;
    }
};

const tabChangeTwo = (index: number) => {
    // 二级菜单
    setActive_c(index);
    setSwipeActive(0);
    keyword.value = "";
    params.value.tid = null;
    params.value.euid = subList.value?.[index]?.menuId!;
    params.value.cpn = 1;
    setParams(params.value);
    finished.value = false;
    switch (params.value.type) {
        case 100:
            championMatchesPagePB();
            break;
        default:
            matchesPagePBList.value?.clear();
            matchesPagePB();
            break;
    }
};

const receive = () => {
    receiveStatus.value = !receiveStatus.value;
    Array.from(matchesPagePBList.value.values())?.forEach(
        item => (item.isHide = receiveStatus.value)!
    );
};

const getMatches = () => {
    setShowMatches(true);
    tournamentMatchesRef.value?.getTournamentMatches(params.value.euid);
};

const initPB = async (isLoading: boolean = true) => {
    if (isLoading) setLoading(true);
    if (isLoading) initLoading.value = true;
    if (initPBList?.value?.[0]) {
        initLoading.value = false;
        subList.value = initPBList?.value?.[active.value]?.subList!;
        params.value.type = initPBList?.value?.[active.value]?.menuType!;
        params.value.euid = subList.value?.[active_c.value]?.menuId!;
        setParams(params.value);
        setMatchType(params.value.type);
    }
    const res = await API.initPB();
    initLoading.value = false;
    if (res.code === 0) {
        setInitPBList(res.data!);
        const index = res.data?.findIndex(item => item.menuType == 11);
        if (/[0-9]/.test(`${index}`)) setSeriesIndex(index!);
        subList.value = initPBList?.value?.[active.value]?.subList!;
        params.value.type = initPBList?.value?.[active.value]?.menuType!;
        params.value.euid = subList.value?.[active_c.value]?.menuId!;
        setParams(params.value);
        setMatchType(params.value.type);
        if (!params.value.euid) {
            collectH5ListBottom(isLoading);
            return;
        }
        matchesPagePB(isLoading);
    }
};

const matchesPagePB = async (isLoading: boolean = true) => {
    if (finished.value) return;
    if (isLoading) setLoading(true);
    pagePBLoading.value = true;
    isRender.value = false;
    const res = await API.matchesPagePB(params.value);
    if (res.code === 0) {
        const cpn = params.value.cpn;
        const data: Map<string, MatchValue> = await useWorker.getHotMatchesPageList(
            JSON.stringify(res.data?.data || []),
            matchesPagePBList.value.size
                ? JSON.stringify(Array.from(matchesPagePBList.value?.entries()))
                : "null",
            `${cpn}`,
            receiveStatus.value
        );
        matchesPagePBList.value = data;
        if (res.data?.pages! <= params.value.cpn! || res.data?.pages == 0) {
            finished.value = true; // 加载完所有数据
        }
        if (!isLoading || cpn == 1) params.value.cpn++;
    }
    nextTick(async () => {
        await timeOut(0);
        isRender.value = true;
        setLoading(false);
        pagePBLoading.value = false;
    });
    if (res.code === 502) {
        finished.value = false;
        isRender.value = true;
    }
};

const championMatchesPagePB = async (isLoading: boolean = true) => {
    // 冠军
    const { euid, sort, type } = params.value;
    if (isLoading) setLoading(true);
    pagePBLoading.value = true;
    const res = await API.championMatchesPagePB({ euid, sort, type });
    if (res?.code === 0) {
        const data: any = res.data;
        const arr: GetTournamentMatches[] = [];
        if (data && typeof data == "object") {
            const keys = Object.keys(data)?.sort();
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const value = data[key];
                arr.push({ tnS: key, list: value });
            }
        }
        indexList.value = arr?.map(item => item.tnS);
        championList.value = arr;
    }
    pagePBLoading.value = false;
    setLoading(false);
    return res;
};

const collectH5ListBottom = async (isLoading: boolean = true) => {
    // 关注
    if (isLoading) setLoading(true);
    const { sort, tid } = params.value;
    const euid = params.value.euid;
    pagePBLoading.value = true;
    const res = await API.collectH5ListBottom({ sort, status: 0 });
    if (res.code === 0) {
        const cpn = params.value.cpn;
        const data: Map<string, MatchValue> = await useWorker.getHotMatchesPageList(
            JSON.stringify(res.data || []),
            "null",
            `${cpn}`,
            receiveStatus.value
        );
        if (euid == params.value.euid && tid == params.value.tid) matchesPagePBList.value = data;
    }
    pagePBLoading.value = false;
    setLoading(false);
    nextTick(() => (isRender.value = true));
    finished.value = true; // 加载完所有数据
    return res;
};

const searchForAppPB = async (isLoading: boolean = true) => {
    if (!keyword.value.trim()) return showFailToast("搜索关键词不能为空");
    if (isLoading) setLoading(true);
    const matchType = initPBList?.value?.[active.value]?.menuType?.toString?.();
    const { cpn, euid, tid } = params.value;
    const res = await API.searchForAppPB({
        keyword: keyword.value,
        matchType,
        searchSportType: subList.value?.[active_c.value]?.field1 || "",
    });
    setLoading(false);
    if (res.code === 0) {
        const data: Map<string, MatchValue> = await useWorker.getHotMatchesPageList(
            JSON.stringify(res.data || []),
            "null",
            `${cpn}`,
            receiveStatus.value
        );
        if (euid == params.value.euid && tid == params.value.tid) searchData.value = data;
    }
    return res;
};

watch(
    () => matchTimeKey.value,
    async () => {
        if (
            !line.value ||
            !normal.value ||
            !isActive.value ||
            loopLoading.value ||
            !params.value.euid ||
            pagePBLoading.value ||
            showBetPopup.value ||
            showSeriesPopup.value
        )
            return;

        if (keyword.value) {
            searchForAppPB(false);
            return;
        }
        switch (params.value.type) {
            case 6:
                // 关注
                loopLoading.value = true;
                await collectH5ListBottom(false);
                loopLoading.value = false;
                break;
            case 100:
                // 冠军
                loopLoading.value = true;
                await championMatchesPagePB(false);
                loopLoading.value = false;
                break;
            default:
                const cpn = loopCpn.value;
                const euid = params.value.euid;
                const tid = params.value.tid;
                loopLoading.value = true;
                const res = await API.matchesPagePB({ ...params.value, cpn });
                loopLoading.value = false;
                if (res.code === 0) {
                    const data = await useWorker.getHotMatchesPageList(
                        JSON.stringify(res.data?.data || []),
                        matchesPagePBList.value.size
                            ? JSON.stringify(Array.from(matchesPagePBList.value?.entries()))
                            : "null",
                        `${cpn}`,
                        receiveStatus.value
                    );
                    if (euid == params.value.euid && tid == params.value.tid) {
                        matchesPagePBList.value = data;
                    }
                    if (!matchesPagePBList.value.size) matchesPagePBList.value.clear();
                }
                break;
        }
    }
);

params.value = sParams.value;
if (active.value != 0) {
    changeTab(active.value);
    initPB(false);
} else initPB();

onMounted(() => {
    if (normal.value) {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };
        observerT.value = new IntersectionObserver(intersectionT, options);
        observerB.value = new IntersectionObserver(intersectionB, options);
        observerT.value?.observe(atTopRef.value);
        observerB.value?.observe(atBottomRef.value);
    }
});

watch(
    () => showBetPopup.value,
    () => {
        // 如果当前为赛事,并且点击串关
        if (active.value == seriesIndex.value && params.value.type != 11) {
            changeTab(seriesIndex.value);
        }
    }
);

watch(
    () => time30.value,
    () => {
        initPB(false);
    }
);

onBeforeUnmount(() => {
    matchesPagePBList.value.clear();
    observerT.value?.unobserve(atTopRef.value);
    observerB.value?.unobserve(atBottomRef.value);
});

onActivated(() => {
    isActive.value = true;
});

onDeactivated(() => {
    isActive.value = false;
});
</script>

<style lang="scss" scoped>
.tabs_c {
    ::v-deep(.van-tab) {
        padding: 0 6px;
        .van-tab__text {
            height: 100%;
            margin-right: 10px;
        }
    }
}
.line {
    background: url("@/assets/svg/ic_match_line.svg") no-repeat center/contain;
}
::v-deep(.van-tabs) {
    .van-tabs__nav--line {
        padding-bottom: 0;
    }
}
::v-deep(.van-dropdown-menu) {
    .van-popup {
        background: transparent;
    }
    .van-dropdown-menu__title:after {
        content: inherit;
    }
    .van-ellipsis {
        height: 28px;
        display: flex;
        align-items: center;
    }
}
</style>
