<!-- 设置昵称 -->
<template>
    <VanPopup
        v-model:show="showBottom"
        position="right"
        style="width: 100%; height: 100%"
        @closed="closed"
    >
        <div class="h-full flex flex-col tlw_top_bg">
            <NavBar
                transparent
                :click-left="clickLeft"
                :nav-bar-props="{ title: '修改昵称', rightText: '确定' }"
                @click-right="clickRight"
            />
            <div class="bg-mainBg flex-1 rounded-t-20px z-0 overflow-hidden">
                <div class="flex items-center h-10 bg-[#FFF4E5] text-tip px-3">
                    <i class="icon-gantanhao1 text-base" />
                    <p class="ml-1 text-13px">昵称180天内只可修改一次</p>
                </div>
                <div
                    class="rounded-b-xl h-11 flex items-center overflow-hidden"
                    @click="user?.nicknameUpdate == 0 && showFailToast('昵称180天内只可修改一次')"
                >
                    <van-field
                        :clearable="true"
                        autocomplete="off"
                        :disabled="user?.nicknameUpdate == 0"
                        :maxlength="15"
                        v-model="nickname"
                        class="placeholder:text-[#9BA1AE]"
                        placeholder="请输入昵称，仅限15个字符"
                    />
                </div>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
import { storeToRefs } from "pinia";
import { showFailToast } from "vant";
import { computed, ref } from "vue";
import NavBar from "@/components/NavBar.vue";

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: string): void;
}>();
const props = defineProps<{ modelValue: boolean }>();

const nickname = ref<string>("");
const { user } = storeToRefs(useStore());
if (user.value?.nickname) nickname.value = user.value.nickname;

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set() {
        close();
    },
});

const closed = () => {
    nickname.value = "";
};

const clickLeft = () => {
    close();
};

const clickRight = () => {
    emits("submit", nickname.value);
    close();
};

const close = () => {
    emits("update:modelValue", false);
};
</script>
