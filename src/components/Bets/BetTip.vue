<!-- 下注数 点击底部弹出 -->
<template>
    <VanButton
        class="betTip w-[52px] h-[52px] rounded-full z-50 text-white p-0 border-0 bg-txt opacity-0 scale-0 absolute right-5 bottom-20 transition-all"
        :class="{
            'opacity-100 scale-100': showBetTip && betList.size !== 0 && normal && isSeries,
        }"
        @click.stop="showPopup"
    >
        <div class="relative w-[52px] h-[52px] flex items-center justify-center">
            <img class="w-9 h-9" :src="icon_bets" alt="" />
            <div class="absolute top-0 left-1/2 translate-x-2 flex">
                <VanButton
                    class="px-2 bg-[#EB6665] text-white text-xs border-white h-4 rounded-full"
                >
                    {{ betList.size }}
                </VanButton>
            </div>
        </div>
    </VanButton>
</template>
<script setup lang="ts">
import { useBets } from "@/stores/useBets";
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { authToPage } from "@/utils";
import icon_bets from "@/assets/icon/icon_bets.png";
import { useAsync } from "@/stores/useAsync";
import { showFailToast } from "vant";

const route = useRoute();
const { normal } = storeToRefs(useAsync());
const { setShowSeriesPopup, setShowBetPopup } = useBets();
const { betList, isSeries } = storeToRefs(useBets());
const showRegExp = ref<RegExp>(/home|match|details/i);
const showBetTip = computed(() => showRegExp.value.test(route.name as string));

const showPopup = async () => {
    const res = await authToPage();
    if (res) {
        if (isSeries.value && betList.value.size <= 1) return showFailToast("请至少选择两场比赛");
        if (betList.value.size > 1) {
            setShowSeriesPopup(true);
            return;
        }
        setShowBetPopup(true);
    }
};
</script>
