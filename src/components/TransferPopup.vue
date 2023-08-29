<!-- 转账popup  -->
<template>
    <VanPopup
        v-model:show="open"
        round
        position="bottom"
        :options="options"
        :style="{ height: '80%' }"
        :safe-area-inset-top="true"
        :safe-area-inset-bottom="true"
        class="transfer_popup"
    >
        <div class="popup_content h-full flex flex-col bg-txt">
            <header class="h-11 text-center relative text-white font-bold flex-shrink-0">
                <span class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    选择钱包
                </span>
                <i
                    class="icon-close-bold absolute left-3 top-1/2 text-lg -translate-y-1/2"
                    @click="changeValue(false)"
                />
                <div
                    class="absolute h-5 right-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
                >
                    <i
                        class="inline-block w-5 h5 text-white"
                        v-html="ic_refresh"
                        @click="refresh"
                        @animationiteration="animationiteration"
                        :class="{
                            'pointer-events-none opacity-50': !!animate,
                            'animate-spin': animate,
                        }"
                    ></i>
                </div>
            </header>
            <div class="list_box flex-1 rounded-t-20px overflow-y-auto bg-white">
                <van-cell-group :border="false" class="cell_group">
                    <van-cell v-for="item in options" :key="item.id" @click="submit(item)">
                        <template #title>
                            <div
                                class="flex items-center text-mainText"
                                :class="{
                                    'font-bold': item.id === active?.id,
                                    '!text-txt_d':
                                        /(0|2)/.test(`${item.status}`) || item.activityUserStatus,
                                }"
                            >
                                <span class="mr-2">
                                    {{ item.walletName }}
                                </span>
                                <span v-if="item.activityUserStatus == 3" class="ml-1">
                                    (参与活动中)
                                </span>
                                <span v-else-if="/(0|2)/.test(`${item.status}`)">（维护中）</span>
                                <span v-else-if="item.self"> ¥ {{ balance?.coin }} </span>
                                <span v-else> ¥ {{ item.coin || "0.00" }} </span>
                            </div>
                        </template>
                        <template #right-icon>
                            <div class="flex items-center">
                                <div
                                    v-show="item.activityUserStatus"
                                    class="w-4 h-4 mr-1"
                                    v-html="ic_gantan"
                                />
                                <i
                                    v-show="item.id === active?.id"
                                    class="iconfont icon-zhengque text-txt"
                                />
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import type { PlatList } from "@/api/platform/types";
import { computed, ref, toRefs } from "vue";
import { useAsync } from "@/stores/useAsync";
import { storeToRefs } from "pinia";
import ic_refresh from "@/assets/svg/ic_refresh.svg?raw";
import ic_gantan from "@/assets/svg/ic_gantan.svg?raw";

const { allQueryBalance } = useAsync();
const animate = ref<string | boolean>();
const { balance } = storeToRefs(useAsync());

const props = defineProps<{
    modelValue: boolean;
    options?: Partial<PlatList>[];
    active: Partial<PlatList> | undefined;
}>();

const animationiteration = async () => {
    // 刷新动画处理
    if (animate.value === "over") {
        animate.value = false;
    }
};

const emit = defineEmits<{
    (e: "update:modelValue", v: boolean): void;
    (e: "change", v: Partial<PlatList>): void;
}>();

const refresh = async () => {
    animate.value = true;
    await allQueryBalance();
    animate.value = "over";
};

const open = computed({
    get() {
        return props.modelValue;
    },
    set(v) {
        changeValue(v);
    },
});

const submit = (item: Partial<PlatList>) => {
    if (/(0|2)/.test(`${item.status}`)) return;
    emit("change", item);
};

const changeValue = (v: boolean) => {
    emit("update:modelValue", v);
};

const { options, active } = toRefs(props);
</script>
