<!-- 赛事详情 -->
<template>
    <div class="h-full flex flex-col lio-details w-full bg-mainBg relative">
        <template v-if="normal">
            <div
                class="pb-[68%] w-full relative bg-black/20 bg-[url('@/assets/details/ic_bg.png')] bg-cover bg-no-repeat"
            >
                <div class="absolute w-full h-full flex flex-col">
                    <NavBar
                        class="w-full details_navbar bg-[url('@/assets/details/ic_bg.png')] bg-cover bg-top bg-no-repeat"
                        :transparent="true"
                        :click-left="clickLeft"
                        :nav-bar-props="{ title: details?.tn, border: false }"
                    >
                        <template #left v-if="videoOfAnimation">
                            <i
                                class="icon-close-bold text-white text-[22px] pl-1 font-bold"
                                @click.stop="headerTabs({ type: 'Score' })"
                            />
                        </template>
                        <template #title v-if="videoOfAnimation">
                            <NavBarTitle :details="details" />
                        </template>
                        <template #right>
                            <div class="flex items-center">
                                <template v-if="typeof details?.mf == 'boolean'">
                                    <VanButton
                                        loading-type="spinner"
                                        :loading="followLoading"
                                        :disabled="followLoading"
                                        class="p-0 border-0 text-white"
                                        @click="addOrCancelMatch(details)"
                                    >
                                        <div
                                            class="w-5 h-5"
                                            v-html="details.mf ? ic_collected : ic_keep"
                                        />
                                    </VanButton>
                                </template>
                                <i
                                    v-show="false"
                                    v-html="ic_refresh"
                                    class="text-white w-5 h-5 ml-10px"
                                    :class="{
                                        'animate-spin opacity-50 pointer-events-none':
                                            refreshLoading,
                                    }"
                                    @animationiteration="animationiteration"
                                    @click="refresh"
                                />
                            </div>
                        </template>
                    </NavBar>
                    <div class="flex-1 relative" ref="animationRef">
                        <!-- 比分 -->
                        <Score
                            v-show="urlType === 'Score'"
                            :details="details"
                            :headerTabs="headerTabs"
                        />
                        <!-- 视频 -->
                        <!-- <Player v-if="urlType === 'Video'" :referUrl="referUrl" :url="videoUrl" /> -->
                        <!-- 视频/动画 -->
                        <Animation
                            v-if="iframeUrl && showIframe"
                            :urlType="urlType"
                            :key="iframeUrl"
                            :url="iframeUrl"
                        />
                        <VanButton
                            v-show="noDetails"
                            :loading="loading"
                            @click="getMatchDetailPB"
                            class="border-0 text-white text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            获取数据失败,点击刷新
                        </VanButton>
                    </div>
                </div>
            </div>
            <Tabs
                v-if="tabs && !isClosed"
                :tabs="tabs"
                @change="changeTabs"
                @click-right="receive"
                :receiveStatus="receiveStatus"
            />
            <template v-if="!isClosed">
                <div
                    class="pt-2 bg-mainBg pb-10px"
                    v-if="matchInfo?.length && details"
                    :class="{ 'flex-1  overflow-y-auto': videoOfAnimation }"
                >
                    <TransitionGroupView name="sort">
                        <div v-for="item in matchInfo" :key="item.hpn" class="mb-[7px]">
                            <component
                                :is="componentId(item.hpt)"
                                v-if="typeof item.hpt === 'number' && details"
                                @clickRight="clickRight"
                                @clickLeft="setLeft"
                                :details="details"
                                :data="item"
                            />
                        </div>
                    </TransitionGroupView>
                </div>
            </template>
        </template>
        <InMaintenance v-else class="z-10" />
        <NoData
            v-if="normal"
            class="mt-10"
            :absolute="false"
            :text="details?.ms == 4 ? '盘口已关闭' : '无盘口数据'"
            v-show="
                (!loading && !details) ||
                (!loading && details?.ms == 4) ||
                (!loading && !matchInfo?.length)
            "
        />
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { GetCategoryList, HP, Datum } from "@/api/obsportend/obMatches/types";
import type { IheaderTab } from "@/components/Details/types";
import { useStore } from "@/stores";
import { ref, computed, onBeforeUnmount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Play0 from "@/components/Details/Play0.vue";
import Play1 from "@/components/Details/Play1.vue";
import Play2 from "@/components/Details/Play2.vue";
import Play3 from "@/components/Details/Play3.vue";
import Play4 from "@/components/Details/Play4.vue";
import Play6 from "@/components/Details/Play6.vue";
import Play7 from "@/components/Details/Play7.vue";
import ic_refresh from "@/assets/svg/ic_refresh.svg?raw";
import ic_keep from "@/assets/svg/ic_keep.svg?raw";
import ic_collected from "@/assets/svg/ic_collected.svg?raw";
import { isMobile, timeOut } from "@/utils";
import { storeToRefs } from "pinia";
import TransitionGroupView from "@/components/TransitionGroupView.vue";
import { useBets } from "@/stores/useBets";
import NavBar from "@/components/NavBar.vue";
import Animation from "@/components/Details/Animation.vue";
import Score from "@/components/Details/Score.vue";
import NoData from "@/components/NoData.vue";
import Tabs from "@/components/Details/Tabs.vue";
import NavBarTitle from "@/components/Details/NavBarTitle.vue";
import { mscSplit } from "@/utils/match";
import { useAsync } from "@/stores/useAsync";
import InMaintenance from "@/components/InMaintenance.vue";
import { useHomeWorker } from "@/worker";
import { showSuccessToast } from "vant";

// import Player from "@/components/Player.vue";

const animationRef = ref<HTMLElement>();
const { setLoading } = useStore();
const { setDetailTimeMs } = useAsync();
const { normal, detailTimeKey } = storeToRefs(useAsync());
const { loading, line, user } = storeToRefs(useStore());
const { showBetPopup, showSeriesPopup } = storeToRefs(useBets());
const tabs = ref<GetCategoryList[]>([]);
const routeParams = useRoute().params;
const mid = ref<string>("");
const mcid = ref<string>("");
const csid = ref<string>("");
const details = ref<Datum>();
const matchInfo = ref<HP[]>([]);
const urlType = ref<string | "Video" | "Animation" | "Score">("");
const referUrl = ref<string>("");
const iframeUrl = ref<string>("");
const videoUrl = ref<string>("");
const router = useRouter();
const receiveStatus = ref<boolean>(false);
const loopLoading = ref<boolean>();
const followLoading = ref<boolean>(false);
const refreshLoading = ref<boolean | string>(false);
const hTabs = ref<IheaderTab[]>([
    { title: "比分", type: "Score", show: true },
    { title: "视频", type: "Video", show: true },
    { title: "动画", type: "Animation", show: true },
]);

mid.value = routeParams.mid as string;
urlType.value = hTabs.value[0].type;
csid.value = routeParams.csid as string;

const clickLeft = async () => {
    if (videoOfAnimation.value) {
        iframeUrl.value = "";
        headerTabs({ type: "Score" });
        return;
    }
    await timeOut(0);
    router.go(-1);
};

const componentId = (hpt: number) => {
    switch (hpt) {
        case 0:
            return Play0;
        case 1:
            return Play1;
        case 2:
        case 5:
        case 7:
            return Play2;
        case 3:
            return Play3;
        case 4:
            return Play4;
        case 6:
            return Play6;
        default:
            return Play7;
    }
};

const showIframe = computed(() => /(Video|Animation)/.test(urlType.value));
const isClosed = computed(() => details.value?.ms == 4);
const videoOfAnimation = computed(() => /(Video|Animation)/.test(urlType.value));
const noDetails = computed(() => !details.value && matchInfo.value.length);

const headerTabs = async (item: IheaderTab) => {
    videoUrl.value = "";
    urlType.value = item.type;
    if (/(Video|Animation)/.test(item.type)) {
        videoAnimationUrlPB(false);
        return;
    }
};

const videoAnimationUrlPB = async (isLoading: boolean = true) => {
    if (isLoading) setLoading(true);
    const res = await API.videoAnimationUrlPB({
        mid: mid.value,
        type: urlType.value,
        device: "H5",
    });
    setLoading(false);
    if (res.code === 0) {
        if (!res.data) return;
        switch (urlType.value) {
            case "Video":
                const sound = isMobile() ? 0 : 1;
                // pip-icon|refresh-icon 参数无效,pc状态下暂停后无播放按钮(无视频源不可控)
                iframeUrl.value = `${res.data?.iframeUrl}&controls=1&sound=${sound}&pip-icon=1&refresh-icon=1&is_client=1`;
                break;
            case "Animation":
                iframeUrl.value = res.data?.animationUrl!;
                break;
            default:
                break;
        }
        referUrl.value = res.data?.referUrl!;
        if (res.data?.videoUrlVOList?.[0]?.muUrl) {
            const data = res.data?.videoUrlVOList?.[0];
            videoUrl.value = data.muUrl;
        }
    }
};

const setLeft = () => {
    receiveStatus.value = matchInfo.value?.some(item => item.isHide)!;
};

const clickRight = async (item: HP) => {
    item.htonLoading = true;
    const res = await setTopping(item.hpid, item);
    if (res.code == 0) {
        await getMatchOddsInfoPB(false);
    }
    item.htonLoading = false;
};

const setTopping = async (playId: string, item: HP) => {
    const type = item.hton! != "0" ? "1" : "0";
    const res = await API.setTopping({ sportId: csid.value, playId, type });
    return res;
};

const receive = () => {
    receiveStatus.value = !receiveStatus.value;
    Array.from(matchInfo.value.values())?.forEach(item => (item.isHide = receiveStatus.value)!);
};

const changeTabs = (i: number) => {
    if (tabs.value?.[i]?.id) {
        matchInfo.value = [];
        mcid.value = tabs.value?.[i]?.id;
        getMatchOddsInfoPB();
    }
};

const addOrCancelMatch = async (item?: Datum) => {
    const cf = item?.mf ? 0 : 1;
    followLoading.value = true;
    const res = await API.addOrCancelMatch({ cf, cuid: user.value?.id, mid: +mid.value });
    followLoading.value = false;
    if (res.code === 0) {
        showSuccessToast(cf == 1 ? "关注成功" : "取消成功");
        if (res.data?.data !== 0) {
            details.value!.mf = !details.value?.mf;
            return;
        }
    }
};

const getCategoryList = async () => {
    setLoading(true);
    const res = await API.getCategoryList({
        sportId: csid.value,
        mid: mid.value,
    });
    if (res.code === 0) {
        tabs.value = res.data!;
        mcid.value = tabs.value?.[0]?.id;
        getMatchDetailPB();
    }
};

const getMatchDetailPB = async (isLoading: boolean = true) => {
    if (isLoading) setLoading(true);
    const res = await API.getMatchDetailPB({
        mid: mid.value,
        mcid: mcid.value,
        sportId: csid.value,
    });
    setLoading(false);
    if (res.code === 0) {
        const data = res.data;
        setDetailTimeMs(res.data?.ms!);
        if (data) {
            data.mscs = mscSplit(data?.msc);
            details.value = data!;
        }
        hTabs.value?.forEach(item => {
            switch (item.type) {
                case "Video":
                    item.show = details.value?.mms! >= 1;
                    break;
                case "Animation":
                    item.show = details.value?.mvs! >= 1;
                    break;
                default:
                    break;
            }
        });
        if (isLoading) getMatchOddsInfoPB();
    }
};

const refresh = async () => {
    matchInfo.value = [];
    refreshLoading.value = true;
    await getCategoryList();
    refreshLoading.value = "over";
};

const animationiteration = () => {
    if (refreshLoading.value == "over") {
        refreshLoading.value = false;
    }
};

const getMatchOddsInfoPB = async (isLoading: boolean = true) => {
    if (isLoading) setLoading(true);
    const res = await API.getMatchOddsInfoPB({
        mid: mid.value,
        mcid: mcid.value,
        sportId: csid.value,
    });
    setLoading(false);
    if (res?.code === 0) {
        const data = await useHomeWorker.getMatchOddsInfoPB(
            JSON.stringify(res.data || []),
            JSON.stringify(matchInfo.value)
        );
        matchInfo.value = data!;
        if (!res.data?.length) matchInfo.value = [];
    }
    return res;
};

watch(
    () => detailTimeKey.value,
    async () => {
        if (
            !line.value ||
            !normal.value ||
            loading.value ||
            loopLoading.value ||
            showBetPopup.value ||
            showSeriesPopup.value
        )
            return;
        loopLoading.value = true;
        await getMatchOddsInfoPB(false);
        await getMatchDetailPB(false);
        loopLoading.value = false;
    }
);

getCategoryList();

onBeforeUnmount(() => {
    setDetailTimeMs(0);
});
</script>

<style lang="scss" scoped>
.lio-details {
    ::v-deep(.van-tabs) {
        .van-tab {
            padding: 0 3px;
        }
    }
}
.details_navbar {
    ::v-deep(.van-nav-bar) {
        .van-nav-bar__title {
            width: 78%;
            max-width: 78%;
            &.van-ellipsis {
                white-space: initial;
            }
        }
    }
}
</style>
