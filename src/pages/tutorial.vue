<!-- 盘口教程 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '盘口教程' }">
            <template #right>
                <i class="z-10 text-white ml-2 icon-erji text-lg" @click="toService" />
            </template>
        </NavBar>
        <div class="flex-1 overflow-hidden rounded-t-20px bg-mainBg z-0">
            <VanTabs
                animated
                v-model:active="active"
                :line-width="'1.125rem'"
                :line-height="'.25rem'"
                class="h-full overflow-hidden bg-white"
                style="
                    --van-tabs-line-height: 3.125rem;
                    --van-tabs-bottom-bar-color: linear-gradient(360deg, #4b6cdb 0%, #5880e8 100%);
                "
            >
                <VanTab :title="item.title" v-for="(item, index) in tabs" :key="item.title">
                    <template #title>
                        <span
                            class="text-txt_d text-17px"
                            :class="{ '!text-mainText !font-medium': active == index }"
                        >
                            {{ item.title }}
                        </span>
                    </template>
                    <div class="h-full bg-mainBg">
                        <SwiperBox>
                            <component :is="is(item.type, typeMap)" />
                        </SwiperBox>
                    </div>
                </VanTab>
            </VanTabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { is, toService } from "@/utils";

import Cholesterol from "@/components/Tutorial/Cholesterol.vue";
import CornerKick from "@/components/Tutorial/CornerKick.vue";
import Handicap from "@/components/Tutorial/Handicap.vue";
import SingleDouble from "@/components/Tutorial/SingleDouble.vue";
import Size from "@/components/Tutorial/Size.vue";
import WinAlone from "@/components/Tutorial/WinAlone.vue";
import NavBar from "@/components/NavBar.vue";
import SwiperBox from "@/components/SwiperBox.vue";

const typeMap = {
    0: Handicap,
    1: Size,
    2: WinAlone,
    3: CornerKick,
    4: SingleDouble,
    5: Cholesterol,
};

const tabs = ref<{ title: string; type: number }[]>([
    { title: "让球", type: 0 },
    { title: "大小", type: 1 },
    { title: "独赢", type: 2 },
    { title: "角球", type: 3 },
    { title: "单双", type: 4 },
    { title: "波胆", type: 5 },
]);

const active = ref<number>(0);
</script>

<style lang="scss" scoped>
::v-deep(.van-tabs) {
    .van-tabs__content {
        height: calc(100% - 50px);
        .van-tab__panel {
            height: 100%;
            .swiper {
                height: 100%;
                overflow: hidden;
            }
        }
    }
}
</style>
