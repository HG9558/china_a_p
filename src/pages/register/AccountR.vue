<!-- 账号密码注册 -->
<template>
    <div class="w-full h-full flex flex-col">
        <div class="rounded-xl h-11 border-[#f4f4f4] border flex items-center">
            <van-field
                class="rounded-lg text-15px !py-0 text-mainText"
                clearable
                :border="false"
                :maxlength="14"
                autocomplete="off"
                clear-trigger="always"
                v-model="params.username"
                placeholder="请设置用户名"
                :disabled="loading"
                :formatter="formatterName"
            >
                <template #left-icon>
                    <div class="flex h-[27px] items-center">
                        <img
                            class="w-5 h-5 object-contain"
                            :src="params.username ? ic_user_a : ic_user"
                            alt=""
                        />
                    </div>
                </template>
            </van-field>
        </div>
        <div class="rounded-xl h-11 border-[#f4f4f4] border mt-3 flex items-center justify-between">
            <van-field
                class="rounded-lg text-15px !py-0 text-mainText"
                clearable
                :type="type"
                :border="false"
                :maxlength="20"
                autocomplete="off"
                v-model="password"
                :disabled="loading"
                :formatter="formatterPwd"
                clear-trigger="always"
                placeholder="请设置密码"
            >
                <template #left-icon>
                    <div class="flex h-[27px] items-center">
                        <img class="w-5 h-5" :src="password ? ic_password_a : ic_password" alt="" />
                    </div>
                </template>
            </van-field>
            <div class="flex items-center flex-shrink-0 pr-3">
                <img
                    class="w-5 h-5"
                    :src="type === 'text' ? icon_browse : icon_biyan"
                    @click="type = type === 'password' ? 'text' : 'password'"
                    alt=""
                />
            </div>
        </div>
        <div
            class="rounded-xl h-11 border-[#f4f4f4] border border-[#ACB1C816] mt-3 flex items-center justify-between"
        >
            <van-field
                class="rounded-lg text-15px !py-0 text-mainText"
                clearable
                :border="false"
                :maxlength="20"
                :type="confirmType"
                :disabled="loading"
                autocomplete="off"
                :formatter="formatterPwd"
                clear-trigger="always"
                v-model="confirmPassword"
                placeholder="请再次确认密码"
                @keyup.enter="!disabled && userCreate()"
            >
                <template #left-icon>
                    <div class="flex h-[27px] items-center">
                        <img
                            class="w-5 h-5"
                            :src="confirmPassword ? ic_password_a : ic_password"
                            alt=""
                        />
                    </div>
                </template>
            </van-field>
            <div class="flex items-center flex-shrink-0 pr-3">
                <img
                    class="w-5 h-5"
                    :src="confirmType === 'text' ? icon_browse : icon_biyan"
                    @click="confirmType = confirmType === 'password' ? 'text' : 'password'"
                    alt=""
                />
            </div>
        </div>
        <div
            v-show="false"
            class="rounded-xl h-11 border-[#f4f4f4] border border-[#ACB1C816] mt-3 flex items-center justify-between"
        >
            <van-field
                class="rounded-lg text-15px text-mainText"
                clearable
                :border="false"
                type="number"
                :maxlength="7"
                :disabled="loading"
                autocomplete="off"
                :formatter="formatterNum"
                clear-trigger="always"
                v-model="params.promoCode"
                placeholder="请输入邀请码(非必填)"
                @keyup.enter="!disabled && userCreate()"
            >
                <template #left-icon>
                    <div class="flex h-[27px] items-center">
                        <img
                            class="w-5 h-5"
                            :src="params.promoCode ? ic_promoCode_a : ic_promoCode"
                            alt=""
                        />
                    </div>
                </template>
            </van-field>
        </div>
        <div class="px-1 mt-3">
            <CaptchaCom @success="success" ref="captchaRef" />
        </div>
        <VanButton
            type="primary"
            :loading="loading"
            :disabled="disabled || loading"
            class="tlw_btn_linear border-0 text-15px h-11 rounded-xl w-full font-PFSCS mt-5"
            @click="userCreate"
        >
            立即注册
        </VanButton>
        <VanButton
            class="border-0 h-6 mb-6 text-sm translate-x-2 font-medium text-mainText mx-auto block mt-3"
            icon="arrow"
            icon-position="right"
            :disabled="loading"
            @click="router.replace('/login')"
        >
            已有账号，<span class="text-txt_t">去登录</span>
        </VanButton>
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import { useStore } from "@/stores";
import { useAsync } from "@/stores/useAsync";
import Local from "@/utils/Local";
import { formatterName, formatterNum, formatterPwd } from "@/utils/validate";
import { showSuccessToast, showFailToast } from "vant";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import ic_user from "@/assets/icon/ic_user.png";
import ic_user_a from "@/assets/icon/ic_user_a.png";
import ic_password from "@/assets/icon/ic_password.png";
import ic_password_a from "@/assets/icon/ic_password_a.png";
import ic_promoCode from "@/assets/svg/ic_promoCode.svg?raw";
import ic_promoCode_a from "@/assets/svg/ic_promoCode_a.svg?raw";
import { encrypt } from "@/utils/cryptoJS";
import { Captcha, CaptchaRef, Iregister } from "@/components/types";
import CaptchaCom from "@/components/CaptchaCom.vue";
import { get } from "idb-keyval";
import { Icreate } from "@/api/user/interface";
import { product } from "platform";
import icon_browse from "@/assets/icon/icon_browse.png";
import icon_biyan from "@/assets/icon/icon_biyan.png";

const router = useRouter();
const { queryUserWallet } = useAsync();
const password = ref<string>("");
const confirmPassword = ref<string>("");
const loading = ref<boolean>();
const { setToken, setUser, setLoginInfo } = useStore();
const type = ref<"password" | "text">("password");
const confirmType = ref<"password" | "text">("password");
const captcha = ref<Captcha>();
const captchaRef = ref<CaptchaRef>();
const params = ref<Icreate>({ username: "", promoCode: "" });

const disabled = computed(
    () => !params.value.username || !password.value || !confirmPassword.value
);

const props = defineProps<{ setLoading: (v: boolean) => void }>();

const userCreate = async () => {
    if (!params.value.username) return showFailToast("请设置用户名");
    if (!password.value) return showFailToast("请设置密码");
    if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    if (password.value !== confirmPassword.value) return showFailToast("两次密码不一致");
    loading.value = true;
    props.setLoading(true);
    const data: Iregister = (await get("register")) as Iregister;
    const res = await API.userCreate({
        password: encrypt(password.value),
        model: product,
        ...params.value,
        ...captcha.value,
        ...data,
    });
    props.setLoading(false);
    loading.value = false;
    switch (res.code) {
        case 0:
            setUser(res.data);
            setToken(res.data?.apiToken!);
            Local.set("token", res.data?.apiToken);
            const login = { username: params.value.username };
            setLoginInfo({ ...login, password: "" });
            // router.push(isBack.value ? isBack.value : "/");
            router.push("/match");
            showSuccessToast("恭喜您，注册成功！");
            queryUserWallet();
            break;
        default:
            captchaReset();
            break;
    }
};

const captchaReset = () => {
    captchaRef.value?.reset?.();
    captcha.value = undefined;
};

const success = (data: Captcha) => {
    if (data.sessionId) captcha.value = data;
};
</script>

<style lang="scss" scoped>
::v-deep(.van-checkbox__label) {
    color: #666;
    font-size: 15px;
    font-weight: 500;
}
.van-cell {
    background: transparent;
}
</style>
