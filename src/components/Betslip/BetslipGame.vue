<!-- 注单 游戏列表 -->
<template>
    <div class="pb-5">
        <div class="h-full w-full bg-white mt-10px rounded-10px">
            <div
                :key="index"
                @click="selectItem(item)"
                v-for="(item, index) in gameList"
                class="h-20 border-b border-b-mainBg p-3 flex items-center justify-between"
            >
                <img class="w-11 h-11 object-cover mr-2 rounded-full" v-lazy="item.icon" alt="" />
                <div class="flex flex-col flex-1 overflow-hidden h-full justify-evenly">
                    <div class="flex items-center justify-between text-mainText">
                        <p class="font-semibold text-17px">
                            {{ item.name }}
                        </p>
                        <span class="font-semibold text-[19px] mr-4">
                            {{ item.totalProfit || "0.00" }}
                        </span>
                    </div>
                    <div class="flex items-center justify-between text-sm text-[#7D7D7D]">
                        <p class="flex-1 flex items-center">
                            <span class="flex-shrink-0 whitespace-nowrap">投注金额 ：</span>
                            <span class="line-clamp-1 flex-1 text-mainText font-medium">
                                {{ item.totalAmount || "0.00" }}
                            </span>
                        </p>
                        <span class="flex items-center">
                            {{ item.totalBet || 0 }}单
                            <i class="icon-arrow-right-bold ml-1"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <GameDetail v-model="showGamePopup" :title="name" :id="id" :groupId="groupId" />
    </div>
</template>

<script setup lang="ts">
import type { GameList } from "@/api/platform/types";
import { computed, ref, toRefs } from "vue";
import GameDetail from "./GameDetail.vue";

const showGamePopup = ref<boolean>(false);
const id = ref<number>(0);
const name = ref<string>("");
const groupId = ref<number>(0);

const props = defineProps<{ gameList: GameList[] }>();

const img = computed(() => (img: string) => {
    if (/^(\{)/.test(img)) return JSON.parse(img);
    return img;
});

const selectItem = (item: GameList) => {
    id.value = item.id;
    name.value = item.name;
    groupId.value = item.groupId;
    showGamePopup.value = !showGamePopup.value;
};

const { gameList } = toRefs(props);
</script>
