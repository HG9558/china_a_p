<!-- 找回安全密码 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '找回安全密码' }" />
        <div class="rounded-t-20px flex-1 bg-mainBg overflow-hidden z-0">
            <div class="bg-white rounded-20px px-10px pb-10px">
                <p class="text-15px pl-10px font-medium pt-[14px] pb-2">新的安全密码</p>
                <div class="flex items-center h-11 rounded-xl bg-mainBg px-10px">
                    <van-field
                        v-model="params.password"
                        class="!bg-mainBg font-OPPO !pl-0 flex-1"
                        :type="newType"
                        :disabled="loading"
                        autocomplete="off"
                        placeholder="请输入新的安全密码"
                    />
                    <img
                        class="w-5 h-5"
                        :src="newType === 'text' ? icon_browse : icon_biyan"
                        @click="newType = newType === 'password' ? 'text' : 'password'"
                        alt=""
                    />
                </div>
                <p class="text-15px pl-10px font-medium pt-[14px] pb-2">确认新的安全密码</p>
                <div class="flex items-center h-11 rounded-xl bg-mainBg px-10px">
                    <van-field
                        :type="type"
                        autocomplete="off"
                        :disabled="loading"
                        class="!bg-mainBg font-OPPO !pl-0 flex-1"
                        v-model="confirmPassword"
                        placeholder="请再次输入6位数字安全密码"
                    />
                    <img
                        class="w-5 h-5"
                        :src="type === 'text' ? icon_browse : icon_biyan"
                        @click="type = type === 'password' ? 'text' : 'password'"
                        alt=""
                    />
                </div>
                <p class="text-15px pl-10px font-medium pt-[14px] pb-2">手机号码</p>
                <div class="flex items-center h-11 rounded-xl bg-mainBg px-10px">
                    <van-field
                        class="!bg-mainBg font-OPPO !pl-0 flex-1"
                        v-model="params.mobile"
                        autocomplete="off"
                        :disabled="codeLoading"
                        @keyup.enter="sendSmsCode"
                        placeholder="请输入您的手机号码"
                    />
                </div>
                <p class="text-15px pl-10px font-medium pt-[14px] pb-2">验证码</p>
                <div class="flex items-center h-11 rounded-xl bg-mainBg px-10px">
                    <van-field
                        class="!bg-mainBg font-OPPO !pl-0 flex-1"
                        autocomplete="off"
                        v-model="params.smsCode"
                        :disabled="codeLoading"
                        placeholder="请输入验证码"
                        @keyup.enter="resetSecurePasswordByMobile"
                    />
                    <SendSmsBtn
                        ref="vanButtonRef"
                        :loading="codeLoading"
                        :disabled="!params.mobile"
                        @submit="sendSmsCode"
                        class="px-10px h-[30px] font-OPPO min-w-[80px] flex-shrink-0 whitespace-nowrap border-0 text-sm bg-white rounded-10px"
                    />
                </div>
            </div>
            <div class="px-4 mt-10 mb-4">
                <VanButton class="tlw_btn_linear rounded-xl w-full text-white border-0">
                    找回安全密码
                </VanButton>
            </div>
            <div class="text-13px text-[#666] text-center flex items-center justify-center">
                如遇到任何问题，请联系
                <p class="flex items-center" @click="toService">
                    <span class="text-txt cursor-pointer"> 在线客服 </span>
                    <i class="icon-erji text-lg text-txt ml-10px"></i>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { IresetSecurePasswordByMobile } from "@/api/user/interface";
import { showFailToast, showSuccessToast } from "vant";
import { ref } from "vue";
import { toService } from "@/utils";
import { encrypt } from "@/utils/cryptoJS";
import { useRouter } from "vue-router";
import type { Captcha, CaptchaRef, ISendSmsBtn } from "@/components/types";
import NavBar from "@/components/NavBar.vue";
import icon_browse from "@/assets/icon/icon_browse.png";
import icon_biyan from "@/assets/icon/icon_biyan.png";

const newType = ref<"password" | "text">("password");
const type = ref<"password" | "text">("password");

const vanButtonRef = ref<ISendSmsBtn>();
const captcha = ref<Captcha>();
const captchaRef = ref<CaptchaRef>();
const loading = ref<boolean>();
const codeLoading = ref<boolean>();
const router = useRouter();

const params = ref<IresetSecurePasswordByMobile>({
    mobile: "",
    smsCode: "",
    password: "",
    areaCode: "",
});
const confirmPassword = ref<string>("");

const resetSecurePasswordByMobile = async () => {
    if (!params.value.mobile) return showFailToast("手机号码不能为空");
    if (!params.value.smsCode) return showFailToast("验证码不能为空");
    if (params.value.password !== confirmPassword.value) return showFailToast("两次密码不一致");
    loading.value = true;
    const res = await API.resetSecurePasswordByMobile({
        ...params.value,
        password: encrypt(params.value.password),
        captchaType: "security",
    });
    loading.value = false;
    if (res.code === 0) {
        showSuccessToast(res.msg);
        router.go(-1);
    }
};

const captchaReset = () => {
    // 重置滑块和定时器
    captchaRef.value?.reset?.();
    captcha.value = undefined;
};

const sendSmsCode = async () => {
    if (!params.value.mobile) return showFailToast("手机号码不能为空");
    codeLoading.value = true;
    const res = await API.sendSmsCode({
        mobile: params.value.mobile,
        ...captcha.value,
        captchaType: "security",
    });
    codeLoading.value = false;
    switch (res.code) {
        case 0:
            showSuccessToast("发送成功");
            vanButtonRef.value?.timeStart();
            break;
        default:
            captchaReset();
            break;
    }
};
</script>
