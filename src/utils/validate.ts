import { isCode, isMobile, isPassword, isRealName, isUsername } from "./regExps";
import { computed } from "vue";

export const formatterName = (value: string) => value.replace(/[^a-z0-9]/, "");

export const formatterPwd = (value: string) => value.replace(/[^A-Za-z0-9]/, "");

export const formatterNum = (value: string) => value.replace(/[^0-9]/, "");

export const formatterSpace = (value: string) => value.replace(/\s*/g, "");

export const formatterChina = (value: string) => value.replace(/((?![\u2E80-\u9FFF]).)*/g, "");

export const formatterCoin = (value: string) => {
    const validValue = value.replace(/[^\d\\.]/g, "");
    const parts = validValue.split(".");
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? "." + parts[1].substring(0, 2) : "";
    return integerPart + decimalPart;
};

// 校验用户名
export const checkUsername = computed(() => (value: string) => {
    if (!value) return "账号不能为空";
    if (isUsername(value)) return;
    return "账号为字母开头，5-14位英文字母与数字组合";
});

// 校验密码
export const checkPassword = computed(() => (value: string) => {
    if (!value) return "密码不能为空";
    if (isPassword(value)) return;
    return "密码为8-20位英文字母与数字组合,区分大小写";
});

// 校验旧密码
export const checkOldPassword = computed(() => (value: string) => {
    if (!value) return "旧密码不能为空";
    if (isPassword(value)) return;
    return "旧密码格式错误，请输入8-20位英文字母与数字组合,区分大小写";
});

// 校验新密码
export const checkNewPassword = computed(() => (value: string) => {
    if (!value) return "新密码不能为空";
    if (isPassword(value)) return;
    return "新密码格式错误，请输入8-20位英文字母与数字组合,区分大小写";
});

// 校验确认新密码
export const checkConfirmNewPassword = computed(() => (value: string, password: string) => {
    if (!value) return "确认密码不能为空";
    if (value === password) {
        if (isPassword(value)) return;
        return "密码格式错误，请输入8-20位英文字母与数字组合,区分大小写";
    }
    return "两次密码不一致";
});

// 校验手机号
export const checkMobile = computed(() => (value: string) => {
    if (!value) return "请输入手机号码";
    if (isMobile(value)) return;
    return "手机号格式不正确";
});

// 校验验证码 6位数字
export const checkCode = computed(() => (value: string) => {
    if (!value) return "请输入验证码";
    if (isCode(value)) return;
    return "请输入6位数验证码";
});

// 校验验证码 6位数字
export const checkSecureCode = computed(() => (value: string) => {
    if (!value) return "请输入安全密码";
    if (isCode(value)) return;
    return "请输入6位数安全密码";
});

// 校验验证码 6位数字
export const checkSecureOld = computed(() => (value: string) => {
    if (!value) return "请输入旧安全密码";
    if (isCode(value)) return;
    return "请输入6位数旧安全密码";
});

// 校验验证码 6位数字
export const checkSecureNew = computed(() => (value: string) => {
    if (!value) return "请输入新安全密码";
    if (isCode(value)) return;
    return "请输入6位数新安全密码";
});

// 真实姓名验证 2～30位汉字
export const checkRealName = computed(() => (value: string) => {
    if (!value) return "请输入真实姓名";
    if (isRealName(value)) return;
    return "请输入2-30位中文字";
});

// 银行卡Luhn算法
export const luhnCheck = (cardNumber: string) => {
    let sum = 0;
    let cardDigits = cardNumber.split("").reverse();
    for (let i = 0; i < cardDigits.length; i++) {
        let digit = parseInt(cardDigits[i], 10);
        if (i % 2 == 1) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 == 0;
};
