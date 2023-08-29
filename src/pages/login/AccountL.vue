<!-- 账号密码登录 -->
<template>
    <div class="w-full">
        <div class="rounded-xl h-11 border border-[#f4f4f4] flex items-center justify-between">
            <van-field
                class="rounded-lg flex-1 text-15px !py-0 text-mainText"
                clearable
                :border="false"
                :maxlength="14"
                autocomplete="off"
                v-model="username"
                :disabled="loading"
                clear-trigger="always"
                placeholder="请输入用户名"
                :formatter="formatterName"
            >
                <template #left-icon>
                    <div class="flex h-[27px] items-center">
                        <img
                            class="w-5 h-5 object-contain"
                            :src="username ? ic_user_a : ic_user"
                            alt=""
                        />
                    </div>
                </template>
            </van-field>
        </div>
        <div class="rounded-xl h-11 border border-[#f4f4f4] mt-3 flex items-center justify-between">
            <van-field
                class="rounded-lg flex-1 text-15px text-mainText"
                clearable
                :border="false"
                autocomplete="off"
                clear-trigger="always"
                v-model="password"
                :type="type"
                :maxlength="20"
                :disabled="loading"
                placeholder="请输入密码"
                :formatter="formatterPwd"
                @keyup.enter="!disabled && userLogin()"
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
        <div class="px-1 mt-3">
            <CaptchaCom @success="success" ref="captchaRef" />
        </div>
        <div class="flex items-center justify-between mt-5 mb-7 pl-2">
            <van-checkbox
                checked-color="#4B6CDB"
                v-model="checked"
                class="text-15px"
                style="--van-checkbox-size: 1rem"
            >
                <VanButton class="border-0 p-0 h-auto leading-[23px] font-normal text-sm">
                    记住密码
                </VanButton>
            </van-checkbox>
            <VanButton
                :disabled="loading"
                class="h-5 border-0 font-normal text-mainText text-sm"
                to="/forget"
            >
                忘记密码
            </VanButton>
        </div>
        <VanButton
            type="primary"
            :loading="loading"
            @click="userLogin"
            class="w-full font-PFSCS rounded-xl text-15px border-0 h-11 relative tlw_btn_linear"
            :disabled="disabled || loading"
        >
            立即登录
        </VanButton>
        <VanButton
            class="border-0 h-6 mb-6 translate-x-2 text-sm font-medium text-mainText mx-auto block mt-3"
            icon="arrow"
            :disabled="loading"
            icon-position="right"
            to="/register"
        >
            新用户，<span class="text-txt_t">去注册</span>
        </VanButton>
    </div>
</template>

<script setup lang="ts">
import Local from "@/utils/Local";
import { API } from "@/api";
import { useStore } from "@/stores";
import { storeToRefs } from "pinia";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { formatterName, formatterPwd } from "@/utils/validate";
import { useAsync } from "@/stores/useAsync";
import type { CaptchaRef, Captcha } from "@/components/types";
import ic_user from "@/assets/icon/ic_user.png";
import ic_user_a from "@/assets/icon/ic_user_a.png";
import ic_password from "@/assets/icon/ic_password.png";
import ic_password_a from "@/assets/icon/ic_password_a.png";
import { encrypt } from "@/utils/cryptoJS";
import { showFailToast } from "vant";
import CaptchaCom from "@/components/CaptchaCom.vue";
import { product } from "platform";
import icon_browse from "@/assets/icon/icon_browse.png";
import icon_biyan from "@/assets/icon/icon_biyan.png";

const router = useRouter();
const username = ref<string>("");
const password = ref<string>("");
const captchaRef = ref<CaptchaRef>();
const showCaptcha = ref<boolean>(false);

const type = ref<"password" | "text">("password");
const checked = ref<boolean>();
const loading = ref<boolean>();
const { sportsSetInquiry, queryUserWallet } = useAsync();
const { loginInfo } = storeToRefs(useStore());
const { setToken, setUser, setLoginInfo } = useStore();
const captcha = ref<Captcha>();

const props = defineProps<{ setLoading: (v: boolean) => void }>();

const disabled = computed(() => !username.value || !password.value);

const userLogin = async () => {
    if (!username.value) return showFailToast("用户名不能为空");
    if (!password.value) return showFailToast("密码不能为空");
    if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    loading.value = true;
    props.setLoading(true);
    const res = await API.userLogin({
        username: username.value,
        password: encrypt(password.value),
        model: product,
        ...captcha.value,
    });
    loading.value = false;
    props.setLoading(false);
    switch (res.code) {
        case 0:
            sportsSetInquiry();
            setUser(res.data);
            setToken(res.data?.apiToken!);
            Local.set("token", res.data?.apiToken);
            // router.push(isBack.value ? isBack.value : "/");
            router.push("/match");
            queryUserWallet();
            const login = { username: username.value };
            setLoginInfo({ ...loginInfo.value, ...login, password: "" });
            if (checked.value) {
                const _login = { username: username.value, password: password.value };
                setLoginInfo({ ...loginInfo.value, ..._login });
                return;
            }
            break;
        case 20805:
            showCaptcha.value = true;
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

onMounted(() => {
    if (loginInfo.value) {
        username.value = loginInfo.value.username!;
        password.value = loginInfo.value.password || "";
        checked.value = !!loginInfo.value.password;
    }
});
</script>

<style lang="scss" scoped>
::v-deep(.van-checkbox__label) {
    display: flex;
    align-items: center;
}
.van-cell {
    background: transparent;
}

::v-deep(.van-checkbox) {
    .van-checkbox__icon--checked {
        .van-icon {
            background: #4b6cdb;
            border-color: #4b6cdb;
        }
    }
}
</style>
