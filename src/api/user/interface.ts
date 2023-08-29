export interface IsendSmsCode {
    captchaType?: string; //binding_phone\rebinding_old_phone\rebinding_new_phone\register\update_password\login\security
    ip?: string;
    mobile?: string;
    sessionId?: string;
    sig?: string;
    token?: string;
    areaCode?: string;
}
export interface Icreate {
    password?: string;
    promoCode?: string;
    username?: string;
    deviceDetail?: string;
    promoType?: "u" | "a"; //"u" | "a"; //u=用户 a=代理
    sessionId?: string;
    sig?: string;
    token?: string;
    model?: string;
}
export interface Ilogin {
    password?: string;
    promoCode?: string;
    username?: string;
    model?: string;
}
export interface ImobileCreateOrLogin {
    mobile?: string;
    promoCode?: string;
    smsCode?: string;
    areaCode?: string;
    model?: string;
}

export interface IinitPassword {
    password: string;
}
export interface IresetPasswordByMobile {
    mobile?: string;
    password?: string;
    smsCode?: string;
    captchaType?: string;
    areaCode?: string;
    deviceDetail?: string;
    promoCode?: string;
    promoType?: "u" | "a"; //u=用户 a=代理
    sessionId?: string;
    sig?: string;
    token?: string;
}

export interface IforgetPasswordByMobile extends IresetPasswordByMobile {}
export interface IresetSecurePasswordByMobile {
    mobile?: string;
    password?: string;
    smsCode?: string;
    captchaType?: string;
    areaCode?: string;
    [name: string]: any;
}
export interface IresetPasswordByPassword {
    password?: string;
    securePassword?: string;
    username?: string;
}
export interface IupdateUserProfile {
    avatar?: string;
    birthday?: string;
    mobile?: string;
    nickname?: string;
    password?: string;
    realName?: string;
    securePassword?: string;
    sex: number | string;
    [key: string]: any;
}

export interface IverifyOldMobile {
    captchaType: string;
    ip?: string;
    mobile: string;
    sessionId: string;
    sig: string;
    smsCode: string;
    token: string;
    areaCode: string;
}
export interface IupdatePassword {
    password?: string;
    passwordOld?: string;
}
export interface IupdatePasswordSecure {
    securePassword?: string;
    securePasswordOld: string;
}
export interface IvalidatePasswordSecure {
    securePassword?: string;
}
export interface Itransfer {
    autoTransfer?: number;
}

export interface IaddPasswordSecure {
    mobile?: string;
    securePassword: string;
    sessionId?: string;
    sig?: string;
    smsCode?: string;
    token?: string;
    areaCode?: string;
}

export interface IbindMobile {
    mobile: string;
    sessionId: string;
    sig: string;
    smsCode: string;
    token: string;
    areaCode: string;
    [name: string]: string;
}

export interface IresetMobile extends IbindMobile {}

export interface IcoinRewardsList {
    current: number;
    data: DataClass;
    size: number;
}

export interface DataClass {
    categoryId: number;
    status: number; // -1全部 0未领取1已领取2过期
}

export interface IcoinRewardsCliam {
    id: number;
}

export interface IcoinRewardsVerify {
    id: number;
}
