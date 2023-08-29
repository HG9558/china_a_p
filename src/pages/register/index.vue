<template>
    <LoginRegister :tabs="tabs" />
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import type { LoginRegisterTabs } from "@/components/types";
import LoginRegister from "@/components/LoginRegister.vue";
import AccountR from "./AccountR.vue";
import Mobile from "./MobileR.vue";

const tabs = shallowRef<LoginRegisterTabs[]>([
    {
        title: "账号密码注册",
        component: AccountR,
    },
    {
        title: "手机快捷注册",
        component: Mobile,
    },
]);
</script>
