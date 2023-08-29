<!-- 好友邀请 -> 活动记录 -->
<template>
    <div class="h-full flex flex-col w-full tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '活动记录' }" />
        <div class="flex flex-col flex-1 overflow-hidden rounded-t-20px bg-mainBg z-0">
            <div
                class="flex flex-col flex-shrink-0 bg-white rounded-t-20px px-10px border-b border-b-[#E7E7EB] overflow-hidden"
            >
                <VanTabs
                    class="rounded-t-20px overflow-hidden"
                    v-model:active="active"
                    :swipe-threshold="4"
                    @change="changeTab"
                    swipeable
                    style="
                        --van-tabs-bottom-bar-width: 1.125rem;
                        --van-tabs-bottom-bar-height: 0.25rem;
                        --van-tabs-bottom-bar-color: linear-gradient(
                            360deg,
                            #475fd9 0%,
                            #5880e8 100%
                        );
                    "
                >
                    <VanTab v-for="item in tabs" :key="item.type" :name="item.type">
                        <template #title>
                            <span class="text-17px">
                                {{ item.title }}
                            </span>
                        </template>
                    </VanTab>
                </VanTabs>
                <div
                    v-if="rewardsCount && !loading"
                    class="rounded-3xl mt-2 mb-2 h-9 bg-[#F2F2FF] flex items-center justify-between pl-10px pr-[5px]"
                >
                    <div class="flex-1 flex items-center">
                        <i class="iconfont icon-liwu text-txt flex-shrink-0 mr-[5px]"></i>
                        <p class="text-txt text-sm font-medium line-clamp-1">
                            您有{{ rewardsCount }}笔{{ title }}未领取
                        </p>
                    </div>
                    <VanButton
                        @click="toPage()"
                        class="rounded-3xl text-13px flex-shrink-0 w-[73px] h-[30px] tlw_btn_linear border-0 text-white"
                    >
                        去领取
                    </VanButton>
                </div>
            </div>
            <div class="flex-1 overflow-y-auto relative">
                <PullRefreshList
                    :onLoad="onLoad"
                    :refresh="onRefresh"
                    :finished="finished"
                    :list-props="{ immediateCheck: false }"
                >
                    <ul class="px-10px pb-5">
                        <li
                            :key="index"
                            v-for="(item, index) in records"
                            class="rounded-xl bg-white px-10px overflow-hidden mt-[6px] first-of-type:mt-10px"
                        >
                            <div class="min-h-[44px]">
                                <div class="flex items-center justify-between">
                                    <PublicHead
                                        :border="false"
                                        :right="false"
                                        :title="item.title"
                                    />
                                    <span class="font-DIN flex-shrink-0 text-mainText text-2xl">
                                        {{ item.rebateAmount }}
                                    </span>
                                </div>
                                <div
                                    class="flex items-center justify-between py-1"
                                    v-show="/(0|1|3)/.test(`${item.type}`)"
                                >
                                    <p class="flex-1 text-sm line-clamp-1">
                                        {{ mask(item.userName, 2, item.userName?.length - 2) }}
                                    </p>
                                    <p
                                        class="text-xs flex-shrink-0 text-right text-txt_d"
                                        v-show="/(0|1)/.test(`${item.type}`)"
                                    >
                                        首存金额：{{ item.firstAmount }}
                                    </p>
                                </div>
                            </div>
                            <div
                                class="h-[26px] border-t border-t-mainBg flex items-center text-xs text-txt_d"
                            >
                                <p
                                    v-show="/(0|1)/.test(`${item.type}`)"
                                    class="flex-1 whitespace-nowrap scale-90 -translate-x-3 relative"
                                >
                                    注册时间：{{ formatTime(item.registerAt) }}
                                    <i
                                        class="absolute -right-10px h-4 border-r border-r-mainBg"
                                    ></i>
                                </p>
                                <p
                                    class="flex-1 whitespace-nowrap text-right scale-90 -translate-x-4"
                                    :class="{
                                        '!text-left !-translate-x-5': /(2|3)/.test(
                                            item.type?.toString()
                                        ),
                                    }"
                                >
                                    派发时间：{{ item.deliveryAt }}
                                </p>
                            </div>
                        </li>
                    </ul>
                </PullRefreshList>
                <NoData v-if="!loading && !records?.[0]" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api/index";
import { IactivityRecirdlist } from "@/api/invitation/interface";
import { ListElement } from "@/api/invitation/types";
import NavBar from "@/components/NavBar.vue";
import NoData from "@/components/NoData.vue";
import PublicHead from "@/components/PublicHead.vue";
import PullRefreshList from "@/components/PullRefreshList.vue";
import { useStore } from "@/stores/index";
import { formatTime, mask } from "@/utils";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

interface Itabs {
    title: string;
    type: number;
}

const router = useRouter();
const active = ref<number>(0);
const finished = ref<boolean>(false);
const { setLoading } = useStore();
const { loading } = storeToRefs(useStore());
const records = ref<ListElement[]>([]);
const rewardsCount = ref();
const tabs = ref<Itabs[]>([
    { title: "首存奖励", type: 0 },
    { title: "流水分成", type: 2 },
    { title: "晋级奖励", type: 3 },
]);
const params = ref<IactivityRecirdlist>({
    current: 1,
    data: {
        type: 0,
    },
    size: 15,
});

params.value.data.type = tabs.value[0].type;

const title = computed(() => {
    switch (params.value.data.type) {
        case 0:
            return "首存奖励";
        case 2:
            return "投注返利";
        case 3:
            return "晋级奖励";
        default:
            break;
    }
});

const toPage = () => {
    router.push({ name: "messageCenter", state: { active: 4 } });
};

const changeTab = (type: number) => {
    records.value = [];
    params.value.current = 1;
    params.value.data.type = type;
    activityRecirdlist();
};

const onRefresh = async () => {
    params.value.current = 1;
    finished.value = false;
    return await activityRecirdlist();
};

const onLoad = async () => {
    return await activityRecirdlist(false);
};

const activityRecirdlist = async (isLoading: boolean = true) => {
    if (isLoading) setLoading(true);
    const res = await API.activityRecirdlist(params.value);
    setLoading(false);
    if (res.code === 0) {
        rewardsCount.value = res.data?.unclaimedQuantity;
        const list = res.data?.list?.list || [];
        const isConcat = {
            true: [...records.value, ...list!],
            false: list,
        };
        records.value = isConcat[`${params.value.current != 1}`];
        if (res.data?.list?.pages! <= params.value.current || res.data?.list?.pages == 0) {
            finished.value = true;
        }
        params.value.current++;
        return res;
    }
};
activityRecirdlist();
</script>
