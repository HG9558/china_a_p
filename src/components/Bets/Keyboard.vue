<!-- 下注 虚拟键盘 -->
<template>
    <div
        class="w-full sm:w-[360px] font-OPPO_B rounded-20px bg-mainBg grid grid-cols-4 mx-auto text-mainText text-[20px]"
    >
        <div class="col-span-3 grid grid-cols-3 gap-x-[1px]">
            <p
                class="h-[50px] bg-gradient-to-b from-[#fefefe] to-mainBg cursor-pointer flex items-center text-[27px] justify-center active:scale-95"
                :class="{ 'pb-4 text-3xl': item == '.' }"
                v-for="(item, index) in keys"
                @click.stop="select(item)"
                :key="index"
            >
                {{ item }}
            </p>
            <p
                class="h-[50px] bg-gradient-to-b from-[#fefefe] to-mainBg cursor-pointer flex items-center justify-center active:scale-95"
                @click.stop="select('del')"
            >
                <i class="iconfont icon-huitui !text-2xl font-normal" />
            </p>
        </div>
        <div class="col-span-1 grid grid-rows-4">
            <p
                class="h-[50px] bg-gradient-to-b from-[#F4F8FD] to-[#E8EEF6] cursor-pointer flex text-[19px] items-center justify-center active:scale-95 text-[#5E6A7A]"
                :class="{ '!text-[#255AD8]': index === adds.length - 1 }"
                v-for="(item, index) in adds"
                @click.stop="select(item)"
                :key="index"
            >
                {{ item }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from "@/stores";
import { storeToRefs } from "pinia";
import { ref, toRefs } from "vue";

const reg = /^([1-9]{1}[0-9]{0,7})(\.\d{0,2})?$|^([1-9]{1}[0-9]{0,6}\.\d{0,2})$/;
const keys = ref<string[]>(["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"]);
const adds = ref<string[]>(["+100", "+200", "+500", "MAX"]);

const { user } = storeToRefs(useStore());

const emits = defineEmits<{
    (e: "change", value: string): void;
}>();

const props = defineProps<{ value: string }>();

const select = (item: string) => {
    let _value = "";
    let betAmount = value.value;
    switch (item) {
        case "del":
            _value = betAmount.slice(0, betAmount.length - 1);
            break;
        case "+100":
        case "+200":
        case "+500":
            _value = (+betAmount + +item.slice(1)).toString();
            break;
        case "MAX":
            _value = user.value?.coin!;
            break;
        default:
            _value = betAmount + item;
            break;
    }
    if (reg.test(_value) || !_value.trim()) {
        betAmount = _value;
        emits("change", _value);
    }
};

const { value } = toRefs(props);
</script>
