<!-- 手机快捷注册 -->
<template>
    <div class="w-full h-full flex flex-col">
        <div class="rounded-xl h-11 border-[#f4f4f4] border">
            <div class="flex items-center h-full">
                <AreaCodeCom class="mx-10px" @submit="submit" />
                <van-field
                    class="rounded-lg font-OPPO !pl-0 !py-0 text-15px text-mainText"
                    clearable
                    type="number"
                    :border="false"
                    :maxlength="11"
                    autocomplete="off"
                    :formatter="formatterNum"
                    clear-trigger="always"
                    v-model="params.mobile"
                    placeholder="请输入手机号码"
                    @keyup.enter="params.mobile && sendSmsCode()"
                >
                    <!--  <template #left-icon>
                        <div class="flex h-[27px] items-center">
                            <div
                                class="w-5 h-5"
                                v-html="params.mobile ? ic_mobile_a : ic_mobile"
                            />
                        </div>
                    </template> -->
                </van-field>
            </div>
        </div>
        <div class="rounded-xl h-11 border-[#f4f4f4] border mt-3 flex items-center pr-[14px]">
            <van-field
                class="rounded-lg font-OPPO !py-0 text-15px text-mainText"
                clearable
                type="number"
                :border="false"
                :maxlength="6"
                autocomplete="off"
                clear-trigger="always"
                v-model="params.smsCode"
                :formatter="formatterNum"
                placeholder="请输入验证码"
                @keyup.enter="!disabled && mobileCreate()"
            >
                <template #left-icon>
                    <div class="flex h-[27px] items-center">
                        <img class="w-5 h-5" :src="params.smsCode ? ic_code_a : ic_code" alt="" />
                    </div>
                </template>
            </van-field>
            <SendSmsBtn
                ref="vanButtonRef"
                :login="true"
                :loading="smsLoading"
                :disabled="!params.mobile"
                @submit="sendSmsCode"
                class="h-[30px] text-13px px-3 border-0 bg-[#f4f4f4] whitespace-nowrap text-xs rounded-lg text-txt"
            />
        </div>
        <div
            v-show="false"
            class="rounded-xl h-11 border-[#f4f4f4] border mt-3 flex items-center justify-between"
        >
            <van-field
                class="rounded-lg font-OPPO !py-0 text-15px text-mainText"
                clearable
                :border="false"
                type="number"
                :maxlength="7"
                autocomplete="off"
                :disabled="loading"
                :formatter="formatterNum"
                clear-trigger="always"
                v-model="params.promoCode"
                placeholder="请输入邀请码(非必填)"
                @keyup.enter="!disabled && mobileCreate()"
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
            class="tlw_btn_linear border-0 rounded-xl text-15px h-11 w-full font-PFSCS mt-5"
            :loading="loading"
            :disabled="disabled || loading"
            @click="mobileCreate"
        >
            立即注册
        </VanButton>
        <VanButton
            class="border-0 h-6 mb-6 text-sm translate-x-2 font-medium text-mainText mx-auto block mt-3"
            icon="arrow"
            :disabled="loading"
            icon-position="right"
            to="/login"
        >
            已有账号，<span class="text-txt_t">去登录</span>
        </VanButton>
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import { useStore } from "@/stores";
import { showSuccessToast, showFailToast } from "vant";
import { computed, ref } from "vue";
import { formatterNum } from "@/utils/validate";
import type { Captcha, CaptchaRef, Iregister, ISendSmsBtn } from "@/components/types";
import { useAsync } from "@/stores/useAsync";
import Local from "@/utils/Local";
import { useRouter } from "vue-router";
import ic_code from "@/assets/icon/ic_code.png";
import ic_code_a from "@/assets/icon/ic_code_a.png";
import ic_promoCode from "@/assets/svg/ic_promoCode.svg?raw";
import ic_promoCode_a from "@/assets/svg/ic_promoCode_a.svg?raw";
import CaptchaCom from "@/components/CaptchaCom.vue";
import AreaCodeCom from "@/components/AreaCodeCom.vue";
import { ImobileCreateOrLogin } from "@/api/user/interface";
import { AreaCode } from "@/api/home/types";
import { get } from "idb-keyval";
import { product } from "platform";
import SendSmsBtn from "@/components/SendSmsBtn.vue";

const { setUser, setToken } = useStore();
const { queryUserWallet } = useAsync();
const smsLoading = ref<boolean>(false);
const vanButtonRef = ref<ISendSmsBtn>();
const loading = ref<boolean>(false);
const captcha = ref<Captcha>();
const isSendCode = ref<boolean>();
const captchaRef = ref<CaptchaRef>();
const router = useRouter();

const params = ref<ImobileCreateOrLogin>({
    mobile: "",
    smsCode: "", //手机验证码
    promoCode: "", //推广码
    areaCode: "",
});

const props = defineProps<{ setLoading: (v: boolean) => void }>();

const disabled = computed(() => !params.value.mobile || !params.value.smsCode);

const sendSmsCode = async () => {
    const { mobile } = params.value;
    if (!params.value.mobile) return showFailToast("手机号码不能为空");
    // if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    smsLoading.value = true;
    const data: Iregister = (await get("register")) as Iregister;
    const res = await API.sendSmsCode({
        mobile,
        ...captcha.value,
        areaCode: params.value.areaCode,
        captchaType: "register",
        ...data,
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

const mobileCreate = async () => {
    if (!params.value.mobile) return showFailToast("手机号码不能为空");
    if (!params.value.smsCode) return showFailToast("短信验证码不能为空");
    if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    if (!isSendCode.value) return showFailToast("请先获取验证码");
    loading.value = true;
    props.setLoading(true);
    const res = await API.mobileCreate({ ...params.value, ...captcha.value, model: product });
    props.setLoading(false);
    loading.value = false;
    switch (res.code) {
        case 0:
            setUser(res.data);
            setToken(res.data?.apiToken!);
            Local.set("token", res.data?.apiToken);
            // router.push(isBack.value ? isBack.value : "/");
            router.push("/match");
            queryUserWallet();
            showSuccessToast("恭喜您，注册成功！");
            break;
        default:
            captchaReset();
            break;
    }
};

const success = (data: Captcha) => {
    if (data.sessionId) captcha.value = data;
};

const submit = (item: AreaCode) => {
    params.value.areaCode = item?.code;
};
</script>

<style lang="scss" scoped>
.van-cell {
    background: transparent;
}
</style>
