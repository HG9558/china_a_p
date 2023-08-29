import { useStore } from "@/stores";
import { useAsync } from "@/stores/useAsync";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import useClipboard from "vue-clipboard3";
import { storeToRefs } from "pinia";
import { showFailToast, showSuccessToast } from "vant";
import { computed } from "vue";
import ic_avatar from "@/assets/icon/ic_avatar.png";
import ic_game_s from "@/assets/logo/ic_game_s.png";
import ic_game_m from "@/assets/logo/ic_game_m.png";
import ic_game_b from "@/assets/logo/ic_game_b.png";
import locale from "dayjs/locale/zh-cn";

const { toClipboard } = useClipboard();

let debounceTimer: NodeJS.Timeout | null, throttleTimer: NodeJS.Timeout | null;
dayjs.locale(locale);
dayjs.extend(duration);

export const mask = (cc: string, num1 = 0, num2 = 0, _mask = "*") => {
    let reg = new RegExp(
        `\^\(\.\{${num1}\}\)\(\.\{${num2 - num1}\}\)\(\.${num2 >= cc.length ? "?" : "+"}\)\$`
    );
    return cc.replace(reg, ($0, $1, $2, $3) => $1 + $2.replace(/./g, _mask) + $3);
};

export const desensitize = (str: string, start: number, end: number, num = 4) =>
    `${str.slice(0, start)}${"*".repeat(num)}${str.slice(-end)}`;

export const desensitizeCard = (str: string, start: number, end: number) =>
    `${str.slice(0, start)} **** **** ${str.slice(-end)}`;

export const ua = (lower?: string): string => {
    return lower ? window.navigator.userAgent.toLowerCase() : window.navigator.userAgent;
};

export const is = computed(
    () => (type: number, typeMap: object) => typeMap[type as keyof typeof typeMap]
);

export const isWeiXin = (): boolean => {
    const ua = navigator.userAgent.toLocaleLowerCase();
    return !!ua.match(/MicroMessenger/i)?.includes("micromessenger");
};

export const isIOS = (): boolean => {
    return /iPad|iPhone|iPod/.test(ua());
};

export const isAndroid = (): boolean => {
    return ua("l").indexOf("android") > -1;
};

export const lazyAvatar = computed(() => (src?: string) => ({
    src: src,
    error: ic_avatar,
    loading: ic_avatar,
}));

export const lazyGame = computed(() => (src: string, index: number) => {
    switch (index) {
        case 1:
            return {
                src: src,
                error: ic_game_b,
                loading: ic_game_b,
            };
        case 2:
            return {
                src: src,
                error: ic_game_m,
                loading: ic_game_m,
            };
        default:
            return {
                src: src,
                error: ic_game_s,
                loading: ic_game_s,
            };
    }
});

export const isMobile = (): boolean => {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua("l"));
};
export const isPC = (): boolean => {
    return !isMobile();
};

export const openLink = (src: string, type: "_blank" | "_self" = "_self") => {
    // 请不要新窗口打开(百度,夸克,ios桌面快捷方式有兼容性问题)
    window.open(src, type);
};

export const authToPage = (): boolean => {
    const { token, setDialogTip } = useStore();
    if (!token?.trim()) {
        setDialogTip(true);
        return false;
    }
    return true;
};

export const percentage = computed(() => (a: number = 0, b: number = 0) => {
    if (a == 0 || Number.isNaN(a)) return 0;
    return Math.min(+((a / b) * 100).toFixed?.(0), 100);
});

// 判断是否是ios桌面快捷方式
export const isStandalone = () => (navigator as any).standalone;

export const reload = () => {
    if (isStandalone() && !sessionStorage.getItem("isReload")) {
        sessionStorage.setItem("isReload", "1");
        location.reload();
    }
};

export const ellipsis = (str: string = "", type: string = "-") => str.replace(/[0-9]/g, type);

export const toRecharge = () => {
    const { setShowSetMobile, setDialogTip } = useStore();
    const { user } = storeToRefs(useStore());
    if (!user.value?.mobile) {
        setDialogTip(true, "温馨提示", "为了您的账户安全，请优先绑定手机号！", () => {
            setShowSetMobile(true);
        });
        return;
    }
};

export const toService = () => {
    const { init } = storeToRefs(useAsync());
    const value = init?.value?.pub_setting;
    if (value?.webUserCustomerService) openLink(value?.webUserCustomerService);
};

export const downloadApp = () => {
    const { init } = storeToRefs(useAsync());
    const value = init?.value?.pub_setting;
    if (value?.downloadUrl) openLink(value?.downloadUrl);
};

export const formatTime = computed(
    () =>
        (time: number, format: string = "YYYY-MM-DD HH:mm:ss") =>
            dayjs.unix(time).format(format)
);

// 复制
export const copyText = async (value: string = "", successText: string = "复制成功") => {
    try {
        await toClipboard(value);
        showSuccessToast(successText);
    } catch (error) {
        showFailToast("复制失败");
    }
};

export const timeOut = (time: number) => new Promise(resolve => setTimeout(resolve, time));

// 防抖
export const debounce = (fn: Function, delay: number): Function => {
    return (...args: unknown[]) => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};

// 节流
export const throttle = (fn: Function, delay: number): Function => {
    return (...args: unknown[]) => {
        if (throttleTimer) {
            return;
        }
        throttleTimer = setTimeout(() => {
            fn.apply(this, args);
            throttleTimer = null;
        }, delay);
    };
};
