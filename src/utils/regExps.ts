// 校验用户名
export const isUsername = (str: string) => /^(?=.*\d)(?=.*[a-z])[a-z\d]{5,14}$/.test(str);
// 校验密码
export const isPassword = (str: string) => /^(?!^\d+$)(?!^[A-Za-z]+$)[0-9a-zA-z]{8,20}$/.test(str);

// 数字,首字母不能为0
export const isNumber = (str: string) => /^[1-9]\d*$/.test(str);

export const isLoginName = (str: string) => /^[A-Za-z][A-Za-z0-9]{4,16}|[0-9]{10}$/.test(str);

export const isMobile = (str: string) => /^1+[0-9]{10}$/.test(str);

export const isCode = (str: string) => /^[0-9]{6}$/.test(str);

export const isRealName = (str: string) => /^[\u4e00-\u9fa5]{2,30}$/.test(str);

export const isBankNo = (str: string) => /^[1-9][0-9]{4,18}$/.test(str);

export const isEmail = (str: string) => /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);

export const isCity = (str: string) => /[a-zA-Z0-9]{2,40}/.test(str);

export const isAddress = (str: string) => /[a-zA-Z0-9]{2,80}/.test(str);

/* 邀请码 */
export const isPromoCode = (str: string) => /^[a-zA-Z0-9]{6}$/.test(str);

export const isCoin = (str: string) => /^[0-9]+\.\d{2}$/.test(str);

export const isBetAmount = (str: string) => /^[1-9]+\d?$/.test(str);

export const isVerify = (str: string) => /^[0-9]{4,6}$/.test(str);

export const isAmount = (str: string) => /^[1-9]+[0-9]{0,}$/.test(str);

export const isbankNumber = (str: string) => /^[0-9]{16,19}$/.test(str);

export const isCardName = (str: string) => /^[\u4e00-\u9fa5]{1,10}$/.test(str);

export const isCardAddress = (str: string) => /[a-zA-Z0-9]{1,44}/.test(str);
