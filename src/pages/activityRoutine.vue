<!-- 常规活动(海报类活动) -->
<template>
    <div class="h-full flex flex-col tlw_top_bg" :style="{ paddingTop: `${top || 0}px` }">
        <NavBar transparent class="flex-shrink-0" :nav-bar-props="{ title: info?.title }" />
        <div class="flex-1 overflow-hidden bg-mainBg overflow-y-auto">
            <div class="relative pb-[120.80%] bg-[#E0E2E6] overflow-hidden mb-10px">
                <img
                    v-if="info?.mobileDetailPic"
                    class="object-cover absolute top-0 left-0 w-full h-full"
                    v-lazy="lazy(info?.mobileDetailPic)"
                    alt=""
                />
            </div>
            <div class="px-10px mb-10px">
                <div class="bg-white mt-10px pb-10px rounded-20px border border-[#E5EBFF]">
                    <div
                        class="px-10px border-b border-b-mainBg border-solid flex flex-col justify-evenly text-mainText text-sm font-medium"
                    >
                        <ActivityTitle title="活动内容" class="mt-5 mb-10px" />
                        <p class="text-sm whitespace-nowrap" v-if="!loading">
                            活动时间：{{
                                info?.periodType == 0
                                    ? "长期活动"
                                    : `${formatTime(
                                          info?.activityStartTime || 0,
                                          "YYYY-MM-DD HH:mm"
                                      )} - ${formatTime(
                                          info?.activityEndTime || 0,
                                          "YYYY-MM-DD HH:mm"
                                      )}`
                            }}
                        </p>
                    </div>
                    <VanSkeleton title :row="10" :loading="loading">
                        <div
                            class="description p-10px text-sm text-gz leading-6 break-all whitespace-pre-line"
                            v-html="info?.detailText"
                        ></div>
                    </VanSkeleton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import ic_activity from "@/assets/logo/ic_activity.png";
import NavBar from "@/components/NavBar.vue";
import { useApp } from "@/stores/useApp";
import { storeToRefs } from "pinia";
import { API } from "@/api/index";
import { useRoute } from "vue-router";
import { GetPromoActivity } from "@/api/promoActivity/types";
import { formatTime } from "@/utils";
import { useStore } from "@/stores/index";
import ActivityTitle from "@/components/Activity/ActivityTitle.vue";

const route = useRoute();
const { setLoading } = useStore();
const { loading } = storeToRefs(useStore());
const { top } = storeToRefs(useApp());
const info = ref<GetPromoActivity>();

const lazy = computed(() => (src?: string) => ({ src, error: ic_activity, loading: ic_activity }));

const getPromoActivity = async () => {
    setLoading(true);
    const res = await API.getPromoActivity({ type: 2, id: route.query?.id as string });
    setLoading(false);
    if (res.code == 0) {
        info.value = res.data!;
    }
};

getPromoActivity();
</script>

<style lang="scss" scoped>
::v-deep(.description) {
    img,
    video {
        margin: 0 auto;
    }
}
</style>
