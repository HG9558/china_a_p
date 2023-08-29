<!-- 游戏目录 二级页面 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title }" />
        <div class="flex-1 rounded-t-20px overflow-hidden z-0 flex flex-col">
            <VanTabs
                @change="changeTab"
                v-model:active="active"
                style="
                    --van-tabs-bottom-bar-width: 1.125rem;
                    --van-tabs-bottom-bar-height: 0.25rem;
                    --van-tabs-line-height: 3.125rem;
                    --van-tabs-bottom-bar-color: #4b6cdb;
                "
            >
                <VanTab v-for="(item, index) in tabs" :key="index" :title="item.title">
                    <template #title>
                        <span
                            class="text-17px font-medium text-txt_d"
                            :class="{ '!font-normal !text-mainText': index == active }"
                        >
                            {{ item.title }}
                        </span>
                    </template>
                </VanTab>
            </VanTabs>
            <div class="flex-1 bg-mainBg overflow-hidden overflow-y-auto relative">
                <PullRefreshList
                    v-if="sList?.[0]"
                    :onLoad="onLoad"
                    :refresh="onRefresh"
                    :finished="finished"
                    :list-props="{ immediateCheck: false }"
                >
                    <ul class="grid grid-cols-2 gap-3 p-10px">
                        <li
                            :key="index"
                            v-for="(item, index) in sList"
                            class="relative transition-all bg-white rounded-xl overflow-hidden"
                            :class="{ 'opacity-60': item.status == 2 }"
                            @click="platformLogin(item)"
                        >
                            <img
                                v-if="subscript(item.gameTag)"
                                :src="subscript(item.gameTag)"
                                class="w-[49px] h-[49px] absolute top-0 left-0 -translate-x-[15px] -translate-y-[14px] z-10"
                                alt=""
                            />
                            <div class="w-full h-full">
                                <div class="relative pb-[61.76%] overflow-hidden rounded-t-xl">
                                    <div class="absolute top-0 left-0 w-full h-full">
                                        <img
                                            class="w-full h-full object-contain rounded-t-lg"
                                            v-lazy="lazy(item.img)"
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div
                                    class="h-[31px] w-full flex items-center justify-between px-10px"
                                >
                                    <p class="line-clamp-1 flex-1 text-13px text-[#9BA1AE]">
                                        {{ item.name }}
                                    </p>
                                    <i
                                        class="text-base flex-shrink-0 text-[#D0D0D0]"
                                        :class="{
                                            '!text-tip icon-aixin1': item.isFavorite,
                                            'icon-aixin': !item.isFavorite,
                                        }"
                                        @click.stop="slotGameFavorite(item)"
                                    />
                                </div>
                            </div>
                            <div
                                v-show="item.status == 2"
                                class="text-xs z-20 bg-black/70 whitespace-nowrap leading-[18px] text-white rounded-10px px-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                                正在维护
                            </div>
                        </li>
                    </ul>
                </PullRefreshList>
                <NoData v-show="!loading && !sList?.[0]" />
            </div>
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
import type { IslotGameList } from "@/api/platform/interface";
import type { Login, SList } from "@/api/platform/types";
import { useStore } from "@/stores";
import { openLink } from "@/utils";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import PullRefreshList from "@/components/PullRefreshList.vue";
import NoData from "@/components/NoData.vue";
import GameDialog from "@/components/GameDialog.vue";
import { useAsync } from "@/stores/useAsync";
import ic_gamehall_bg from "@/assets/logo/ic_gamehall_bg.png";
import ic_game_official from "@/assets/games/ic_game_official.png";
import ic_game_hot from "@/assets/games/ic_game_hot.png";
import { showDialog } from "vant";

interface Itabs {
    title: string;
    id: number;
}

const { setLoading, setGameID } = useStore();
const { user, gameTip, loading, token } = storeToRefs(useStore());
const { promoActivityList } = storeToRefs(useAsync());
const route = useRoute();
const active = ref<number>(0);
const title = ref<string>("");
const finished = ref<boolean>(false);
const gameItem = ref<Login>();
const showGameDialog = ref<boolean>(false);
const activityUserStatus = ref<boolean>();
const tabs = ref<Itabs[]>([
    { title: "全部", id: 0 },
    { title: "热门", id: 1 },
    { title: "最新", id: 2 },
    { title: "收藏", id: 3 },
]);
const params = ref<IslotGameList>({
    current: 1,
    size: 48,
    data: {
        category: 0,
        id: "",
        name: "",
    },
});
const sList = ref<SList[]>([]);

const id = route.params.id as string;
params.value.data!.id = id;
title.value = route.params.title as string;
params.value.data!.category = tabs.value[active.value].id;

const subscript = computed(() => (gameTag: number) => {
    switch (gameTag) {
        case 1:
            return ic_game_official;
        case 2:
            return ic_game_hot;
        default:
            break;
    }
});

const lazy = computed(() => (src: string) => ({
    src,
    error: ic_gamehall_bg,
    loading: ic_gamehall_bg,
}));

const changeTab = (index: number) => {
    sList.value = [];
    params.value.current = 1;
    finished.value = false;
    params.value.data!.category = tabs.value[index].id;
    slotGameList();
};

const slotGameList = async (isLoading: boolean = true) => {
    if (isLoading) setLoading(true);
    const res = await API.slotGameList(params.value);
    setLoading(false);
    if (res.code === 0) {
        const isConcat = {
            true: [...sList.value, ...res.data?.list!],
            false: res.data?.list,
        };
        sList.value = isConcat[`${params.value.current !== 1}`]!;
        if (+res.data?.pages! <= params.value.current || res.data?.pages == "0")
            finished.value = true;
        params.value.current++;
    }
    return res;
};

const slotGameFavorite = async (item: SList) => {
    setLoading(true);
    const direction = item.isFavorite === 0 ? 1 : 0;
    const res = await API.slotGameFavorite({
        direction,
        gameId: +id,
        gameSlotId: item.id,
    });
    setLoading(false);
    if (res.code === 0) {
        item.isFavorite = +direction!;
    }
};

const platformLogin = async (item: SList) => {
    if (loading.value) return;
    if (item.status == 2) {
        showDialog({
            title: `【 ${item?.name} 】维护中`,
            message: `尊敬的用户，【${item?.name}】正在维护，对给您造成的不便深表歉意！`,
            confirmButtonText: "我知道了",
        });
        return;
    }
    setLoading(true);
    const res = await API.platformLogin({ id: route.params.id as string, slotId: item.id });
    if (res.code === 0) {
        if (res.data?.url) {
            const data = promoActivityList.value?.some(
                item => item.platListId == +route.params.platListId
            );
            activityUserStatus.value = data;
            if (activityUserStatus.value || (user.value?.autoTransfer == 0 && !gameTip.value)) {
                gameItem.value = res.data;
                showGameDialog.value = !showGameDialog.value;
                setLoading(false);
                return;
            }
            setGameID(`${res.data?.platListId}`);
            openLink(res.data?.url);
        }
    }
    setLoading(false);
};

const onRefresh = async () => {
    params.value.current = 1;
    finished.value = false;
    return await slotGameList(false);
};

const onLoad = async () => {
    const res = await slotGameList(false);
    return res;
};

slotGameList();
if (token.value) useAsync().getApplyPlatPromoActivityList();
</script>
