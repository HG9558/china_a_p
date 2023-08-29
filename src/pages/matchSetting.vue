<!-- 赛事设置 -->
<template>
    <div class="h-full tlw_top_bg flex flex-col">
        <NavBar transparent :nav-bar-props="{ title: '赛事设置' }" />
        <div class="flex-1 overflow-hidden rounded-t-xl bg-[#F1F1F6]">
            <SwiperBox>
                <div
                    class="bg-gradient-to-b to-[#FEFEFE] from-[#F8F9FF] border border-[#fff] px-4 text-sm mb-3 rounded-xl overflow-hidden"
                >
                    <header class="h-11 border-b border-huise flex items-center justify-between">
                        <span class="text-mainText font-medium">盘口设置</span>
                    </header>
                    <van-radio-group v-model="params.market" @click="sportsSet">
                        <van-radio class="h-9" :name="1">欧洲盘 </van-radio>
                        <van-radio class="h-9" :name="2">香港盘 </van-radio>
                    </van-radio-group>
                </div>
                <div
                    class="bg-gradient-to-b to-[#FEFEFE] from-[#F8F9FF] border border-[#fff] px-4 text-sm mb-3 rounded-xl overflow-hidden"
                >
                    <header class="h-11 border-b border-huise flex items-center justify-between">
                        <span class="text-mainText font-medium">投注设置</span>
                    </header>
                    <van-radio-group v-model="params.bet" @click="sportsSet">
                        <van-radio class="h-9" :name="1">自动接受更好的赔率 </van-radio>
                        <van-radio class="h-9" :name="2">自动接受任何赔率 </van-radio>
                        <van-radio class="h-9" :name="3">不接受任何赔率变动 </van-radio>
                    </van-radio-group>
                </div>
                <template v-if="false">
                    <div
                        class="bg-gradient-to-b to-[#FEFEFE] from-[#F8F9FF] border border-[#fff] px-4 text-sm mb-3 rounded-xl overflow-hidden"
                    >
                        <header
                            class="h-11 border-b border-huise flex items-center justify-between"
                        >
                            <span class="text-mainText font-medium">体育进球推送</span>
                            <van-switch
                                size="20px"
                                active-color="#4b6cdb"
                                v-model="switchs.push"
                                @change="sportsSet($event, 'push')"
                            />
                        </header>
                        <van-radio-group v-model="params.push" @click="sportsSet">
                            <van-radio class="h-9" name="1">我投注的赛事 </van-radio>
                            <van-radio class="h-9" name="2">我收藏的赛事 </van-radio>
                            <van-radio class="h-9" name="3">全部滚球赛事 </van-radio>
                        </van-radio-group>
                    </div>
                    <div
                        class="bg-gradient-to-b to-[#FEFEFE] from-[#F8F9FF] px-4 text-sm mb-3 rounded-xl overflow-hidden"
                    >
                        <header
                            class="h-11 border-b border-huise flex items-center justify-between"
                        >
                            <span class="text-mainText font-medium">推送震动设置</span>
                            <van-switch
                                size="20px"
                                active-color="#4b6cdb"
                                v-model="switchs.shock"
                                @change="sportsSet($event, 'shock')"
                            />
                        </header>
                    </div>
                    <div
                        class="bg-gradient-to-b to-[#FEFEFE] from-[#F8F9FF] px-4 text-sm mb-3 rounded-xl overflow-hidden"
                    >
                        <header
                            class="h-11 border-b border-huise flex items-center justify-between"
                        >
                            <span class="text-mainText font-medium">推送声音提示</span>
                            <van-switch
                                size="20px"
                                active-color="#4b6cdb"
                                v-model="switchs.pushSound"
                                @change="sportsSet($event, 'pushSound')"
                            />
                        </header>
                        <van-radio-group v-model="params.pushSound" @click="sportsSet">
                            <van-radio class="h-9" :name="2">欢呼声 </van-radio>
                            <van-radio class="h-9" :name="3">哨声 </van-radio>
                            <van-radio class="h-9" :name="4">门铃声 </van-radio>
                        </van-radio-group>
                    </div>
                </template>
            </SwiperBox>
        </div>
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { IsportsSet } from "@/api/obsportend/obMarket/interface";
import { useStore } from "@/stores";
import { useAsync } from "@/stores/useAsync";
import { showSuccessToast } from "vant";
import { ref, nextTick } from "vue";
import NavBar from "@/components/NavBar.vue";
import SwiperBox from "@/components/SwiperBox.vue";

const { setLoading } = useStore();
const { sportsSetInquiry } = useAsync();
const status = ref<boolean>(false);
const params = ref<IsportsSet>({
    bet: 1,
    market: 1,
    push: "1",
    pushSound: 2,
    shock: 0,
});

const switchs = ref<{
    push: boolean;
    pushSound: boolean;
    shock: boolean;
    [name: string]: boolean;
}>({
    push: false,
    shock: false,
    pushSound: false,
});

const setSwitch = () => {
    switchs.value.push = +params.value.push === 0 ? false : true;
    switchs.value.pushSound = +params.value.pushSound === 1 ? false : true;
    switchs.value.shock = +params.value.shock === 2 ? false : true;
};

const getSportsSetInquiry = async () => {
    setLoading(true);
    const res = await sportsSetInquiry();
    setLoading(false);
    if (res.code === 0) {
        params.value = res.data!;
        params.value.push = res.data?.push!;
        setSwitch();
        nextTick(() => {
            status.value = true;
        });
    }
};

const sportsSet = async (e: Event, key?: string) => {
    setLoading(true);
    const res = await API.sportsSet({
        bet: params.value.bet,
        market: params.value.market,
        push:
            typeof e === "object"
                ? params.value.push
                : key === "push"
                ? switchs.value.push === true
                    ? "1"
                    : "0"
                : params.value.push,
        pushSound:
            typeof e === "object"
                ? params.value.pushSound
                : key === "pushSound"
                ? switchs.value.pushSound === true
                    ? 2
                    : 1
                : params.value.pushSound,
        shock: switchs.value.shock === false ? 2 : 1,
    });
    setLoading(false);

    switch (res.code) {
        case 0:
            params.value = res.data!;
            setSwitch();
            showSuccessToast(res.msg);
            break;
        default:
            setLoading(true);
            await getSportsSetInquiry();
            setLoading(false);
            break;
    }
    return res;
};
getSportsSetInquiry();
</script>

<style lang="scss" scoped>
::v-deep(.van-radio__icon--checked) {
    .van-icon-success {
        display: flex;
        align-items: center;
        justify-content: center;
        &::before {
            content: "";
            width: 6px;
            height: 6px;
            border-radius: 100%;
            background: #fff;
        }
    }
}
</style>
