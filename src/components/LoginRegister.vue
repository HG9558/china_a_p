<!-- 登录注册公告组件 -->
<template>
    <div class="h-full w-full flex flex-col">
        <div class="flex-shrink-0 relative pb-[67.06%] pointer-events-none z-10">
            <img class="absolute top-0 left-0 w-full h-full" :src="login_bg" alt="" />
            <VanButton
                class="absolute top-4 w-7 h-7 left-5 p-0 border-0 z-10 pointer-events-auto"
                @click="goBack()"
            >
                <van-icon name="cross" color="#000000" class="text-lg" />
            </VanButton>
        </div>
        <div class="flex-1 w-full bg-mainBg">
            <div class="bg-white">
                <div
                    class="setTabSwipeWidth bg-white flex flex-col w-full relative rounded-t-20px shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)]"
                >
                    <div class="px-5 overflow-x-hidden rounded-t-20px pt-10px">
                        <VanTabs
                            shrink
                            animated
                            line-height=".1875rem"
                            line-width="2.3125rem"
                            @change="change"
                            class="font-PFSCS w-full"
                            v-model:active="active"
                            style="
                                --van-tab-font-size: 0.9375rem;
                                --van-tabs-nav-background: transparent;
                                --van-tabs-bottom-bar-color: #4b6cdb;
                            "
                        >
                            <VanTab :key="index" v-for="(item, index) in tabs">
                                <template #title>
                                    <span
                                        class="text-17px text-mainText font-medium"
                                        :class="{
                                            '!text-[19px] !text-txt font-semibold': active == index,
                                        }"
                                    >
                                        {{ item.title }}
                                    </span>
                                </template>
                                <div class="pt-4 w-full" :key="item.title">
                                    <component
                                        v-if="active == index"
                                        :is="item.component"
                                        :setLoading="setLoading"
                                    />
                                </div>
                            </VanTab>
                        </VanTabs>
                    </div>
                </div>
            </div>
        </div>
        <ul
            class="flex px-5 bg-mainBg flex-shrink-0 items-center pb-5 justify-evenly text-center w-full font-PFSCR"
        >
            <li
                class="flex-1 text-center relative before:absolute before:h-3 before:top-1/2 before:-translate-y-1/2 before:right-0 before:border-r before:border-r-txt_d before:rotate-12"
            >
                <VanButton
                    class="border-0 text-txt text-sm border-r-txt_d"
                    :disabled="loading"
                    @click="router.replace('/match')"
                    icon=""
                >
                    <template #icon>
                        <div class="w-[18px] h-18px" v-html="ic_football" />
                    </template>
                    先去逛逛
                </VanButton>
            </li>
            <li class="flex-1 text-center">
                <VanButton
                    class="border-0 text-mainText text-sm border-r-txt_d"
                    icon=""
                    :disabled="loading"
                    @click="toService"
                >
                    <template #icon>
                        <i class="iconfont icon-erji mr-1 text-mainText"></i>
                    </template>
                    联系客服
                </VanButton>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from "vue";
import type { LoginRegisterTabs } from "./types";
import { toService } from "@/utils";
import ic_football from "@/assets/svg/ic_football.svg?raw";
import { storeToRefs } from "pinia";
import { useStore } from "@/stores";
import { useRouter } from "vue-router";
import login_bg from "@/assets/logo/login_bg.png";

const { globelKey } = storeToRefs(useStore());

interface Props {
    tabs: LoginRegisterTabs[];
}

const router = useRouter();
const loading = ref<boolean>(false);
const props = defineProps<Props>();
const emits = defineEmits<{ (event: "change", active: number): void }>();
const active = ref<number>(0);
const change = (active: number) => {
    emits("change", active);
};

const goBack = () => {
    if (history.length <= 1) {
        router.push("/");
        return;
    }
    router.go(-1);
};

const setLoading = (value: boolean) => {
    loading.value = value;
};

const { tabs } = toRefs(props);
</script>

<style lang="scss" scoped>
::v-deep(.van-tabs) {
    .van-tabs__line {
        bottom: 15px;
        left: -35px;
    }
}
</style>
