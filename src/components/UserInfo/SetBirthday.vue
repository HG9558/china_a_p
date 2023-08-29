<!-- 设置生日 -->
<template>
    <VanPopup
        :round="true"
        position="bottom"
        v-model:show="showBottom"
        style="--van-popup-background: transparent"
    >
        <van-date-picker
            v-model="currentDate"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="close"
        >
            <template #toolbar>
                <div class="bg-txt rounded-t-20px w-full">
                    <div class="h-[46px] flex items-center justify-between pl-5 pr-3">
                        <i
                            class="text-2xl text-white icon-close-bold active:scale-90 transition-all"
                            @click="close"
                        />
                        <VanButton
                            class="bg-white border-0 rounded-full h-[30px] text-sm whitespace-nowrap"
                            @click="submit"
                        >
                            确定
                        </VanButton>
                    </div>
                </div>
            </template>
        </van-date-picker>
    </VanPopup>
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const currentDate = ref([dayjs().year().toString(), dayjs().format("MM"), dayjs().format("DD")]);
const minDate = ref(new Date(1920, 0, 1));
const maxDate = ref(new Date());

const { setDialogTip } = useStore();
const { user } = storeToRefs(useStore());

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
    if (!user.value?.birthday) {
        setDialogTip(
            true,
            "温馨提示",
            "生日信息用户领取礼金,一经确定,不可修改,确定是否提交?",
            () => {
                emits("submit", currentDate.value?.join("-"));
                close();
            }
        );
        return;
    }
    emits("submit", currentDate.value?.join("-"));
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
    .van-picker-column {
        z-index: 1;
    }
    .van-picker__frame {
        z-index: 0;
        background: #f3f5f8;
        border-radius: 5px 5px 5px 5px;
        &::after {
            border: 0;
        }
    }
}
</style>
