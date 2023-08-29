<!-- 消息中心 -->
<template>
    <div class="h-full w-full flex flex-col tlw_top_bg bg-mainBg relative">
        <NavBar
            transparent
            @click-right="isEdit = !isEdit"
            :nav-bar-props="{ title: '消息中心', rightText: rightText }"
        />

        <div class="rounded-t-20px flex-1 flex flex-col overflow-hidden z-10 bg-mainBg relative">
            <div
                class="rounded-t-20px bg-white shadow-[0px_0px_4px_2px_rgba(109,129,228,0.03)] border border-white border-solid"
            >
                <VanTabs
                    class="flex-shrink-0"
                    style="
                        --van-tabs-line-height: 3.125rem;
                        --van-tabs-bottom-bar-width: 1.25rem;
                        --van-tabs-bottom-bar-color: linear-gradient(
                            360deg,
                            #475fd9 0%,
                            #5880e8 100%
                        );
                    "
                    :ellipsis="false"
                    line-height=".25rem"
                    v-model:active="active"
                    @change="changeTab"
                >
                    <VanTab v-for="(item, index) in tabs" :name="item.noticeType" :key="index">
                        <template #title>
                            <div
                                class="h-10 relative leading-10 text-17px text-txt_d"
                                :class="{ '!text-mainText font-medium': item.noticeType == active }"
                            >
                                <span
                                    v-show="item.count"
                                    class="absolute text-xs h-4 rounded-lg text-white rounded-bl-[0px] right-0 translate-x-full top-1 px-2 bg-[#EB6665]"
                                >
                                    {{ Number(item.count) >= 100 ? "99+" : item.count }}
                                </span>
                                {{ item.title }}
                            </div>
                        </template>
                    </VanTab>
                </VanTabs>
                <div
                    class="flex items-center justify-center whitespace-nowrap pt-0 pb-0 h-0 opacity-0 transition-all overflow-hidden"
                    :class="{ '!h-11 !opacity-100 !pt-1 !pb-3': active == 4 }"
                >
                    <VanButton
                        class="h-[28px] mr-10px bg-[#EFF2FC] text-txt_d border-0 last-of-type:mr-0 rounded-full text-sm"
                        :class="{
                            '!text-txt_t !bg-[#E1E8FF]': bonusActive == item.status,
                        }"
                        @click="setBonusActive(item)"
                        v-for="(item, index) in bonus"
                        :key="index"
                    >
                        {{ item.title }}
                    </VanButton>
                </div>
            </div>
            <div class="flex-1 bg-mainBg overflow-y-auto border-huise">
                <PullRefreshList
                    :onLoad="onLoad"
                    :refresh="onRefresh"
                    :finished="finished"
                    :list-props="{ immediateCheck: false }"
                >
                    <ul class="px-10px mb-10px" :class="{ 'mb-20': isEdit }">
                        <template v-if="active != 4">
                            <li
                                class="border-white border-solid border pl-4 pr-3 bg-gradient-to-b from-[#fff] from-66% via-[#F5F5FF] via-92% to-[#fff] rounded-20px mt-10px transition-all relative break-all"
                                :class="{ 'translate-x-[30px]': isEdit }"
                                @click="toDetail(v)"
                                v-for="(v, i) in noticeList"
                                :key="i"
                            >
                                <div class="flex items-center py-[18px]">
                                    <van-checkbox
                                        v-model="v.checked"
                                        checked-color="#4B6CDB"
                                        class="absolute -left-10 disabled:opacity-30 translate-x-2"
                                        @click="toDetail(v)"
                                    />
                                    <div class="w-10 h-10 mr-3 relative">
                                        <img
                                            class="w-full h-full rounded-full"
                                            :src="icons"
                                            alt=""
                                        />
                                        <i
                                            v-show="v.isRead == 0"
                                            class="w-[6px] h-[6px] rounded-full bg-[#EB6665] absolute right-1 top-0"
                                        />
                                    </div>
                                    <div class="flex flex-col flex-1">
                                        <div class="flex items-center justify-between">
                                            <p
                                                class="text-17px text-mainText font-medium flex-1 line-clamp-1"
                                            >
                                                {{ v.title }}
                                            </p>
                                            <span
                                                class="text-xs scale-90 text-right text-txt_d flex-shrink-0"
                                            >
                                                {{ formatTime(v.publishTime) }}
                                            </span>
                                        </div>
                                        <p class="text-xs text-txt_d line-clamp-1 mt-1 pr-3">
                                            {{ v.content }}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </template>
                        <template v-if="active == 4">
                            <Records
                                :records="records"
                                :is-edit="isEdit"
                                :onRefresh="onRefresh"
                                :unreadCount="unreadCount"
                            />
                        </template>
                    </ul>
                </PullRefreshList>
                <div
                    class="absolute w-full rounded-t-lg -bottom-16 h-16 shadow-[0px_-3px_8px_0px_rgba(172,177,200,0.16)] bg-gradient-to-b from-[#F9F9FA] via-[#F2F3F8] via-96% to-[#FCFCFC] transition-all z-10 flex items-center justify-between pl-[22px] pr-4"
                    :class="{ '!bottom-0': isEdit }"
                >
                    <van-checkbox
                        :model-value="checkedAll"
                        checked-color="#4B6CDB"
                        @click="toggleAll()"
                    >
                        <span class="text-txt font-bold">全选</span>
                    </van-checkbox>
                    <div class="flex items-center">
                        <p class="flex text-sm items-center mr-2 text-txt">
                            已选择
                            <span class="text-xs"> {{ selectedTotal }}/ </span>
                            <span class="text-mainText text-xs">
                                {{ noticeList.length || 0 }}
                            </span>
                        </p>
                        <VanButton
                            :disabled="!selectedTotal"
                            class="tlw_btn_linear border-0 rounded-xl h-11 text-white font-bold"
                            @click="allReads"
                        >
                            标记已读
                        </VanButton>
                    </div>
                </div>
            </div>
        </div>
        <NoData class="!z-10" v-show="showNoData" />
        <MsgNoticeDetail v-model="show" title="消息中心" :item="messgaeItem" />
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { IgetNotice, IreadNotices } from "@/api/notice/interface";
import { useStore } from "@/stores";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { formatTime } from "@/utils";
import icon_notice from "@/assets/icon/icon_notice.png";
import icon_gift from "@/assets/icon/icon_gift.png";
import icon_bulletin from "@/assets/icon/icon_bulletin.png";
import icon_coin from "@/assets/icon/icon_coin.png";
import NavBar from "@/components/NavBar.vue";
import MsgNoticeDetail from "@/components/MsgNoticeDetail.vue";
import PullRefreshList from "@/components/PullRefreshList.vue";
import NoData from "@/components/NoData.vue";
import Records from "@/components/MessageCenter/Records.vue";
import { IcoinRewardsList } from "@/api/user/interface";
import { CoinRewardsList, Record } from "@/api/user/types";
import { useRouter } from "vue-router";
import { NList } from "@/api/notice/types";

interface Itabs {
    count?: number;
    title: string;
    noticeType?: number;
}

interface Ibonus {
    title: string;
    status: number;
}

const active = ref<number>(1);
const { setLoading } = useStore();
const { loading } = storeToRefs(useStore());
const noticeList = ref<NList[]>([]);
const records = ref<Record[]>([]);
const show = ref<boolean>(false);
const messgaeItem = ref<Partial<NList>>({});
const isEdit = ref<boolean>(false);
const bonusActive = ref<number>(-1);
const rewardsList = ref<CoinRewardsList>();
const finished = ref<boolean>(false);

const tabs = ref<Itabs[]>([
    { title: "通知", noticeType: 1 },
    { title: "活动", noticeType: 3 },
    { title: "公告", noticeType: 2 },
    { title: "红利", noticeType: 4 },
]);

const bonus = ref<Ibonus[]>([
    { title: "全部", status: -1 },
    { title: "未领取", status: 0 },
    { title: "已领取", status: 1 },
    { title: "已过期", status: 2 },
]);

const rightText = computed(() => {
    if (active.value == 4) return "";
    return !isEdit.value ? "编辑" : "取消";
});

const showNoData = computed(() => {
    return (
        (active.value != 4 && !loading.value && !noticeList.value?.[0]) ||
        (active.value == 4 && !loading.value && !records.value?.[0])
    );
});

const icons = computed(() => {
    switch (params.value.data?.noticeType) {
        case 1:
            return icon_notice;
        case 2:
            return icon_gift;
        case 3:
            return icon_bulletin;
        case 4:
            return icon_coin;
        default:
            break;
    }
});

const params = ref<IgetNotice>({
    current: 1,
    data: {
        noticeType: 0,
    },
    size: 20,
});

const redListParams = ref<IcoinRewardsList>({
    current: 1,
    data: {
        categoryId: -1,
        status: -1, //-1全部 0未领取1已领取2过期
    },
    size: 10,
});

redListParams.value.data.status = bonus.value?.[0]?.status;
params.value.data!.noticeType = tabs.value[0].noticeType!;

const checkedAll = computed(() => noticeList.value?.every(item => item.checked == true));

const toggleAll = () => {
    const value = checkedAll.value;
    noticeList.value.forEach(item => (item.checked = !value));
};

const selectedTotal = computed(() => {
    const ids = noticeList.value?.map(item => item.checked && item.id).filter(Boolean);
    return ids?.length || 0;
});

const allReads = () => {
    isEdit.value = false;
    let ids;
    switch (active.value) {
        case 4:
            ids = records.value?.map(item => item.checked && item.id).filter(Boolean);
            break;
        default:
            ids = noticeList.value?.map(item => item.checked && item.id).filter(Boolean);
            break;
    }
    if (!ids?.[0]) return;
    readNotices({ nidList: ids as number[] });
};

const changeTab = (i: number) => {
    active.value = i;
    history.replaceState({ active: i }, "");
    switch (active.value) {
        case 4:
            records.value = [];
            isEdit.value = false;
            redListParams.value.current = 1;
            coinRewardsList();
            break;
        default:
            noticeList.value = [];
            isEdit.value = false;
            params.value.current = 1;
            params.value.data!.noticeType = i;
            getNotice();
            break;
    }
};

const toDetail = (item: NList) => {
    if (isEdit.value) {
        item.checked = !item.checked;
        return;
    }
    show.value = !show.value;
    messgaeItem.value = item;
    readNotice(item.id);
};

const onRefresh = async () => {
    switch (active.value) {
        case 4:
            redListParams.value.current = 1;
            return await coinRewardsList(false);
        default:
            params.value.current = 1;
            return await getNotice(false);
    }
};

const readNotice = async (nid: number) => {
    const res = await API.readNotice({ nid: nid });
    if (res.code === 0) {
        noticeList.value?.forEach(item => {
            if (+item.id == +nid) {
                item.isRead = 1;
                return true;
            }
        });
        unreadCount();
    }
};

const readNotices = async (nidList: IreadNotices) => {
    const regs = new RegExp(`(${nidList?.nidList.join("|")})`);
    setLoading(true);
    const res = await API.readNotices(nidList);
    if (res.code == 0) {
        unreadCount();
        noticeList.value?.forEach(item => {
            if (regs.test(`${item.id}`)) {
                item.checked = false;
                item.isRead = 1;
            }
        });
    }
    setLoading(false);
};

const onLoad = async () => {
    switch (active.value) {
        case 4:
            return await coinRewardsList(false);
        default:
            return await getNotice(false);
    }
};

const unreadCount = async () => {
    const res = await API.unreadCount();
    if (res.code == 0) {
        const data = res.data;
        tabs.value = tabs?.value?.map(item => {
            const fitem = data?.find(v => item.noticeType == v.noticeType);
            if (fitem) item.count! = fitem.count;
            return item;
        });
    }
};

const setBonusActive = (item: Ibonus) => {
    records.value = [];
    bonusActive.value = item.status;
    redListParams.value.data.status = item.status;
    redListParams.value.current = 1;
    coinRewardsList();
};

const coinRewardsList = async (isLoading: boolean = true) => {
    // 红利列表
    if (isLoading) setLoading(true);
    const res = await API.coinRewardsList(redListParams.value);
    setLoading(false);
    if (res.code === 0) {
        rewardsList.value = res.data!;
        const list = res.data?.records || [];
        const isConcat = {
            true: [...records.value, ...list!],
            false: list,
        };
        records.value = isConcat[`${redListParams.value.current != 1}`];
        if (res.data?.pages! <= redListParams.value.current || res.data?.pages == 0) {
            finished.value = true;
        }
        redListParams.value.current++;
        return res;
    }
};

const getNotice = async (isLoading: boolean = true) => {
    if (isLoading) setLoading(true);
    const res = await API.getNotice(params.value);
    setLoading(false);
    if (res.code === 0) {
        const list = res.data?.list || [];
        const isConcat = {
            true: [...noticeList.value, ...list!],
            false: list!,
        };
        noticeList.value = isConcat[`${params.value.current !== 1}`];
        if (+res.data?.pages! <= params.value.current || res.data?.pages == 0)
            finished.value = true;
        params.value.current++;
        unreadCount();
    }
    return res;
};

if (/[0-9]/.test(history.state?.active)) {
    active.value = history.state.active;
    params.value.data!.noticeType = history.state.active;
}

coinRewardsList();
getNotice();
</script>
