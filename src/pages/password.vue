<!-- 修改登录密码 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg">
        <NavBar
            transparent
            :nav-bar-props="{ title: user?.passwordHash ? '修改登录密码' : '设置登录密码' }"
        />
        <div class="rounded-t-20px flex-1 bg-mainBg overflow-hidden z-0">
            <div class="bg-white rounded-20px overflow-hidden">
                <p class="flex items-center h-10 bg-[#FFF4E5] pl-[14px]">
                    <span class="text-13px text-tip">
                        <i class="icon-gantanhao1 text-base"></i>
                        设置登入密码后，可以通过账号+密码登录
                    </span>
                </p>
                <div class="px-10px">
                    <van-cell-group :border="false" class="mt-1">
                        <van-cell title="当前账号" class="setTitle !px-0">
                            <template #value>
                                <p class="text-sm text-mainText">
                                    {{ user?.username }}
                                </p>
                            </template>
                        </van-cell>
                        <van-cell
                            title="旧密码"
                            class="setTitle !px-0 !py-2"
                            v-show="user?.passwordHash"
                        >
                            <template #value>
                                <div class="flex flex-1 items-center rounded-xl">
                                    <van-field
                                        :maxlength="20"
                                        :type="oldType"
                                        :border="false"
                                        autocomplete="off"
                                        :formatter="formatterPwd"
                                        class="!p-0 flex-1 text-sm"
                                        v-model="params.passwordOld"
                                        placeholder="请输入旧密码"
                                    />
                                    <img
                                        class="w-5 h-5"
                                        :src="oldType === 'text' ? icon_browse : icon_biyan"
                                        @click="
                                            oldType = oldType === 'password' ? 'text' : 'password'
                                        "
                                        alt=""
                                    />
                                </div>
                            </template>
                        </van-cell>
                        <van-cell title="设置登录密码" class="setTitle !px-0 !py-2">
                            <template #value>
                                <div class="flex flex-1 items-center rounded-xl">
                                    <van-field
                                        :maxlength="20"
                                        :type="type"
                                        :border="false"
                                        autocomplete="off"
                                        class="!p-0 flex-1 text-sm"
                                        :formatter="formatterPwd"
                                        v-model="params.password"
                                        placeholder="请输入登入密码"
                                    />
                                    <img
                                        class="w-5 h-5"
                                        :src="type === 'text' ? icon_browse : icon_biyan"
                                        @click="type = type === 'password' ? 'text' : 'password'"
                                        alt=""
                                    />
                                </div>
                            </template>
                        </van-cell>
                        <van-cell title="确认登录密码" class="setTitle !px-0 !py-2">
                            <template #value>
                                <div class="flex flex-1 items-center rounded-xl">
                                    <van-field
                                        :maxlength="20"
                                        v-model="confirmPassword"
                                        :border="false"
                                        class="!p-0 flex-1 text-sm"
                                        autocomplete="off"
                                        :type="newType"
                                        :formatter="formatterPwd"
                                        placeholder="请再次输入登入密码"
                                        @keyup.enter="
                                            user?.passwordHash ? updatePassword() : initPassword()
                                        "
                                    />
                                    <img
                                        class="w-5 h-5"
                                        :src="newType === 'text' ? icon_browse : icon_biyan"
                                        @click="
                                            newType = newType === 'password' ? 'text' : 'password'
                                        "
                                        alt=""
                                    />
                                </div>
                            </template>
                        </van-cell>
                    </van-cell-group>
                </div>
            </div>
            <p class="text-[#666] text-xs px-10px mt-15px">*密码必须是 8~20 位英文字母、数字组合</p>
            <div class="px-4 mt-10 mb-4">
                <VanButton
                    class="tlw_btn_linear w-full rounded-xl text-white border-0"
                    :disabled="disabled || loading"
                    @click="user?.passwordHash ? updatePassword() : initPassword()"
                    :loading="loading"
                >
                    确定
                </VanButton>
            </div>
            <p
                v-if="user?.passwordHash"
                class="mt-10 text-center text-gz text-sm"
                @click="router.push('/forget')"
            >
                忘记旧密码？
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { IupdatePassword } from "@/api/user/interface";
import { useStore } from "@/stores";
import { useAsync } from "@/stores/useAsync";
import Local from "@/utils/Local";
import { encrypt } from "@/utils/cryptoJS";
import { formatterPwd } from "@/utils/validate";
import { storeToRefs } from "pinia";
import { showFailToast, showSuccessToast } from "vant";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import icon_browse from "@/assets/icon/icon_browse.png";
import icon_biyan from "@/assets/icon/icon_biyan.png";

const { user } = storeToRefs(useStore());
const confirmPassword = ref<string>("");
const { userProfile } = useAsync();
const router = useRouter();
const loading = ref<boolean>();
const oldType = ref<"password" | "text">("password");
const type = ref<"password" | "text">("password");
const newType = ref<"password" | "text">("password");

const params = ref<IupdatePassword>({
    passwordOld: "",
    password: "",
});

const disabled = computed(() => {
    return user.value?.passwordHash
        ? !params.value.password || !params.value.passwordOld
        : !params.value.password;
});

const updatePassword = async () => {
    const { password, passwordOld } = params.value;
    if (!passwordOld) return showFailToast("旧密码不能为空");
    if (!password) return showFailToast("新密码不能为空");
    if (password !== confirmPassword.value) return showFailToast("两次密码不一致");
    loading.value = true;
    const res = await API.updatePassword({
        ...params.value,
        password: encrypt(params.value.password!),
        passwordOld: encrypt(params.value.passwordOld!),
    });
    loading.value = false;
    if (res.code === 0) {
        userProfile();
        showSuccessToast(res.msg);
        Local.clear();
    }
};

const initPassword = async () => {
    const { password } = params.value;
    if (!password) return showFailToast("新密码不能为空");
    if (password !== confirmPassword.value) return showFailToast("两次密码不一致");
    loading.value = true;
    const res = await API.initPassword({ password: encrypt(params.value.password!) });
    loading.value = false;
    if (res.code === 0) {
        userProfile();
        showSuccessToast(res.msg);
        Local.clear();
    }
};
</script>

<style lang="scss" scoped>
::v-deep(.van-cell) {
    padding: 10px;
}
.setTitle {
    ::v-deep(.van-cell__title) {
        flex: none;
        width: 38%;
        flex-shrink: 0;
    }
    ::v-deep(.van-cell__value) {
        display: flex;
    }
}
</style>
