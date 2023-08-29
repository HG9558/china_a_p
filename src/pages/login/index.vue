<template>
    <LoginRegister :tabs="tabs" />
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import type { LoginRegisterTabs } from "@/components/types";
import Login from "./AccountL.vue";
import Mobile from "./MobileL.vue";
import LoginRegister from "@/components/LoginRegister.vue";

const tabs = shallowRef<LoginRegisterTabs[]>([
    {
        title: "账号密码登录",
        component: Login,
    },
    {
        title: "手机快捷登录",
        component: Mobile,
    },
]);
</script>
