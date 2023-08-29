<!-- vip title -->
<template>
    <div class="h-[54px] relative">
        <p
            class="text-center absolute text-17px top-4 left-1/2 -translate-x-1/2 text-[#1E4CA8] font-medium"
        >
            {{ props.title }}
        </p>
        <img
            class="absolute bottom-4 h-2 object-contain left-1/2 -translate-x-1/2"
            :src="ic_vip_title_bg"
            alt=""
        />
    </div>
</template>

<script setup lang="ts">
import ic_vip_title_bg from "@/assets/vip/ic_vip_title_bg.png";

const props = defineProps<{ title: string }>();
</script>
