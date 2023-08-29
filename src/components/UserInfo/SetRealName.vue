<!-- 设置真实姓名 -->
<template>
    <VanPopup position="right" v-model:show="showBottom" style="width: 100%; height: 100%">
        <div class="h-full bg-mainBg">
            <NavBar
                :click-left="clickLeft"
                :nav-bar-props="{ title: '真实姓名', rightText: '确定' }"
                @click-right="clickRight"
            />
            <div class="bg-mainBg flex items-center h-12 px-3">
                <i class="icon-gantanhao1 text-lg text-yellow-500" />
                <p class="ml-1 text-sm">真实姓名设定后不可修改</p>
            </div>
            <van-field v-model="realName" placeholder="请输入真实姓名" autocomplete="off" />
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import NavBar from "@/components/NavBar.vue";

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: string): void;
}>();
const props = defineProps<{ modelValue: boolean }>();

const realName = ref<string>("");
const { user } = storeToRefs(useStore());
if (user.value?.realName) realName.value = user.value.realName;

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

const clickRight = () => {
    emits("submit", realName.value);
    close();
};

const close = () => {
    emits("update:modelValue", false);
};
</script>
