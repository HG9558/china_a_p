<!-- 设置头像 -->
<template>
    <VanPopup :round="true" v-model:show="showBottom" position="bottom">
        <div class="bg-txt">
            <div class="relative w-full h-12 flex items-center text-white justify-between px-4">
                <i class="icon-close-bold text-2xl" @click="close" />
                <p class="font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    选择头像
                </p>
                <VanButton
                    class="border-0 h-[30px] text-17px text-white rounded-full whitespace-nowrap"
                    @click="submit()"
                >
                    确定
                </VanButton>
            </div>
            <template v-if="list?.[0]">
                <SwiperBox type="default" :list="Array(Math.ceil(list.length / 20))" pagination>
                    <template v-slot="{ index: i }">
                        <ul
                            :key="i"
                            class="grid grid-rows-5 grid-cols-4 gap-5 py-5 px-4 bg-white rounded-t-2xl"
                        >
                            <li
                                :key="index"
                                @dblclick="submit()"
                                @click="activeAvatar = item.value"
                                v-for="(item, index) in list.slice(i * 20, i * 20 + 20)"
                                class="w-[68px] h-[68px] rounded-full overflow-hidden relative select-none flex items-center justify-center"
                            >
                                <div
                                    class="absolute top-0 left-0 w-full h-full flex items-center justify-center p-[1px]"
                                    :style="
                                        activeAvatar === item.value
                                            ? `background: linear-gradient(
                                            360deg,
                                            rgba(71, 95, 217, 1),
                                            rgba(107, 228, 255, 1)
                                        );`
                                            : ''
                                    "
                                >
                                    <div
                                        class="w-full h-full flex items-center justify-center rounded-full bg-white"
                                    >
                                        <img
                                            v-lazy="item.url"
                                            class="w-[60px] h-[60px] rounded-full"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </template>
                </SwiperBox>
            </template>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { useAsync } from "@/stores/useAsync";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import SwiperBox from "@/components/SwiperBox.vue";

const { init } = storeToRefs(useAsync());

const props = defineProps<{ modelValue: boolean }>();

const emits = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
    (e: "submit", value: string): void;
}>();

const activeAvatar = ref<string>("");

const list = computed(() => {
    const avatars = init?.value?.avatars;
    return avatars?.avatars?.map(item => ({ url: `${avatars?.host + item}`, value: item }));
});

const showBottom = computed({
    get() {
        return props.modelValue;
    },
    set(v) {
        close();
    },
});

const submit = () => {
    emits("submit", activeAvatar.value);
    close();
};

const close = () => {
    emits("update:modelValue", false);
};
</script>
