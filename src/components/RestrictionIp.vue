<!-- ip限制组件 -->
<template>
    <div class="h-full flex items-center flex-col justify-center text-mainText text-xs">
        <img class="w-[220px] h-[220px] mb-5" :src="ic_no_ip" alt="" />
        <div class="w-[190px] mx-auto text-center">
            <p class="text-lg font-medium mb-2">访问限制</p>
            <p class="text-sm mb-5">您的IP {{ ip?.ip }} {{ ip?.countryCode }}</p>
            <p class="text-txt_d mb-5 leading-[17px]">
                您所在的地区已禁止我们提供服务,给您造成的不便,敬请谅解
            </p>
            <p class="text-txt" @click="toService">如需帮助，请联系客服！</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toService } from "@/utils";
import ic_no_ip from "@/assets/defult/ic_no_ip.png";
import { storeToRefs } from "pinia";
import { useAsync } from "@/stores/useAsync";

const { ip } = storeToRefs(useAsync());
</script>
