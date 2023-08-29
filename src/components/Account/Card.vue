<!-- 账户管理 银行卡 -->
<template>
    <div class="w-[298px] h-[235px] mt-8 mx-auto mb-2 relative" v-show="!bankList?.[0] && !loading">
        <div
            class="w-7 h-7 absolute top-[38px] right-[34px] active:scale-90 transition-all"
            :v-html="icon_add"
            @click="addCard"
        />
        <img class="w-full h-full" :src="ic_bg" alt="" />
    </div>
    <ul class="mt-[14px] px-10px" v-if="skLoading || bankList?.[0]">
        <li
            class="h-[92px] w-full relative mt-10px first-of-type:mt-0 rounded-xl overflow-hidden"
            v-for="(item, index) in skLoading ? skList : bankList"
            :key="index"
        >
            <template v-if="skLoading">
                <div
                    class="absolute top-0 left-0 w-full h-full py-3 pl-10px rounded-xl z-20 bg-white"
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center flex-1 overflow-hidden">
                            <div
                                class="w-[34px] h-[34px] mr-10px rounded-full flex-shrink-0 tlw_skeleton"
                            />
                            <p class="text-sm flex-1 flex items-center">
                                <span class="h-5 w-32 tlw_skeleton rounded" />
                            </p>
                        </div>
                    </div>
                    <p class="mt-10px rounded line-clamp-1 pr-2 h-5 w-64 tlw_skeleton" />
                </div>
            </template>
            <template v-else>
                <img
                    v-show="false"
                    class="absolute top-0 left-0 w-full h-full scale-[2] opacity-50 filter blur-3xl pointer-events-none"
                    :src="item.icon"
                    alt=""
                />
                <div
                    class="absolute top-0 left-0 w-full h-full py-3 pl-10px rounded-xl z-20 bg-white"
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center flex-1 overflow-hidden">
                            <img
                                class="w-[34px] h-[34px] mr-10px object-cover rounded flex-shrink-0"
                                v-lazy="item.icon"
                                alt=""
                            />
                            <p class="text-sm flex-1 flex items-center">
                                <span class="font-medium line-clamp-1">
                                    {{ item.bankName }}
                                </span>
                                <span class="ml-10px flex-shrink-0">储蓄卡</span>
                            </p>
                        </div>
                        <VanButton
                            class="border-0 text-xs h-6 flex-shrink-0 scale-0"
                            @click="deleteItem(item)"
                        >
                            <template #icon>
                                <i class="icon-shanchu text-sm"></i>
                            </template>
                            删除
                        </VanButton>
                    </div>
                    <p class="mt-10px text-17px font-extrabold line-clamp-1 pr-2">
                        {{ item.accountNo }}
                    </p>
                </div>
            </template>
        </li>
    </ul>
    <div class="px-10px mt-5">
        <VanButton
            v-show="bankList.length < 5"
            class="h-11 w-full border-0 tlw_btn_linear text-white from/13.5% to/107% mx-auto flex items-center justify-center rounded-xl"
            @click="addCard"
        >
            <i class="icon-add mr-[2px] font-bold"></i>
            <span class="text-17px">添加银行卡</span>
        </VanButton>
        <p class="text-center text-sm flex items-center justify-center text-tip mt-10px pb-10">
            <i class="icon-gantanhao1 mr-1"></i> 最多可支持添加5张银行卡
        </p>
    </div>
    <CardAdd v-model="showCard" :userBankList="userBankList" :bankList="bankList" />
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { UserBankList } from "@/api/wallet/types";
import { useStore } from "@/stores";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import ic_bg from "@/assets/account/ic_card_bg.png";
import icon_add from "@/assets/svg/icon_add.svg?raw";
import { toRecharge } from "@/utils";
import { showFailToast, showSuccessToast } from "vant";
import CardAdd from "./CardAdd.vue";

const showCard = ref<boolean>(false);
const { setDialogTip, setLoading, setUser } = useStore();
const { loading, user } = storeToRefs(useStore());
const bankList = ref<UserBankList[]>([]);
const skList = ref<UserBankList[]>(Array(3).fill(null));
const skLoading = ref<boolean>(false);

const deleteItem = (item: UserBankList) => {
    if (bankList.value?.length! <= 1) return showFailToast("请添加新的银行卡,再进行旧卡删除");
    // 解绑用户银行卡
    setDialogTip(true, "温馨提示", "确定删除银行卡吗？", async () => {
        setLoading(true);
        const res = await API.deleteUserBank({ status: 2, id: item.id });
        setLoading(false);
        if (res.code === 0) {
            showSuccessToast("删除成功");
            bankList.value = bankList.value?.filter(v => +v.id != +item.id);
        }
    });
};

const userBankList = async () => {
    // 银行卡列表
    setLoading(true);
    // skLoading.value = true;//骨架屏loading
    const res = await API.userBankList();
    setLoading(false);
    skLoading.value = false;
    if (res.code === 0) {
        bankList.value = res.data!;
        if (bankList.value?.[0]?.accountName) {
            user.value!.realName = bankList.value?.[0]?.accountName;
            setUser(user.value);
        }
    }
};

const addCard = () => {
    //如果已经绑定手机或已设置安全密码再展示
    /* if (!user.value?.mobile) {
        toRecharge();
        return;
    } */
    showCard.value = !showCard.value;
};

userBankList();
</script>
