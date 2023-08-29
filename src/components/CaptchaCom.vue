<!-- 滑块 -->
<template>
    <div class="w-full select-none relative" :style="{ height: `${height}px` }">
        <div id="nc" class="w-full" :style="{ '--lineHeight': `${height}px` }" />
    </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted } from "vue";
import { showFailToast } from "vant";
import type { Captcha } from "./types";

const props = withDefaults(defineProps<{ height?: number | string | undefined }>(), {
    height: 40,
});
const emit = defineEmits<{ (e: "success", data: Captcha): void }>();

const { height } = toRefs(props);

const appkey = "FFFF0N0000000000B3BA";
const scene = "nc_register_h5";

const nc = ref();
const upLang = {
    cn: {
        LOADING: "加载中...",
        SLIDE: "请向右滑动验证",
        SUCCESS: "验证通过",
        ERROR: "非常抱歉，网络出错了...",
        FAIL: "验证失败，请重试",
    },
};

const success = (data: Captcha) => {
    emit("success", data);
    const result = {
        nc_token: data?.token,
        sessionid: data?.sessionId,
        sig: data?.sig,
    };
    (window as any)?.testInterface?.getSlideData(JSON.stringify(result));
    (window as any)?.webkit?.messageHandlers?.getSlideData?.postMessage(result);
};

const reset = () => {
    nc.value?.reset?.();
};

const fail = () => {
    showFailToast({
        message: `滑动验证失败,请重试`,
        duration: 2000,
        onClose: () => reset?.(),
    });
};
const error = () => {
    showFailToast({
        message: `验证码加载异常,请重试`,
        duration: 2000,
        onClose: () => reset?.(),
    });
};

interface Iinit {
    appkey: string;
    scene: string;
    renderTo: string;
    success: (e: Captcha) => void;
    error: (e: string) => void;
    fail: (e: string) => void;
    [name: string]: any;
}

interface Imodule {
    TEST_BLOCK?: string;
    TEST_PASS?: string;
    init: (e: Iinit) => void;
}

// https://help.aliyun.com/document_detail/193141.html
const initCaptcha = () => {
    if (nc.value) return;
    (window as any).AWSC?.use("nc", (_state: string, module: Imodule) => {
        nc.value = module.init({ renderTo: "nc", scene, appkey, upLang, success, error, fail });
    });
};

defineExpose({ reset });
onMounted(() => {
    initCaptcha();
});
</script>

<style lang="scss" scoped>
::v-deep(#nc) {
    overflow: hidden;
    border-radius: 6px;
    .nc_wrapper {
        width: 100% !important;
        height: var(--lineHeight);
        font-size: 14px;
        line-height: var(--lineHeight);
        .nc_scale {
            height: var(--lineHeight);
            .nc_bg {
                background: $primary;
                line-height: var(--lineHeight);
            }
            .nc_iconfont {
                border-radius: 6px;
                width: var(--lineHeight);
            }
            .btn_ok {
                height: var(--lineHeight);
                line-height: var(--lineHeight);
            }
            .btn_slide {
                height: var(--lineHeight);
                line-height: var(--lineHeight);
            }
            .scale_text {
                line-height: var(--lineHeight);
                &.scale_text2 {
                    text-indent: -10px;
                }
                .nc-lang-cnt {
                    line-height: var(--lineHeight);
                }
            }
        }
    }
}
</style>
