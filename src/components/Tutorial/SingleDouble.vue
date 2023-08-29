<!-- 单双 -->
<template>
    <div class="px-10px mb-3 bg-mainBg">
        <div
            class="bg-white rounded-xl mt-10px"
            :class="{ 'mb-10px': index == list.length - 1 }"
            v-for="(item, index) in list"
            :key="index"
        >
            <TutorialTiele :title="item.title" :sub-title="item.subTitle" />
            <div class="px-10px">
                <div
                    class="border-b last-of-type:border-b-0 pb-4 pt-5"
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
                                {{ v.home.label }}
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
                            <span class="text-xs text-txt_d font-medium">角球赛果</span>
                            <p class="text-2xl text-mainText font-bold">
                                {{ v.home.score }} - {{ v.visiting.score }}
                            </p>
                        </div>
                        <div class="flex-1 relative flex items-end">
                            <div class="absolute text-black -top-5 left-20">
                                {{ v.visiting.odds }}
                            </div>
                            <span
                                class="w-[72px] h-[25px] ml-14 rounded-2xl leading-[25px] pl-3 pr-1 text-right"
                                :class="[colors(v.visiting.status)]"
                            >
                                {{ v.visiting.label }}
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
        subTitle: "单/双",
        list: [
            {
                label: "总进球数为单数，投注“单”全赢，投注“双”全输",
                home: { odds: "单", score: 1, status: 1, label: "投“单”" },
                visiting: { odds: "双", score: 0, status: 2, label: "投“双”" },
            },
            {
                label: "总进球数为双数，投注“单”全输，投注“双”全赢（0-0为双）",
                home: { odds: "单", score: 0, status: 2, label: "投“单”" },
                visiting: { odds: "双", score: 0, status: 1, label: "投“双”" },
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
