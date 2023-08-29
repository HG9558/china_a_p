<!-- 账户管理 银行卡 选择银行 -->
<template>
    <VanPopup
        teleport="body"
        position="right"
        v-model:show="showBottom"
        style="width: 100%; height: 100%"
    >
        <div class="h-full flex flex-col tlw_top_bg">
            <NavBar
                class="flex-shrink-0"
                transparent
                :click-left="clickLeft"
                :nav-bar-props="{ title: '选择银行' }"
            />
            <div class="flex-1 flex flex-col rounded-t-20px overflow-hidden z-0 bg-mainBg">
                <div class="h-[59px] flex-shrink-0 bg-mainBg flex items-center px-10px">
                    <div
                        class="h-10 px-10px flex items-center justify-between flex-1 bg-white rounded-3xl"
                    >
                        <VanField
                            v-model="search"
                            autocomplete="off"
                            class="flex-1 !py-2 !bg-transparent !px-0 text-sm"
                            placeholder="请输入银行卡名称"
                        />
                        <img class="w-5 h-5" :src="ic_search" alt="" />
                    </div>
                </div>
                <div class="flex-1 overflow-hidden">
                    <RecycleScroller
                        class="bg-white pb-10px h-full overflow-y-auto"
                        :items="filterList"
                        :item-size="59"
                        key-field="id"
                        v-slot="{ item }"
                    >
                        <div
                            class="flex h-[59px] items-center border-b border-b-mainBg px-10px"
                            :class="{ 'bg-mainBg': active?.id == item.id }"
                            @click="submit(item)"
                        >
                            <div class="flex items-center flex-1 overflow-hidden">
                                <img
                                    class="w-[34px] h-[34px] rounded-md object-cover mr-10px flex-shrink-0"
                                    v-lazy="item.icon"
                                    alt=""
                                />
                                <p class="text-sm text-mainText line-clamp-1">
                                    {{ item.name }}
                                </p>
                            </div>
                            <i
                                v-show="active?.id == item.id"
                                class="iconfont text-txt icon-zhengque flex-shrink-0"
                            />
                        </div>
                    </RecycleScroller>
                </div>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import type { BankList } from "@/api/wallet/types";
import { computed, ref, toRefs } from "vue";
import { RecycleScroller } from "vue-virtual-scroller";
import NavBar from "@/components/NavBar.vue";
import ic_search from "@/assets/icon/ic_search.png";

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: string): void;
}>();
const props = defineProps<{ modelValue: boolean; list: BankList[] }>();

const { list } = toRefs(props);

const active = ref<BankList>();
const search = ref<string>("");

const filterList = computed(() => list.value?.filter(item => item.name.includes(search.value)));

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

const submit = (item: BankList) => {
    // 选中的银行卡
    active.value = item;
    emits("submit", item.name);
    close();
};

const close = () => {
    emits("update:modelValue", false);
};
</script>
