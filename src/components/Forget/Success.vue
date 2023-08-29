<!-- 忘记密码 重置成功 -->
<template>
    <div class="h-full flex flex-col items-center">
        <img class="w-[178px] h-[135px] mt-28" :src="ic_success" alt="" />
        <p class="text-mainText mt-10px font-medium text-lg">重置密码成功</p>
        <p class="text-txt_i mt-2 mb-5">{{ time }}s后自动返回首页</p>
        <VanButton
            class="h-11 w-32 text-15px rounded-xl tlw_btn_linear border-0 text-white"
            to="/login"
        >
            返回登录
        </VanButton>
    </div>
</template>

<script setup lang="ts">
import ic_success from "@/assets/defult/ic_success.png";
import { useAsync } from "@/stores/useAsync";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const time = ref<number>(3);
const isStart = ref<boolean>(false);
const { countTimer } = storeToRefs(useAsync());
const router = useRouter();

const startTime = () => {
    isStart.value = true;
};

defineExpose({ startTime });

watch(
    () => countTimer.value,
    () => {
        if (isStart.value) {
            time.value--;
            if (time.value === 0) {
                router.push("/login");
            }
        }
    }
);
</script>
