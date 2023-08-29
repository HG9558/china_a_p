<!-- 安全中心 -->
<template>
    <div class="h-full flex flex-col bg-mainBg tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '安全中心' }">
            <template #right>
                <i class="z-10 text-white ml-2 icon-erji text-lg" @click="toService" />
            </template>
        </NavBar>
        <div class="bg-mainBg flex-1 rounded-t-20px overflow-hidden z-0">
            <div class="rounded-20px bg-white overflow-hidden">
                <van-cell-group :border="false" style="--van-cell-line-height: 2.375rem">
                    <van-cell
                        is-link
                        :to="'/password'"
                        :value="user?.passwordHash ? '重置' : '完善信息'"
                    >
                        <template #title>
                            <div class="flex items-center">
                                <div
                                    class="w-6 h-6 mr-10px"
                                    v-html="user?.passwordHash ? ic_edit_password : ic_set_password"
                                />
                                <span class="text-mainText text-15px"> 登录密码 </span>
                            </div>
                        </template>
                    </van-cell>
                    <van-cell
                        is-link
                        @click="toPage('/passwordWith')"
                        :value="user?.passwordCoin ? '重置' : '完善信息'"
                    >
                        <template #title>
                            <div class="flex items-center">
                                <div
                                    class="w-6 h-6 mr-10px"
                                    v-html="user?.passwordCoin ? ic_edit_safety : ic_set_safety"
                                />
                                <span class="text-mainText text-15px"> 安全密码 </span>
                            </div>
                        </template>
                    </van-cell>
                    <!-- <van-cell is-link to="/findPasswordWith" v-show="user?.passwordCoin">
                        <template #title>
                            <div class="flex items-center">
                                <div class="w-6 h-6 mr-10px" v-html="ic_f_password"  />
                                <span class="text-mainText text-15px"> 忘记安全密码 </span>
                            </div>
                        </template>
                    </van-cell> -->
                    <van-cell
                        class="setTitle20 whitespace-nowrap"
                        :is-link="!user?.mobile"
                        @click="setMobile"
                        :border="false"
                    >
                        <template #title>
                            <div class="flex items-center whitespace-nowrap">
                                <div class="w-6 h-6 mr-10px" v-html="ic_mobile" />
                                <span class="text-mainText text-15px"> 手机号码 </span>
                            </div>
                        </template>
                        <template #value>
                            <p class="text-right w-full whitespace-nowrap" v-if="user?.mobile">
                                <span class="text-mainText">
                                    {{ user.areaCode && `+${user.areaCode}` }}
                                    {{ desensitize(user?.mobile, 3, 4, 4) }}
                                </span>
                                <span class="text-txt_d text-xs ml-1"> 如需修改请联系客服 </span>
                            </p>
                            <p v-else class="text-right w-full">完善信息</p>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
import { storeToRefs } from "pinia";
import ic_set_password from "@/assets/svg/ic_set_password.svg?raw";
import ic_edit_password from "@/assets/svg/ic_edit_password.svg?raw";
import ic_set_safety from "@/assets/svg/ic_set_safety.svg?raw";
import ic_edit_safety from "@/assets/svg/ic_edit_safety.svg?raw";
import ic_mobile from "@/assets/svg/ic_mobile.svg?raw";
import { desensitize, toRecharge, toService } from "@/utils";
import NavBar from "@/components/NavBar.vue";
import { useRouter } from "vue-router";

const { setShowSetMobile } = useStore();
const { user } = storeToRefs(useStore());
const router = useRouter();

const toPage = (path: string) => {
    router.push(path);
};

const setMobile = () => {
    if (user.value?.mobile) return;
    setShowSetMobile(true);
};
</script>

<style lang="scss" scoped>
.setTitle20 {
    ::v-deep(.van-cell__title) {
        flex: none;
        width: 100px;
        flex-shrink: 0;
    }
    ::v-deep(.van-cell__value) {
        display: flex;
    }
}
</style>
