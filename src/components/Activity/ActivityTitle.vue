<template>
    <div class="flex items-center justify-center">
        <span class="w-[84px] h-[9.07px] flex-shrink-0" v-html="ic_active_line"></span>
        <p class="text-txt font-semibold text-15px mx-3 line-clamp-1">
            {{ props.title }}
        </p>
        <span class="w-[84px] h-[9.07px] rotate-180 flex-shrink-0" v-html="ic_active_line"></span>
    </div>
</template>

<script setup lang="ts">
import ic_active_line from "@/assets/svg/ic_active_line.svg?raw";

const props = defineProps<{ title: string }>();
</script>
