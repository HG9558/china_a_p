<template>
    <div class="h-full flex flex-col w-full overflow-x-hidden">
        <div class="flex-1 overflow-hidden">
            <RouterView v-slot="{ Component }">
                <KeepAlive>
                    <TransitionView>
                        <Component :is="Component"></Component>
                    </TransitionView>
                </KeepAlive>
            </RouterView>
        </div>
        <div
            class="tabbar bg-mainBg sticky bottom-0 z-30 touch-none bg-center bg-cover shadow-[0px_-6px_10px_0px_rgba(53,55,60,0.10)]"
            :class="{ 'pb-5': isStandalone() }"
        >
            <img
                ref="iconSelectRef"
                class="w-[125px] h-[32.2px] absolute top-[1px] object-contain -translate-y-full transition-all transform-gpu pointer-events-none"
                :style="{ left: `${left}px` }"
                :src="iconSelect"
                alt=""
            />
            <VanTabbar
                :key="globelKey"
                v-model="active"
                :border="false"
                :fixed="false"
                class="z-10 relative"
                :beforeChange="beforeChange"
                style="
                    --van-tabbar-background: transparent;
                    --van-tabbar-item-active-background: transparent;
                "
            >
                <VanTabbarItem
                    v-for="(item, index) in tabs"
                    :to="item.path"
                    :key="item.path"
                    :name="item.path"
                    class="relative"
                    ref="tabbarItemRef"
                >
                    <template #icon>
                        <div
                            class="absolute w-[32px] h-[32px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        >
                            <img
                                class="w-[30px] h-[30px] transition-all"
                                :class="{ 'w-[32px] h-[32px] -translate-y-1': active == index }"
                                :src="active === index ? item.select : item.icon"
                                alt=""
                            />
                        </div>
                    </template>
                    <p class="translate-y-3" :class="{ 'text-txt font-medium': active === index }">
                        {{ item.label }}
                    </p>
                </VanTabbarItem>
            </VanTabbar>
        </div>
        <HomeDialog />
        <SafariDialog />
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, computed, watch } from "vue";
import { RouterView } from "vue-router";
import iconSelect from "@/assets/home/iconSelect.png";
import ic_betslip from "@/assets/home/ic_betslip.png";
import ic_betslip_active from "@/assets/home/ic_betslip_active.png";
import ic_entertain from "@/assets/home/ic_entertain.png";
import ic_entertain_active from "@/assets/home/ic_entertain_active.png";
import ic_home from "@/assets/home/ic_home.png";
import ic_home_active from "@/assets/home/ic_home_active.png";
import ic_match from "@/assets/home/ic_match.png";
import ic_match_active from "@/assets/home/ic_match_active.png";
import ic_profile from "@/assets/home/ic_profile.png";
import ic_profile_active from "@/assets/home/ic_profile_active.png";
import { authToPage, isStandalone } from "@/utils";
import { storeToRefs } from "pinia";
import { useStore } from "@/stores";
import TransitionView from "@/components/TransitionView.vue";
import HomeDialog from "@/components/HomeDialog.vue";
import SafariDialog from "@/components/SafariDialog.vue";

const { globelKey } = storeToRefs(useStore());
const route = useRoute();
const tabs = ref([
    {
        select: ic_home_active,
        icon: ic_home,
        label: "首页",
        path: "/home",
    },
    {
        select: ic_entertain_active,
        icon: ic_entertain,
        label: "娱乐",
        path: "/entertain",
    },
    { select: ic_match_active, icon: ic_match, label: "赛事", path: "/match" },
    {
        select: ic_betslip_active,
        icon: ic_betslip,
        label: "注单",
        path: "/betslip",
    },
    {
        select: ic_profile_active,
        icon: ic_profile,
        label: "我的",
        path: "/profile",
    },
]);
const active = ref(0);
const tabbarItemRef = ref();
const iconSelectRef = ref();
const router = useRouter();
const { token } = storeToRefs(useStore());

const left = computed(() => {
    const item_w = +tabbarItemRef.value?.[0]?.$el?.offsetWidth;
    const select_w = iconSelectRef.value?.offsetWidth;
    return active.value * item_w - (select_w - item_w) / 2;
});

const toPage = (prev: number, path: string) => {
    if (prev < active.value) {
        router.replace(path);
        return;
    }
    router.push(path);
};

const beforeChange = async (name: string) => {
    const index = tabs.value.findIndex(item => item.path == name);
    switch (name) {
        case "/betslip":
            if (token) {
                const status = authToPage();
                if (!status) return false;
                toPage(index, name);
            }
            return false;
        default:
            toPage(index, name);
            return false;
    }
};

watch(
    route,
    () => {
        const index = computed(() => tabs.value?.findIndex(item => item.path === route.fullPath));
        active.value = index.value;
    },
    { immediate: true }
);
</script>

<style lang="scss" scoped>
.tabbar {
    img {
        max-width: initial !important;
        margin: 0 auto;
    }
    .van-tabbar-item__icon {
        img {
            height: initial;
        }
    }
}
</style>
