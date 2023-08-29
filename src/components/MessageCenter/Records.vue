<!-- 消息中心 红利 -->
<template>
    <li
        class="border-white border-solid border pl-4 pr-3 bg-gradient-to-b from-[#fff] from-66% via-[#F5F5FF] via-92% to-[#fff] rounded-20px mt-10px transition-all relative break-all"
        :class="{ 'translate-x-[30px]': isEdit }"
        v-for="item in records"
        :key="item.id"
    >
        <div class="flex py-[18px]">
            <van-checkbox
                v-model="item.checked"
                checked-color="#4B6CDB"
                class="absolute -left-10"
            />
            <div class="w-10 h-10 mr-3 relative">
                <img class="w-full h-full rounded-full" :src="icon_coin" alt="" />
                <i
                    v-show="item.isRead == 0"
                    class="w-[6px] h-[6px] rounded-full bg-[#EB6665] absolute right-1 top-0"
                />
            </div>
            <div class="flex flex-col flex-1">
                <div class="flex items-center justify-between">
                    <p class="text-17px text-mainText font-medium flex-1 line-clamp-1">
                        {{ item.title }}
                    </p>
                    <span class="text-xs scale-90 text-right text-txt_d flex-shrink-0">
                        {{ formatTime(item.createdAt) }}
                    </span>
                </div>
                <p class="text-xs text-txt_d mt-1 pr-3">
                    {{ item.descrption }}
                </p>
            </div>
        </div>
        <VanButton
            @click="pullDown(item)"
            :disabled="item.isExpired == 1 || item.receiveStatus == 1"
            class="bg-gradient-to-t -translate-y-2 from-icon_a to-icon_a_t rounded-xl mx-auto block w-32 text-sm text-white h-[30px]"
        >
            {{ status(item) }}
        </VanButton>
    </li>
    <van-dialog
        title="温馨提示"
        teleport="body"
        v-model:show="show"
        :showConfirmButton="false"
        :closeOnClickOverlay="true"
    >
        <div class="px-6 pb-5 text-txt_d">
            <p class="text-15px mt-3 mb-10px">
                领取成功后,需要完成{{ data?.daMaMultiple || 1 }}倍流水才能取款
            </p>
            <van-checkbox
                checked-color="#4B6CDB"
                v-model="checked"
                class="text-sm"
                style="--van-checkbox-label-color: #9ba1ae"
            >
                本次登录不再提示
            </van-checkbox>
        </div>
        <VanButton
            :loading="loading"
            :disabled="loading"
            @click="submit(data)"
            class="border-0 w-full text-17px text-txt h-[55px] border-t border-t-mainBg"
        >
            立即领取
        </VanButton>
    </van-dialog>
</template>

<script setup lang="ts">
import { Record } from "@/api/user/types";
import { formatTime } from "@/utils";
import icon_coin from "@/assets/icon/icon_coin.png";
import { toRefs, computed, ref } from "vue";
import { API } from "@/api/index";
import { useStore } from "@/stores/index";
import { storeToRefs } from "pinia";
import { showFailToast, showSuccessToast } from "vant";

const props = defineProps<{
    records: Record[];
    isEdit: boolean;
    onRefresh: () => void;
    unreadCount: () => void;
}>();
const show = ref<boolean>(false);
const checked = ref<boolean>(false);
const { setRecordTip, setLoading } = useStore();
const { recordTip, loading } = storeToRefs(useStore());
const data = ref<Record>();

const status = computed(() => (item: Record) => {
    if (item.receiveStatus == 1) return "已领取";
    if (item.isExpired == 1) return "已过期";
    return "立即领取";
});

const pullDown = async (item: Record) => {
    setLoading(true);
    const result = await coinRewardsVerify(item!);
    if (result?.code != 0) {
        setLoading(false);
        return;
    }
    setLoading(false);
    if (!recordTip.value) {
        show.value = true;
        data.value = item;
        return;
    }
    submit(item);
};

const coinRewardsVerify = async (item: Record) => {
    const res = await API.coinRewardsVerify({ id: +item?.id });
    return res;
};

const submit = async (item?: Record) => {
    if (checked.value) setRecordTip(true);
    setLoading(true);
    const res = await API.coinRewardsCliam({ id: Number(item?.id) });
    setLoading(false);
    if (res.code == 0) {
        show.value = false;
        props.onRefresh?.();
        props.unreadCount?.();
        showSuccessToast("领取成功");
    }
};

const { records, isEdit } = toRefs(props);
</script>
