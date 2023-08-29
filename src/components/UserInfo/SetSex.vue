<!-- 设置生日 -->
<template>
    <VanPopup
        :round="true"
        position="bottom"
        v-model:show="showBottom"
        style="--van-popup-background: transparent"
    >
        <div class="bg-txt rounded-t-20px">
            <div class="h-[46px] flex items-center justify-between pl-5 pr-3">
                <i
                    class="text-2xl text-white icon-close-bold active:scale-90 transition-all"
                    @click="clickLeft"
                />
                <VanButton
                    class="bg-white rounded-full whitespace-nowrap h-[30px] text-sm"
                    @click="submit"
                >
                    确定
                </VanButton>
            </div>
            <ul class="px-5 pt-10px pb-10 bg-white rounded-t-20px">
                <li
                    :key="index"
                    class="h-11 mt-5"
                    @dblclick="submit"
                    v-for="(item, index) in list"
                    @click="active = item.value"
                >
                    <VanButton
                        class="w-full h-full rounded-2xl border-[#F7F7F8] pb-0 transition-all relative"
                        :class="{ 'border-0 !pb-2 tlw_btn_white': item.value === active }"
                    >
                        {{ item.label }}
                    </VanButton>
                </li>
            </ul>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: number): void;
}>();
const props = defineProps<{ modelValue: boolean }>();

const active = ref<number>(3);
const list = ref<{ label: string; value: number }[]>([
    { label: "男", value: 1 },
    { label: "女", value: 0 },
]);
const { user } = storeToRefs(useStore());
if (typeof user.value?.sex === "number") {
    active.value = user.value.sex;
    if (user.value.sex == 2) active.value = 1;
}

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

const submit = () => {
    emits("submit", active.value);
    close();
};

const close = () => {
    emits("update:modelValue", false);
};
</script>
