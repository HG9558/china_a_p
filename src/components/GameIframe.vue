<!-- 游戏iframe组件 因游戏登录态问题,不同意,导致刷新丢失登录态 停用!!!-->
<template>
    <VanPopup position="right" v-model:show="showBottom" style="width: 100%; height: 100%">
        <div class="flex flex-col h-full">
            <div class="h-10 bg-txt w-full flex items-center justify-between px-10px">
                <i class="icon-close-bold text-xl text-white mr-1" @click="setGameUrl('')"></i>
                <i v-html="ic_refresh" class="w-4 h-4" @click="gameKey = Date.now()" />
            </div>
            <div class="flex-shrink-0 flex-1 relative">
                <iframe
                    :key="gameKey"
                    :src="gameUrl"
                    scrolling="no"
                    frameborder="0"
                    allow="autoplay"
                    allowfullscreen
                    class="w-full h-full"
                    @load="iframeLoad()"
                ></iframe>
                <van-loading
                    type="spinner"
                    v-show="videoLoading"
                    class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            </div>
        </div>
    </VanPopup>
</template>
<script setup lang="ts">
import { ref, toRefs, computed } from "vue";
import ic_refresh from "@/assets/svg/ic_refresh.svg?raw";

const props = defineProps<{
    gameUrl: string;
    modelValue: boolean;
    setGameUrl: (value: string) => void;
}>();
const videoLoading = ref<boolean>(true);
const gameKey = ref<number>(0);

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set() {
        close();
    },
});

const iframeLoad = () => {
    videoLoading.value = false;
};

const { gameUrl, setGameUrl } = toRefs(props);
</script>
