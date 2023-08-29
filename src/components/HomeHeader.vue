<!-- 首页头部组件 -->
<template>
    <div class="px-10px h-12 flex items-center justify-between">
        <img class="w-[102.8px] h-[24px] z-10 flex-shrink-0 object-contain" :src="home_header" />
        <div class="flex items-center justify-end relative flex-1 overflow-hidden">
            <template v-if="!token">
                <VanButton
                    @click="toPage('/login')"
                    class="h-[23px] px-4 rounded-full border-0 bg-gradient-to-b from-[#FFEECA] to-[#FFBF91] text-[#883C00] font-medium border-transparent text-xs active:scale-95 transition-all"
                >
                    登录
                </VanButton>
                <VanButton
                    @click="toPage('/register')"
                    class="h-[23px] px-4 rounded-full text-xs border-[#FFD9AA] ml-2 text-[#FFD9AA] active:scale-95 transition-all font-medium"
                >
                    注册
                </VanButton>
                <i
                    class="iconfont icon-erji text-lg text-white ml-10px active:scale-95 transition-all"
                    @click="toService"
                />
            </template>
            <div v-else class="flex items-center justify-end flex-1 overflow-hidden">
                <div
                    class="rounded-2xl flex items-center text-white flex-1 overflow-hidden"
                    :class="{ 'pointer-events-none': !!animate }"
                    @click="allQueryBalance"
                >
                    <span
                        class="px-1 text-17px inline-block font-DINAlternateBold align-bottom flex-1 text-right max-[100px] line-clamp-1 break-all break-words"
                    >
                        {{ animate ? ellipsis(balance?.coin) : balance?.coin || "0.00" }}
                    </span>
                    <i
                        v-html="ic_refresh"
                        class="pointer-events-none w-[14px] h-[14px] text-white"
                        :class="{ 'animate-spin opacity-50': !!animate }"
                        @animationiteration="animationiteration"
                    />
                </div>
                <img
                    :src="ic_recharge_btn"
                    class="w-12 translate-y-[2px] object-contain whitespace-nowrap border-0 ml-[.375rem] active:scale-95 transition-all"
                    @click="toPage('/recharge')"
                    alt=""
                />
                <i
                    class="iconfont icon-erji text-lg text-white ml-[6px] active:scale-95 transition-all"
                    @click="toService"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import home_header from "@/assets/logo/home_header_white.png";
import { useStore } from "@/stores";
import { useAsync } from "@/stores/useAsync";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ic_recharge_btn from "@/assets/icon/ic_recharge_btn.png";
import { ellipsis, toService } from "@/utils";
import ic_refresh from "@/assets/svg/ic_refresh.svg?raw";

const { setIsBack, setDialogTip, setShowSetMobile } = useStore();
const { token, user } = storeToRefs(useStore());
const { balance } = storeToRefs(useAsync());
const animate = ref<boolean | string>();
const router = useRouter();
const route = useRoute();

const allQueryBalance = async () => {
    animate.value = true;
    await useAsync()?.allQueryBalance();
    animate.value = "over";
};

const animationiteration = () => {
    if (animate.value === "over") {
        animate.value = false;
    }
};

const toPage = (path: string) => {
    switch (path) {
        case "/recharge":
            /* if (!user.value?.mobile) {
                toRecharge();
                return;
            } */
            router.push("/recharge");
            break;
        case "/login":
        case "/register":
            setIsBack(route.path);
            router.push(path);
            break;
        default:
            break;
    }
};
</script>
