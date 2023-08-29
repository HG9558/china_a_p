<!-- 赛事详情 tab 切换 -->
<template>
    <div class="relative">
        <div class="bg-main w-full h-5 absolute top-0"></div>
        <div class="h-11 w-full flex items-center z-10 relative bg-white">
            <div
                class="flex w-11 h-full items-center justify-center shadow-[0px_0px_3px_0px_rgba(0,0,0,0.05)] z-10 bg-[#eee]"
                @click="emits('clickRight')"
            >
                <div
                    class="rounded-full flex items-center justify-center transition-all"
                    :class="{ 'rotate-180': receiveStatus }"
                >
                    <i class="text-xl" v-html="ic_d_shrink" />
                </div>
            </div>
            <div class="flex-1 overflow-hidden">
                <VanTabs
                    shrink
                    :ellipsis="false"
                    background="transparent"
                    v-model:active="active"
                    @change="changeTabs"
                    style="
                        --van-tabs-bottom-bar-height: 0.125rem;
                        --van-tabs-bottom-bar-color: #4b6cdb;
                        --van-tabs-bottom-bar-width: 0.625rem;
                    "
                >
                    <VanTab v-for="(item, index) in tabs" :key="index">
                        <template #title>
                            <VanButton
                                class="h-[30px] px-2 text-15px text-gz border-0"
                                :class="{ 'text-txt': active === index }"
                            >
                                {{ item.marketName }}
                            </VanButton>
                        </template>
                    </VanTab>
                </VanTabs>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { GetCategoryList } from "@/api/obsportend/obMatches/types";
import { ref, toRefs } from "vue";
import ic_d_shrink from "@/assets/svg/ic_d_shrink.svg?raw";

const props = defineProps<{ tabs: GetCategoryList[]; receiveStatus: boolean }>();
const emits = defineEmits<{ (e: "change", index: number): void; (e: "clickRight"): void }>();

const active = ref<number>(0);

const changeTabs = (index: number) => {
    emits("change", index);
};

const { tabs, receiveStatus } = toRefs(props);
</script>
