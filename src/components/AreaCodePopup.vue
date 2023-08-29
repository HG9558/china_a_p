<!-- 手机区号底部弹窗 -->
<template>
    <VanPopup
        teleport="body"
        position="bottom"
        v-model:show="showBottom"
        style="--van-popup-background: transparent"
        :style="{ height: Number(init?.area_code?.length) >= 10 ? '70%' : 'auto' }"
    >
        <div class="h-full bg-txt rounded-t-20px z-0 flex flex-col overflow-hidden">
            <div class="h-11 flex items-center justify-center text-17px text-white">选择区号</div>
            <div class="bg-white flex-1 rounded-t-20px pb-10 overflow-y-auto">
                <div
                    class="h-10 px-10px flex items-center justify-between border-b border-b-mainBg last-of-type:border-b-0"
                    v-for="(item, index) in init?.area_code"
                    @click="selectItem(item)"
                    :key="index"
                >
                    <div class="flex-1 flex items-center text-sm text-mainText overflow-hidden">
                        <span class="mr-1">
                            {{ item.name }}
                        </span>
                        <span class="flex-1 line-clamp-1">
                            {{ item.country }}
                        </span>
                    </div>
                    <i
                        v-show="current?.name == item.name"
                        class="iconfont text-txt icon-zhengque mr-1 flex-shrink-0"
                    />
                </div>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { useAsync } from "@/stores/useAsync";
import { storeToRefs } from "pinia";
import { computed, ref, onMounted } from "vue";
import { AreaCode } from "@/api/home/types";

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: AreaCode): void;
}>();
const props = defineProps<{ modelValue: boolean }>();

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set() {
        close();
    },
});

const { init } = storeToRefs(useAsync());
const current = ref<AreaCode>();

const selectItem = (item: AreaCode) => {
    current.value = item;
    emits("submit", item);
    close();
};

const close = () => {
    emits("update:modelValue", false);
};

onMounted(() => {
    const item = init?.value?.area_code?.[0];
    current.value = item;
    emits("submit", item!);
});
</script>
