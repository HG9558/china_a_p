<!-- 注单头部tab组件 -->
<template>
    <div class="flex w-full items-center overflow-hidden">
        <div class="flex-1 overflow-hidden pr-2">
            <VanTabs
                shrink
                animated
                class="mx-1"
                line-width="0"
                @change="change"
                v-model:active="active"
                style="--van-tabs-line-height: 3.125rem; --van-tabs-nav-background: transparent"
            >
                <VanTab v-for="(item, index) in tabs" :key="index">
                    <template #title>
                        <div
                            class="flex pl-5 h-full items-center bg-no-repeat bg-[length:100%] relative text-[#E4E4EC] mr-3"
                        >
                            <p
                                class="line-clamp-1 text-base text-center z-10 whitespace-nowrap pt-[2px]"
                                :class="{
                                    'text-white !text-[18px] font-semibold': active === index,
                                }"
                            >
                                {{ item.name }}
                            </p>
                        </div>
                    </template>
                </VanTab>
            </VanTabs>
        </div>
        <i
            v-show="service"
            class="icon-erji text-lg mr-3 text-white flex-shrink-0 -translate-y-1 active:scale-95 transition-all"
            @click="toService"
        />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { GetPlatBetTabs } from "@/api/platform/types";
import ic_plat_106 from "@/assets/headerTabs/ic_plat_106.png";
import ic_plat_107 from "@/assets/headerTabs/ic_plat_107.png";
import ic_plat_108 from "@/assets/headerTabs/ic_plat_108.png";
import ic_plat_109 from "@/assets/headerTabs/ic_plat_109.png";
import ic_plat_110 from "@/assets/headerTabs/ic_plat_110.png";
import ic_plat_111 from "@/assets/headerTabs/ic_plat_111.png";
import ic_plat_112 from "@/assets/headerTabs/ic_plat_112.png";
import ic_plat_999 from "@/assets/headerTabs/ic_plat_999.png";
import ic_plat_game from "@/assets/headerTabs/ic_plat_game.png";
import ic_plat_un_106 from "@/assets/headerTabs/ic_plat_un_106.png";
import ic_plat_un_107 from "@/assets/headerTabs/ic_plat_un_107.png";
import ic_plat_un_108 from "@/assets/headerTabs/ic_plat_un_108.png";
import ic_plat_un_109 from "@/assets/headerTabs/ic_plat_un_109.png";
import ic_plat_un_110 from "@/assets/headerTabs/ic_plat_un_110.png";
import ic_plat_un_111 from "@/assets/headerTabs/ic_plat_un_111.png";
import ic_plat_un_112 from "@/assets/headerTabs/ic_plat_un_112.png";
import ic_plat_un_999 from "@/assets/headerTabs/ic_plat_un_999.png";
import ic_plat_un_game from "@/assets/headerTabs/ic_plat_un_game.png";
import { toService } from "@/utils";

const active = ref<number>(0);
const emits = defineEmits<{ (e: "change", value: number): void }>();
defineProps<{ service?: boolean; tabs: GetPlatBetTabs[] }>();

interface Icons {
    [name: number]: any;
}

const icons = computed(() => (id: number | null) => {
    switch (id) {
        case 106:
            return ic_plat_un_106;
        case 107:
            return ic_plat_un_107;
        case 108:
            return ic_plat_un_108;
        case 109:
            return ic_plat_un_109;
        case 110:
            return ic_plat_un_110;
        case 111:
            return ic_plat_un_111;
        case 112:
            return ic_plat_un_112;
        case 999:
            return ic_plat_un_999;
        default:
            return ic_plat_un_game;
    }
});

const activeIcon = computed(() => (id: number | null) => {
    switch (id) {
        case 106:
            return ic_plat_106;
        case 107:
            return ic_plat_107;
        case 108:
            return ic_plat_108;
        case 109:
            return ic_plat_109;
        case 110:
            return ic_plat_109;
        case 111:
            return ic_plat_111;
        case 112:
            return ic_plat_112;
        case 999:
            return ic_plat_999;
        default:
            return ic_plat_game;
    }
});

const change = (i: number) => {
    emits("change", i);
};
</script>

<style lang="scss" scoped>
::v-deep(.van-tabs) {
    .van-tabs__nav {
        padding: 0;
        .van-tab {
            padding: 0;
        }
    }
}
</style>
