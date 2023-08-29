<!-- 让球 -->
<template>
    <div class="bg-mainBg pb-5">
        <div class="p-10px h-[59px] text-xs text-txt_d text-center flex items-center">
            <p class="font-PFSCS">
                滚球-让球赛果为投注后的进球比分。例如：投注时比分：1-0，完场比分：2-1，则滚球-让球盘赛果为：1-1
            </p>
        </div>
        <div class="px-10px">
            <div
                class="bg-white rounded-xl mt-10px px-10px"
                :class="{ '!mt-0': index == 0, 'mb-10px': index == list.length - 1 }"
                v-for="(item, index) in list"
                :key="index"
            >
                <TutorialTiele :title="item.title" :sub-title="item.subTitle" />
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
                                投主队
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
                                投客队
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
        title: "0",
        subTitle: "(平手盘)",
        list: [
            {
                label: "主客队实力相当，均不让球，投注赢球方全赢",
                home: { odds: "0", score: 1, status: 1 },
                visiting: { odds: "0", score: 0, status: 2 },
            },
            {
                label: "打平退回本金（走水）",
                home: { odds: "0", score: 1, status: 5 },
                visiting: { odds: "0", score: 1, status: 5 },
            },
        ],
    },
    {
        title: "0/0.5",
        subTitle: "(平手/半球盘)",
        list: [
            {
                label: "让球方赢1球或以上，投注让球方全赢，投注受让方全输",
                home: { odds: "-0/0.5", score: 1, status: 1 },
                visiting: { odds: "+0/0.5", score: 0, status: 2 },
            },
            {
                label: "打平，投注让球方输一半，投注受让方赢一半",
                home: { odds: "-0/0.5", score: 0, status: 4 },
                visiting: { odds: "+0/0.5", score: 0, status: 3 },
            },
            {
                label: "让球方输球，投注让球方全输，投注受让方全赢",
                home: { odds: "-0/0.5", score: 0, status: 1 },
                visiting: { odds: "+0/0.5", score: 1, status: 2 },
            },
        ],
    },
    {
        title: "0.5",
        subTitle: "(半球盘)",
        list: [
            {
                label: "让球方赢1球或以上，投注让球方全赢，投注受让方全输",
                home: { odds: "-0.5", score: 1, status: 1 },
                visiting: { odds: "+0.5", score: 0, status: 2 },
            },
            {
                label: "打平或让球方输球，投注让球方全输，投注受让方全赢",
                home: { odds: "-0.5", score: 0, status: 2 },
                visiting: { odds: "+0.5", score: 0, status: 1 },
            },
        ],
    },
    {
        title: "0.5/1",
        subTitle: "(半球/一球盘)",
        list: [
            {
                label: "让球方赢2球或以上，投注让球方全赢，投注受让方全输",
                home: { odds: "-0.5/1", score: 2, status: 1 },
                visiting: { odds: "+0.5/1", score: 0, status: 2 },
            },
            {
                label: "让球方赢1球，投注让球方赢一半，投注受让方输一半",
                home: { odds: "-0.5/1", score: 1, status: 3 },
                visiting: { odds: "+0.5/1", score: 0, status: 4 },
            },
            {
                label: "打平或让球方输球，投注让球方全输，投注受让方全赢",
                home: { odds: "-0.5/1", score: 0, status: 2 },
                visiting: { odds: "+0.5/1", score: 0, status: 1 },
            },
        ],
    },
    {
        title: "1",
        subTitle: "(一球盘)",
        list: [
            {
                label: "让球方赢2球或以上，投注让球方全赢，投注受让方全输",
                home: { odds: "-1", score: 2, status: 1 },
                visiting: { odds: "+1", score: 0, status: 2 },
            },
            {
                label: "让球方赢1球，投注主客均退回本金（走水）",
                home: { odds: "-1", score: 1, status: 5 },
                visiting: { odds: "+1", score: 0, status: 5 },
            },
            {
                label: "打平或让球方输球，投注让球方全输，投注受让方全赢",
                home: { odds: "-1", score: 0, status: 2 },
                visiting: { odds: "+1", score: 0, status: 1 },
            },
        ],
    },
    {
        title: "1/1.5",
        subTitle: "(一球/球半盘)",
        list: [
            {
                label: "让球方赢2球或以上，投注让球方全赢，投注受让方全输",
                home: { odds: "-1/1.5", score: 2, status: 1 },
                visiting: { odds: "+1/1.5", score: 0, status: 2 },
            },
            {
                label: "让球方赢1球，投注让球方输一半，投注受让方赢一半",
                home: { odds: "-1/1.5", score: 1, status: 4 },
                visiting: { odds: "+1/1.5", score: 0, status: 3 },
            },
            {
                label: "打平或让球方输球，投注让球方全输，投注受让方全赢",
                home: { odds: "-1/1.5", score: 0, status: 2 },
                visiting: { odds: "+1/1.5", score: 0, status: 1 },
            },
        ],
    },
    {
        title: "1.5",
        subTitle: "(球半盘)",
        list: [
            {
                label: "让球方赢2球或以上，投注让球方全赢，投注受让方全输",
                home: { odds: "-1.5", score: 2, status: 1 },
                visiting: { odds: "+1.5", score: 0, status: 2 },
            },
            {
                label: "让球方赢1球，投注让球方全输，投注受让方全赢",
                home: { odds: "-1.5", score: 1, status: 2 },
                visiting: { odds: "+1.5", score: 0, status: 1 },
            },
            {
                label: "打平或让球方输球，投注让球方全输，投注受让方全赢",
                home: { odds: "-1.5", score: 0, status: 2 },
                visiting: { odds: "+1.5", score: 0, status: 1 },
            },
        ],
    },
    {
        title: "1.5/2",
        subTitle: "(球半/两球盘)",
        list: [
            {
                label: "让球方赢3球或以上，投注让球方全赢，投注受让方全输",
                home: { odds: "-1.5/2", score: 3, status: 1 },
                visiting: { odds: "+1.5/2", score: 0, status: 2 },
            },
            {
                label: "让球方赢2球，投注让球方赢一半，投注受让方输一半",
                home: { odds: "-1.5/2", score: 2, status: 3 },
                visiting: { odds: "+1.5/2", score: 0, status: 4 },
            },
            {
                label: "让球方赢1球或打平或输球，投注让球方全输，投注受让方全赢",
                home: { odds: "-1.5/2", score: 1, status: 2 },
                visiting: { odds: "+1.5/2", score: 0, status: 1 },
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
