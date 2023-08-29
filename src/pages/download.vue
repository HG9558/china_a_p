<!-- 下载页 -->
<template>
    <div
        class="bg-[url('@/assets/download/ic_download_bg.png')] bg-top bg-[length:100%] h-full overflow-y-auto"
    >
        <div class="h-full flex flex-col justify-center">
            <div class="flex items-center justify-center">
                <img class="w-[34.7%] object-contain" :src="ic_download_logo" alt="" />
            </div>
            <VanSwipe :loop="true" :autoplay="3000">
                <VanSwipeItem v-for="(item, index) in banners" :key="index" class="pb-5">
                    <div class="relative pb-[96.53%]">
                        <img class="absolute top-0 left-0 w-full h-full" :src="item.img" alt="" />
                    </div>
                </VanSwipeItem>
            </VanSwipe>
            <div class="mx-auto w-[335px] text-xs text-white">
                需在同一网络环境下下载安装注册，请勿切换网络；若无法正常安装，请使用手机自带浏览器打开本页面（苹果浏览Safari、Chrome谷歌浏览器）
            </div>
            <div class="flex items-center justify-center mt-4">
                <div class="mr-10px pb-[1px] linear rounded-[25px]">
                    <VanButton
                        @click="download"
                        class="rounded-[27px] border-0 bg-gradient-to-b from-[#FFF6E2] to-[#E2AF96] text-17px text-[#783C11] w-[162px]"
                    >
                        立即下载
                    </VanButton>
                </div>
                <VanButton
                    @click="toHome"
                    class="rounded-[27px] border-[#E7B89E] text-17px text-[#FFCAAD] w-[162px]"
                >
                    手机网页版
                </VanButton>
            </div>
            <p
                class="text-center text-xs text-white mt-5 flex items-center justify-center cursor-pointer"
                @click="scrollToTutorial"
            >
                <span class="font-medium">下滑查看安装教程</span>
                <i class="iconfont icon-shuangshangjiantou rotate-180 scale-90"></i>
            </p>
        </div>
        <div class="pb-10" id="tutorial">
            <template v-if="isIOS">
                <img class="w-12 h-12 object-contain mx-auto" :src="ic_ios" alt="" />
                <img class="mx-auto mt-4 w-[68%]" :src="ic_ios_text_linear" alt="" />
                <p
                    class="text-xs leading-[17px] font-PFSC mt-2 text-center text-white w-[255px] mx-auto"
                >
                    安装APP后，需要点击【一键信任】或进行以下设置才能使用哦
                </p>
                <div class="grid grid-cols-2 mt-7">
                    <div v-for="(item, index) in iosList" :key="index">
                        <img :src="item.img" alt="" />
                    </div>
                </div>
            </template>
            <template v-else>
                <img class="w-12 h-12 object-contain mx-auto" :src="ic_android" alt="" />
                <img class="mx-auto mt-4 w-[50%]" :src="ic_android_text_linear" alt="" />
                <div class="grid grid-cols-2 gap-5 mt-7 px-5">
                    <div v-for="(item, index) in androidList" :key="index">
                        <img :src="item.img" alt="" />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import ic_download_logo from "@/assets/logo/ic_download_logo.png";
import ic_banner_1 from "@/assets/download/ic_banner_1.png";
import ic_banner_2 from "@/assets/download/ic_banner_2.png";
import ic_banner_3 from "@/assets/download/ic_banner_3.png";
import ic_ios from "@/assets/download/ic_ios.png";
import ic_android from "@/assets/download/ic_android.png";
import ic_ios_text_linear from "@/assets/download/ic_ios_text_linear.png";
import ic_android_text_linear from "@/assets/download/ic_android_text_linear.png";
import ios1 from "@/assets/download/ios_1.png";
import ios2 from "@/assets/download/ios_2.png";
import ios3 from "@/assets/download/ios_3.png";
import ios4 from "@/assets/download/ios_4.png";
import android1 from "@/assets/download/android_1.png";
import android2 from "@/assets/download/android_2.png";
import android3 from "@/assets/download/android_3.png";
import android4 from "@/assets/download/android_4.png";
import { ref, computed, onMounted } from "vue";
import { API } from "@/api";
import { get } from "idb-keyval";
import { useStore } from "@/stores/index";
import { Iregister } from "@/components/types";
import { openLink } from "@/utils/index";
import { Versions } from "@/api/pub/types";
import platform from "platform";
import router from "@/router/index";
import qs from "query-string";

const banners = ref<{ title: string; img: any }[]>([
    { title: "", img: ic_banner_1 },
    { title: "", img: ic_banner_2 },
    { title: "", img: ic_banner_3 },
]);

const iosList = ref([
    { title: "", index: "", img: ios1 },
    { title: "", index: "", img: ios2 },
    { title: "", index: "", img: ios3 },
    { title: "", index: "", img: ios4 },
]);

const androidList = ref([
    { title: "", index: "", img: android1 },
    { title: "", index: "", img: android2 },
    { title: "", index: "", img: android3 },
    { title: "", index: "", img: android4 },
]);

const { setLoading } = useStore();
const packageUrl = ref<string>("");
const timer = ref();
const info = ref<Versions>();
const op = ref();

const isIOS = computed(() => platform.os?.family?.toLocaleLowerCase() == "ios");

const scrollToTutorial = () => {
    const tutorial = document.getElementById("tutorial");
    if (tutorial) tutorial.scrollIntoView({ behavior: "smooth" });
};

const versions = async () => {
    setLoading(true);
    const res = await API.versions();
    setLoading(false);
    if (res.code === 0) {
        info.value = res.data!;
        packageUrl.value = isIOS?.value ? res.data?.ios.packageUrl! : res.data?.android.packageUrl!;
    }
};

const download = async () => {
    if (isIOS.value) {
        op.value?.wakeupOrInstall?.();
        return;
    }
    openLink(packageUrl.value);
};

const toHome = () => {
    info.value?.m.packageUrl ? openLink(info.value?.m.packageUrl, "_blank") : router.push("/");
};

const bindInviteAndIp = async () => {
    const data: Iregister = (await get("register")) as Iregister;
    if (!data?.promoCode) return;
    API.bindInviteAndIp({ i_code: data.promoCode });
};

versions();

onMounted(() => {
    bindInviteAndIp();
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            if (timer.value) clearTimeout(timer.value);
        }
    });
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "//web.cdn.openinstall.io/openinstall.js";
    s.addEventListener(
        "load",
        () => {
            var data = OpenInstall?.parseUrlParams?.(); //解析获取参数
            new OpenInstall(
                {
                    appKey: "bp0bjn",
                    channelCode: qs.parse(location.search)?.code || platform.name,
                    preferWakeup: true,
                    mask: function () {
                        return `<div id='openinstall_shadow'style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>`;
                    },
                    onready: function () {
                        op.value = this;
                        this.schemeWakeup();
                    },
                },
                data
            );
        },
        false
    );
    document.head.appendChild(s);
});
</script>

<style lang="scss" scoped>
.linear {
    background: linear-gradient(
        90deg,
        #f8e0c0 0%,
        #cd8560 11.98%,
        #f1ae8a 31.25%,
        #feecca 48.96%,
        #f1ae8a 66.15%,
        #cd8560 88.02%,
        #f8e0c0 100%
    );
}

::v-deep(.van-swipe) {
    .van-swipe__indicators {
        .van-swipe__indicator {
            width: 5px;
            height: 5px;
            border-radius: 4px;
            background: white;
            &.van-swipe__indicator--active {
                width: 16px;
            }
        }
    }
}
</style>
