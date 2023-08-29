<script setup lang="ts">
import { storeToRefs } from "pinia";
import { RouterView } from "vue-router";
import { useStore } from "./stores";
import { useAsync } from "./stores/useAsync";
import DialogTip from "./components/DialogTip.vue";
import TransitionView from "./components/TransitionView.vue";
import Loading from "./components/Loading.vue";
import BetPopup from "./components/Bets/BetPopup.vue";
import BetSuccess from "./components/Bets/BetSuccess.vue";
import BetFail from "./components/Bets/BetFail.vue";
import BetTip from "./components/Bets/BetTip.vue";
import SetMobile from "./components/UserInfo/SetMobile.vue";
import RestrictionIp from "./components/RestrictionIp.vue";
import queryString from "query-string";
import InSeriesPopup from "./components/Bets/InSeriesPopup.vue";
import { set } from "idb-keyval";
import { useApp } from "./stores/useApp";
import { onMounted } from "vue";
import { reload } from "./utils/index";

const token = queryString.parse(location.search).token;
const { setTop, setIsApp } = useApp();
const { restrictionIp } = storeToRefs(useStore());
const { homeInit, homeIp, getDictionary, queryUserWallet, checkObStatus } = useAsync();

const search = queryString.parse(location.search);
if (/[0-9]/.test(`${search?.top}`)) setTop(`${search?.top}`);
if (/([0-9])/.test(`${search?.isApp}`)) setIsApp(`${search?.isApp}`);

const { i_code, type } = queryString.parse(window.location.search);
if (i_code) set("register", { promoCode: i_code, promoType: type || "a" });

homeIp();
homeInit();
getDictionary();
checkObStatus();
onMounted(async () => {
    if (token) useAsync().userProfile();
    document.addEventListener("visibilitychange", async () => {
        if (!document.hidden) {
            await useAsync()?.pullPoints();
            reload();
        }
    });
    await useAsync()?.pullPoints();
    if (token) await queryUserWallet();
    reload();
});
</script>

<template>
    <template v-if="restrictionIp">
        <RestrictionIp />
    </template>
    <template v-else>
        <DialogTip />
        <SetMobile />
        <Loading />
        <RouterView v-slot="{ Component, route }">
            <TransitionView>
                <Component :is="Component" :key="route.fullPath" v-if="!route.meta.keepAlive" />
            </TransitionView>
            <KeepAlive>
                <TransitionView>
                    <Component :is="Component" :key="null" v-if="route.meta.keepAlive" />
                </TransitionView>
            </KeepAlive>
        </RouterView>
        <BetPopup />
        <BetSuccess />
        <BetFail />
        <BetTip />
        <InSeriesPopup />
    </template>
</template>
