<!-- 忘记密码第一步 -->
<template>
    <div class="w-full h-full flex flex-col">
        <div class="flex-1 flex flex-col">
            <div class="flex items-center justify-center flex-shrink-0 mt-4 mb-10px">
                <div class="w-14 flex flex-col items-center">
                    <div
                        class="w-[26px] h-[26px] flex items-center justify-center bg-txt/20 rounded-full transition-all"
                        :class="{ 'scale-75 !bg-txt_i': active != 0 }"
                    >
                        <span class="text-white font-bold text-lg" v-show="active != 0"> 1 </span>
                        <i class="w-3 h-3 rounded-full bg-txt" v-show="active == 0"></i>
                    </div>
                    <p
                        class="text-13px mt-1 font-medium text-txt_i"
                        :class="{ '!text-mainText': active == 0 }"
                    >
                        身份验证
                    </p>
                </div>
                <div class="w-14 mx-3 flex flex-col items-center">
                    <div class="h-[26px] flex">
                        <i class="w-14 h-1 rounded-xl bg-[#DFDFDF]"></i>
                    </div>
                    <p class="mt-1"></p>
                </div>
                <div class="w-14 flex flex-col items-center">
                    <div
                        class="w-[26px] h-[26px] flex items-center justify-center bg-txt/20 rounded-full transition-all"
                        :class="{ 'scale-75 !bg-txt_i': active != 1 }"
                    >
                        <span class="text-white font-bold text-lg" v-show="active != 1"> 2 </span>
                        <i class="w-3 h-3 rounded-full bg-txt" v-show="active == 1"></i>
                    </div>
                    <p
                        class="text-13px mt-1 font-medium text-txt_i"
                        :class="{ '!text-mainText': active == 1 }"
                    >
                        重置密码
                    </p>
                </div>
            </div>
            <div class="px-10px relative">
                <div
                    class="relative px-10px rounded-20px border border-solid border-white z-1 bg-gradient-to-b from-[#F0F3FF] from-0% via-[#F9F9FA] via-16% to-[#FCFCFC] to-100% shadow-[0px_4px_4px_0px_rgba(172,177,200,0.1)]"
                >
                    <van-swipe
                        ref="swipeRef"
                        v-model="active"
                        @change="change"
                        :touchable="false"
                        :show-indicators="false"
                        :initial-swipe="active"
                    >
                        <van-swipe-item>
                            <div class="pb-10 pt-5">
                                <div
                                    class="rounded-xl h-11 shadow-[0px_3px_6px_0px_rgba(172,177,200,0.16)] bg-white border border-[#ACB1C816] flex items-center"
                                >
                                    <van-field
                                        class="text-15px text-mainText"
                                        clearable
                                        :border="false"
                                        :maxlength="14"
                                        autocomplete="off"
                                        clear-trigger="always"
                                        placeholder="请输入账号"
                                        v-model="mobileParam.mobile"
                                        :disabled="codeLoading || loading"
                                        @keyup.enter="mobileParam.mobile && sendSmsCode()"
                                    >
                                        <template #left-icon>
                                            <div class="flex h-[27px] items-center">
                                                <img
                                                    class="w-5 h-5 object-contain"
                                                    :src="mobileParam.mobile ? ic_user_a : ic_user"
                                                    alt=""
                                                />
                                            </div>
                                        </template>
                                    </van-field>
                                </div>
                                <div
                                    class="rounded-xl shadow-[0px_3px_6px_0px_rgba(172,177,200,0.16)] bg-white mb-[14px] border border-[#ACB1C816] mt-3 flex items-center pr-[14px]"
                                >
                                    <van-field
                                        class="text-15px font-OPPO text-mainText"
                                        clearable
                                        type="number"
                                        :border="false"
                                        :maxlength="6"
                                        autocomplete="off"
                                        :disabled="loading"
                                        clear-trigger="always"
                                        placeholder="请输入验证码"
                                        :formatter="formatterNum"
                                        v-model="mobileParam.smsCode"
                                        @keyup.enter="forgetPasswordByMobile()"
                                    >
                                        <template #left-icon>
                                            <div class="flex h-[27px] items-center">
                                                <img
                                                    class="w-5 h-5"
                                                    :src="mobileParam.smsCode ? ic_code_a : ic_code"
                                                    alt=""
                                                />
                                            </div>
                                        </template>
                                    </van-field>
                                    <SendSmsBtn
                                        ref="vanButtonRef"
                                        :login="true"
                                        :loading="codeLoading"
                                        :disabled="!mobileParam.mobile"
                                        @submit="sendSmsCode"
                                        class="h-[30px] text-13px px-3 border-0 bg-[#f4f4f4] whitespace-nowrap text-xs rounded-full text-txt"
                                    />
                                </div>
                                <!-- <div class="px-1 mt-3" v-if="active == 0">
                                    <CaptchaCom @success="success" ref="captchaRef" />
                                </div> -->
                                <p
                                    class="text-xs text-center text-txt_d font-medium"
                                    v-show="!codeLoading && resultData"
                                >
                                    {{ resultData }}
                                </p>
                                <VanButton
                                    type="primary"
                                    @click="next"
                                    :disabled="mobileDisabled"
                                    class="h-11 rounded-xl border-0 tlw_btn_linear w-full block mt-[11px]"
                                >
                                    下一步
                                </VanButton>
                            </div>
                        </van-swipe-item>
                        <van-swipe-item>
                            <div
                                class="rounded-xl mt-5 shadow-[0px_3px_6px_0px_rgba(172,177,200,0.16)] bg-white border border-[#ACB1C816] flex items-center justify-between"
                            >
                                <van-field
                                    class="rounded-lg text-15px text-mainText"
                                    clearable
                                    :type="type"
                                    :border="false"
                                    :maxlength="20"
                                    autocomplete="off"
                                    :disabled="loading"
                                    clear-trigger="always"
                                    :formatter="formatterPwd"
                                    placeholder="新密码（8-20位数字字母）"
                                    v-model="mobileParam.password"
                                >
                                    <template #left-icon>
                                        <div class="flex h-[27px] items-center">
                                            <img
                                                class="w-5 h-5"
                                                :src="
                                                    mobileParam.password
                                                        ? ic_password_a
                                                        : ic_password
                                                "
                                                alt=""
                                            />
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
                                class="rounded-xl shadow-[0px_3px_6px_0px_rgba(172,177,200,0.16)] bg-white border border-[#ACB1C816] mt-3 flex items-center justify-between"
                            >
                                <van-field
                                    class="rounded-lg text-15px text-mainText"
                                    clearable
                                    :border="false"
                                    :maxlength="20"
                                    :type="confirmType"
                                    autocomplete="off"
                                    :disabled="loading"
                                    clear-trigger="always"
                                    :formatter="formatterPwd"
                                    v-model="confirmPassword"
                                    placeholder="请再次输入密码"
                                    @keyup.enter="!pwdDisabled && forgetPasswordByMobile()"
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
                                        @click="
                                            confirmType =
                                                confirmType === 'password' ? 'text' : 'password'
                                        "
                                        alt=""
                                    />
                                </div>
                            </div>
                            <VanButton
                                type="primary"
                                :loading="loading"
                                :disabled="pwdDisabled"
                                @click="forgetPasswordByMobile()"
                                class="h-11 rounded-xl border-0 tlw_btn_linear w-full block mt-6"
                            >
                                提交
                            </VanButton>
                        </van-swipe-item>
                    </van-swipe>
                </div>
                <p class="mt-7 text-center text-txt_d font-medium text-15px">
                    如需帮助，请<span class="text-txt" @click="toService">联系客服</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { IforgetPasswordByMobile } from "@/api/user/interface";
import { computed, ref, nextTick, onBeforeUnmount } from "vue";
import { toService } from "@/utils";
import type { SwipeInstance } from "vant/es/swipe/types";
import type { Captcha, CaptchaRef, ISendSmsBtn } from "../types";
import { formatterNum, formatterPwd } from "@/utils/validate";
import { showFailToast, showSuccessToast } from "vant";
import ic_user from "@/assets/icon/ic_user.png";
import ic_user_a from "@/assets/icon/ic_user_a.png";
import ic_code from "@/assets/icon/ic_code.png";
import ic_code_a from "@/assets/icon/ic_code_a.png";
import ic_password from "@/assets/icon/ic_password.png";
import ic_password_a from "@/assets/icon/ic_password_a.png";
import icon_browse from "@/assets/icon/icon_browse.png";
import icon_biyan from "@/assets/icon/icon_biyan.png";
import { encrypt } from "@/utils/cryptoJS";
import CaptchaCom from "../CaptchaCom.vue";
import AreaCodeCom from "../AreaCodeCom.vue";
import { AreaCode } from "@/api/home/types";
import { storeToRefs } from "pinia";
import { useStore } from "@/stores/index";
import { useRouter } from "vue-router";
import SendSmsBtn from "../SendSmsBtn.vue";

const vanButtonRef = ref<ISendSmsBtn>();
const active = ref<number>(0);
const confirmPassword = ref<string>("");
const type = ref<"password" | "text">("password");
const confirmType = ref<"password" | "text">("password");

const router = useRouter();
const swipeRef = ref<SwipeInstance>();
const loading = ref<boolean>(false);
const captcha = ref<Captcha>();
const isSendCode = ref<boolean>();
const codeLoading = ref<boolean>(false);
const captchaRef = ref<CaptchaRef>();
const { user } = storeToRefs(useStore());
const resultData = ref<string>("");

const props = defineProps<{ nextStep: () => void }>();

const mobileParam = ref<IforgetPasswordByMobile>({
    mobile: "",
    password: "",
    smsCode: "",
    areaCode: "",
});

const mobileDisabled = computed(() => !mobileParam.value.mobile || !mobileParam.value.smsCode);

const pwdDisabled = computed(() => !mobileParam.value.password! || !confirmPassword.value);

const sendSmsCode = async () => {
    const { mobile } = mobileParam.value;
    if (!mobile) return showFailToast("手机号码不能为空");
    // if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    codeLoading.value = true;
    const res = await API.sendSmsCode({
        mobile: mobileParam.value.mobile,
        captchaType: "from_username_send_code",
        areaCode: user.value?.areaCode || mobileParam.value.areaCode,
        ...captcha.value,
    });
    codeLoading.value = false;
    switch (res.code) {
        case 0:
            isSendCode.value = true;
            resultData.value = res.data;
            showSuccessToast("发送成功");
            vanButtonRef.value?.timeStart();
            break;
        default:
            captchaReset();
            break;
    }
};

const next = () => {
    const { mobile, smsCode } = mobileParam.value;
    if (!mobile) return showFailToast("手机号码不能为空");
    if (!smsCode) return showFailToast("短信验证码不能为空");
    // if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    if (!isSendCode.value) return showFailToast("请先获取短信验证码");
    swipeRef.value?.next?.();
};

const forgetPasswordByMobile = async () => {
    const { password } = mobileParam.value;
    if (!password) return showFailToast("密码不能为空");
    if (password != confirmPassword.value) return showFailToast("两次密码不一致");
    loading.value = true;
    const res = await API.forgetPasswordByMobile({
        ...mobileParam.value,
        password: encrypt(mobileParam.value.password!),
        captchaType: "update_password",
    });
    loading.value = false;
    switch (res.code) {
        case 0:
            props.nextStep();
            break;
        default:
            swipeRef.value?.prev();
            isSendCode.value = false;
            mobileParam.value.smsCode = "";
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

const submit = (item: AreaCode) => {
    mobileParam.value.areaCode = item?.code;
};

const change = (index: number) => {
    nextTick(() => {
        active.value = index;
    });
};
</script>

<style lang="scss" scoped>
.van-cell {
    background: transparent;
}
</style>
