<!-- 进入三方游戏弹窗 -->
<template>
    <van-dialog
        title=""
        teleport="body"
        v-model:show="show"
        :closeOnClickOverlay="false"
        :show-cancel-button="true"
        cancel-button-text="直接进入"
        confirm-button-text="确定"
        cancel-button-color="#303033"
        :beforeClose="beforeClose"
        :confirmButtonDisabled="!coin || showTip"
    >
        <div class="pb-2 text-txt_d">
            <div
                class="h-[50px] relative flex items-center justify-center border-b border-b-mainBg"
            >
                <p class="text-mainText">转入金额</p>
                <i
                    class="icon-close-bold absolute top-1/2 right-10px -translate-y-1/2"
                    @click="close"
                ></i>
            </div>
            <p v-show="props?.activityUserStatus" class="text-txt_d text-sm mt-3 mb-10px px-6">
                您还在参与活动，转入金额后，流水未达标，将不可转出!
            </p>
            <p class="text-sm text-mainText mt-3 mb-10px px-6">
                中心钱包 ￥<span class="font-OPPO">
                    {{ balance?.coin }}
                </span>
            </p>
            <div class="px-6">
                <div
                    class="h-[37px] rounded-10px bg-mainBg mt-10px mb-[6px] border border-mainBg pl-[6px] flex items-center justify-between overflow-hidden pr-2"
                >
                    <div class="flex-1 flex items-center">
                        <span class="text-mainText font-medium">￥</span>
                        <VanField
                            class="bg-mainBg !p-0 font-OPPO_M"
                            type="number"
                            placeholder="请输入金额"
                            :clearable="true"
                            autocomplete="off"
                            :maxlength="/(.)/.test(`${coin}`) ? 11 : 8"
                            :formatter="props?.gameItem?.isInteger ? formatterNum : formatterCoin"
                            v-model="coin"
                        />
                    </div>
                    <VanButton
                        v-show="!coin"
                        class="text-sm px-0 border-0 h-full text-txt"
                        @click="coin = `${Number(balance?.coin)}` || '0'"
                    >
                        全部金额
                    </VanButton>
                </div>
                <p v-show="showTip" class="h-10 text-13px text-tip font-medium flex items-center">
                    最多可转{{ balance?.coin }}元
                </p>
                <van-checkbox
                    checked-color="#4B6CDB"
                    v-model="checked"
                    icon-size=".9375rem"
                    class="text-xs"
                    style="--van-checkbox-label-color: #9ba1ae"
                >
                    本次登录不再提示
                </van-checkbox>
            </div>
        </div>
    </van-dialog>
</template>

<script setup lang="ts">
import { Login } from "@/api/platform/types";
import { useStore } from "@/stores/index";
import { useAsync } from "@/stores/useAsync";
import { openLink } from "@/utils";
import { formatterCoin, formatterNum } from "@/utils/validate";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: string): void;
}>();

const props = defineProps<{
    modelValue: boolean;
    gameItem?: Login;
    activityUserStatus?: boolean;
}>();

const showTip = computed(() => {
    return Number(coin.value) > Number(balance.value?.coin) && Number(balance.value?.coin) != 0;
});

const { user, gameID } = storeToRefs(useStore());
const { balance } = storeToRefs(useAsync());
const { setGameTip } = useStore();
const coin = ref<string>("");
const checked = ref<boolean>(false);

const show = computed({
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

const beforeClose = async (action: string) => {
    if (checked.value) setGameTip(true);
    switch (action) {
        case "cancel":
            openLink(props.gameItem?.url!);
            return true;
        case "confirm":
            const res = await useAsync()?.coinTransfer({
                coin: coin.value,
                id: +props.gameItem?.platListId!,
                direction: 0,
                name: user.value?.realName,
            });
            if (res.code == 0) {
                openLink(props.gameItem?.url!);
                return true;
            }
            break;
        default:
            break;
    }
    return false;
};
</script>
