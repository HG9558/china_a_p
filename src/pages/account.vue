<!-- 账户管理 -->
<template>
    <div class="flex h-full flex-col tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '账户管理' }" />
        <div class="h-full flex flex-col flex-1 rounded-t-20px overflow-hidden bg-mainBg z-0">
            <div class="bg-white rounded-20px p-10px flex-shrink-0">
                <div class="bg-mainBg flex items-center rounded-10px">
                    <VanButton
                        :key="index"
                        @click="change(index)"
                        v-for="(item, index) in tabs"
                        class="flex-1 rounded-10px h-9 border-0 text-center text-gz bg-gradient-to-r"
                        :class="{
                            'from-[#5881FC] from/4% to-[#4C67DE] !text-white font-medium':
                                active == index,
                        }"
                    >
                        {{ item }}
                    </VanButton>
                </div>
            </div>
            <div class="flex-1 overflow-hidden">
                <van-swipe
                    :loop="false"
                    :duration="300"
                    :touchable="false"
                    :show-indicators="false"
                    v-model="active"
                    class="h-full"
                    ref="swipeRef"
                >
                    <van-swipe-item>
                        <Card />
                    </van-swipe-item>
                    <van-swipe-item>
                        <DIGICCY />
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SwipeInstance } from "vant";
import { ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import DIGICCY from "@/components/Account/DIGICCY.vue";
import Card from "@/components/Account/Card.vue";

const tabs = ["银行卡", "数字货币"];
const active = ref(0);
const swipeRef = ref<SwipeInstance>();

const change = (index: number) => {
    active.value = index;
    swipeRef.value?.swipeTo(active.value);
};
</script>
