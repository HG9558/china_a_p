<!-- 消息详情/赛事公告详情 公共组件 -->
<template>
    <VanPopup position="right" v-model:show="showBottom" style="width: 100%; height: 100%">
        <div class="h-full flex flex-col tlw_top_bg">
            <NavBar transparent :nav-bar-props="{ title: props?.title }" :click-left="close">
                <template #right>
                    <i class="z-10 text-white ml-2 icon-erji text-lg" @click="toService" />
                </template>
            </NavBar>
            <div class="flex-1 overflow-hidden rounded-t-20px bg-mainBg z-0">
                <SwiperBox>
                    <div class="px-10px py-4">
                        <div class="bg-white rounded-20px">
                            <div
                                class="h-14 px-10px flex items-center justify-between border-b border-b-mainBg"
                            >
                                <p class="text-17px text-txt flex-1 line-clamp-1">
                                    {{ item.title }}
                                </p>
                                <span
                                    v-if="item?.publishTime"
                                    class="flex-shrink-0 text-xs text-txt_d"
                                >
                                    {{ formatTime(item?.publishTime) }}
                                </span>
                            </div>
                            <p class="leading-6 text-sm text-[#666] px-10px py-5">
                                {{ item?.content }}
                            </p>
                        </div>
                    </div>
                </SwiperBox>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import type { NList } from "@/api/notice/types";
import { formatTime, toService } from "@/utils";
import { computed, toRefs } from "vue";
import NavBar from "@/components/NavBar.vue";
import SwiperBox from "@/components/SwiperBox.vue";

const props = defineProps<{ modelValue: boolean; title: string; item: Partial<NList> }>();

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set() {
        close();
    },
});
const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

const close = () => {
    emits("update:modelValue", false);
};

const { item } = toRefs(props);
</script>
