<!-- 活动 选择场馆 -->
<template>
    <VanPopup
        :round="true"
        position="bottom"
        v-model:show="showBottom"
        :class="{ '!h-1/2': Number(props?.list) > 5 }"
    >
        <div class="bg-txt h-full flex flex-col">
            <div
                class="relative w-full h-12 flex-shrink-0 flex items-center text-white justify-between px-4"
            >
                <p class="font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    选择场馆
                </p>
            </div>
            <div class="rounded-t-20px bg-white flex-1 overflow-y-auto">
                <ul class="w-full text-sm max-h-[50vh]">
                    <li
                        :key="index"
                        @click="submit(item)"
                        v-for="(item, index) in props?.list"
                        class="h-[60px] flex items-center px-10px border-b border-mainBg"
                    >
                        <div
                            class="flex-1 flex items-center justify-between overflow-hidden"
                            :class="{ 'text-mainText/40': status(item.status) }"
                        >
                            <span class="line-clamp-1 flex-1 break-all">
                                {{ item.name }}
                            </span>
                            <span class="pr-10px">
                                {{ status(item.status) }}
                            </span>
                        </div>
                        <div class="mx-10px flex-shrink-0" v-show="active?.id == item.id">
                            <i class="iconfont icon-zhengque text-txt" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { GameListDto } from "@/api/promoActivity/types";
import { computed } from "vue";

const props = defineProps<{
    modelValue: boolean;
    list: GameListDto[];
    active: GameListDto | undefined;
}>();

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: GameListDto): void;
}>();

const status = computed(() => (status: number) => {
    switch (status) {
        case 0:
            return "场馆已停用";
        case 2:
            return "场馆维护中";
        case 3:
            return "该场馆已参与活动";
        default:
            break;
    }
});

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set(v) {
        close();
    },
});

const submit = (item: GameListDto) => {
    if (/(0|2|3)/.test(`${item.status}`)) return;
    emits("submit", item);
    close();
};

const close = () => {
    emits("update:modelValue", false);
};
</script>
