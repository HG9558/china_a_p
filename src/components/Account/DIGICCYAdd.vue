<!-- 账户管理 添加提币地址 -->
<template>
    <VanPopup
        v-model:show="showBottom"
        position="right"
        teleport="body"
        style="width: 100%; height: 100%"
    >
        <div class="h-full flex flex-col tlw_top_bg">
            <NavBar
                transparent
                :click-left="clickLeft"
                :nav-bar-props="{ title: '添加提币地址' }"
            />
            <div class="flex-1 rounded-t-20px overflow-hidden bg-mainBg z-0">
                <div class="bg-white rounded-20px overflow-hidden">
                    <van-cell-group :border="false" style="--van-cell-line-height: 2rem">
                        <van-cell title="公链协议" class="setTitle">
                            <template #value>
                                <div class="flex items-center justify-end">
                                    <VanButton
                                        :key="index"
                                        :disabled="loading"
                                        v-for="(item, index) in list"
                                        @click="params.usdtProtocol = item"
                                        class="border-mainBg mr-10px px-10px last-of-type:mr-0 h-8 rounded-lg text-sm text-gz relative overflow-hidden"
                                        :class="{ 'border-txt': item == params.usdtProtocol }"
                                    >
                                        <span
                                            :class="{
                                                'text-txt font-medium ':
                                                    item == params.usdtProtocol,
                                            }"
                                        >
                                            {{ item }}
                                        </span>
                                        <img
                                            v-show="params.usdtProtocol === item"
                                            class="h-7 absolute -right-[1px] -bottom-[1px]"
                                            :src="ic_active"
                                            alt=""
                                        />
                                    </VanButton>
                                </div>
                            </template>
                        </van-cell>
                        <van-cell title="提币地址" class="setTitle !py-[7px]">
                            <template #value>
                                <VanField
                                    class="!p-0 leading-6"
                                    type="textarea"
                                    rows="1"
                                    :maxlength="50"
                                    autocomplete="off"
                                    :autosize="{ maxHeight: 40 }"
                                    :disabled="loading"
                                    v-model="params.usdtAddress"
                                    placeholder="请输入提币地址"
                                />
                            </template>
                        </van-cell>
                        <van-cell :border="false" title="地址别名" class="setTitle">
                            <template #value>
                                <VanField
                                    class="!p-0 whitespace-pre-wrap"
                                    :disabled="loading"
                                    :maxlength="10"
                                    autocomplete="off"
                                    :formatter="formatterChina"
                                    v-model="params.usdtName"
                                    placeholder="请输入地址别名"
                                />
                            </template>
                        </van-cell>
                    </van-cell-group>
                </div>
                <p class="text-15px pl-10px font-medium mt-[22px] mb-10px">验证手机号码</p>
                <div class="bg-white rounded-20px overflow-hidden">
                    <van-cell-group :border="false" style="--van-cell-line-height: 2rem">
                        <van-cell v-if="!user?.areaCode">
                            <template #value>
                                <div class="flex items-center">
                                    <AreaCodeCom class="mr-6" @submit="submitAreaCode" />
                                    <VanField
                                        class="!p-0 !py-0"
                                        type="number"
                                        :maxlength="11"
                                        input-align="left"
                                        autocomplete="off"
                                        v-model="params.mobile"
                                        :formatter="formatterNum"
                                        :disabled="loading || !!user?.mobile"
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
                        <van-cell title="手机号码" class="setTitle20" v-else>
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
                                        input-align="left"
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
                            title="验证码"
                            :border="false"
                            class="!pr-10px setTitle20"
                            style="--van-field-label-width: 2.5rem"
                        >
                            <template #value>
                                <div class="flex items-center w-full">
                                    <VanField
                                        type="number"
                                        :border="false"
                                        :maxlength="6"
                                        :disabled="loading"
                                        input-align="left"
                                        v-model="params.smsCode"
                                        :formatter="formatterNum"
                                        class="!p-0 flex-1"
                                        autocomplete="off"
                                        placeholder="请输入验证码"
                                        @keyup.enter="!disabled && addVirtualBank()"
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

                <div class="px-10px mt-[30px]">
                    <VanButton
                        @click="addVirtualBank"
                        :disabled="disabled || loading"
                        :loading="loading"
                        class="text-15px h-11 w-full border-0 rounded-xl tlw_btn_linear text-white"
                    >
                        确定
                    </VanButton>
                </div>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { IaddVirtualBank } from "@/api/wallet/interface";
import { computed, ref, watch } from "vue";
import ic_active from "@/assets/account/ic_active.png";
import { formatterChina, formatterNum } from "@/utils/validate";
import { showFailToast, showSuccessToast } from "vant";
import type { Captcha, CaptchaRef, ISendSmsBtn } from "../types";
import { useStore } from "@/stores";
import { storeToRefs } from "pinia";
import { desensitize } from "@/utils";
import type { UserVirtualBankList } from "@/api/wallet/types";
import { useRouter } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import CaptchaCom from "../CaptchaCom.vue";
import { useAsync } from "@/stores/useAsync";
import { AreaCode } from "@/api/home/types";
import AreaCodeCom from "../AreaCodeCom.vue";
import SendSmsBtn from "../SendSmsBtn.vue";

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: string): void;
}>();

const router = useRouter();
const { setDialogTip } = useStore();
const { userProfile } = useAsync();
const { user } = storeToRefs(useStore());
const props = defineProps<{
    modelValue: boolean;
    virtualList?: UserVirtualBankList[];
    userVirtualBankList?: () => void;
}>();
const loading = ref<boolean>(false);
const list = ref<string[]>(["TRC20", "ERC20", "OMNI"]);
const vanButtonRef = ref<ISendSmsBtn>();
const captcha = ref<Captcha>();
const captchaRef = ref<CaptchaRef>();
const isSendCode = ref<boolean>();
const smsLoading = ref<boolean>(false);
const params = ref<IaddVirtualBank>({
    mobile: "",
    smsCode: "",
    usdtAddress: "", //usdt地址
    usdtName: "", //别名
    usdtProtocol: "", //协议
    areaCode: "",
});

const disabled = computed(() => {
    if (!params.value.usdtAddress) return true;
    if (!params.value.usdtName) return true;
    if (!params.value.usdtProtocol) return true;
    if (!params.value.mobile) return true;
    if (!params.value.smsCode) return true;
});

const sendSmsCode = async () => {
    // 获取验证码
    if (!params.value.mobile) return showFailToast("手机号不能为空");
    // if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    smsLoading.value = true;
    const res = await API.sendSmsCode({
        mobile: params.value.mobile,
        ...captcha.value,
        areaCode: params.value.areaCode || user.value?.areaCode,
        captchaType: "binding_virtual_card",
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

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set() {
        close();
    },
});

const clickLeft = () => {
    close();
};

const addVirtualBank = async () => {
    // 添加数字货币
    const { mobile, smsCode, usdtProtocol, usdtAddress } = params.value;
    if (usdtProtocol == "TRC20" && !/^t/i.test(usdtAddress)) return showFailToast("地址格式不正确");
    if (usdtProtocol == "ERC20" && !/^0x/i.test(usdtAddress))
        return showFailToast("地址格式不正确");
    if (usdtProtocol == "OMNI" && !/^1/i.test(usdtAddress)) return showFailToast("地址格式不正确");
    if (!mobile) return showFailToast("请输入银行卡预留手机号");
    if (!mobile) return showFailToast("手机号码不能为空");
    if (!smsCode) return showFailToast(`请输入验证码`);
    // if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    if (!isSendCode.value) return showFailToast("请先获取验证码");
    loading.value = true;
    const res = await API.addVirtualBank(params.value);
    loading.value = false;

    switch (res.code) {
        case 0:
            clickLeft();
            showSuccessToast("绑定提币地址成功");
            props.userVirtualBankList?.();
            Object.keys(params.value).forEach(item => {
                if (item !== "mobile") params.value[item] = "";
            });
            if (!user.value?.mobile || !user.value.realName) userProfile();
            captchaReset();
            break;
        case 20102:
            vanButtonRef.value?.clearTime();
            break;
        default:
            break;
    }
};

const submitAreaCode = (item: AreaCode) => {
    params.value.areaCode = item?.code!;
};

const close = () => {
    emits("update:modelValue", false);
};

watch(
    () => showBottom.value,
    n => {
        if (n) {
            params.value.usdtProtocol = list.value?.[0];
            if (user.value?.mobile) params.value.mobile = user.value.mobile;
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
        .van-field__body {
            width: 100%;
            textarea {
                line-height: 20px;
            }
        }
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
