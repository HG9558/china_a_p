<!-- 修改/设置 安全密码 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg">
        <NavBar
            transparent
            :nav-bar-props="{ title: user?.passwordCoin ? '修改安全密码' : '设置安全密码' }"
        />
        <div class="rounded-t-20px flex-1 bg-mainBg overflow-hidden z-0">
            <div class="bg-white rounded-20px px-10px overflow-hidden">
                <van-cell-group :border="false" class="mt-1">
                    <van-cell
                        :title="'设置安全密码'"
                        class="setTitle !px-0 !py-2"
                        style="--van-cell-font-size: 0.9375rem"
                    >
                        <template #value>
                            <div class="flex flex-1 items-center rounded-xl">
                                <van-field
                                    :maxlength="6"
                                    :type="type"
                                    :disabled="loading"
                                    :border="false"
                                    :formatter="formatterNum"
                                    autocomplete="off"
                                    class="!p-0 font-OPPO flex-1 text-sm"
                                    v-model="params.securePassword"
                                    placeholder="请输入6位数字组合"
                                />
                                <img
                                    class="w-5 h-5"
                                    :src="type === 'number' ? icon_browse : icon_biyan"
                                    @click="type = type === 'password' ? 'number' : 'password'"
                                    alt=""
                                />
                            </div>
                        </template>
                    </van-cell>
                    <van-cell
                        title="确认安全密码"
                        class="setTitle !px-0 !py-2"
                        style="--van-cell-font-size: 0.9375rem"
                    >
                        <template #value>
                            <div class="flex flex-1 items-center rounded-xl">
                                <van-field
                                    :maxlength="6"
                                    :type="confirmType"
                                    :disabled="loading"
                                    :border="false"
                                    autocomplete="off"
                                    :formatter="formatterNum"
                                    class="!p-0 flex-1 font-OPPO text-sm"
                                    v-model="confirmPassword"
                                    placeholder="请再次输入安全密码"
                                />
                                <img
                                    class="w-5 h-5"
                                    :src="confirmType === 'number' ? icon_browse : icon_biyan"
                                    @click="
                                        confirmType =
                                            confirmType === 'password' ? 'number' : 'password'
                                    "
                                    alt=""
                                />
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
            <p class="text-15px pl-10px font-medium mt-[22px] mb-10px">验证手机号码</p>
            <div class="bg-white rounded-20px overflow-hidden">
                <van-cell-group :border="false" style="--van-cell-line-height: 2rem">
                    <van-cell
                        class="setTitle20"
                        v-if="!user?.mobile"
                        style="--van-cell-font-size: 0.9375rem"
                    >
                        <template #value>
                            <div class="flex items-center">
                                <AreaCodeCom class="mr-6" @submit="submit" />
                                <VanField
                                    class="!p-0 !py-0"
                                    type="number"
                                    :maxlength="11"
                                    autocomplete="off"
                                    :disabled="loading || !!user?.mobile"
                                    v-model="params.mobile"
                                    :formatter="formatterNum"
                                    placeholder="请输入手机号码"
                                />
                            </div>
                        </template>
                    </van-cell>
                    <van-cell
                        v-else
                        title="手机号码"
                        class="setTitle20"
                        style="--van-cell-font-size: 0.9375rem"
                    >
                        <template #value>
                            <div class="flex items-center">
                                <span class="mr-1 text-mainText">
                                    {{ user?.areaCode && `+${user.areaCode}` }}
                                </span>
                                <VanField
                                    readonly
                                    class="!p-0 !py-0"
                                    type="number"
                                    :maxlength="11"
                                    autocomplete="off"
                                    :disabled="loading || !!user?.mobile"
                                    :formatter="formatterNum"
                                    :placeholder="
                                        user?.mobile
                                            ? desensitize(user?.mobile, 3, 4, 4)
                                            : '请输入手机号码'
                                    "
                                    style="--van-field-input-disabled-text-color: #303033"
                                />
                            </div>
                        </template>
                    </van-cell>
                    <van-cell
                        :border="false"
                        title="验证码"
                        class="!pr-10px setTitle20"
                        style="--van-field-label-width: 2.5rem; --van-cell-font-size: 0.9375rem"
                    >
                        <template #value>
                            <div class="flex items-center w-full">
                                <VanField
                                    :border="false"
                                    :maxlength="6"
                                    type="number"
                                    autocomplete="off"
                                    :disabled="loading"
                                    v-model="params.smsCode"
                                    :formatter="formatterNum"
                                    class="!p-0 flex-1"
                                    placeholder="请输入验证码"
                                    @keyup.enter="
                                        !disabled && user?.passwordCoin
                                            ? resetSecurePasswordByMobile()
                                            : addPasswordSecure()
                                    "
                                />
                                <SendSmsBtn
                                    ref="vanButtonRef"
                                    :loading="smsLoading"
                                    :disabled="!params.mobile"
                                    @submit="sendSmsCode"
                                    class="h-[30px] flex-shrink-0 min-w-[80px] px-10px ml-10px rounded-lg whitespace-nowrap border-0 tlw_btn_linear text-sm text-white"
                                />
                            </div>
                        </template>
                    </van-cell>
                </van-cell-group>
                <!-- <div class="px-10px mt-10px">
                    <CaptchaCom @success="success" ref="captchaRef" />
                </div> -->
            </div>
            <div class="px-4 mt-[30px] mb-10">
                <VanButton
                    :loading="loading"
                    :disabled="disabled || loading"
                    class="tlw_btn_linear w-full rounded-xl text-white border-0"
                    @click="
                        user?.passwordCoin ? resetSecurePasswordByMobile() : addPasswordSecure()
                    "
                >
                    {{ "确定" }}
                </VanButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { IaddPasswordSecure, IupdatePasswordSecure } from "@/api/user/interface";
import type { Captcha, CaptchaRef, ISendSmsBtn } from "@/components/types";
import { useStore } from "@/stores";
import { useAsync } from "@/stores/useAsync";
import { desensitize } from "@/utils";
import { encrypt } from "@/utils/cryptoJS";
import { formatterNum } from "@/utils/validate";
import { storeToRefs } from "pinia";
import { showSuccessToast, showFailToast } from "vant";
import { computed, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import CaptchaCom from "@/components/CaptchaCom.vue";
import AreaCodeCom from "@/components/AreaCodeCom.vue";
import { AreaCode } from "@/api/home/types";
import SendSmsBtn from "@/components/SendSmsBtn.vue";
import icon_browse from "@/assets/icon/icon_browse.png";
import icon_biyan from "@/assets/icon/icon_biyan.png";

const { userProfile } = useAsync();
const { user } = storeToRefs(useStore());
const confirmPassword = ref<string>("");
const vanButtonRef = ref<ISendSmsBtn>(); //发送验证码ref
const captcha = ref<Captcha>(); //滑块
const captchaRef = ref<CaptchaRef>(); //滑块ref
const isSendCode = ref<boolean>(); //是否发送短信成功
const smsLoading = ref<boolean>(false); //发送短信loading
const loading = ref<boolean>(false); //提交loading
const router = useRouter();
const type = ref<"password" | "number">("password");
const confirmType = ref<"password" | "number">("password");

const params = ref<IaddPasswordSecure>({
    mobile: "",
    securePassword: "",
    smsCode: "",
    areaCode: "",
});

if (user.value?.mobile) params.value.mobile = user.value.mobile;
if (user.value?.areaCode) params.value.areaCode = user.value.areaCode;

const disabled = computed(() => {
    if (!params.value.mobile) return true;
    if (!params.value.securePassword) return true;
    if (!params.value.smsCode) return true;
});

const sendSmsCode = async () => {
    // 获取验证码
    if (!params.value.mobile) return showFailToast("手机号不能为空");
    // if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    smsLoading.value = true;
    const res = await API.sendSmsCode({
        mobile: params.value.mobile,
        areaCode: params.value.areaCode,
        ...captcha.value,
        captchaType: "security",
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

const success = (data: Captcha) => {
    // 滑块验证通过时会触发
    if (data.sessionId) captcha.value = data;
};

const captchaReset = () => {
    // 重置滑块和定时器
    captchaRef.value?.reset?.();
    captcha.value = undefined;
};

const addPasswordSecure = async () => {
    // 设置安全密码
    const { mobile, smsCode, securePassword } = params.value;
    if (!securePassword) return showFailToast("请输入安全密码");
    if (securePassword != confirmPassword.value) return showFailToast("两次密码不一致");
    if (!mobile) return showFailToast("手机号码不能为空");
    // if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    if (!smsCode) return showFailToast("请输入验证码");
    if (!isSendCode.value) return showFailToast("请先获取验证码");
    loading.value = true;
    const res = await API.addPasswordSecure({
        ...params.value,
        securePassword: encrypt(params.value.securePassword),
    });
    loading.value = false;
    if (res.code === 0) {
        showSuccessToast(res.msg);
        userProfile();
        router.go(-1);
    }
};

const resetSecurePasswordByMobile = async () => {
    // 修改安全密码
    if (!params.value.securePassword) return showFailToast("请输入安全密码");
    if (params.value.securePassword! !== confirmPassword.value)
        return showFailToast("两次密码不一致");
    loading.value = true;
    const res = await API.resetSecurePasswordByMobile({
        ...params.value,
        password: encrypt(params.value.securePassword),
        securePassword: undefined,
        captchaType: "security",
    });
    loading.value = false;
    if (res.code === 0) {
        showSuccessToast(res.msg);
        router.go(-1);
    }
};

const submit = (item: AreaCode) => {
    params.value.areaCode = item?.code;
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
.setTitle20 {
    ::v-deep(.van-cell__title) {
        flex: none;
        width: 80px;
        flex-shrink: 0;
    }
    ::v-deep(.van-cell__value) {
        display: flex;
    }
}
</style>
