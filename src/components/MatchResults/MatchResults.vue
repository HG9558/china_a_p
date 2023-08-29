<!-- 赛果 -->
<template>
    <VanPopup
        position="right"
        v-model:show="showBottom"
        @closed="closed"
        teleport="body"
        style="width: 100%; height: 100%"
    >
        <div class="flex flex-col w-full h-full tlw_top_bg">
            <NavBar
                class="flex-shrink-0"
                transparent
                :click-left="close"
                :nav-bar-props="{ title: '赛果' }"
            />
            <div class="flex-1 flex flex-col overflow-hidden rounded-t-20px z-0">
                <div
                    class="h-12 flex-shrink-0 bg-white border-b border-b-mainBg flex items-center justify-between pr-3"
                >
                    <VanButton class="px-10px border-0" @click="getMatches">
                        <template #icon>
                            <div
                                class="flex items-center justify-center w-6 h-6 rounded-full border border-fz_b mr-[6px]"
                            >
                                <i class="icon-filter-filling text-xs text-txt_d" />
                            </div>
                        </template>
                        <span class="text-[#707070] whitespace-nowrap"> 筛选 </span>
                    </VanButton>
                    <div class="flex items-center">
                        <VanButton
                            class="px-10px border-0 h-7 rounded-full bg-mainBg"
                            @click="setShowDayList"
                        >
                            <div class="text-[#707070] whitespace-nowrap">
                                <span>
                                    {{ dayActive?.today || dayActive?.date }}
                                </span>
                                <i class="icon-arrow-down-bold"></i>
                            </div>
                        </VanButton>
                        <VanPopover
                            v-model:show="showPopover"
                            :actions="actions"
                            placement="bottom-end"
                            class="backdrop-blur-sm select_euid"
                            style="
                                --van-popover-dark-background: #00000090;
                                --van-popover-action-height: 2.375rem;
                            "
                        >
                            <ul class="py-10px w-28">
                                <li
                                    class="h-[31px] relative flex items-center px-10px"
                                    :class="{ 'bg-mainBg': params.euid == item.euid }"
                                    v-for="(item, index) in actions"
                                    @click.stop="onSelect(item)"
                                    :key="index"
                                >
                                    <p
                                        class="flex-1 text-txt_d"
                                        :class="{
                                            '!text-main font-semibold': params.euid == item.euid,
                                        }"
                                    >
                                        {{ item.text }}
                                    </p>
                                    <i
                                        v-show="params.euid == item.euid"
                                        class="icon-select-bold flex-shrink-0 text-main"
                                    ></i>
                                </li>
                            </ul>
                            <template #reference>
                                <VanButton class="px-10px border-0 h-7 rounded-full bg-mainBg mx-2">
                                    <div class="text-[#707070] whitespace-nowrap">
                                        <span>
                                            {{ currentString }}
                                        </span>
                                        <i class="icon-arrow-down-bold"></i>
                                    </div>
                                </VanButton>
                            </template>
                        </VanPopover>
                        <VanButton
                            class="flex p-0 items-center justify-center w-6 h-6 rounded-full border border-fz_b transition-all"
                            :class="{ 'rotate-180': receiveStatus }"
                            @click="receive"
                        >
                            <i class="icon-arrow-up-filling text-xs text-txt_d" />
                        </VanButton>
                    </div>
                </div>
                <div v-show="showDayList" class="flex-shrink-0 bg-white h-[62px] overflow-hidden">
                    <SwiperBox :direction="'horizontal'" ref="swiperRef">
                        <div class="flex items-center h-[62px] px-10px">
                            <div
                                class="h-11 w-[72px] mr-10px last-of-type:mr-0 rounded-10px bg-mainBg flex flex-col items-center justify-center cursor-pointer"
                                :class="{ 'bg-main_t': params.md == +item.md }"
                                v-for="(item, index) in dayList"
                                @click="daySubmit(item)"
                                :key="index"
                            >
                                <p
                                    class="text-13px text-mainText font-medium"
                                    :class="{ 'text-white': params.md == +item.md }"
                                >
                                    {{ item.week }}
                                </p>
                                <span
                                    class="text-xs text-txt_d"
                                    :class="{ 'text-white': params.md == +item.md }"
                                >
                                    {{ item.date }}
                                </span>
                            </div>
                        </div>
                    </SwiperBox>
                </div>
                <div class="flex-1 flex flex-col bg-mainBg pb-[5px] overflow-hidden relative">
                    <div class="flex-1 overflow-y-auto">
                        <DynamicScroller
                            v-if="resultList?.size"
                            :minItemSize="5"
                            :keyField="'tid'"
                            :pageMode="true"
                            :items="Array.from(resultList.values())"
                            ref="dynamicScrollerRef"
                        >
                            <template v-slot="{ item, index, active }">
                                <DynamicScrollerItem :item="item" :active="active">
                                    <ResultItem :source="item" :index="index" :euid="params.euid" />
                                </DynamicScrollerItem>
                            </template>
                            <template #after> </template>
                        </DynamicScroller>
                        <div
                            ref="atBottomRef"
                            class="h-10 flex-shrink-0 text-txt_d flex pt-2 justify-center text-xs w-full"
                        >
                            <van-loading size="20" type="spinner" v-show="loading">
                                加载中...
                            </van-loading>
                            <VanButton
                                v-show="!finished && !loading && resultList.size"
                                @click="matcheResultPB(false)"
                                class="h-8 text-txt border-txt"
                            >
                                加载更多
                            </VanButton>
                            <span class="mx-1" v-show="finished && resultList.size">
                                没有更多了
                            </span>
                        </div>
                    </div>
                    <NoData v-show="!loading && !resultList?.size" @click="router.push('/')" />
                </div>
            </div>
        </div>
        <TournamentMatches ref="tournamentMatchesRef" @submit="submit" :euid="`${params.euid}`" />
    </VanPopup>
</template>

<script setup lang="ts">
import { API } from "@/api/index";
import { ImatcheResultPB } from "@/api/obsportend/obMatches/interface";
import { MatchValue } from "@/api/obsportend/obMatches/types";
import NavBar from "@/components/NavBar.vue";
import { useStore } from "@/stores/index";
import dayjs from "dayjs";
import { computed, nextTick, ref, watch } from "vue";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import ResultItem from "./ResultItem.vue";
import NoData from "../NoData.vue";
import SwiperBox from "../SwiperBox.vue";
import { SwiperRef, TgetTournamentMatches } from "../types";
import TournamentMatches from "../TournamentMatches.vue";
import { timeOut } from "@/utils";
import { useRouter } from "vue-router";
import { useWorker } from "@/worker";

const props = defineProps<{ modelValue: boolean }>();
const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();

interface IdayList {
    md: string;
    date: string;
    week: string;
    today: string;
}
interface Iactions {
    text: string;
    euid: number;
}
const actions: Iactions[] = [
    {
        text: "足球",
        euid: 1,
    },
    {
        text: "篮球",
        euid: 2,
    },
];
const week: any = {
    0: "周日",
    1: "周一",
    2: "周二",
    3: "周三",
    4: "周四",
    5: "周五",
    6: "周六",
};
const now = dayjs();
const swiperRef = ref<SwiperRef>();
const dayList = ref<IdayList[]>([]);
const showDayList = ref<boolean>(false);
Array(7)
    .fill(null)
    .forEach((item, i) => {
        const day = dayjs().subtract(i, "day");
        dayList.value.push({
            week: week[day.format("d")] || "",
            md: day.startOf("date").valueOf().toString(),
            date: day.format("MM-DD"),
            today: now.format("MM-DD") == day.format("MM-DD") ? "今天" : "",
        });
    });
const dynamicScrollerRef = ref();
const tournamentMatchesRef = ref<TgetTournamentMatches>();
const { setLoading, setShowMatches } = useStore();
const finished = ref<boolean>(false); //判断是否加载完
const loading = ref<boolean>(false);
const isRender = ref<boolean>(false); //判断是否渲染完成,阻止重复请求
const showPopover = ref(false);
const dayActive = ref<IdayList>(); //md
const receiveStatus = ref<boolean>(false);
const currentString = ref<string>(actions[0].text);
const resultList = ref<Map<string, MatchValue>>(new Map());
const observerB = ref<IntersectionObserver>();
const atBottomRef = ref();
const router = useRouter();
const params = ref<ImatcheResultPB>({
    cpn: 1,
    cps: 15,
    euid: 1,
    md: +dayList.value[0].md,
    sort: 2,
    type: 28,
    tid: "",
});

const setShowDayList = async () => {
    showDayList.value = !showDayList.value;
};

const daySubmit = async (item: IdayList) => {
    resultList.value.clear();
    isRender.value = true;
    finished.value = false;
    params.value.tid = "";
    dayActive.value = item;
    params.value.md = +item.md;
    showDayList.value = false;
    params.value.cpn = 1;
    matcheResultPB();
};

const getMatches = () => {
    setShowMatches(true);
    tournamentMatchesRef.value?.getTournamentMatchesBySportId(`${params.value.euid}`);
};

const onSelect = (action: Iactions) => {
    resultList.value.clear();
    params.value.cpn = 1;
    isRender.value = true;
    finished.value = false;
    params.value.tid = "";
    currentString.value = action.text;
    params.value.euid = action.euid;
    showPopover.value = false;
    matcheResultPB();
};

const receive = () => {
    receiveStatus.value = !receiveStatus.value;
    resultList.value?.forEach(item => (item.isHide = receiveStatus.value)!);
};

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set() {
        close();
    },
});

const close = () => {
    emits("update:modelValue", false);
};

const submit = async (tid: string) => {
    resultList.value.clear();
    params.value.tid = tid;
    params.value.cpn = 1;
    finished.value = false;
    await matcheResultPB();
};

const matcheResultPB = async (isLoading: boolean = true) => {
    if (finished.value) return;
    if (isLoading) setLoading(true);
    loading.value = true;
    isRender.value = false;
    const res = await API.matcheResultPB(params.value!);
    if (res.code === 0) {
        const cpn = params.value.cpn;
        const data: Map<string, MatchValue> = await useWorker.getHotMatchesPageList(
            JSON.stringify(res.data?.data || []),
            resultList.value.size
                ? JSON.stringify(Array.from(resultList.value?.entries()))
                : "null",
            `${cpn}`,
            receiveStatus.value
        );
        resultList.value = data;
        if (res.data?.pages! <= params.value.cpn! || res.data?.pages == 0) {
            finished.value = true; // 加载完所有数据
        }
        if (!isLoading || cpn == 1) params.value.cpn++;
    }
    setLoading(false);
    loading.value = false;
    nextTick(async () => {
        await timeOut(0);
        isRender.value = true;
    });
    if (res.code === 502) {
        finished.value = false;
        isRender.value = true;
    }
};

const intersectionB: IntersectionObserverCallback = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (isRender.value) matcheResultPB(false);
        }
    });
};

const closed = () => {
    params.value.cpn = 1;
    isRender.value = true;
    finished.value = false;
    resultList.value.clear();
};

watch(
    () => showBottom.value,
    n => {
        if (n) {
            dayActive.value = dayList.value[0];
            matcheResultPB();
            nextTick(() => {
                const options = {
                    root: null,
                    rootMargin: "0px",
                    threshold: 0.5,
                };
                observerB.value = new IntersectionObserver(intersectionB, options);
                observerB.value.observe(atBottomRef.value);
            });
            return;
        }
        observerB.value?.unobserve?.(atBottomRef.value);
        observerB.value?.disconnect?.();
        showPopover.value = false;
    }
);
</script>

<style lang="scss" scoped>
::v-deep(.van-popover__wrapper) {
    display: flex;
    align-items: center;
}
</style>
