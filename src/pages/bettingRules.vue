<!-- 投注规则 -->
<template>
    <div class="h-full flex flex-col tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '投注规则' }">
            <template #right>
                <i class="icon-erji text-lg text-white" @click="toService" />
            </template>
        </NavBar>
        <div class="setTabs w-full pt-4 flex-1 rounded-t-20px bg-white overflow-hidden">
            <VanTabs type="card" :animated="true">
                <VanTab v-for="(item, index) in tabs" :key="index" :title="item.title">
                    <div class="bg-white h-full">
                        <component :is="item.component" class="bg-mainBg rounded-t-20px" />
                    </div>
                </VanTab>
            </VanTabs>
        </div>
    </div>
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import ComProblem from "@/components/BettingRules/ComProblem.vue";
import AllProblems from "@/components/BettingRules/AllProblems.vue";
import { toService } from "@/utils";
import NavBar from "@/components/NavBar.vue";

const tabs = shallowRef<{ title: string; component: any }[]>([
    { title: "常见问题", component: ComProblem },
    { title: "全部规则", component: AllProblems },
]);
</script>

<style lang="scss" scoped>
::v-deep(.van-tabs) {
    .van-tabs__wrap {
        height: 38px;
        margin-bottom: 16px;
        .van-tabs__nav {
            height: 38px;
            display: grid;
            gap: 10px;
            grid-template-columns: repeat(2, 1fr);
            &.van-tabs__nav--card {
                gap: 0;
                border: 0;
                border-radius: 12px;
                background: #f5f5f5;
            }
            .van-tab {
                flex: inherit;
                color: #6f737b;
                border-radius: 11px;
                &.van-tab--card {
                    border-right: 0;
                }
                &.van-tab--active {
                    border: 0;
                    color: #fff;
                    background: linear-gradient(90deg, #5881fc 3.95%, #4c67de 100%);
                }
            }
        }
    }
}
</style>
