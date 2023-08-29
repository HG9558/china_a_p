<!-- 设置手机 -->
<template>
    <VanPopup
        teleport="body"
        position="right"
        v-model:show="showSetMobile"
        style="width: 100%; height: 100%"
        @closed="closed"
    >
        <div class="h-full flex flex-col tlw_top_bg">
            <NavBar
                transparent
                :click-left="clickLeft"
                :nav-bar-props="{ title: user?.mobile ? '修改手机号码' : '绑定手机号码' }"
            />
            <div class="flex-1 items-center rounded-t-20px bg-mainBg">
                <van-swipe
                    ref="swipeRef"
                    v-model="active"
                    @change="change"
                    :touchable="false"
                    :show-indicators="false"
                    :initial-swipe="active"
                >
                    <van-swipe-item>
                        <div class="bg-white rounded-20px px-10px overflow-hidden">
                            <van-cell-group :border="false" style="--van-cell-line-height: 2.25rem">
                                <van-cell
                                    :border="false"
                                    title="验证旧手机"
                                    v-if="user?.mobile"
                                    class="setTitle !px-0 !py-2 border-b border-b-mainBg"
                                >
                                    <template #value>
                                        <div class="flex-1 flex items-center justify-between">
                                            <span class="mr-1 text-mainText">
                                                {{ user.areaCode && `+${user.areaCode}` }}
                                            </span>
                                            <VanField
                                                readonly
                                                class="!p-0"
                                                type="number"
                                                :maxlength="11"
                                                autocomplete="off"
                                                :formatter="formatterNum"
                                                :disabled="loading || verifyLoading"
                                                :placeholder="
                                                    user?.mobile
                                                        ? desensitize(user?.mobile, 3, 4, 4)
                                                        : '请输入手机号码'
                                                "
                                                style="
                                                    --van-field-input-disabled-text-color: #303033;
                                                "
                                            />
                                        </div>
                                    </template>
                                </van-cell>
                                <van-cell
                                    :border="false"
                                    class="setTitle20 !px-0 !py-2 border-b border-b-mainBg"
                                    v-else
                                >
                                    <template #value>
                                        <div class="flex items-center">
                                            <AreaCodeCom
                                                class="mr-6"
                                                v-if="active == 0"
                                                @submit="submitAreaCode"
                                            />
                                            <VanField
                                                class="!p-0 !py-0"
                                                type="number"
                                                :maxlength="11"
                                                autocomplete="off"
                                                :disabled="loading || verifyLoading"
                                                v-model="params.mobile"
                                                :formatter="formatterNum"
                                                placeholder="请输入手机号码"
                                            />
                                        </div>
                                    </template>
                                </van-cell>
                                <van-cell
                                    :border="false"
                                    title="验证码"
                                    class="!p-0 !px-0 !py-2 setTitle"
                                    :class="{ setTitle: user?.mobile, setTitle20: !user?.mobile }"
                                    style="--van-field-label-width: 2.5rem"
                                >
                                    <template #value>
                                        <div
                                            class="flex-1 flex items-center justify-between w-full"
                                        >
                                            <VanField
                                                :border="false"
                                                :maxlength="6"
                                                type="number"
                                                autocomplete="off"
                                                :disabled="loading || verifyLoading"
                                                v-model="params.smsCode"
                                                :formatter="formatterNum"
                                                class="!p-0 flex-1"
                                                placeholder="请输入验证码"
                                            />
                                            <SendSmsBtn
                                                v-if="active == 0 && showSendSmsBtn"
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
                            <!-- <div class="mt-10px" v-if="showBottom && active == 0">
                                <CaptchaCom @success="success" ref="captchaRef" />
                            </div> -->
                        </div>
                        <div class="px-10px mt-[30px]">
                            <VanButton
                                v-if="active == 0"
                                :loading="loading || verifyLoading"
                                :disabled="disabled || loading || verifyLoading"
                                class="h-11 rounded-xl tlw_btn_linear text-sm w-full text-white"
                                @click="user?.mobile ? verifyOldMobile() : submit()"
                            >
                                {{ user?.mobile ? "下一步" : "确定" }}
                            </VanButton>
                        </div>
                    </van-swipe-item>
                    <van-swipe-item>
                        <p class="h-12 text-sm font-medium text-mainText flex items-center pl-10px">
                            设置新手机号
                        </p>
                        <div class="bg-white rounded-20px px-10px overflow-hidden">
                            <van-cell-group :border="false" style="--van-cell-line-height: 2.25rem">
                                <van-cell
                                    :border="false"
                                    class="setTitle20 !px-0 !py-2 border-b border-b-mainBg"
                                >
                                    <template #value>
                                        <div class="flex-1 flex items-center justify-between">
                                            <AreaCodeCom
                                                class="mr-6"
                                                v-if="active == 1"
                                                @submit="submitAreaCode"
                                            />
                                            <VanField
                                                class="!p-0 !py-0"
                                                type="number"
                                                :maxlength="11"
                                                autocomplete="off"
                                                :disabled="loading"
                                                v-model="params.mobile"
                                                :formatter="formatterNum"
                                                placeholder="请输入手机号码"
                                            />
                                        </div>
                                    </template>
                                </van-cell>
                                <van-cell
                                    :border="false"
                                    title="验证码"
                                    class="!p-0 !px-0 !py-2 setTitle20 w-full"
                                    style="--van-field-label-width: 2.5rem"
                                >
                                    <template #value>
                                        <div class="flex-1 flex items-center justify-between">
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
                                                @keyup.enter="!disabled && submit()"
                                            />
                                            <SendSmsBtn
                                                v-if="active == 1 && showSendSmsBtn"
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
                            <!-- <div class="mt-10px" v-if="showBottom && active == 1">
                                <CaptchaCom @success="success" ref="captchaRef" />
                            </div> -->
                        </div>
                        <div class="px-10px mt-[30px]">
                            <VanButton
                                :loading="loading"
                                :disabled="disabled || loading"
                                class="h-11 rounded-xl tlw_btn_linear text-sm w-full text-white"
                                @click="submit"
                            >
                                确定
                            </VanButton>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { IbindMobile } from "@/api/user/interface";
import { showFailToast, showSuccessToast } from "vant";
import { computed, ref, nextTick, onBeforeUnmount, watch } from "vue";
import type { Captcha, CaptchaRef, ISendSmsBtn } from "../types";
import { formatterNum } from "@/utils/validate";
import { storeToRefs } from "pinia";
import { useStore } from "@/stores";
import { useAsync } from "@/stores/useAsync";
import { desensitize } from "@/utils";
import NavBar from "@/components/NavBar.vue";
import AreaCodeCom from "../AreaCodeCom.vue";
import CaptchaCom from "../CaptchaCom.vue";
import { AreaCode } from "@/api/home/types";
import SendSmsBtn from "../SendSmsBtn.vue";

const { user, showSetMobile } = storeToRefs(useStore());
const { setShowSetMobile } = useStore();
const { userProfile } = useAsync();
const vanButtonRef = ref<ISendSmsBtn>();
const active = ref<number>(0);
const captcha = ref<Captcha>();
const captchaRef = ref<CaptchaRef>();
const isSendCode = ref<boolean>();
const smsLoading = ref<boolean>(false);
const loading = ref<boolean>(false);
const smsCodeOld = ref<string>("");
const verifyLoading = ref<boolean>(false);
const showSendSmsBtn = ref<boolean>(true);
const params = ref<IbindMobile>({
    mobile: "",
    sessionId: "",
    sig: "",
    smsCode: "",
    token: "",
    areaCode: "",
});

const disabled = computed(() => {
    if (!params.value.mobile) return true;
    if (!params.value.smsCode) return true;
});

const sendSmsCode = async () => {
    if (!user.value?.mobile && !params.value.mobile) return showFailToast("手机号码不能为空");
    // if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    smsLoading.value = true;
    // 未绑定：绑定手机号获取验证码 binding_phone
    // 已绑定：换绑原手机号获取验证码 rebinding_old_phone
    // 已绑定：换绑新手机号获取验证码 rebinding_new_phone
    const res = await API.sendSmsCode({
        mobile: params.value.mobile,
        areaCode: params.value.areaCode,
        ...captcha.value,
        captchaType: user.value?.mobile
            ? active.value == 0
                ? "rebinding_old_phone"
                : "rebinding_new_phone"
            : "binding_phone",
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
    if (data.sessionId) captcha.value = data;
};

const captchaReset = () => {
    captchaRef.value?.reset?.();
    captcha.value = undefined;
};

const clickLeft = () => {
    close();
};

const verifyOldMobile = async () => {
    verifyLoading.value = true;
    const res = await API.verifyOldMobile({
        ...params.value,
        ...captcha.value,
        mobile: user.value?.mobile!,
        captchaType: "rebinding_old_phone",
    });
    verifyLoading.value = false;
    switch (res.code) {
        case 0:
            smsCodeOld.value = params.value.smsCode;
            params.value.mobile = "";
            params.value.smsCode = "";
            active.value = 1;
            showSuccessToast(res.msg);
            vanButtonRef.value?.clearTime();
            break;
        default:
            captchaReset();
            break;
    }
};

const submit = async () => {
    const { mobile, smsCode } = params.value;
    if (!mobile) return showFailToast("手机号码不能为空");
    if (!smsCode) return showFailToast("短信验证码不能为空");
    // if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    if (!isSendCode.value) return showFailToast("请先获取验证码");
    loading.value = true;
    const res = await (user.value?.mobile
        ? API.resetMobile({
              ...params.value,
              ...captcha.value,
              smsCodeOld: smsCodeOld.value,
              captchaType: "rebinding_new_phone",
          })
        : API.bindMobile({ ...params.value, ...captcha.value, captchaType: "binding_phone" }));
    loading.value = false;
    switch (res.code) {
        case 0:
            close();
            userProfile();
            showSuccessToast(res.msg);
            Object.keys(params.value).forEach(item => {
                if (item !== "mobile") params.value[item] = "";
            });
            captchaReset();
            active.value = 0;
            vanButtonRef.value?.clearTime();
            break;
        default:
            captchaReset();
            break;
    }
};

const submitAreaCode = (item: AreaCode) => {
    params.value.areaCode = item?.code!;
};

const change = (index: number) => {
    nextTick(() => {
        active.value = index;
    });
};

const close = () => {
    setShowSetMobile(false);
};

const closed = () => {
    showSendSmsBtn.value = false;
    params.value.mobile = "";
    params.value.smsCode = "";
};

onBeforeUnmount(() => {});

watch(
    () => showSetMobile.value,
    n => {
        if (n) {
            showSendSmsBtn.value = true;
            if (user.value?.mobile) params.value.mobile = user.value.mobile;
            if (typeof params.value == "object") {
                Object.keys(params.value).forEach(item => {
                    if (!/(areaCode|mobile)/.test(item)) {
                        params.value[item] = "";
                    }
                });
            }
            return;
        }
        vanButtonRef.value?.clearTime();
    }
);
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
