// 首页 - 用户管理
import { http } from "../http";
import type { Res } from "../types";
import type {
    Icreate,
    IsendSmsCode,
    Itransfer,
    IupdatePassword,
    IresetPasswordByPassword,
    IupdatePasswordSecure,
    IupdateUserProfile,
    IvalidatePasswordSecure,
    IresetSecurePasswordByMobile,
    Ilogin,
    ImobileCreateOrLogin,
    IresetPasswordByMobile,
    IbindMobile,
    IresetMobile,
    IinitPassword,
    IaddPasswordSecure,
    IverifyOldMobile,
    IforgetPasswordByMobile,
    IcoinRewardsList,
    IcoinRewardsCliam,
    IcoinRewardsVerify,
} from "./interface";
import type { CoinRewardsList, InviteActivity, UserLogin } from "./types";

export const user = {
    // 获取验证码
    sendSmsCode: (data: IsendSmsCode): Promise<Res<any>> =>
        http("post", "/api/v1/user/sendSmsCode", data),

    // 用户名注册
    userCreate: (data: Icreate): Promise<Res<UserLogin>> =>
        http("post", "/api/v1/user/create", data),

    // 用户名登陆
    userLogin: (data: Ilogin): Promise<Res<UserLogin>> => http("post", "/api/v1/user/login", data),

    // 手机号码验证码登陆
    mobileCreate: (data: ImobileCreateOrLogin): Promise<Res<UserLogin>> =>
        http("post", "/api/v1/user/mobileCreate", data),

    // 手机号码验证码登陆注册
    mobileCreateOrLogin: (data: ImobileCreateOrLogin): Promise<Res<UserLogin>> =>
        http("post", "/api/v1/user/mobileCreateOrLogin", data),

    //手机号码验证码登陆
    mobileLogin: (data: ImobileCreateOrLogin): Promise<Res<UserLogin>> =>
        http("post", "/api/v1/user/mobileLogin", data),

    // 手机号码注册用户-密码初始化
    initPassword: (data: IinitPassword) => http("post", "/api/v1/user/initPassword", data),

    // 忘记密码-通过手机号,未登陆
    forgetPasswordByMobile: (data: IforgetPasswordByMobile): Promise<Res<UserLogin>> =>
        http("post", "/api/v1/user/forgetPasswordByMobile", data),

    // 修改密码-通过手机号，已登陆
    resetPasswordByMobile: (data: IresetPasswordByMobile): Promise<Res<any>> =>
        http("post", "/api/v1/user/resetPasswordByMobile", data),

    // 重置密码-通过安全密码
    resetPasswordByPassword: (data: IresetPasswordByPassword): Promise<Res<any>> =>
        http("post", "/api/v1/user/resetPasswordByPassword", data),

    // 重置安全密码-通过手机号
    resetSecurePasswordByMobile: (data: IresetSecurePasswordByMobile): Promise<Res<any>> =>
        http("post", "/api/v1/user/resetSecurePasswordByMobile", data),

    // 登出
    logout: (): Promise<Res<any>> => http("post", "/api/v1/user/logout"),

    // 获取用户信息
    userProfile: (): Promise<Res<UserLogin>> => http("post", "/api/v1/user/userProfile"),

    // 更新用户信息
    updateUserProfile: (data: IupdateUserProfile): Promise<Res<UserLogin>> =>
        http("post", "/api/v1/user/updateUserProfile", data),

    // 个人中心-修改登录密码
    updatePassword: (data: IupdatePassword): Promise<Res<any>> =>
        http("post", "/api/v1/user/updatePassword", data),

    // 个人中心-设置取款密码
    addPasswordSecure: (data: IaddPasswordSecure): Promise<Res<any>> =>
        http("post", "/api/v1/user/addPasswordSecure", data),

    // 个人中心-修改安全密码
    updatePasswordSecure: (data: IupdatePasswordSecure): Promise<Res<any>> =>
        http("post", "/api/v1/user/updatePasswordSecure", data),

    // 验证安全密码
    validatePasswordSecure: (data: IvalidatePasswordSecure) =>
        http("post", "/api/v1/user/validatePasswordSecure", data),

    // 红利列表
    coinRewardsList: (data: IcoinRewardsList): Promise<Res<CoinRewardsList>> =>
        http("post", "/api/v1/user/coinRewardsList", data),

    // 红利领取
    coinRewardsCliam: (data: IcoinRewardsCliam): Promise<Res<any>> =>
        http("post", "/api/v1/user/coinRewardsCliam", data),

    // 好友邀请活动
    inviteActivity: (): Promise<Res<InviteActivity>> => http("post", "/api/v1/user/inviteActivity"),

    // 修改自动上下分状态(1:是 0:否)
    resetAutoTransfer: (data: Itransfer): Promise<Res<any>> =>
        http("post", "/api/v1/user/resetAutoTransfer", data),

    // 验证旧手机号
    verifyOldMobile: (data: IverifyOldMobile): Promise<Res<any>> =>
        http("post", "/api/v1/user/verifyOldMobile", data),

    // 用户绑定手机号
    bindMobile: (data: IbindMobile): Promise<Res<any>> =>
        http("post", "/api/v1/user/bindMobile", data),

    // 修改手机号
    resetMobile: (data: IresetMobile): Promise<Res<any>> =>
        http("post", "/api/v1/user/resetMobile", data),

    // 红利未领取数量
    coinRewardsCliamCount: (): Promise<Res<any>> =>
        http("post", "/api/v1/user/coinRewardsCliamCount"),

    // 验证您或邀请人是否绑定银行卡
    coinRewardsVerify: (data: IcoinRewardsVerify): Promise<Res<boolean>> =>
        http("post", "/api/v1/user/coinRewardsVerify", data),
};
