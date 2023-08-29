<!-- 账户管理 银行卡 选择开户地区 -->
<template>
    <VanPopup
        :round="true"
        position="bottom"
        v-model:show="showBottom"
        style="--van-popup-background: transparent"
    >
        <van-picker
            @cancel="close"
            :columns="columns"
            v-model="currentDate"
            :columns-field-names="customFieldName"
        >
            <template #toolbar>
                <div class="bg-txt rounded-t-20px w-full">
                    <div class="h-[46px] flex items-center justify-between pl-5 pr-3 relative">
                        <i
                            class="text-2xl text-white icon-close-bold active:scale-90 transition-all"
                            @click="close"
                        />
                        <header
                            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-17px font-medium"
                        >
                            选择开户地区
                        </header>
                        <VanButton
                            class="bg-white border-0 rounded-full h-[30px] text-sm whitespace-nowrap"
                            @click="submit"
                        >
                            确定
                        </VanButton>
                    </div>
                </div>
            </template>
        </van-picker>
    </VanPopup>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import citys from "@/json/city.json";

const columns = citys;

const currentDate = ref<string[]>();

const customFieldName = {
    text: "text",
    value: "text",
    children: "children",
};

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: string): void;
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

const submit = () => {
    // 开户地区提交
    const value: string = currentDate.value?.filter(item => item.trim())?.join("") as string;
    emits("submit", value);
    close();
};

const close = () => {
    emits("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
::v-deep(.van-picker) {
    background: transparent;
    &::before {
        content: "";
        width: 100%;
        height: 20px;
        position: absolute;
        top: 40px;
        background: #4b6cdb;
    }
    .van-picker__columns {
        background: white;
        border-radius: 20px 20px 0 0;
        overflow: hidden;
    }
}
</style>
