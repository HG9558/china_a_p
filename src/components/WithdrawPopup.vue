<!-- 选择到账银行卡 -->
<template>
    <VanPopup :round="true" v-model:show="showBottom" position="bottom">
        <div class="bg-txt">
            <div class="relative w-full h-12 flex items-center text-white justify-between px-4">
                <p class="font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {{ title }}
                </p>
            </div>
            <div class="rounded-t-20px bg-white">
                <ul class="w-full text-sm">
                    <li
                        :key="index"
                        v-for="(item, index) in list"
                        class="h-[60px] flex items-center px-10px border-b border-mainBg"
                        @click="submit(item)"
                    >
                        <div class="w-[48%] flex items-center overflow-hidden">
                            <img
                                class="w-6 h-6 mr-10px rounded flex-shrink-0"
                                v-lazy="active == 1 ? item.icon : ic_usdt"
                                alt=""
                            />
                            <span class="line-clamp-1 flex-1 break-all">
                                {{ item.bankName || item.usdtName }}
                            </span>
                        </div>
                        <div class="flex-1 flex items-center overflow-hidden">
                            <span class="line-clamp-1 flex-1 break-all text-right">
                                {{
                                    active == 1
                                        ? desensitizeCard(item.accountNo, 4, 4)
                                        : desensitize(item.usdtAddress, 5, 5, 5)
                                }}
                            </span>
                            <div class="w-3 flex-shrink-0 mx-10px">
                                <i
                                    v-show="isActive(item)"
                                    class="iconfont icon-zhengque text-txt"
                                />
                            </div>
                        </div>
                    </li>
                </ul>
                <div
                    class="h-[104px] px-[20px] flex items-center"
                    v-show="Number(list?.length) < 5"
                >
                    <VanButton
                        @click="emits('callBack')"
                        class="h-11 rounded-xl w-full border-0 tlw_btn_linear text-white"
                    >
                        <template #icon>
                            <i class="icon-add text-xl"></i>
                        </template>
                        {{ btnText }}
                    </VanButton>
                </div>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { desensitize, desensitizeCard } from "@/utils";
import { computed, toRefs } from "vue";
import ic_usdt from "@/assets/icon/ic_usdt.png";
import type { UserBankList, UserVirtualBankList } from "@/api/wallet/types";

const props = defineProps<{
    modelValue: boolean;
    active: number;
    title?: string;
    btnText?: string;
    bankItem?: UserBankList;
    virtualItem?: UserVirtualBankList;
    list?: UserBankList[] | UserVirtualBankList[] | undefined;
}>();

const isActive = computed(() => (item: UserBankList | UserVirtualBankList) => {
    return (
        (active.value == 0 && item.id == virtualItem?.value?.id) ||
        (active.value == 1 && item.id == bankItem?.value?.id)
    );
});

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: UserBankList | UserVirtualBankList): void;
    (e: "callBack"): void;
}>();

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set(v) {
        close();
    },
});

const submit = (item: UserBankList | UserVirtualBankList) => {
    emits("submit", item);
    close();
};

const close = () => {
    emits("update:modelValue", false);
};

const { bankItem, virtualItem, active } = toRefs(props);
</script>
