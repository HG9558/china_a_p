<!-- 充值 底部弹出 -->
<template>
    <VanPopup
        round
        v-model:show="open"
        position="bottom"
        @closed="closed"
        :style="{ height: '95%' }"
        :safe-area-inset-top="true"
        :safe-area-inset-bottom="true"
    >
        <div class="popup_content h-full flex flex-col bg-[#F0F1F6]">
            <header class="h-12 text-center relative font-bold flex-shrink-0">
                <span class="absolute text-17px left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    充值金额
                </span>
                <i
                    class="icon-close-bold text-icon_a_t absolute right-3 top-1/2 text-2xl -translate-y-1/2"
                    @click="changeValue(false)"
                />
            </header>
            <div class="list_box flex-1 overflow-y-auto">
                <SwiperBox>
                    <p class="text-[40px] text-center font-bold">200.00</p>
                    <div
                        class="w-[242px] h-[242px] mx-auto mt-3 bg-white border box-border border-[#E8EAF3] rounded-[30px] overflow-hidden shadow-[0px -6px 10px 0px rgba(53,55,60,0.04)]"
                    >
                        <VueQrcode value="Hello, World!" tag="img" :options="{ width: 242 }" />
                    </div>
                    <p class="text-sm flex items-center justify-center mt-3 text-mainText">
                        请在
                        <van-count-down
                            ref="countDownRef"
                            class="mx-1 font-bold"
                            :auto-start="false"
                            :time="60000 * 15"
                            style="--van-count-down-text-color: red"
                        />
                        内完成支付
                    </p>
                    <p class="text-sm text-mainText text-center mt-3 mb-2">
                        成功付款后，将会自动到账，并提示到账
                    </p>
                    <div class="text-sm text-gz text-center flex items-center justify-center">
                        <span>充值如遇任何问题，请联系</span>
                        <div class="flex items-center" @click="toService">
                            <span class="text-txt mx-1">在线客服</span>
                            <i class="icon-erji text-lg ml-2 text-txt" />
                        </div>
                    </div>
                    <div class="flex items-center justify-center mt-7 mb-5">
                        <VanButton
                            @click="saveImg"
                            class="h-11 border border-txt text-txt rounded-xl w-[150px] mr-3"
                        >
                            保存至手机
                        </VanButton>
                        <VanButton
                            class="h-11 border-0 rounded-xl w-[150px] tlw_btn_linear text-white"
                        >
                            已完成支付
                        </VanButton>
                    </div>
                    <div class="text-13px px-3 pb-10">
                        <p class="font-bold mb-1 text-sm">支付说明</p>
                        <p class="text-gz leading-6 font-medium pl-1">
                            1.保存付款码至手机，
                            <span> 通过支付宝APP进行扫码支付 </span>； <br />
                            2.付款成功后，等待到账；<br />
                            3.您也可以在交易记录中查看 <br />
                            4.支付说明具体以后台配置为准，这里仅为内容填充效果。
                        </p>
                    </div>
                </SwiperBox>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import type { GameList } from "@/api/platform/types";
import { computed, nextTick } from "vue";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { isStandalone, toService } from "@/utils";
import { showToast } from "vant";
import type { CountDownInstance } from "vant";
import { ref } from "vue";
import SwiperBox from "@/components/SwiperBox.vue";

const countDownRef = ref<CountDownInstance>();

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", v: boolean): void;
    (e: "change", v: Partial<GameList>): void;
}>();

const open = computed({
    get() {
        return props.modelValue;
    },
    set(v) {
        changeValue(v);
    },
});

const saveImg = () => {
    if (isStandalone()) return showToast("请使用手机自带截图功能保持至相册");
    showToast("请长按二维码保存至相册");
};

const start = () => {
    nextTick(() => countDownRef.value?.start());
};

const closed = () => {
    countDownRef.value?.reset?.();
};

const changeValue = (v: boolean) => {
    emit("update:modelValue", v);
};

defineExpose({ start });
</script>
