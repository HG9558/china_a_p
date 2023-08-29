<!-- 下拉刷新 上拉加载 -->
<template>
    <VanPullRefresh
        class="min-h-full"
        v-model="refreshing"
        @refresh="refresh"
        :success-text="successText"
        v-bind="props.pullRefreshProps"
    >
        <VanList
            v-model:loading="loading"
            :finished="props.finished"
            @load="onLoad"
            v-bind="props.listProps"
        >
            <slot></slot>
        </VanList>
    </VanPullRefresh>
</template>

<script setup lang="ts">
import type { PullRefreshProps } from "vant";
import type { ListProps } from "vant";
import { ref } from "vue";

type IPullRefreshProps = Partial<PullRefreshProps>;
type IListProps = Partial<ListProps>;

const props = withDefaults(
    defineProps<{
        pullRefreshProps?: IPullRefreshProps;
        listProps?: IListProps;
        refresh?: () => Promise<any>;
        onLoad?: () => Promise<any>;
        finished?: boolean;
    }>(),
    {
        finished: true,
    }
);

const refreshing = ref<boolean>(false);
const loading = ref<boolean>(false);
const successText = ref("刷新成功");

const refresh = async () => {
    if (!props.refresh) return;
    loading.value = true;
    await props.refresh?.();
    loading.value = false;
    refreshing.value = false;
};

const onLoad = async () => {
    if (!props.onLoad) return;
    await props.onLoad?.();
    loading.value = false;
};
</script>
