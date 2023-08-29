<!-- container 需要注意,让除ios以外(ios真机自带回弹),有滚动回弹效果 -->
<template>
    <div class="h-full overflow-y-auto" v-if="noScroll" @scroll="transition">
        <slot></slot>
    </div>
    <Swiper
        v-else
        ref="swiperRef"
        v-bind="swiperProps"
        :modules="_modules"
        @set-transition="transition"
        @reach-beginning="reachBeginning"
        @reach-end="reachEnd"
        @slideChange="slideChange"
        :update-on-window-resize="true"
        @swiper="onSwiper"
        :class="{ container: type === 'container' }"
    >
        <swiper-slide :key="index" @click="emits('click', item)" v-for="(item, index) in list">
            <slot :item="item" :index="index"></slot>
        </swiper-slide>
    </Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Mousewheel, Scrollbar, Pagination, Autoplay, Virtual } from "swiper";
import { ref, nextTick, useAttrs, computed } from "vue";
import { isIOS } from "@/utils";
import type { Swiper as TSwiper, SwiperOptions } from "swiper/types";

interface Emits {
    (event: "click", item: any): void;
    (event: "swiper", item: TSwiper): void;
    (e: "start"): Promise<Boolean>;
    (e: "end"): Promise<Boolean>;
    (e: "scroll", value: any): void;
    (e: "slideChange", value: TSwiper): void;
}
interface Iprops {
    list?: any[];
    type?: "freemode" | "container" | "default" | "virtual";
    swiperOptions?: SwiperOptions;
}

const attrs = useAttrs();

const noScroll = computed(() => {
    return isIOS() && attrs.direction !== "horizontal" && props.type == "container";
});

// type 不等于 container list为必传
const props = withDefaults(defineProps<Iprops>(), { list: Array, type: "container" });

const emits = defineEmits<Emits>();
const swiperRef = ref<TSwiper>();

const slideChange = (swiper: TSwiper) => {
    emits("slideChange", swiper);
};

const onSwiper = (swiper: TSwiper) => {
    swiperRef.value = swiper;
};
const update = () => {
    nextTick(() => {
        swiperRef.value?.update?.();
    });
};

const list = computed(() => (props.type === "container" ? 1 : props?.list));

const swiperModes = {
    freemode: {
        freeMode: true,
        slidesPerView: 4.3,
        spaceBetween: 0,
    },
    virtual: {
        virtual: true,
    },
    container: {
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: true,
        mousewheel: true,
    },
    default: {
        grabCursor: true,
        slidesPerView: 1,
        effect: "creative",
    },
};

const swiperProps: object = computed(() => swiperModes[props.type!]);

const modulesProps = {
    freemode: [FreeMode, Pagination],
    container: [FreeMode, Mousewheel, Scrollbar],
    virtual: [Virtual],
    default: [Pagination, Autoplay],
};
const _modules = computed(() => modulesProps[props.type!]);

const transition = (e: any) => {
    emits("scroll", e);
};

const reachBeginning = () => {
    emits("start");
};
const reachEnd = () => {
    if (swiperRef.value?.isEnd) {
        emits("end");
    }
};

defineExpose({ update, swiperRef });
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    .swiper-slide {
        height: auto;
        width: auto;
    }

    &::v-deep(.swiper-scrollbar-horizontal) {
        .swiper-scrollbar-drag {
            background: #334abf;
        }
    }
    &.setScrollbar::v-deep(.swiper-scrollbar-horizontal) {
        width: 45px;
        height: 3px;
        margin: 0 auto;
        left: 50%;
        bottom: 0px;
        transform: translateX(-50%);
    }
}
</style>
