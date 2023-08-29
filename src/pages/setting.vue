<!-- 设置 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg">
        <NavBar :nav-bar-props="{ title: '设置' }" transparent>
            <template #right>
                <i class="icon-erji text-lg text-white" @click="toService" />
            </template>
        </NavBar>
        <div class="bg-mainBg flex-1 rounded-t-20px overflow-hidden z-0">
            <div class="bg-white rounded-t-20px overflow-hidden">
                <van-cell-group :border="false" style="--van-cell-line-height: 2.375rem">
                    <van-cell :border="false" title="系统与装置" is-link to="/deviceInfo" />
                </van-cell-group>
            </div>
            <div class="w-full mt-[30px]">
                <VanButton
                    plain
                    class="w-full h-11 bg-white active:scale-95 transition-all border-0 border-[#E4E4EC] relative text-sm text-mainText"
                    :loading="loading"
                    @click="firstLogout"
                >
                    退出登录
                </VanButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import { useStore } from "@/stores";
import { toService } from "@/utils";
import Local from "@/utils/Local";
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavBar from "@/components/NavBar.vue";

const router = useRouter();
const loading = ref<boolean>();
const { setDialogTip, setLoginInfo } = useStore();

const firstLogout = () => {
    setDialogTip(true, "退出登录", "是否确定退出登录", () => logout());
};

const logout = async () => {
    loading.value = true;
    const res = await API.logout();
    loading.value = false;
    if (res.code === 0) {
        const loginInfo = Local.get("loginInfo");
        Local.clear();
        if (loginInfo) {
            setLoginInfo(loginInfo);
            Local.set("loginInfo", loginInfo);
        }
        router.push("/login");
    }
};
</script>
