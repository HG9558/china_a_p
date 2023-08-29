<!-- 赛事详情 动画/视频 -->
<template>
    <div class="w-full h-full relative bg-black">
        <iframe
            :src="url"
            frameborder="0"
            scrolling="no"
            allow="autoplay"
            allowfullscreen
            class="w-full h-full"
            @load="iframeLoad()"
        ></iframe>
        <van-loading
            type="spinner"
            v-show="false"
            class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        />
    </div>
</template>
<script setup lang="ts">
import { ref, toRefs } from "vue";

const props = defineProps<{ url: string }>();
const videoLoading = ref<boolean>(true);

const iframeLoad = () => {
    videoLoading.value = false;
};

const { url } = toRefs(props);
</script>
