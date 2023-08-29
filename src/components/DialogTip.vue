<!-- 全局温馨提示 -->
<template>
    <van-dialog
        v-model:show="dialogTip.value"
        :title="dialogTip?.title"
        :message="dialogTip?.message"
        show-cancel-button
        style="--van-dialog-font-size: 1.125rem"
        @confirm="toLogin"
        confirm-button-text="确定"
        confirm-button-color="#4b6cdb"
    >
    </van-dialog>
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";

const { setIsBack } = useStore();
const { dialogTip } = storeToRefs(useStore());
const route = useRoute();
const router = useRouter();

const toLogin = () => {
    if (dialogTip.value.callBack) {
        dialogTip.value.callBack();
        return;
    }
    setIsBack(route.path);
    router.push("/login");
};
</script>
