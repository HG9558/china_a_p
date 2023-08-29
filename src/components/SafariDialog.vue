<!-- safari 弹窗 -->
<template>
    <VanPopup
        teleport="body"
        position="bottom"
        @closed="closed"
        :showConfirmButton="false"
        v-model:show="showSafariDialog"
        @click="showSafariDialog = !showSafariDialog"
        style="--van-popup-background: transparent"
    >
        <div class="w-full px-10px">
            <div class="relative pb-[102.39%]">
                <img class="absolute top-0 left-0 w-full h-full" :src="img_safari" alt="" />
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import img_safari from "@/assets/home/img_safari.png";
import { useStore } from "@/stores/index";
import { isStandalone } from "@/utils/index";
import { storeToRefs } from "pinia";
import platform from "platform";

const now = dayjs();
const showSafariDialog = ref<boolean>();
const today = now.format("YYYY/MM/DD");
const { setSafariDialog } = useStore();
const { safariDialog } = storeToRefs(useStore());

const closed = () => {
    setSafariDialog(today);
};

onMounted(() => {
    if (!isStandalone() && /(Safari)/gi.test(`${platform.name}`) && safariDialog.value != today) {
        showSafariDialog.value = !showSafariDialog.value;
    }
});
</script>
