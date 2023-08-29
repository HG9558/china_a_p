<!-- 首页 娱乐 -->
<template>
    <div class="h-full tlw_top_bg flex flex-col">
        <HomeHeader />
        <!-- <HeaderTabs /> -->
        <div class="flex-1 overflow-y-auto bg-white relative rounded-t-2xl">
            <VanPullRefresh disabled>
                <div
                    class="px-[2.5px] mt-1 rounded-t-2xl flex-shrink-0"
                    v-if="bannerLoading || banner?.[0]"
                >
                    <SwiperBox
                        loop
                        :autoplay="{
                            disableOnInteraction: false,
                            delay: 3000,
                        }"
                        :key="banner?.length"
                        :list="bannerLoading ? skBanner : banner"
                        type="default"
                        class="banner_swiper"
                        :pagination="true"
                    >
                        <template v-slot="{ item }">
                            <div class="pt-1 pb-2 px-[5px]">
                                <div
                                    class="relative pb-[37.22%] rounded-2xl"
                                    @click="bannerToPage(item)"
                                >
                                    <img
                                        class="absolute z-10 top-0 left-0 w-full h-full object-cover rounded-2xl shadow_banner"
                                        v-lazy="lazy(item?.img)"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </template>
                    </SwiperBox>
                </div>
                <div
                    :key="index"
                    class="mb-4 mt-4"
                    :class="{ '!mt-0': index === 0 }"
                    v-for="(item, index) in gameLoading ? skGameList : gameList"
                >
                    <div class="h-9 w-full pr-4 flex items-center justify-between text-mainText">
                        <div
                            v-if="item?.list?.[0]"
                            class="flex pl-2 items-center justify-between flex-1"
                        >
                            <div class="flex items-center flex-shrink-0">
                                <i class="w-[3px] h-[14px] bg-txt rounded mr-1"></i>
                                <img class="h-4 mr-1" :src="gamesIcons[item?.id]" alt="" />
                            </div>
                            <div class="flex items-center">
                                <SwiperBox
                                    v-if="item?.activityRecommendList?.[0]"
                                    class="h-5 pointer-events-none"
                                    :loop="true"
                                    :name="'vertical_swiper'"
                                    :autoplay="{
                                        disableOnInteraction: false,
                                        delay: 3000,
                                    }"
                                    @slideChange="slideChange(index, $event)"
                                    :type="'default'"
                                    :direction="'vertical'"
                                    :list="item.activityRecommendList"
                                >
                                    <template v-slot="{ item: v }">
                                        <div class="flex items-center justify-end">
                                            <div
                                                class="text-xs flex items-center font-medium text-[#888] h-5"
                                            >
                                                <p class="rounded-full px-2 line-clamp-1">
                                                    {{ v.title }}
                                                </p>
                                                <span class="font-OPPO flex-shrink-0 ml-1">
                                                    {{ v?.rebate }}
                                                </span>
                                            </div>
                                        </div>
                                    </template>
                                </SwiperBox>
                                <div
                                    class="w-[68px] h-5"
                                    @click="toActivity(item)"
                                    v-if="item?.activityRecommendList?.[0]"
                                >
                                    <img class="w-full h-full" :src="ic_btn_participate" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-for="(k, j) in item?.newArr" :key="j" class="px-10px mb-10px">
                        <div
                            class="grid grid-cols-4 items-center justify-center gap-x-1 gap-y-2"
                            :class="{
                                'gap-x-3 gap-y-2': k?.[0]?.logoType == 2,
                            }"
                        >
                            <div
                                :key="i"
                                class="relative active:scale-90 transition-all"
                                :class="{
                                    'col-span-4': v?.logoType == 1,
                                    'col-span-2': v?.logoType == 2,
                                }"
                                v-for="(v, i) in gameLoading ? skGList : k"
                                @click="platformLogin(v, item)"
                            >
                                <div
                                    class="relative pb-[92.85%]"
                                    :class="{
                                        'opacity-50': v?.status == 2,
                                        'col-span-4 !pb-[40.30%]': v?.logoType == 1,
                                        'col-span-2 !pb-[83.19%]': v?.logoType == 2,
                                    }"
                                >
                                    <div
                                        v-if="gameTags?.[+v?.gameTag]"
                                        class="absolute w-[37px] h-[15px] bottom-0 right-0 z-20"
                                    >
                                        <img
                                            class="w-full h-full"
                                            :src="gameTags?.[+v?.gameTag]?.icon"
                                            alt=""
                                        />
                                    </div>
                                    <div
                                        class="absolute top-0 left-0 w-full h-full pointer-events-none"
                                    >
                                        <img
                                            class="w-full h-full z-10 absolute left-1/2 -translate-x-1/2 object-cover"
                                            v-lazy="lazyGame(v?.img, Number(v?.logoType))"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div
                                    v-show="v?.status == 2"
                                    class="text-xs z-20 bg-black/60 whitespace-nowrap leading-[18px] text-white rounded-10px px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                >
                                    正在维护
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </VanPullRefresh>
            <NoData v-show="!gameLoading && !gameList?.[0]" />
        </div>
        <GameDialog
            v-model="showGameDialog"
            :gameItem="gameItem"
            :activityUserStatus="activityUserStatus"
        />
    </div>
</template>
<script setup lang="ts">
import { API } from "@/api";
import type { Game, GList, Login } from "@/api/platform/types";
import type { SwiperRef } from "@/components/types";
import { useStore } from "@/stores";
import { authToPage, openLink, lazyGame } from "@/utils";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import ic_banner from "@/assets/logo/ic_banner.png";
import ic_btn_participate from "@/assets/games/ic_btn_participate.png";
import NoData from "@/components/NoData.vue";
import { FunBanners } from "@/api/home/types";
import SwiperBox from "@/components/SwiperBox.vue";
import HomeHeader from "@/components/HomeHeader.vue";
import { gamesIcons, gameTags } from "@/utils/icons";
import { Swiper } from "swiper/types";
import { useEntertain } from "@/stores/useEntertain";
import { showDialog } from "vant";
import GameDialog from "@/components/GameDialog.vue";
import { useAsync } from "@/stores/useAsync";
import { useHome } from "@/stores/useHome";
import { useRouter } from "vue-router";
import { useActivity } from "@/stores/useActivity";

const { promoActivityList } = storeToRefs(useAsync());
const { user, gameTip, token, loading } = storeToRefs(useStore());
const { setLoading, setGameID } = useStore();
const swiperRef = ref<SwiperRef>();
const skGameList = ref<Game[]>(Array(6).fill(null));
const skGList = ref<GList[]>(Array(6).fill(null));
const skBanner = ref<FunBanners[]>(Array(1).fill(null));
const bannerLoading = ref<boolean>(false);
const gameLoading = ref<boolean>(false);
const { setBanner, setGameList } = useEntertain();
const { banner, gameList } = storeToRefs(useEntertain());
const showGameDialog = ref<boolean>(false);
const activityUserStatus = ref<boolean>();
const gameItem = ref<Login>();
const router = useRouter();

const lazy = computed(() => (src: string) => ({ src: src, error: ic_banner, loading: ic_banner }));

const funBanners = async () => {
    bannerLoading.value = true;
    if (banner?.value) bannerLoading.value = false;
    const res = await API.funBanners();
    bannerLoading.value = false;
    if (res.code === 0) {
        setBanner(res.data!);
    }
};

const slideChange = (index: number = 0, swiper: Swiper) => {
    if (gameList?.value?.[index]?.activityRecommendList?.[swiper.realIndex]) {
        gameList.value[index].active = swiper.realIndex;
    }
};

const toActivity = (item: Game) => {
    const status = authToPage();
    if (!status) return false;
    const data = item.activityRecommendList?.[item.active!];
    switch (data?.type) {
        case 1:
            router.push(`/activityVenue?id=${data.id}`);
            break;
        case 2:
            router.push(`/activityRoutine?id=${data.id}`);
            break;
        default:
            break;
    }
};

const game = async () => {
    gameLoading.value = true;
    setLoading(true);
    if (gameList?.value?.[0]) {
        gameLoading.value = false;
        setLoading(false);
    }
    const res = await API.game();
    gameLoading.value = false;
    if (res.code === 0) {
        const data = res.data;
        data?.forEach(item => {
            item.active = 0;
            const data = item.list?.reduce((prev: any, v) => {
                const lastGroup = prev[prev.length - 1];
                if (lastGroup && lastGroup[0].logoType === v.logoType) {
                    lastGroup.push(v);
                } else {
                    prev.push([v]);
                }
                return prev;
            }, []);
            item.newArr = data;
        });
        setGameList(data!);
    }
    setLoading(false);
    swiperRef.value?.update?.();
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

const platformLogin = async (v: GList, item?: Game) => {
    if (loading.value) return;
    if (v?.status == 2) {
        showDialog({
            title: `【 ${v?.name} 】维护中`,
            message: `尊敬的用户，【${v?.name}】正在维护，对给您造成的不便深表歉意！`,
            confirmButtonText: "我知道了",
        });
        return;
    }
    const status = authToPage();
    if (!status) return;
    switch (v?.isMenu) {
        case 1:
            router.push(`/gamehall/${v?.platListId}/${v?.id}/${v?.name}`);
            break;
        case 0:
            setLoading(true);
            const res = await API.platformLogin({ id: `${v?.id}` });
            if (res.code === 0) {
                if (res.data?.url) {
                    const data = promoActivityList.value?.some(
                        item => item.platListId == +v.platListId
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

game();
funBanners();
if (token.value) useAsync().getApplyPlatPromoActivityList();
</script>

<style lang="scss" scoped>
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
