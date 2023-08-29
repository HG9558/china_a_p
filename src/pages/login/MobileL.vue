<!-- 手机快捷登录 -->
<template>
    <div class="w-full">
        <div class="rounded-xl h-11 border-[#f4f4f4] border">
            <div class="flex items-center h-full">
                <AreaCodeCom class="mx-10px" @submit="submit" />
                <van-field
                    class="text-15px !pl-0 !py-0 text-mainText"
                    clearable
                    type="number"
                    :border="false"
                    :maxlength="11"
                    autocomplete="off"
                    v-model="mobile"
                    clear-trigger="always"
                    placeholder="请输入手机号码"
                    :formatter="formatterNum"
                    @keyup.enter="!mobile && sendSmsCode()"
                >
                    <!-- <template #left-icon>
                        <div class="flex h-[27px] items-center">
                            <div class="w-5 h-5" v-html="mobile ? ic_mobile_a : ic_mobile"  />
                        </div>
                    </template> -->
                </van-field>
            </div>
        </div>
        <div class="rounded-xl h-11 border-[#f4f4f4] border mt-3 flex items-center pr-[14px]">
            <van-field
                class="text-15px text-mainText"
                clearable
                :border="false"
                :maxlength="6"
                type="number"
                autocomplete="off"
                v-model="smsCode"
                clear-trigger="always"
                placeholder="请输入验证码"
                :formatter="formatterNum"
                @keyup.enter="!disabled && mobileLogin()"
            >
                <template #left-icon>
                    <div class="flex h-[27px] items-center">
                        <img class="w-5 h-5" :src="smsCode ? ic_code_a : ic_code" alt="" />
                    </div>
                </template>
            </van-field>
            <SendSmsBtn
                ref="vanButtonRef"
                :login="true"
                :loading="smsLoading"
                :disabled="!mobile"
                @submit="sendSmsCode"
                class="h-[30px] text-13px px-3 border-0 bg-[#f4f4f4] whitespace-nowrap text-xs rounded-lg text-txt"
            />
        </div>
        <div class="px-1 mt-3">
            <CaptchaCom @success="success" ref="captchaRef" />
        </div>
        <VanButton
            type="primary"
            :loading="loading"
            :disabled="disabled || loading"
            class="h-11 text-15px border-0 rounded-xl w-full font-PFSCS mt-5 tlw_btn_linear"
            @click="mobileLogin"
        >
            立即登录
        </VanButton>
        <VanButton
            class="border-0 h-6 mb-6 text-sm translate-x-2 font-medium text-mainText mx-auto block mt-3"
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
import { API } from "@/api";
import { useStore } from "@/stores";
import { showSuccessToast, showFailToast } from "vant";
import { computed, onMounted, ref } from "vue";
import { formatterNum } from "@/utils/validate";
import Local from "@/utils/Local";
import { useRouter } from "vue-router";
import { useAsync } from "@/stores/useAsync";
import type { Captcha, CaptchaRef, ISendSmsBtn } from "@/components/types";
import ic_code from "@/assets/icon/ic_code.png";
import ic_code_a from "@/assets/icon/ic_code_a.png";
import CaptchaCom from "@/components/CaptchaCom.vue";
import { AreaCode } from "@/api/home/types";
import AreaCodeCom from "@/components/AreaCodeCom.vue";
import { storeToRefs } from "pinia";
import { product } from "platform";
import SendSmsBtn from "@/components/SendSmsBtn.vue";

const mobile = ref<string>("");
const smsCode = ref<string>("");
const areaCode = ref<string>("");
const vanButtonRef = ref<ISendSmsBtn>();
const router = useRouter();
const smsLoading = ref<boolean>(false);
const loading = ref<boolean>(false);
const { sportsSetInquiry, queryUserWallet } = useAsync();
const { setToken, setUser, setLoginInfo } = useStore();
const captcha = ref<Captcha>();
const isSendCode = ref<boolean>();
const captchaRef = ref<CaptchaRef>();
const { loginInfo } = storeToRefs(useStore());
const showCaptcha = ref<boolean>(false);

const props = defineProps<{ setLoading: (v: boolean) => void }>();

const disabled = computed(() => !mobile.value || !smsCode.value);

const sendSmsCode = async () => {
    if (!mobile.value) return showFailToast("手机号码不能为空");
    // if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    smsLoading.value = true;
    const res = await API.sendSmsCode({
        mobile: mobile.value,
        areaCode: areaCode.value,
        ...captcha.value,
        captchaType: "login",
    });
    smsLoading.value = false;
    switch (res.code) {
        case 0:
            isSendCode.value = true;
            showSuccessToast("发送成功");
            vanButtonRef.value?.timeStart();
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

const mobileLogin = async () => {
    if (!mobile.value) return showFailToast("手机号码不能为空");
    if (!smsCode.value) return showFailToast("短信验证码不能为空");
    if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    if (!isSendCode.value) return showFailToast("请先获取验证码");
    loading.value = true;
    props.setLoading(true);
    const res = await API.mobileLogin({
        mobile: mobile.value,
        smsCode: smsCode.value,
        areaCode: areaCode.value,
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
            const login = { mobile: mobile.value };
            setLoginInfo({ ...loginInfo.value, ...login });
            // router.push(isBack.value ? isBack.value : "/");
            router.push("/match");
            queryUserWallet();
            break;
        default:
            captchaReset();
            break;
    }
};

const submit = (item: AreaCode) => {
    areaCode.value = item?.code!;
};

const success = (data: Captcha) => {
    if (data.sessionId) captcha.value = data;
};

onMounted(() => {
    if (loginInfo.value) {
        mobile.value = loginInfo.value.mobile!;
    }
});
</script>

<style lang="scss" scoped>
.van-cell {
    background: transparent;
}
</style>
