<!-- 冠军组件 -->
<template>
    <div class="championItem w-full h-full overflow-y-auto bg-white">
        <van-index-bar :index-list="indexList">
            <div v-for="item in list" :key="item.tnS">
                <van-index-anchor :index="item.tnS" />
                <van-checkbox-group ref="checkboxGroup" class="pr-10">
                    <van-cell-group :border="false" inset>
                        <van-cell
                            :key="i"
                            clickable
                            :border="false"
                            @click="submit(v)"
                            v-for="(v, i) in item.list"
                        >
                            <template #title>
                                <div class="flex items-center">
                                    <img class="w-7 h-7 object-cover" :src="v.lurl" alt="" />
                                    <span class="ml-3 line-clamp-1">
                                        {{ v.tn }}
                                    </span>
                                </div>
                            </template>
                        </van-cell>
                    </van-cell-group>
                </van-checkbox-group>
            </div>
        </van-index-bar>
    </div>
</template>

<script setup lang="ts">
import type { GetTournamentMatches, TList } from "@/api/obsportend/obHome/types";
import { toRefs } from "vue";

const emits = defineEmits<{ (e: "submit", item: TList): void }>();
const props = defineProps<{ list: GetTournamentMatches[]; indexList: string[] }>();

const submit = (item: TList) => {
    emits("submit", item);
};

const { list } = toRefs(props);
</script>

<style lang="scss" scoped>
.championItem {
    ::v-deep(.van-index-bar) {
        height: 100%;
        padding-top: 10px;
        padding-bottom: 50px;
        overflow-y: auto;
        .van-index-anchor {
            color: #8a8a8a;
        }
        .van-index-bar__sidebar {
            width: 25px;
            right: 16px;
            padding: 10px 0;
            border-radius: 6px;
            background: #f5f5f5;
            .van-index-bar__index {
                padding: 0;
                line-height: 20px;
                &:not(.van-index-bar__index--active) {
                    color: #c2c2c2;
                }
                &.van-index-bar__index--active {
                    font-weight: 500;
                    transform: scale(1.3);
                }
            }
        }
        .van-cell-group--inset {
            border-radius: initial;
        }
        .van-cell-group {
            background: initial;
            .van-cell {
                margin-bottom: 10px;
                border-radius: 12px;
                padding: 7px 16px;
                background: #f5f5f5f5;
            }
        }
    }
}
</style>
