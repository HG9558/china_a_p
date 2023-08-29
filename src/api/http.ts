import { useStore } from "@/stores";
import Local from "@/utils/Local";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import { closeToast, showFailToast } from "vant";
import qs from "query-string";
import { matchDecrypt } from "@/utils/matchDecrypt.ts";
import { useMatch } from "@/stores/useMatch";

const services = axios.create({
    baseURL: "/",
    timeout: 30000,
});

const whitelist =
    /(\/home\/init|\/home\/ip|getDictionary|checkObStatus|queryUserWallet|sportsSetInquiry|userProfile|resetAutoTransfer|coinTransfer)/;

const CancelToken = axios.CancelToken;

const resultData = (responseURL: string, data: string) => {
    if (/(obsportend)/g.test(responseURL)) {
        return matchDecrypt(data);
    }
    return data;
};

services.interceptors.request.use(
    async (config: AxiosRequestConfig | any) => {
        //http request 拦截器
        const _token = qs.parse(location.search).token;
        if (_token) useStore().setToken(_token as string);
        const { token, uuid } = useStore();
        if (!whitelist.test(config?.url)) {
            config.cancelToken = new CancelToken(c => useStore().pushAxiosToken(c));
        }
        config.data = JSON.stringify(config.data);
        config.headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept-Language": "zh",
            "Accept-Device": "m", //pc:d
            "Accept-Device-Version": "1.0.0",
            "Accept-uuid": uuid,
        };
        return config;
    },
    error => Promise.reject(error)
);

services.interceptors.response.use(res => {
    //http response 拦截器
    switch (res?.data?.code) {
        case 0:
            break;
        case 401:
        case 10011:
            (window as any)?.testInterface?.closePage?.();
            (window as any)?.webkit?.messageHandlers?.closePage?.postMessage?.("xxx");
            if (/(download)/g.test(location.pathname)) {
                closeToast();
                return;
            }
            if (res.data.msg) {
                showFailToast({
                    message: res.data.msg,
                    onClose: () => {
                        Local.clear();
                        useMatch().setActive(0);
                        window.location.replace("/login");
                    },
                });
            }
            break;
        case 90001:
            break;
        case 20411:
            useStore()?.setRestrictionIp(true);
            break;
        default:
            res.data.msg && showFailToast(res.data.msg);
            break;
    }

    const data = {
        ...res?.data,
        data: resultData(res?.request?.responseURL, res?.data?.data),
    };

    return data;
});

export const http = (fetch: "get" | "post", url: string, data: object = {}): Promise<any> => {
    //统一接口处理，返回数据
    return new Promise((resolve, reject) => {
        const types = {
            get: { params: data },
            post: data,
        };
        services[fetch](url, types[fetch])
            .then(response => {
                resolve(response);
            })
            .catch((error: AxiosError) => {
                const { setLoading } = useStore();
                setLoading(false);
                error.response?.status && showFailToast(`${error.response?.status}`);
                if (error.message == "canceled") return;
                console.error(`接口错误:${error}`);
            });
    });
};
