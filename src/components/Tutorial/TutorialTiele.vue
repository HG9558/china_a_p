<!-- 盘口教程 Title组件 -->
<template>
    <div class="TutorialTiele h-[31px] flex items-center justify-center text-mainText mx-auto">
        <div class="relative h-full flex items-center">
            <div class="tlw_tutorial_bg absolute w-full h-full top-0 left-0"></div>
            <div class="relative z-10 px-7 text-txt font-medium">
                <span v-show="title" class="mr-2">
                    {{ title }}
                </span>
                <span class="text-15px">
                    {{ subTitle }}
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{ title?: string; subTitle: string }>();

const { title, subTitle } = toRefs(props);
</script>
