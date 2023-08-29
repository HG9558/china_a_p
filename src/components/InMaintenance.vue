<!-- 赛事维护组件 -->
<template>
    <div
        class="bg-mainBg top-0 left-0 w-full h-full flex flex-col items-center"
        :class="{ 'absolute justify-center': absolute }"
    >
        <img class="w-[166px] h-[139px]" :src="ic_InMaintenance" alt="" />
        <div class="mt-4 text-center">
            <p class="text-[20px] mb-10px">体育维护</p>
            <p class="w-[193px] text-xs mb-5 leading-[17px] text-txt_d">
                尊敬的用户，{{ APP_NAME }}目前正在维护， 给您造成的不便，深表歉意！
            </p>
            <p class="text-xs text-txt font-medium" @click="router.push('/entertain')">
                请选择其他场馆游戏
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import ic_InMaintenance from "@/assets/defult/ic_InMaintenance.png";
import { toService } from "@/utils";
import { ref, toRefs } from "vue";
import { useRouter } from "vue-router";

const props = withDefaults(defineProps<{ absolute?: boolean }>(), { absolute: true });
const APP_NAME = ref<string>(import.meta.env.VITE_APP_NAME);
const router = useRouter();

const { absolute } = toRefs(props);
</script>
