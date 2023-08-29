import { computed } from "vue";

// 首页轮循定时器
export const hotTime = 10;

// 赛事轮循定时器
export const matchTime = computed(() => (menuType: number | null) => {
    switch (menuType) {
        case 1: //滚球
        case 6: //关注
            return 5;
        case 3: //今日
            return 7;
        case 11: //串关
            return 10;
        case 4: //早盘
        case 100: //冠军
        default:
            return 30;
    }
});

// 详情轮循定时器
export const detailTime = computed(
    () =>
        (ms: number = 0) =>
            ms == 1 ? 5 : 10
);

// 单注|串关  轮循定时器
export const betTime = 5;

// 检查PM游戏是否取消维护 定时器
export const checkObTime = 30;

// 一键回收 时间 10秒
export const oneTime = 10;
