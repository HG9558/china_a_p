<!-- 全局loading组件 -->
<template>
    <VanToast
        class="loading_toast"
        v-model:show="loading"
        :duration="0"
        :forbid-click="!showBetTip"
    >
        <template #message>
            <div class="sk-circle">
                <div
                    :class="[`sk-circle${index + 1}`, 'sk-child']"
                    v-for="index in 12"
                    :key="index"
                ></div>
            </div>
        </template>
    </VanToast>
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const { loading, showMatches } = storeToRefs(store);
const route = useRoute();

const showRegExp = ref<RegExp>(/(home|entertain|match)/i);

const showBetTip = computed(() => showRegExp.value.test(route.name as string));
</script>

<style lang="scss">
.loading_toast {
    &.van-toast {
        background-color: transparent;
        backdrop-filter: initial;
        box-shadow: initial;
        border: 0;
    }
}

.sk-circle {
    margin: 0 auto;
    width: 40px;
    height: 40px;
    position: relative;
    .sk-child {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        &:before {
            content: "";
            display: block;
            margin: 0 auto;
            width: 15%;
            height: 15%;
            border-radius: 100%;
            background-color: $primary;
            animation: sk-circleBounceDelay 1s infinite ease-in-out both;
        }
    }
    @for $i from 1 through 11 {
        .sk-circle#{$i + 1} {
            transform: rotate(#{$i * 30}deg);
            &::before {
                animation-delay: -#{1.1 - ($i * 0.1)}s;
            }
        }
    }
}
@keyframes sk-circleBounceDelay {
    0%,
    80%,
    100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
}
</style>
