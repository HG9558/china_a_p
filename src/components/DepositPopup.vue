<!-- 存款教程底部弹出 -->
<template>
    <VanPopup
        position="bottom"
        v-model:show="showBottom"
        style="width: 100%; height: 92%; --van-popup-background: transparent"
    >
        <div class="h-full bg-mainBg rounded-t-20px overflow-hidden z-0 flex flex-col">
            <div class="h-16 relative flex items-center flex-shrink-0">
                <VanButton class="border-0 h-7 text-txt text-15px" @click="clickLeft">
                    取消
                </VanButton>
                <p class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    选择存款教程
                </p>
            </div>
            <div class="flex-1 overflow-hidden">
                <SwiperBox>
                    <van-cell-group style="--van-cell-line-height: 2rem">
                        <van-cell
                            :key="index"
                            class="py-2"
                            :title="item.title"
                            @click="selectItem(item)"
                            v-for="(item, index) in list"
                        >
                            <template #icon>
                                <img
                                    class="w-7 h-8 mr-10px object-contain"
                                    :src="icons(item.icon)"
                                    alt=""
                                />
                            </template>
                            <template #title>
                                <div class="flex items-center justify-between">
                                    <p>
                                        {{ item.title }}
                                    </p>
                                    <i
                                        class="iconfont icon-zhengque text-txt"
                                        v-show="current?.title == item.title"
                                    />
                                </div>
                            </template>
                        </van-cell>
                    </van-cell-group>
                </SwiperBox>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { computed } from "vue";
import SwiperBox from "./SwiperBox.vue";
import { Ideposits } from "./types";

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: Ideposits): void;
}>();
const props = defineProps<{ modelValue: boolean; list: Ideposits[]; current?: Ideposits }>();

const icons = computed(() => (img: string) => {
    return new URL(`/src/assets/helpCenter/icon_${img}.png`, import.meta.url).href;
});

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set() {
        close();
    },
});

const clickLeft = () => {
    close();
};

const close = () => {
    emits("update:modelValue", false);
};

const selectItem = (item: Ideposits) => {
    emits("submit", item);
    close();
};
</script>
