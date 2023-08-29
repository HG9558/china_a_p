<!-- 独赢 -->
<template>
    <div class="px-10px pb-3 bg-mainBg">
        <div
            class="bg-white rounded-xl mt-10px"
            :class="{ 'mb-10px': index == list.length - 1 }"
            v-for="(item, index) in list"
            :key="index"
        >
            <TutorialTiele :title="item.title" :sub-title="item.subTitle" />
            <div class="px-10px">
                <div
                    class="py-4 border-b last-of-type:border-b-0"
                    v-for="(v, i) in item.list"
                    :key="i"
                >
                    <div class="flex flex-col justify-center items-center mb-3">
                        <span class="text-xs text-txt_d font-medium">赛果</span>
                        <p class="text-2xl text-mainText font-bold">
                            {{ v.home.score }} - {{ v.visiting.score }}
                        </p>
                    </div>
                    <div class="flex text-xs text-white">
                        <div class="flex-1 overflow-hidden items-center flex flex-col relative">
                            <img
                                class="w-10 h-10 translate-y-2 translate-x-7 absolute"
                                :src="status[v.home.status]"
                                alt=""
                            />
                            <img class="w-[50px] h-[60px] object-cover" :src="ic_home" alt="" />
                            <span
                                class="w-[72px] h-[25px] text-center rounded-full leading-[25px]"
                                :class="[colors(v.home.status)]"
                            >
                                投主队
                            </span>
                        </div>
                        <div class="flex-1 overflow-hidden items-center flex flex-col relative">
                            <img
                                class="w-10 h-10 translate-y-2 translate-x-7 absolute"
                                :src="status[v.draw.status]"
                                alt=""
                            />
                            <img class="w-[50px] h-[60px] object-cover" :src="ic_draw" alt="" />
                            <span
                                class="w-[72px] h-[25px] text-center rounded-full leading-[25px]"
                                :class="[colors(v.draw.status)]"
                            >
                                投和局
                            </span>
                        </div>
                        <div class="flex-1 overflow-hidden items-center flex flex-col relative">
                            <img
                                class="w-10 h-10 translate-y-2 translate-x-7 absolute"
                                :src="status[v.visiting.status]"
                                alt=""
                            />
                            <img class="w-[50px] h-[60px] object-cover" :src="ic_away" alt="" />
                            <span
                                class="w-[72px] h-[25px] text-center rounded-full leading-[25px]"
                                :class="[colors(v.visiting.status)]"
                            >
                                投客胜
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ic_home from "@/assets/tutorial/ic_home.png";
import ic_draw from "@/assets/tutorial/ic_draw.png";
import ic_away from "@/assets/tutorial/ic_away.png";
import ic_win from "@/assets/tutorial/ic_win.png";
import ic_lose from "@/assets/tutorial/ic_lose.png";
import ic_win_half from "@/assets/tutorial/ic_win_half.png";
import ic_lose_half from "@/assets/tutorial/ic_lose_half.png";
import ic_return from "@/assets/tutorial/ic_return.png";
import { computed, ref } from "vue";
import TutorialTiele from "./TutorialTiele.vue";

const status: { [name: number]: any } = {
    1: ic_win,
    2: ic_lose,
    3: ic_win_half,
    4: ic_lose_half,
    5: ic_return,
};

const list = ref([
    {
        title: "",
        subTitle: "胜/平/负",
        describe: "竞猜完场胜/平/负，投注项与赛果完全一致全赢，反之全输",
        list: [
            {
                label: "",
                home: { odds: "", score: 1, status: 1 },
                draw: { odds: "", score: 0, status: 2 },
                visiting: { odds: "", score: 0, status: 2 },
            },
            {
                label: "",
                home: { odds: "", score: 1, status: 2 },
                draw: { odds: "", score: 0, status: 1 },
                visiting: { odds: "", score: 1, status: 2 },
            },
            {
                label: "",
                home: { odds: "", score: 0, status: 2 },
                draw: { odds: "", score: 0, status: 2 },
                visiting: { odds: "", score: 1, status: 1 },
            },
        ],
    },
]);

const colors = computed(() => (status: number) => {
    switch (status) {
        case 1:
        case 3:
            return "bg-[#EB6665]";
        case 2:
        case 4:
            return "bg-[#5FC253]";
        default:
            return "bg-[#9F9F9F]";
    }
});
</script>
