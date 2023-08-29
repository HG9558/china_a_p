<!-- 注单 游戏 游戏详情 -->
<template>
    <VanPopup
        v-model:show="showBottom"
        position="right"
        :teleport="'body'"
        @closed="closed"
        style="width: 100%; height: 100%"
    >
        <div class="h-full w-full overflow-x-hidden flex flex-col tlw_top_bg">
            <NavBar
                class="flex-shrink-0"
                transparent
                :click-left="clickLeft"
                :nav-bar-props="{ title }"
            />
            <div class="bg-mainBg flex-1 rounded-t-20px relative overflow-hidden z-0 flex flex-col">
                <div
                    class="flex flex-col flex-shrink-0 pt-10px bg-white rounded-t-20px overflow-hidden"
                >
                    <div class="flex items-center justify-between mb-10px px-2">
                        <VanButton
                            :key="item.value"
                            class="h-9 w-[76px] border-0 mr-10px last-of-type:mr-0 rounded-10px whitespace-nowrap text-sm bg-gradient-to-b from-mainBg to-[#F1F1F1]"
                            :class="{
                                '!tlw_btn_linear text-white': index == gameActive,
                            }"
                            v-for="(item, index) in timeOptions"
                            @click="selectGameTime(index)"
                        >
                            {{ item.text }}
                        </VanButton>
                    </div>
                    <div
                        class="flex items-center bg-gradient-to-b text-xs px-2 flex-nowrap h-10 from-[#F0F3FE] to-[#fff]"
                    >
                        <div
                            :key="item.key"
                            v-for="(item, index) in gameTabs"
                            class="last-of-type:mr-0 text-13px flex-shrink-0 overflow-hidden flex items-center"
                            :class="{ 'flex-[2]': index > 0, 'flex-[1.5]': index == 0 }"
                        >
                            <span class="mr-1 flex-shrink-0">
                                {{ item.title }}
                            </span>
                            <span class="text-mainText font-semibold break-all line-clamp-1">
                                {{ loading ? ellipsis(item.value) : item.value }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="py-10px flex-1 overflow-y-auto">
                    <DynamicScroller
                        v-if="list?.[0]"
                        :minItemSize="3"
                        :keyField="'id'"
                        :pageMode="true"
                        :items="list"
                        @scrollEnd="scrollEnd"
                        ref="dynamicScrollerRef"
                    >
                        <template v-slot="{ item, active, index }">
                            <DynamicScrollerItem :item="item" :active="active" :data-index="index">
                                <GameItem :item="item" :active="active" :page="params.current" />
                            </DynamicScrollerItem>
                        </template>
                        <template #after>
                            <div class="h-10 text-txt_d flex pt-2 justify-center text-xs w-full">
                                <van-loading size="20" type="spinner" v-show="!finished" />
                                <span class="mx-1" v-show="finished && list?.[0]">
                                    没有更多了
                                </span>
                                <span class="mx-1" v-show="byDateLoading">加载中...</span>
                            </div>
                        </template>
                    </DynamicScroller>
                    <NoData @click="router.push('/match')" v-show="!byDateLoading && !list?.[0]" />
                </div>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { API } from "@/api/index";
import { IgetBetListByDate } from "@/api/platform/interface";
import { DList, GetBetListByDate, GetBetListByGame } from "@/api/platform/types";
import { useStore } from "@/stores";
import dayjs from "dayjs";
import { computed, ref, nextTick, watch } from "vue";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import NoData from "../NoData.vue";
import NavBar from "@/components/NavBar.vue";
import GameItem from "./GameItem.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ellipsis } from "@/utils";

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit"): void;
}>();
const props = defineProps<{ modelValue: boolean; title?: string; id?: number; groupId?: number }>();

interface IgameTabs {
    title: string;
    unit?: string;
    key: string;
    value?: string;
}

const now = dayjs();
const router = useRouter();
const dynamicScrollerRef = ref();
const gameActive = ref<number>(0);
const { setLoading } = useStore();
const { loading } = storeToRefs(useStore());
const list = ref<DList[]>([]);
const finished = ref<boolean>(false); //判断是否加载完
const isRender = ref<boolean>(false); //判断是否渲染完成,阻止重复请求
const byDateLoading = ref<boolean>(false);
const gameTabs = ref<IgameTabs[]>([
    { title: "总计(单):", key: "total", value: "" },
    { title: "投注金额:", key: "totalAmount", value: "" },
    { title: "输赢金额:", key: "totalProfit", value: "" },
]);
const timeOptions = ref([
    {
        text: "今日",
        value: 1,
        startDate: now.startOf("date").unix(),
        endDate: now.endOf("days").unix(),
    },
    {
        text: "昨天",
        value: 2,
        startDate: now.subtract(1, "day").startOf("date").unix(),
        endDate: now.subtract(1, "day").endOf("date").unix(),
    },
    {
        text: "近7天",
        value: 4,
        startDate: now.subtract(6, "days").startOf("date").unix(),
        endDate: now.unix(),
    },
    {
        text: "近30天",
        value: 5,
        startDate: now.subtract(29, "days").startOf("date").unix(),
        endDate: now.unix(),
    },
]);
const params = ref<IgetBetListByDate>({
    current: 1,
    size: 10,
    data: {
        id: props.id,
        groupId: props.groupId,
        startTime: timeOptions.value[gameActive.value].startDate,
        endTime: timeOptions.value[gameActive.value].endDate,
    },
});

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set() {
        close();
    },
});

const scrollEnd = async () => {
    if (isRender.value) getBetListByDate(false);
};

const setGameTabs = (data?: GetBetListByDate | GetBetListByGame | null) => {
    gameTabs.value.forEach((item, index) => {
        if (data?.[item.key]) gameTabs.value[index].value! = data?.[item.key];
    });
};

const selectGameTime = async (index: number) => {
    list.value = [];
    finished.value = false;
    params.value.current = 1;
    gameActive.value = index;
    params.value.data!.startTime = timeOptions.value[index].startDate;
    params.value.data!.endTime = timeOptions.value[index].endDate;
    getBetListByDate();
};

const getBetListByDate = async (isLoading: boolean = true) => {
    if (finished.value) return;
    if (isLoading) setLoading(true);
    byDateLoading.value = true;
    isRender.value = false;
    const res = await API.getBetListByDate(params.value);
    byDateLoading.value = false;
    setLoading(false);
    if (res.code === 0) {
        setGameTabs(res.data);
        const _list =
            res.data?.list?.map(item => ({
                ...item,
                id: `${item.transactionId + item.createdAt}`,
            })) || [];
        const current = params.value.current;
        const isConcat = {
            true: [...list.value, ..._list!],
            false: _list,
        };
        list.value = isConcat[`${current != 1}`]!;
        if (!_list.length && current == 1) list.value = []; //没有数据置空
        nextTick(() => (isRender.value = true));
        if (current == 1) nextTick(() => dynamicScrollerRef.value?.scrollToItem?.(0));
        if (_list.length! < params.value.size) finished.value = true; // 加载完所有数据
        if (!isLoading || current == 1) params.value.current++;
    }
    if (res.code === 502) {
        finished.value = false;
        isRender.value = true;
    }
};

const closed = () => {
    list.value = [];
};

const clickLeft = () => {
    close();
};

const close = () => {
    emits("update:modelValue", false);
};

watch(
    () => showBottom.value,
    n => {
        if (n) {
            finished.value = false;
            params.value.current = 1;
            params.value.data!.id = props.id;
            params.value.data!.groupId = props.groupId;
            params.value.data!.startTime = timeOptions.value[gameActive.value].startDate;
            params.value.data!.endTime = timeOptions.value[gameActive.value].endDate;
            getBetListByDate();
            return;
        }
        gameActive.value = 0;
    }
);
</script>
