<template>
    <VanDialog
        teleport="body"
        :showConfirmButton="false"
        v-model:show="showHomeDialog"
        style="--van-dialog-background: transparent"
    >
        <div class="rounded-20px bg-white">
            <div
                class="h-11 bg-[#4B6CDB] shadow-[0px_6px_9px_0px_#879CE066_inset] text-white flex items-center justify-center relative"
            >
                <span class="text-17px font-semibold">重要公告</span>
                <i
                    class="iconfont icon-close-bold absolute text-[20px] right-3 active:scale-75 transition-all"
                    @click.stop="close"
                ></i>
            </div>
            <div class="max-h-[60vh] min-h-[10vh] px-5 overflow-y-auto">
                <div v-for="(item, index) in list" :key="index">
                    <p class="text-[#6F737B] text-[18px] mt-5 font-medium">
                        {{ item.title }}
                    </p>
                    <div class="break-all break-words text-[#8F8F8F] text-xs leading-4 mt-1">
                        {{ item.content }}
                    </div>
                </div>
            </div>
            <div class="h-[71px] pt-10px pb-5 px-5">
                <VanButton
                    @click="toMessageCenter"
                    class="w-full border-0 text-sm tlw_btn_linear text-white rounded-[30px]"
                >
                    查看详情
                </VanButton>
            </div>
        </div>
    </VanDialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { API } from "@/api/index";
import { useRouter } from "vue-router";
import { GetPop } from "@/api/notice/types";
import dayjs from "dayjs";
import { useStore } from "@/stores/index";
import { storeToRefs } from "pinia";

const now = dayjs();
const router = useRouter();
const showHomeDialog = ref<boolean>();
const list = ref<GetPop[]>();
const today = now.format("YYYY/MM/DD");
const { setHomeDialogTip } = useStore();
const { homeDialogTip } = storeToRefs(useStore());

const toMessageCenter = () => {
    setHomeDialogTip(today);
    router.push({ name: "messageCenter", state: { active: 2 } });
};

const close = () => {
    showHomeDialog.value = !showHomeDialog.value;
    setHomeDialogTip(today);
};

const getPop = async () => {
    const res = await API.getPop();
    if (res.code == 0) {
        list.value = res.data!;
        showHomeDialog.value = res.data?.[0] ? true : false;
    }
};

onMounted(() => {
    if (homeDialogTip.value != today) getPop();
});
</script>
