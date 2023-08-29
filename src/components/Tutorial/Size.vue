<!-- 大小 -->
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
                    class="pb-4 border-b last-of-type:border-b-0"
                    v-for="(v, i) in item.list"
                    :key="i"
                >
                    <p class="mt-4 mb-1 text-xs text-center text-txt_d whitespace-nowrap">
                        {{ v.label }}
                    </p>
                    <div class="flex items-end justify-between text-xs text-white h-[60px]">
                        <div class="flex-1 relative flex-row-reverse flex items-end">
                            <div class="absolute text-black -top-5 right-20">
                                {{ v.home.odds }}
                            </div>
                            <span
                                class="w-[72px] h-[25px] mr-14 rounded-2xl leading-[25px] px-3"
                                :class="[colors(v.home.status)]"
                            >
                                投大球
                            </span>
                            <img
                                class="w-[50px] h-[60px] object-cover absolute bottom-0 right-7"
                                :src="ic_home"
                                alt=""
                            />
                            <img
                                class="w-10 h-10 absolute bottom-3 right-3 z-10"
                                :src="status[v.home.status]"
                                alt=""
                            />
                        </div>
                        <div class="flex flex-col text-center w-[60px]">
                            <span class="text-xs text-txt_d font-medium">赛果</span>
                            <p class="text-2xl text-mainText font-bold">
                                {{ v.home.score }} - {{ v.visiting.score }}
                            </p>
                        </div>
                        <div class="flex-1 relative flex items-end">
                            <div class="absolute text-black -top-5 left-20">
                                {{ v.visiting.odds }}
                            </div>
                            <span
                                class="w-[72px] h-[25px] ml-14 rounded-2xl leading-[25px] px-3 text-right"
                                :class="[colors(v.visiting.status)]"
                            >
                                投小球
                            </span>
                            <img
                                class="w-[50px] h-[60px] object-cover absolute bottom-0 left-7"
                                :src="ic_away"
                                alt=""
                            />
                            <img
                                class="w-10 h-10 absolute bottom-3 left-3 z-10"
                                :src="status[v.visiting.status]"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ic_home from "@/assets/tutorial/ic_home.png";
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
        subTitle: "大小球",
        list: [
            {
                label: "总进球数大于投注项，投注大球全赢，投注小球全输",
                home: { odds: "大1.5", score: 1, status: 1 },
                visiting: { odds: "小1.5", score: 1, status: 2 },
            },
            {
                label: "总进球数仅大于一半投注项，投注大球赢一半，投注小球输一半",
                home: { odds: "大1.5/2", score: 1, status: 3 },
                visiting: { odds: "小1.5/2", score: 1, status: 4 },
            },
            {
                label: "总进球数等于投注项，退回本金（走水）",
                home: { odds: "大2", score: 1, status: 5 },
                visiting: { odds: "小2", score: 1, status: 5 },
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
