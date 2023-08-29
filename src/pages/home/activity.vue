<!-- 首页 活动 -->
<template>
    <div class="flex-1 w-full flex flex-col overflow-hidden">
        <header class="w-full flex flex-shrink-0 items-center px-10px">
            <div class="flex-1 overflow-hidden h-10 pb-2 flex items-center pr-10px">
                <div v-if="loading" class="h-full flex items-center flex-nowrap">
                    <span
                        class="w-14 h-6 rounded-2xl tlw_skeleton mx-2 first-of-type:ml-0"
                        v-for="(item, index) in 5"
                        :key="index"
                    />
                </div>
                <VanTabs
                    v-else
                    shrink
                    ref="tabRef"
                    :type="'card'"
                    class="w-full"
                    :key="globelKey"
                    :ellipsis="false"
                    @change="changeTab"
                    v-model:active="active"
                    style="--van-tabs-nav-background: transparent"
                >
                    <VanTab
                        :key="index"
                        :name="item.id"
                        :title="item.name"
                        title-class="mr-10px"
                        v-for="(item, index) in groupList"
                    >
                        <template #title>
                            <span
                                class="opacity-70 text-15px text-white"
                                :class="{
                                    'font-semibold !text-mainText  !opacity-100': active == item.id,
                                }"
                            >
                                {{ item.name }}
                            </span>
                        </template>
                    </VanTab>
                </VanTabs>
            </div>
        </header>
        <div class="bg-mainBg flex-1 overflow-hidden rounded-t-20px pt-1">
            <SwiperBox ref="swiperRef">
                <VanPullRefresh disabled>
                    <div class="px-10px z-20 pb-5 relative" v-if="loading || list?.[0]">
                        <div
                            @click="toPage(item)"
                            :class="{ 'mt-3': index !== 0, 'mt-1': index == 0 }"
                            class="rounded-20px overflow-hidden"
                            v-for="(item, index) in loading ? skList : list"
                            :key="index"
                        >
                            <div
                                class="pb-[27.04%] relative bg-[#E0E2E6] rounded-t-20px overflow-hidden"
                            >
                                <div
                                    v-if="labels?.[item?.label]"
                                    v-html="labels[item?.label]"
                                    class="w-20 h-6 absolute top-0 left-0 z-20"
                                />
                                <div
                                    v-if="loading"
                                    class="absolute z-10 rounded-t-20px top-0 left-0 w-full h-full tlw_skeleton"
                                />
                                <img
                                    v-else
                                    class="absolute z-10 rounded-t-20px top-0 left-0 w-full h-full object-cover"
                                    v-lazy="lazy(item?.mobileListPic)"
                                    alt=""
                                />
                            </div>
                            <div class="h-16 px-10px flex flex-col justify-center bg-white">
                                <template v-if="loading">
                                    <p class="h-6 w-32 tlw_skeleton rounded"></p>
                                    <span class="h-4 w-56 tlw_skeleton rounded"></span>
                                </template>
                                <template v-else>
                                    <p class="text-17px font-medium line-clamp-1">
                                        {{ item?.title }}
                                    </p>
                                    <span
                                        class="text-xs text-[#999] mt-1 -translate-x-2 scale-95 line-clamp-1"
                                    >
                                        活动时间：
                                        {{
                                            item.periodType == 0
                                                ? "长期有效"
                                                : `${formatTime(
                                                      item.activityStartTime,
                                                      "YYYY/MM/DD"
                                                  )}-${formatTime(
                                                      item.activityEndTime,
                                                      "YYYY/MM/DD"
                                                  )}`
                                        }}
                                    </span>
                                </template>
                            </div>
                        </div>
                    </div>
                </VanPullRefresh>
            </SwiperBox>
            <NoData class="mt-10" v-if="!loading && !list?.[0]" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { SwiperRef } from "@/components/types";
import { useStore } from "@/stores";
import { authToPage, formatTime } from "@/utils";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import ic_banner from "@/assets/logo/ic_banner.png";
import SwiperBox from "@/components/SwiperBox.vue";
import NoData from "@/components/NoData.vue";
import { PromoActivityList } from "@/api/promoActivity/types";
import { useActivity } from "@/stores/useActivity";
import ic_label_1 from "@/assets/svg/ic_label_1.svg?raw";
import ic_label_2 from "@/assets/svg/ic_label_2.svg?raw";
import ic_label_3 from "@/assets/svg/ic_label_3.svg?raw";
import ic_label_4 from "@/assets/svg/ic_label_4.svg?raw";
import { useHome } from "@/stores/useHome";
import { TabsInstance } from "vant";

interface Ilabels {
    [name: number]: any;
}

const labels: Ilabels = {
    1: ic_label_1,
    2: ic_label_2,
    3: ic_label_3,
    4: ic_label_4,
};

const swiperRef = ref<SwiperRef>();
const { setLoading } = useStore();
const router = useRouter();
const { active, groupList } = storeToRefs(useActivity());
const { setActive, setGroupList } = useActivity();
const loading = ref<boolean>(false);
const skList = ref<PromoActivityList[]>(Array(5).fill(null));
const { globelKey } = storeToRefs(useStore());
const tabRef = ref<TabsInstance>();

const lazy = computed(() => (src: string) => ({ src: src, error: ic_banner, loading: ic_banner }));

const list = computed(() => {
    return groupList.value?.find(item => item.id == active.value)?.promoActivityList;
});

const getTagPromoActivityList = async () => {
    loading.value = true;
    if (groupList.value?.[0]) {
        loading.value = false;
    }
    const res = await API.getTagPromoActivityList();
    if (res.code == 0) {
        setGroupList(res.data!);
        if (/[0-9]/.test(`${res.data?.[0]?.id}`) && !groupList.value.length) {
            setActive(res.data?.[0]?.id!);
        }
    }
    loading.value = false;
};

const changeTab = (i: number) => {
    setActive(i);
};

const toPage = (item: PromoActivityList) => {
    const status = authToPage();
    if (!status) return false;
    switch (item.type) {
        case 1:
            router.push(`/activityVenue?id=${item.id}`);
            break;
        case 2:
            router.push(`/activityRoutine?id=${item.id}`);
            break;
        default:
            break;
    }
};

watch(
    () => useHome().active,
    (n, o) => {
        if (n == 1) {
            tabRef.value?.resize();
        }
    }
);

getTagPromoActivityList();

setLoading(true);
</script>

<style lang="scss" scoped>
::v-deep(.van-tabs) {
    .van-tabs__nav--card {
        border: 0;
        margin: 0;
        align-items: center;
        .van-tab {
            /* padding: 0 10px; */
            border-right: 0;
            color: #7e93f6;

            &.van-tab--active {
                height: 26px;
                font-size: 15px;
                font-weight: 500;
                color: #4b6cdb;
                border-radius: 21px;
                background: #fff;
            }
        }
    }
}
</style>
