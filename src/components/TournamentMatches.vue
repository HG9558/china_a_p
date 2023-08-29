<!-- 赛事筛选 -->
<template>
    <div class="tournamentMatches">
        <VanPopup
            style="width: 100%; height: 100%"
            v-model:show="showMatches"
            position="right"
            :z-index="1000"
        >
            <div class="h-full flex flex-col tlw_top_bg">
                <header>
                    <NavBar
                        transparent
                        :nav-bar-props="{ title: '选择联赛' }"
                        :clickLeft="clickLeft"
                    >
                    </NavBar>
                </header>
                <main class="flex-1 overflow-hidden relative rounded-t-20px bg-mainBg z-0">
                    <van-index-bar :index-list="indexList">
                        <div v-for="(item, index) in tournamentMatchesList" :key="item.tnS">
                            <van-index-anchor :index="item.tnS" />
                            <van-checkbox-group
                                ref="checkboxGroup"
                                v-model="checkeds[index]"
                                class="pr-10"
                            >
                                <van-cell-group :border="false" inset>
                                    <van-cell
                                        v-for="(v, i) in item.list"
                                        :key="i"
                                        clickable
                                        :border="false"
                                    >
                                        <template #title>
                                            <div class="flex items-center">
                                                <div
                                                    v-if="checkbox"
                                                    class="flex items-center flex-1 relative"
                                                >
                                                    <van-checkbox
                                                        checked-color="#4B6CDB"
                                                        class="absolute w-full h-full opacity-0"
                                                        :name="v.tid"
                                                        shape="square"
                                                    >
                                                    </van-checkbox>
                                                    <img
                                                        class="w-5 h-5 object-cover mr-3 flex-shrink-0 bg-mainBg rounded-full"
                                                        v-lazy="v.lurl"
                                                        alt=""
                                                    />
                                                    <p
                                                        class="flex-1 h-[42px] bg-mainBg rounded-xl leading-[42px] line-clamp-1 pl-3"
                                                        :class="{
                                                            '!bg-txt text-white': isCheck(
                                                                checkeds?.[index],
                                                                v.tid
                                                            ),
                                                        }"
                                                    >
                                                        {{ v.tn }}
                                                    </p>
                                                </div>
                                                <template v-else>
                                                    <img
                                                        class="w-7 h-7 object-cover"
                                                        :src="v.lurl"
                                                        alt=""
                                                    />
                                                    <span class="ml-3">
                                                        {{ v.tn }}
                                                    </span>
                                                </template>
                                            </div>
                                        </template>
                                    </van-cell>
                                </van-cell-group>
                            </van-checkbox-group>
                        </div>
                    </van-index-bar>
                    <NoData v-show="!loading && !tournamentMatchesList?.[0]" />
                </main>
                <footer class="footer relative">
                    <div class="absolute left-0 -top-2 h-5 w-full bg-mainBg z-0"></div>
                    <div
                        class="w-full flex items-center p-3 justify-between shadow-[0px_-3px_8px_0px_rgba(172,177,200,0.16)] rounded-t-lg bg-white z-10 relative"
                    >
                        <van-checkbox
                            shape="square"
                            checked-color="#4B6CDB"
                            :model-value="checkedAll"
                            icon-size="1rem"
                        >
                            <span
                                class="text-txt text-15px font-semibold"
                                @click.stop="toggleAll(true)"
                            >
                                全选
                            </span>
                            <span
                                class="text-txt text-15px font-semibold ml-4"
                                @click.stop="toggleAll(false)"
                            >
                                反选
                            </span>
                        </van-checkbox>
                        <div class="flex items-center">
                            <p class="mr-4 text-sm flex items-center">
                                <span class="text-txt"> 已选择 {{ slectCount }}/</span>
                                <span>{{ checkeTotal }}</span>
                            </p>
                            <VanButton
                                class="rounded-xl text-15px tlw_btn_linear w-[86px] h-11 px-5 text-white border-0"
                                :disabled="slectCount <= 0"
                                @click="submit"
                            >
                                确定
                            </VanButton>
                        </div>
                    </div>
                </footer>
            </div>
        </VanPopup>
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { GetTournamentMatches } from "@/api/obsportend/obHome/types";
import { useStore } from "@/stores";
import { storeToRefs } from "pinia";
import type { CheckboxGroupInstance } from "vant";
import { computed, ref, toRefs, nextTick, watch } from "vue";
import NoData from "./NoData.vue";
import NavBar from "@/components/NavBar.vue";

const { setShowMatches, setLoading } = useStore();
const { showMatches, loading } = storeToRefs(useStore());
const tournamentMatchesList = ref<GetTournamentMatches[]>();
const checkboxGroup = ref<CheckboxGroupInstance[]>();
const checkeds = ref<string[][]>([]);
const slectCount = ref<number>(0);
const checkeTotal = ref<number>(0);
const indexList = ref<string[]>();
const propsEuid = ref<string | undefined>("");

const emits = defineEmits<{ (event: "submit", tid: string): void }>();

const props = withDefaults(defineProps<{ checkbox?: boolean; euid?: string }>(), {
    checkbox: true,
});

const isCheck = computed(() => (arr: string[], tid: string) => arr?.includes(tid));

const getTournamentMatches = async (euid: string) => {
    if (propsEuid.value == props.euid && slectCount.value != checkeTotal.value) return;
    if (propsEuid.value != props.euid) {
        checkeds.value = [];
        tournamentMatchesList.value = [];
    }
    setLoading(true);
    const res = await API.getTournamentMatches({ euid });
    setLoading(false);
    if (res.code === 0) {
        tournamentMatchesList.value = res.data!;
        indexList.value = res.data?.map(item => item.tnS);
        checkeTotal.value = res.data?.reduce((prev, item) => prev + item.list?.length, 0)!;
        nextTick(() => toggleAll(true));
    }
};

const getTournamentMatchesBySportId = async (sportId: string) => {
    if (propsEuid.value == props.euid && slectCount.value != checkeTotal.value) return;
    if (propsEuid.value != props.euid) {
        checkeds.value = [];
        tournamentMatchesList.value = [];
    }
    setLoading(true);
    const res = await API.getTournamentMatchesBySportId({ sportId });
    setLoading(false);
    if (res.code === 0) {
        tournamentMatchesList.value = res.data!;
        indexList.value = res.data?.map(item => item.tnS);
        checkeTotal.value = res.data?.reduce((prev, item) => prev + item.list?.length, 0)!;
        nextTick(() => toggleAll(true));
    }
};

const toggleAll = (value?: boolean) => {
    // const status = value ? value : !checkedAll.value;
    if (value) checkboxGroup.value?.forEach(item => item.toggleAll(true));
    if (!value) checkboxGroup.value?.forEach(item => item.toggleAll());
};

const clickLeft = () => {
    setShowMatches(false);
    if (propsEuid.value == props.euid && slectCount.value != checkeTotal.value) return;
    checkeds.value = [];
    tournamentMatchesList.value = [];
};

const submit = () => {
    const tids: string[] = [];
    checkeds.value?.forEach((item: string[]) => item.forEach(v => tids.push(v)));
    emits("submit", tids.join(","));
    clickLeft();
};

const checkedAll = computed(() => {
    const selectTotal = checkeds.value?.reduce((prev, item) => prev + item.length, 0);
    slectCount.value = selectTotal || 0;
    if (checkeTotal.value === 0 || selectTotal === 0) return false;
    return selectTotal === checkeTotal.value;
});

const { checkbox } = toRefs(props);
propsEuid.value = props.euid;

watch(
    () => showMatches.value,
    n => {
        if (n) {
            propsEuid.value = props.euid;
        }
    }
);

defineExpose({ getTournamentMatches, getTournamentMatchesBySportId, list: tournamentMatchesList });
</script>

<style lang="scss">
.tournamentMatches {
    .van-popup {
        .van-index-bar {
            height: 98%;
            padding-top: 10px;
            padding-bottom: 50px;
            background: white;
            border-radius: 20px;
            overflow-y: auto;
            .van-index-anchor {
                color: #303033;
                padding-left: 20px;
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
        }
        .van-checkbox-group {
            background: initial;
            .van-cell-group {
                background: initial;
                .van-cell {
                    padding: 0;
                    margin-bottom: 10px;
                    background: transparent;
                    .van-checkbox {
                        flex: 1;
                        .van-checkbox__label {
                            flex: 1;
                            overflow: hidden;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 1;
                        }
                    }
                    .van-cell__value {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                    }
                }
            }
        }
        .footer {
            .van-checkbox {
                .van-icon {
                    border-radius: 50%;
                    overflow: hidden;
                }
                .van-checkbox__icon--checked {
                    .van-icon {
                        background: #4b6cdb;
                        border: 1px solid #4b6cdb;
                    }
                }
            }
        }
    }
}
</style>
