<!-- 首页 -->
<template>
    <div
        class="h-full relative tlw_top_bg bg-[center_top_-10%] sm:bg-[center_top_-25%] before:h-56 before:z-0 before:w-full before:absolute before:pointer-events-none bg-mainBg flex flex-col"
    >
        <DownLoad />
        <HomeHeader />
        <div class="flex-1 overflow-hidden flex flex-col">
            <div class="h-12 flex-shrink-0">
                <VanTabs
                    shrink
                    :key="globelKey"
                    class="tab_top"
                    v-if="tabsLoading || state.tabs"
                    v-model:active="active"
                    @change="changeTab"
                    style="
                        --van-tab-text-color: #ffffff60;
                        --van-tabs-nav-background: transparent;
                        --van-tab-active-text-color: #fff;
                        --van-tab-font-size: 1.125rem;
                        --van-tabs-bottom-bar-width: 1.125rem;
                        --van-tabs-bottom-bar-height: 0.2188rem;
                        --van-tabs-bottom-bar-color: #fff;
                    "
                >
                    <van-tab v-for="(item, index) in state.tabs" :title="item.title" :key="index">
                        <template #title>
                            <span
                                class="text-lg font-medium text-white opacity-70"
                                :class="{ '!opacity-100': active == index }"
                            >
                                {{ item.title }}
                            </span>
                        </template>
                    </van-tab>
                </VanTabs>
            </div>
            <div
                v-show="active == 0"
                ref="home_container"
                class="flex-1 overflow-hidden rounded-t-20px flex flex-col z-0"
            >
                <div
                    class="flex-1 overflow-y-auto rounded-t-20px z-0"
                    :class="{ '!bg-mainBg': showWhite || !state.banner?.length }"
                    @scroll="scroll"
                >
                    <VanPullRefresh disabled>
                        <div ref="bannerRef" class="px-[2.5px] bg-transparent">
                            <SwiperBox
                                loop
                                :autoplay="{
                                    disableOnInteraction: false,
                                    delay: 3000,
                                }"
                                type="default"
                                :key="state.banner?.length"
                                class="h-full banner_swiper"
                                :pagination="true"
                                :list="state.banner"
                                v-if="tabsLoading || state.banner"
                            >
                                <template v-slot="{ item }">
                                    <div class="pt-1 pb-2 px-[5px]">
                                        <div
                                            @click="bannerToPage(item)"
                                            class="relative pb-[37.22%]"
                                        >
                                            <div
                                                class="absolute rounded-2xl top-0 left-0 w-full h-full shadow_banner overflow-hidden"
                                            >
                                                <div
                                                    v-if="tabsLoading"
                                                    class="w-full h-full rounded-2xl tlw_skeleton"
                                                />
                                                <img
                                                    v-else
                                                    class="w-full h-full z-10 relative rounded-2xl object-cover"
                                                    v-lazy="lazy(item?.img)"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </SwiperBox>
                        </div>
                        <div
                            v-if="tabsLoading || state.recommendGame"
                            class="bg-fz_b z-10 relative mb-2 -mt-1"
                        >
                            <SwiperBox
                                v-if="tabsLoading || state.recommendGame"
                                :list="tabsLoading ? skRecommendGame : state?.recommendGame"
                                :slidesPerView="4.3"
                                :spaceBetween="6"
                                type="default"
                                :swiper-options="{ observeParents: true, observer: true }"
                                name="recommendGame_swiper"
                                :slides-offset-before="10"
                                :slides-offset-after="10"
                            >
                                <template v-slot="{ item }">
                                    <div
                                        class="relative active:scale-95 transition-all mx-auto"
                                        @click="platformLogin(item)"
                                    >
                                        <div
                                            class="relative pb-[92.42%]"
                                            :class="{ 'opacity-50': item?.status == 2 }"
                                        >
                                            <div
                                                v-if="gameTags?.[+item?.gameTag]"
                                                class="absolute w-[37px] h-[15px] bottom-0 right-0 z-20"
                                            >
                                                <img
                                                    class="w-full h-full"
                                                    :src="gameTags?.[+item?.gameTag]?.icon"
                                                    alt=""
                                                />
                                            </div>

                                            <div
                                                class="absolute bottom-0 flex items-end left-0 w-full h-full pointer-events-none"
                                            >
                                                <img
                                                    v-if="!tabsLoading && item?.img"
                                                    class="w-full max-h-full z-10 absolute left-1/2 -translate-x-1/2 object-cover"
                                                    v-lazy="lazyGame(item?.recommendLogo)"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div
                                            v-show="item?.status == 2"
                                            class="text-xs z-20 bg-black/60 whitespace-nowrap leading-[18px] text-white rounded-10px px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        >
                                            正在维护
                                        </div>
                                    </div>
                                </template>
                            </SwiperBox>
                        </div>
                        <template v-if="normal">
                            <div
                                class="w-full rounded-t-2xl"
                                v-if="tabsLoading || state.obMenuList"
                            >
                                <van-sticky :offset-top="offsetTop">
                                    <div
                                        class="bg-white w-full rounded-t-2xl overflow-hidden flex items-center"
                                    >
                                        <div
                                            class="flex-1 overflow-hidden rounded-t-20px py-10px tabs_sports z-10 bg-white"
                                        >
                                            <VanTabs
                                                shrink
                                                animated
                                                line-width="0"
                                                class="tabs_c"
                                                @change="changeMenu"
                                                v-if="tabsLoading || state.obMenuList?.[0]"
                                                v-model:active="active_c"
                                                :style="{ height: '3.625rem' }"
                                                style="
                                                    --van-tabs-bottom-bar-width: 0;
                                                    --van-tabs-line-height: 3.625rem;
                                                    --van-tab-disabled-text-color: #303033;
                                                "
                                            >
                                                <VanTab
                                                    :key="index + (item.matchesCount || 0)"
                                                    :disabled="loading"
                                                    v-for="(item, index) in tabsLoading
                                                        ? skObMenuList
                                                        : state?.obMenuList"
                                                >
                                                    <template #title>
                                                        <template v-if="tabsLoading">
                                                            <div
                                                                class="w-[74px] h-full rounded-10px pl-2 tlw_skeleton"
                                                            />
                                                        </template>
                                                        <template v-else>
                                                            <div
                                                                class="flex flex-col w-[74px] pt-1 h-full bg-no-repeat bg-[length:100%] relative text-txt_d border-[0.5px] border-[#eee] rounded-10px pl-3 justify-evenly"
                                                                :class="{
                                                                    '!border-0': active_c === index,
                                                                }"
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
                                                                        '!text-white':
                                                                            active_c === index,
                                                                    }"
                                                                >
                                                                    {{ item?.matchesCount }}
                                                                </span>
                                                                <img
                                                                    class="w-5 h-5 z-10"
                                                                    :src="
                                                                        active_c === index
                                                                            ? sportsActive[
                                                                                  item?.menuType
                                                                              ]
                                                                            : sportsUn[
                                                                                  item?.menuType
                                                                              ]
                                                                    "
                                                                    alt=""
                                                                />
                                                                <p
                                                                    class="w-full line-clamp-1 text-xs z-10 whitespace-nowrap my-[2px] text-[#79797C]"
                                                                    :class="{
                                                                        '!text-white font-medium':
                                                                            active_c === index,
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
                                </van-sticky>
                                <template v-if="tabsLoading || (loading && false)">
                                    <Skeleton
                                        :key="index"
                                        v-for="(item, index) in 2"
                                        :class="{ 'mt-3': index == 0 }"
                                    />
                                </template>
                                <DynamicScroller
                                    v-if="matchesPagePBList.size"
                                    :buffer="500"
                                    :minItemSize="5"
                                    :keyField="'tid'"
                                    :pageMode="true"
                                    :emitUpdate="true"
                                    :items="Array.from(matchesPagePBList.values())"
                                    @update="update"
                                    class="mt-2"
                                    ref="dynamicScrollerRef"
                                >
                                    <template v-slot="{ item, index, active }">
                                        <DynamicScrollerItem
                                            :item="item"
                                            :active="active"
                                            :data-index="item.cpn"
                                        >
                                            <Competition :source="item" :index="index || 0" />
                                        </DynamicScrollerItem>
                                    </template>
                                </DynamicScroller>
                                <div
                                    ref="atBottomRef"
                                    class="h-10 text-txt_d opacity-0 flex pt-2 justify-center text-xs w-full"
                                    :class="{ 'opacity-100': params?.sportId }"
                                >
                                    <van-loading size="20" type="spinner" v-show="pagePBLoading">
                                        加载中...
                                    </van-loading>
                                    <VanButton
                                        v-show="
                                            !finished && !pagePBLoading && matchesPagePBList.size
                                        "
                                        @click="getHotMatchesPageList(false)"
                                        class="h-8 text-txt border-txt"
                                    >
                                        加载更多
                                    </VanButton>
                                    <span class="mx-1" v-show="finished && matchesPagePBList.size">
                                        没有更多了
                                    </span>
                                </div>
                                <NoData
                                    :absolute="false"
                                    v-show="!loading && !matchesPagePBList.size"
                                />
                            </div>
                        </template>
                        <InMaintenance
                            v-else
                            class="bg-white z-10 py-10 relative rounded-t-20px !h-auto"
                            :absolute="false"
                        />
                    </VanPullRefresh>
                </div>
            </div>
            <Activity v-show="active == 1" />
        </div>
        <GameDialog
            v-model="showGameDialog"
            :gameItem="gameItem"
            :activityUserStatus="activityUserStatus"
        />
    </div>
</template>
<script setup lang="ts">
import type { FunBanners, ObMenuList, RecommendGame } from "@/api/home/types";
import type { MatchValue } from "@/api/obsportend/obMatches/types";
import { API } from "@/api";
import { useStore } from "@/stores";
import {
    ref,
    watch,
    nextTick,
    onBeforeUnmount,
    computed,
    onActivated,
    onDeactivated,
    onMounted,
} from "vue";
import { useRouter } from "vue-router";
import { authToPage, debounce, openLink, throttle, timeOut } from "@/utils";
import { storeToRefs } from "pinia";
import ic_select_active from "@/assets/svg/ic_select_active.svg?url";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import type { IgetHotMatchesPageList } from "@/api/obsportend/obSport/interface";
import { useBets } from "@/stores/useBets";
import ic_banner from "@/assets/logo/ic_banner.png";
import ic_game_s from "@/assets/logo/ic_game_s.png";
import NoData from "@/components/NoData.vue";
import { gameTags, sportsActive, sportsUn } from "@/utils/icons";
import Competition from "@/components/Bets/Competition.vue";
import Activity from "./activity.vue";
import HomeHeader from "@/components/HomeHeader.vue";
import SwiperBox from "@/components/SwiperBox.vue";
import { useAsync } from "@/stores/useAsync";
import InMaintenance from "@/components/InMaintenance.vue";
import { useWorker } from "@/worker";
import Skeleton from "@/components/Bets/Skeleton.vue";
import { useHome } from "@/stores/useHome";
import { showDialog } from "vant";
import GameDialog from "@/components/GameDialog.vue";
import { useActivity } from "@/stores/useActivity";
import { Login } from "@/api/platform/types";
import DownLoad from "@/components/DownLoad.vue";

const dynamicScrollerRef = ref();
const receiveStatus = ref<boolean>(false);
const router = useRouter();
const { normal, time30 } = storeToRefs(useAsync());
const { setLoading, setGameID } = useStore();
const { loading, globelKey, line, user, gameTip, token } = storeToRefs(useStore());
const { showBetPopup, showSeriesPopup } = storeToRefs(useBets());

const home_container = ref<HTMLDivElement>();
const skRecommendGame = ref<RecommendGame[]>(Array(5).fill(null));
const matchesPagePBList = ref<Map<string, MatchValue>>(new Map());
const finished = ref<boolean>(false); //判断是否加载完
const pagePBLoading = ref<boolean>(false);
const isRender = ref<boolean>(false); //判断是否渲染完成,阻止重复请求
const loopCpn = ref<number>(1);
const loopLoading = ref<boolean>(false);
const bannerRef = ref();
const top = ref<number>();
const isActive = ref<boolean>(true);
const tabsLoading = ref<boolean>(false);
const atBottomRef = ref();
const gameItem = ref<Login>();
const skObMenuList = ref<ObMenuList[]>(Array(5).fill(5));
const showGameDialog = ref<boolean>(false);
const { promoActivityList, hotTimeKey } = storeToRefs(useAsync());
const { active, active_c, state } = storeToRefs(useHome());
const { setActive, setActive_c, setState } = useHome();
const activityUserStatus = ref<boolean>();
const observer = ref<IntersectionObserver>();

const params = ref<IgetHotMatchesPageList>({
    cpn: 1, //页数
    cps: 15, //每页行数
    euid: "", //菜单ID
    device: "v2_h5_st", //设备
    sort: 1, //排序
    type: 1, //一级菜单筛选类型
    sportId: 0,
});

const lazy = computed(() => (src: string) => ({ src, error: ic_banner, loading: ic_banner }));
const lazyGame = computed(() => (src: string) => ({ src, error: ic_game_s, loading: ic_game_s }));
const offsetTop = computed(() => home_container.value?.getBoundingClientRect()?.top);
const bannerTop = computed(() => {
    const _top = bannerRef.value?.getBoundingClientRect()?.top;
    top.value = _top;
    return _top;
});
const showWhite = computed(() => {
    return (top.value || bannerTop.value) != offsetTop.value;
});

const changeMenu = (index: number) => {
    setActive_c(index);
    matchesPagePBList.value.clear();
    finished.value = false;
    params.value.cpn = 1;
    params.value.euid = state.value?.obMenuList?.[index]?.menuId!;
    params.value.sportId = +state.value?.obMenuList?.[index]?.field1!;
    getHotMatchesPageList();
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

const handleIntersection: IntersectionObserverCallback = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (isRender.value) getHotMatchesPageList(false);
        }
    });
};

const changeTab = (i: number) => {
    setActive(i);
};

const scroll = () => {
    throttle(() => {
        if (!bannerRef.value) return;
        top.value = bannerRef.value?.getBoundingClientRect()?.top!;
    }, 50)();
};

const homeTabs = async (isLoading: boolean = true) => {
    if (isLoading) {
        setLoading(true);
        tabsLoading.value = true;
    }
    if (state.value.banner) tabsLoading.value = false;
    const res = await API.homeTabs();
    tabsLoading.value = false;
    if (res.code === 0) {
        setState(res.data!);
        params.value.euid = state.value?.obMenuList?.[active_c.value]?.menuId!;
        params.value.sportId = +state.value?.obMenuList?.[active_c.value]?.field1!;
        if (!params.value.sportId) {
            // 如果后端连球种类型都没有返回
            setLoading(false);
            finished.value = true;
            pagePBLoading.value = false;
            return;
        }
        getHotMatchesPageList();
    }
};

const getHotMatchesPageList = async (isLoading: boolean = true) => {
    if (finished.value) return;
    if (isLoading) setLoading(true);
    receiveStatus.value = false;
    pagePBLoading.value = true;
    isRender.value = false;
    const euid = params.value.euid;
    const res = await API.getHotMatchesPageList(params.value);
    if (res.code === 0) {
        const cpn = params.value.cpn;
        const data = await useWorker.getHotMatchesPageList(
            JSON.stringify(res.data?.data || []),
            matchesPagePBList.value.size
                ? JSON.stringify(Array.from(matchesPagePBList.value?.entries()))
                : "null",
            `${cpn}`
        );
        if (euid == params.value.euid) matchesPagePBList.value = data;
        if (res.data?.pages! <= params.value.cpn! || res.data?.pages == 0) finished.value = true; // 加载完所有数据
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

const bannerToPage = async (item: FunBanners) => {
    if (item.redirect == 0) return;
    switch (item.redirectType) {
        case 0: //游戏
            const res = await API.platformLogin({ id: `${item.gameId}` });
            if (res.data?.url) openLink(res.data?.url);
            break;
        case 1: //外链
            item.href && openLink(item.href, "_blank");
            break;
        case 2: //内部
            switch (item.nbRedirectType) {
                case 0: //活动主页面
                    useHome().setActive(1);
                    if (item.promotionsTagId) useActivity()?.setActive(item.promotionsTagId);
                    router?.push("/");
                    break;
                case 1: //好友邀请页
                    const status = await authToPage();
                    if (!status) return;
                    router?.push("/activityInvite");
                    break;
                case 2: //vip详情
                    const _status = await authToPage();
                    if (!_status) return;
                    router?.push("/vipDetail");
                    break;
                case 3: //充值
                    const __status = await authToPage();
                    if (!__status) return;
                    router?.push("/recharge");
                    break;
                case 4: //活动详情页
                    const ___status = await authToPage();
                    if (!___status) return;
                    router.push(`${item.promotionsLink}?id=${item.promotionsGroupId}`);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
};

const platformLogin = async (item: RecommendGame) => {
    if (loading.value) return;
    if (item.status == 2) {
        showDialog({
            title: `【 ${item?.name} 】维护中`,
            message: `尊敬的用户，【${item?.name}】正在维护，对给您造成的不便深表歉意！`,
            confirmButtonText: "我知道了",
        });
        return;
    }
    const status = await authToPage();
    if (!status) return;
    switch (item.isMenu) {
        case 1:
            router.push(`/gamehall/${item.platListId}/${item.id}/${item.name}`);
            break;
        case 0:
            setLoading(true);
            const res = await API.platformLogin({ id: `${item.id}` });
            if (res.code === 0) {
                if (res.data?.url) {
                    const data = promoActivityList.value?.some(
                        v => v.platListId == +item.platListId
                    );
                    activityUserStatus.value = data;
                    if (
                        activityUserStatus.value ||
                        (user.value?.autoTransfer == 0 && !gameTip.value)
                    ) {
                        gameItem.value = res.data;
                        showGameDialog.value = !showGameDialog.value;
                        setLoading(false);
                        return;
                    }
                    setGameID(`${res.data.platListId}`);
                    openLink(res.data?.url);
                }
            }
            setLoading(false);
            break;
        default:
            break;
    }
};

watch(
    () => hotTimeKey.value,
    async () => {
        if (
            !line.value ||
            !normal.value ||
            loopLoading.value ||
            showBetPopup.value ||
            pagePBLoading.value ||
            showSeriesPopup.value ||
            active.value == 1 ||
            !isActive.value ||
            !params.value.euid
        )
            return;
        const cpn = loopCpn.value;
        const euid = params.value.euid;
        loopLoading.value = true;
        const res = await API.getHotMatchesPageList({ ...params.value, cpn });
        loopLoading.value = false;
        if (res.code === 0) {
            const data = await useWorker.getHotMatchesPageList(
                JSON.stringify(res.data?.data || []),
                matchesPagePBList.value.size
                    ? JSON.stringify(Array.from(matchesPagePBList.value?.entries()))
                    : "null",
                `${cpn}`
            );
            if (euid == params.value.euid) matchesPagePBList.value = data;
            if (!matchesPagePBList.value.size) matchesPagePBList.value.clear();
        }
    }
);

homeTabs();
if (token.value) useAsync().getApplyPlatPromoActivityList();

onMounted(() => {
    if (normal.value) {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };
        observer.value = new IntersectionObserver(handleIntersection, options);
        observer.value?.observe(atBottomRef.value);
    }
});

onBeforeUnmount(() => {
    matchesPagePBList.value.clear();
    observer.value?.unobserve(atBottomRef.value);
});

onActivated(() => {
    isActive.value = true;
});

onDeactivated(() => {
    isActive.value = false;
});
</script>

<style lang="scss" scoped>
.tab_top {
    ::v-deep(.van-tab) {
        padding: 0 9px;
    }
}
.tabs_c {
    ::v-deep(.van-tab) {
        padding: 0 6px;
        .van-tab__text {
            height: 100%;
            margin-right: 10px;
        }
    }
}

.shadow_banner {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.08);
}

::v-deep(.banner_swiper) {
    .swiper-pagination {
        bottom: 10px;
        .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
            background: #303033;
            opacity: 0.7;
            &.swiper-pagination-bullet-active {
                width: 29px;
                height: 7px;
                opacity: 1;
                border-radius: 10px;
                background: #334abf;
            }
        }
    }
}
</style>
