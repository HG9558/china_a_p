<!-- 播放器组件 -->
<template>
    <div class="vue-video-box w-full h-full bg-black flex items-end">
        <div id="player_ium" @contextmenu="() => false" />
        <div class="video-loading" v-show="videoLoading">
            <div class="loading-inner">
                <div class="loading-logo"></div>
                <div class="loading-text">正在加载...</div>
                <div class="loading-progress"></div>
            </div>
        </div>
        <VanButton
            class="absolute bottom-12 left-1/2 bg-orange-500 h-[32px] text-white px-10px rounded-lg -translate-x-1/2 cursor-pointer flex items-center justify-center font-medium text-xs"
            v-if="isMuted && !videoLoading && !isError"
            @click.stop="volume_close()"
        >
            <i class="icon-volume_close mr-1"></i>
            <span>点击取消静音</span>
        </VanButton>
    </div>
</template>

<script setup lang="ts">
import "mui-player/dist/mui-player.min.css";
import Hls from "hls.js";
import MuiPlayer from "mui-player";
import MuiPlayerMobilePlugin from "mui-player-mobile-plugin";
import { ref, toRefs, watch, onBeforeUnmount } from "vue";

const player = ref<any>();
const prev = ref<number>(Date.now());
const videoLoading = ref<boolean>(false);
const isMuted = ref<boolean>(false);
const isError = ref<boolean>(false);

const props = defineProps<{ url: string; referUrl: string }>();
const emits = defineEmits<{
    (e: "error"): void;
    (e: "canplay"): void;
    (e: "play"): void;
    (e: "pause"): void;
    (e: "playing"): void;
    (e: "ended"): void;
    (e: "ready"): void;
    (e: "controls", show?: boolean): void;
    (e: "timeupdate", time?: number): void;
}>();

const volume_close = () => {
    if (!player.value.video().muted) return;
    if (player) {
        player.value.video().muted = false;
        isMuted.value = false;
    }
    // setFristTouch(true);
};

const initPlayer = () => {
    let parse = {
        type: "hls",
        loader: Hls,
        config: {
            debug: false,
            xhrSetup: (xhr: XMLHttpRequest, url: string) => {
                xhr.open("get", url, true);
                xhr.setRequestHeader("Referer", props.referUrl);
            },
        },
    };
    let options = {
        container: "#player_ium",
        src: url.value,
        live: true,
        autoplay: true,
        height: "100%",
        showLock: false,
        showMenuButton: false,
        muted: isMuted.value,
        videoAttribute: [
            { attrKey: "webkit-playsinline", attrValue: "webkit-playsinline" },
            { attrKey: "playsinline", attrValue: "playsinline" },
            { attrKey: "x5-playsinline", attrValue: "" },
            { attrKey: "t7-video-player-type", attrValue: "inline" },
            { attrKey: "x5-video-player-type", attrValue: "h5-page" },
            { attrKey: "x-webkit-airplay", attrValue: "allow" },
            { attrKey: "controlslist", attrValue: "nodownload" },
        ],
        parse: parse,
        plugins: [
            typeof MuiPlayerMobilePlugin === "function"
                ? new MuiPlayerMobilePlugin({
                      hotKeyConfig: {
                          volumeHandle: false,
                      },
                  })
                : {},
        ],
    };
    player.value = new MuiPlayer(options);
    const video = player.value?.video();
    if (video) {
        video?.addEventListener("canplay", () => {
            videoLoading.value = false;
            emits("canplay");
        });
        video.addEventListener("playing", () => {
            videoLoading.value = false;
            emits("playing");
        });
        video?.addEventListener("timeupdate", () => {
            const now = Date.now();
            if (!(now - prev.value >= 1000)) return;
            prev.value = Date.now();
            emits("timeupdate", video.currentTime);
        });
        video.addEventListener("play", () => {
            emits("play");
        });
        video.addEventListener("pause", () => {
            // isPause = true
            emits("pause");
        });
        video.addEventListener("ended", () => {
            emits("ended");
        });
    }
    player.value?.on("volume-change", (e: { size: number }) => {
        player && (player.value.video().volume = e.size);
    });
    player.value?.on("ready", () => {
        emits("ready");
    });
    player.value?.on("controls-toggle", (e: { show: boolean }) => {
        emits("controls", e.show);
    });
    player.value?.on("error", () => {
        isError.value = true;
        videoLoading.value = false;
        emits("error");
    });
};
const play = () => {
    player.value?.video?.()?.play?.();
};
const pause = () => {
    player.value?.video?.()?.pause?.();
};
const destroy = () => {
    player.value?.destroy?.();
};

onBeforeUnmount(() => destroy());

const { url } = toRefs(props);
watch(
    () => url.value,
    (n, o) => {
        if (n) {
            destroy();
            initPlayer();
            return;
        }
        destroy();
    }
);
defineExpose({ play, pause });
</script>

<style lang="scss" scoped>
.vue-video-box {
    ::v-deep(#player_ium) {
        position: absolute;
        width: 100% !important;
        height: initial !important;
        padding-bottom: 56.25%;
        overflow: hidden;
        #mplayer-media-wrapper {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            #mplayer-header {
                display: none;
            }
        }
        svg {
            display: initial !important;
        }
    }
    > .video-loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 122;
        background: #000;
        overflow: hidden;
        cursor: pointer;
        > .loading-inner {
            position: absolute;
            top: 50%;
            left: 50%;
            color: #fff;
            font-size: 14px;
            transform: translate(-50%, -50%);
            > .loading-logo {
                width: 220px;
                margin: 0 34.5px;
            }
            > .loading-text {
                margin-top: 26px;
                line-height: 20px;
                text-align: center;
            }
            > .loading-progress {
                height: 16px;
                margin-top: 12px;
                position: relative;
                &::before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    height: 2px;
                    width: 100%;
                    transform: translateY(-50%);
                    background: url("~@/assets/icon/progress-bar.png") no-repeat center/cover;
                }
                &::after {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 0;
                    height: 100%;
                    width: 22px;
                    z-index: 2;
                    transform: translateY(-50%);
                    background: url("~@/assets/icon/progress-position.png") no-repeat center/cover;
                    animation: prsLoading 3s infinite linear;
                }
                @keyframes prsLoading {
                    from {
                        left: 0%;
                    }
                    to {
                        left: 100%;
                    }
                }
            }
        }
    }
}
</style>
