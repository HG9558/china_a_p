<!-- 账户管理 银行卡 添加银行卡 -->
<template>
    <VanPopup
        v-model:show="showBottom"
        position="right"
        teleport="body"
        style="width: 100%; height: 100%; border: 0"
    >
        <div class="h-full flex flex-col tlw_top_bg">
            <NavBar transparent :click-left="clickLeft" :nav-bar-props="{ title: '添加银行卡' }" />
            <div class="flex-1 rounded-t-20px overflow-hidden bg-mainBg z-0">
                <div class="bg-white rounded-20px overflow-hidden">
                    <van-cell-group :border="false" style="--van-cell-line-height: 2rem">
                        <van-cell
                            is-link
                            title="选择银行"
                            class="setTitle"
                            :class="{ 'pointer-events-none': loading }"
                            @click="showCardSelect = !showCardSelect"
                        >
                            <template #value>
                                <span
                                    class="whitespace-nowrap"
                                    :class="{ 'text-mainText': params.bankName }"
                                >
                                    {{ params.bankName || "选择开户银行" }}
                                </span>
                            </template>
                        </van-cell>
                        <van-cell title="开户姓名" class="setTitle">
                            <template #value>
                                <VanField
                                    v-if="user?.realName"
                                    readonly
                                    class="!p-0"
                                    :maxlength="30"
                                    autocomplete="off"
                                    :disabled="loading || !!user?.realName"
                                    :formatter="formatterSpace"
                                    input-align="left"
                                    :placeholder="
                                        user?.realName
                                            ? mask(user?.realName, 1, user?.realName.length)
                                            : '请与银行卡开户姓名一致'
                                    "
                                    :class="{ 'text-mainText': !!params.accountName }"
                                    style="--van-field-input-disabled-text-color: #303033"
                                />
                                <VanField
                                    v-else
                                    class="!p-0"
                                    :maxlength="30"
                                    autocomplete="off"
                                    :disabled="loading || !!user?.realName"
                                    input-align="left"
                                    :formatter="formatterSpace"
                                    v-model="params.accountName"
                                    :placeholder="
                                        user?.realName ? user?.realName : '请与银行卡开户姓名一致'
                                    "
                                    :class="{ 'text-mainText': !!params.accountName }"
                                />
                            </template>
                        </van-cell>
                        <van-cell :border="false" title="银行卡号" class="setTitle">
                            <template #value>
                                <VanField
                                    class="!p-0"
                                    type="number"
                                    :maxlength="19"
                                    :disabled="loading"
                                    input-align="left"
                                    autocomplete="off"
                                    :formatter="formatterNum"
                                    v-model="params.accountNo"
                                    placeholder="请输入银行卡号"
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
                                        input-align="left"
                                        autocomplete="off"
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
                        <van-cell
                            :border="false"
                            title="验证码"
                            class="!pr-10px setTitle20"
                            style="--van-field-label-width: 2.5rem"
                        >
                            <template #value>
                                <div class="flex items-center w-full">
                                    <VanField
                                        :border="false"
                                        :maxlength="6"
                                        type="number"
                                        :disabled="loading"
                                        input-align="left"
                                        autocomplete="off"
                                        v-model="params.smsCode"
                                        :formatter="formatterNum"
                                        class="!p-0 flex-1"
                                        placeholder="请输入验证码"
                                        @keyup.enter="!disabled && addUserBank()"
                                    />
                                    <SendSmsBtn
                                        :key="~~showBottom"
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
                        @click="addUserBank"
                        :loading="loading"
                        :disabled="disabled || loading"
                        class="text-15px h-11 w-full border-0 rounded-xl tlw_btn_linear text-white"
                    >
                        确定
                    </VanButton>
                </div>
            </div>
            <CardSelect
                :list="list"
                v-if="list?.[0]"
                v-model="showCardSelect"
                @submit="setParams($event, 'bankName')"
            />
            <CardArea v-model="showArea" @submit="setParams($event, 'bankAddress')" />
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { IaddUserBank } from "@/api/wallet/interface";
import type { BankList, UserBankList } from "@/api/wallet/types";
import { formatterNum, formatterSpace } from "@/utils/validate";
import { showFailToast, showSuccessToast } from "vant";
import { nextTick, ref, computed, watch } from "vue";
import type { Captcha, CaptchaRef, ISendSmsBtn } from "../types";
import { storeToRefs } from "pinia";
import { useStore } from "@/stores";
import { desensitize, mask } from "@/utils";
import { useAsync } from "@/stores/useAsync";
import { useRouter } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import CaptchaCom from "../CaptchaCom.vue";
import CardArea from "./CardArea.vue";
import CardSelect from "./CardSelect.vue";
import { AreaCode } from "@/api/home/types";
import AreaCodeCom from "../AreaCodeCom.vue";
import SendSmsBtn from "../SendSmsBtn.vue";

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: string): void;
}>();
const props = defineProps<{
    modelValue: boolean;
    bankList?: UserBankList[];
    userBankList?: () => void;
}>();

const { setDialogTip } = useStore();
const router = useRouter();
const { userProfile } = useAsync();
const { user } = storeToRefs(useStore());
const list = ref<BankList[]>();
const showCardSelect = ref<boolean>(false); //显示选择银行卡
const showArea = ref<boolean>(false); //显示开户地区
const vanButtonRef = ref<ISendSmsBtn>(); //发送验证码ref
const captcha = ref<Captcha>(); //滑块
const captchaRef = ref<CaptchaRef>(); //滑块ref
const isSendCode = ref<boolean>(); //是否发送短信成功
const smsLoading = ref<boolean>(false); //发送短信loading
const loading = ref<boolean>(false); //提交loading
const params = ref<IaddUserBank>({
    //提交参数
    accountName: "", //开户姓名
    accountNo: "", //卡号
    bankAddress: "", //开户地区
    bankName: "", //银行名
    mobile: "",
    smsCode: "",
    areaCode: "",
});

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set() {
        close();
    },
});

const disabled = computed(() => {
    if (!params.value.accountName!) return true;
    if (!params.value.accountNo!) return true;
    // if (!params.value.bankAddress) return true;
    if (!params.value.bankName) return true;
    if (!params.value.mobile) return true;
    if (!params.value.smsCode!) return true;
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
        captchaType: "binding_bank_card",
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

const setParams = (value: string, type: string) => {
    // 修改传参参数
    params.value = { ...params.value, [type]: value };
};

const addUserBank = async () => {
    // 钱包-添加用户银行卡
    const { accountName, accountNo, bankAddress, bankName, mobile, smsCode } = params.value;
    if (!accountName) return showFailToast("请输入开户姓名");
    if (!bankName) return showFailToast("请选择开户银行");
    // if (!bankAddress) return showFailToast("请选择开户地区");
    if (!accountNo) return showFailToast("请输入银行卡号");
    if (!accountNo) return showFailToast("银行卡号不能为空");
    if (!mobile) return showFailToast("请输入银行卡预留手机号");
    if (!smsCode) return showFailToast("请输入验证码");
    // if (!captcha.value?.token) return showFailToast("请先通过滑块验证");
    if (!isSendCode.value) return showFailToast("请先获取验证码");
    // 添加用户银行卡
    loading.value = true;
    const res = await API.addUserBank(params.value);
    loading.value = false;

    switch (res.code) {
        case 0:
            clickLeft();
            props.userBankList?.();
            Object.keys(params.value).forEach(item => {
                if (!/(mobile|accountName)/.test(item)) params.value[item] = "";
            });
            captchaReset();
            showSuccessToast("绑定银行卡成功");
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

const clickLeft = () => {
    close();
};

const close = () => {
    emits("update:modelValue", false);
};

const bankList = async () => {
    const res = await API.bankList();
    if (res.code === 0) {
        list.value = res.data!;
    }
};
nextTick(() => {
    bankList();
});

watch(
    () => showBottom.value,
    n => {
        if (n) {
            if (user.value?.realName) params.value.accountName = user.value.realName;
            if (user.value?.mobile) params.value.mobile = user.value.mobile;
            return;
        }
        vanButtonRef.value?.clearTime();
    }
);
</script>

<style lang="scss" scoped>
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
