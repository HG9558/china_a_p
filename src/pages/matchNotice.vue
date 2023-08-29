<!-- 赛事公告 -->
<template>
    <div class="h-full bg-mainBg flex flex-col tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '赛事公告' }">
            <template #right>
                <i class="z-10 text-white ml-2 icon-erji text-lg" @click="toService" />
            </template>
        </NavBar>
        <div class="flex-1 overflow-hidden relative rounded-t-20px bg-mainBg z-0">
            <SwiperBox ref="swiperRef">
                <ul>
                    <li
                        :key="index"
                        v-for="(item, index) in noticeList"
                        class="px-3 pb-4 bg-white rounded-20px text-sm flex flex-col items-center justify-evenly last-of-type:mb-3 relative mt-10px first-of-type:mt-0"
                    >
                        <div class="flex items-center justify-between w-full">
                            <div class="flex-1 overflow-hidden">
                                <PublicHead
                                    class="w-full overflow-hidden"
                                    :title="item.title"
                                    :border="false"
                                    :right="false"
                                />
                            </div>
                            <span class="text-xs text-[#CDCFD4] line-clamp-1 text-right">
                                {{ formatTime(+item.sendTimeOther / 1000) }}
                            </span>
                        </div>
                        <p class="text-sm text-gz pr-3 break-all">
                            {{ item.context }}
                        </p>
                    </li>
                </ul>
            </SwiperBox>
            <NoData :text="'暂无公告'" v-show="!loading && !noticeList?.[0]" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { SwiperRef } from "@/components/types";
import { useStore } from "@/stores";
import { formatTime, toService } from "@/utils";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import SwiperBox from "@/components/SwiperBox.vue";
import PublicHead from "@/components/PublicHead.vue";
import NoData from "@/components/NoData.vue";
import { Fdata } from "@/api/obsportend/obSport/types";

const { loading } = storeToRefs(useStore());
const { setLoading } = useStore();
const swiperRef = ref<SwiperRef>();
const noticeList = ref<Fdata[]>();

const frontListPB = async () => {
    setLoading(true);
    const res = await API.frontListPB();
    setLoading(false);
    if (res.code === 0) {
        noticeList.value = res.data?.nb!;
    }
    swiperRef.value?.update?.();
};

frontListPB();
</script>
