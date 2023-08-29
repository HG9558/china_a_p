<!-- 账户管理 数字货币 -->
<template>
    <div
        class="w-[298px] h-[235px] mt-8 mx-auto mb-2 relative"
        v-show="!virtualList?.[0] && !loading"
    >
        <div
            class="w-7 h-7 absolute top-[38px] right-[34px] active:scale-90 transition-all"
            @click="showDIGICCY = !showDIGICCY"
            v-html="icon_add"
        />
        <img class="w-full h-full" :src="ic_bg" alt="" />
    </div>
    <ul class="mt-[14px] px-10px">
        <li
            class="min-h-[92px] w-full rounded-xl relative py-3 pl-10px bg-[#E6FEF9] mt-10px first-of-type:mt-0"
            v-for="(item, index) in skLoading ? skList : virtualList"
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
                <div
                    class="absolute top-0 left-0 w-full h-full py-3 pl-10px rounded-xl z-20 bg-white"
                >
                    <div class="flex items-center justify-between">
                        <div class="flex items-center flex-1 overflow-hidden">
                            <img
                                class="w-[34px] h-[34px] mr-10px rounded flex-shrink-0"
                                v-lazy="ic_usdt"
                                alt=""
                            />
                            <p class="text-sm flex-1 flex items-center">
                                <span class="font-medium line-clamp-1">
                                    {{ item.usdtName }}
                                </span>
                                <span
                                    class="ml-10px flex-shrink-0 px-[5px] rounded-20px bg-fz_g text-white text-xs leading-6"
                                >
                                    {{ item.usdtProtocol }}
                                </span>
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
                    <p class="mt-10px text-sm break-all pr-2">
                        {{ desensitize(item.usdtAddress, 5, 5, 5) }}
                    </p>
                </div>
            </template>
        </li>
    </ul>
    <div class="px-10px mt-5">
        <VanButton
            v-show="virtualList.length < 5"
            class="h-11 w-full border-0 tlw_btn_linear text-white from/13.5% to/107% mx-auto flex items-center justify-center rounded-xl"
            @click="addDIGICCY"
        >
            <i class="icon-add mr-[2px] font-bold"></i>
            <span class="text-17px">添加提币地址</span>
        </VanButton>
        <p class="text-center text-sm flex items-center justify-center text-tip mt-10px pb-10">
            <i class="icon-gantanhao1 mr-1"></i> 最多可支持添加5个提币地址
        </p>
    </div>
    <DIGICCYAdd
        v-model="showDIGICCY"
        :userVirtualBankList="userVirtualBankList"
        :virtualList="virtualList"
    />
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
import { ref, toRefs } from "vue";
import ic_bg from "@/assets/account/ic_usdt_bg.png";
import icon_add from "@/assets/svg/icon_add.svg?raw";
import { API } from "@/api";
import type { UserVirtualBankList } from "@/api/wallet/types";
import { storeToRefs } from "pinia";
import ic_usdt from "@/assets/icon/ic_usdt.png";
import { showFailToast, showSuccessToast } from "vant";
import { desensitize, toRecharge } from "@/utils";
import DIGICCYAdd from "./DIGICCYAdd.vue";

const showDIGICCY = ref<boolean>(false); //显示添加提币地址组件

const { loading, user } = storeToRefs(useStore());
const { setDialogTip, setLoading } = useStore();
const virtualList = ref<UserVirtualBankList[]>([]); //虚拟账户列表
const skList = ref<UserVirtualBankList[]>(Array(3).fill(null));
const skLoading = ref<boolean>(false);

const deleteItem = (item: UserVirtualBankList) => {
    // 删除提币地址
    if (virtualList.value?.length! <= 1)
        return showFailToast("请添加新的提币地址,再进行旧地址删除");
    setDialogTip(true, "温馨提示", "确定删除提币地址吗？", async () => {
        setLoading(true);
        const res = await API.deleteVirtualBank({ status: 2, id: item.id });
        setLoading(false);
        if (res.code === 0) {
            showSuccessToast("删除成功");
            virtualList.value = virtualList.value?.filter(v => v.id != item.id);
        }
        return res;
    });
};

const userVirtualBankList = async () => {
    // 数字货币列表
    setLoading(true);
    // skLoading.value = true;//骨架屏loading
    const res = await API.userVirtualBankList();
    setLoading(false);
    skLoading.value = false;
    if (res.code === 0) {
        virtualList.value = res.data!;
    }
};

const addDIGICCY = () => {
    //如果已经绑定手机或已设置安全密码再展示
    /* if (!user.value?.mobile) {
        toRecharge();
        return;
    } */
    showDIGICCY.value = !showDIGICCY.value;
};

userVirtualBankList();
</script>
