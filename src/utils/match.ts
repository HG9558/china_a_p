import { useAsync } from "@/stores/useAsync";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { HP, Datum } from "@/api/obsportend/obMatches/types";
import { Value } from "@/stores/types";
import { useBets } from "@/stores/useBets";

interface Istage {
    [num: string]: { [num: string]: string };
}

export const isFootBall = (csid: string) => csid == "1"; //足球
export const isBasketball = (csid: string) => csid == "2"; //篮球
export const isBaseball = (csid: string) => csid == "3"; //棒球
export const isPuck = (csid: string) => csid == "4"; //冰球
export const isTennis = (csid: string) => csid == "5"; //网球
export const isAmericanBall = (csid: string) => csid == "6"; //美式足球
export const isSnooker = (csid: string) => csid == "7"; //斯诺克
export const isPingpong = (csid: string) => csid == "8"; //乒乓球
export const isVolleyball = (csid: string) => csid == "9"; //排球
export const isBadminton = (csid: string) => csid == "10"; //羽毛球
export const isPolitical = (csid: string) => csid == "18"; //政治娱乐

export const isPlayVideo = (mms: number) => mms == 2; //视频
export const isPlayAnim = (mvs: number) => Number(mvs) >= 1; //动画
export const noStart = (mmp: string) => mmp == "0"; //未开赛

export const ovTransition = (ov: string, hsw: string) => {
    if (ov) {
        const { sports } = storeToRefs(useAsync());
        const market = sports.value?.market;
        const num = (+ov / 100000).toFixed?.(2);
        const regs = new RegExp(`(${hsw.replace(/(,)/g, "|")})`);
        const handleNum = market == 2 && regs.test(market.toString()) ? +num - 1 : +num;
        return Number(handleNum).toFixed?.(2);
    }
    return "0.00";
};

export const addThousandSeparator = (number: number) => {
    // 千分位
    const amount = number.toString();
    var parts = amount.split(".");
    var integerPart = parts[0];
    var decimalPart = parts.length > 1 ? "." + parts[1] : "";
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return integerPart + decimalPart;
};

type ImatchStatus = "Opened" | "Close" | "Seal" | "Lock" | undefined;
// Close 关盘
// queryLatestMarketInfoList 接口对应 matchHandicapStatus->mhs  status->hs  oddsStatus->os
export const matchStatus = (
    mhs: number | string,
    hs: number | string,
    os: number | string
): ImatchStatus => {
    if (+mhs != 0) {
        switch (mhs) {
            case 1: //封
                return "Seal";
            case 2: //关
                return "Close";
            case 11: //锁
                return "Lock";
            default:
                return undefined;
        }
    }
    if (+hs != 0) {
        switch (hs) {
            case 1: //封
                return "Seal";
            case 2: //关
                return "Close";
            case 11: //锁
                return "Lock";
            default:
                return undefined;
        }
    }
    switch (+os) {
        case 1:
            return "Opened";
        case 2:
            return "Seal";
        case 3: //关
            return "Close";
        case 4:
            return "Lock";
        default:
            return undefined;
    }
};

export const leftText = (item: Value) => {
    return item.odds.ots == "T1"
        ? `${item.match.mhn}${item.odds.on}`
        : `${item.match.man}${item.odds.on}`;
};

export const rightText = (item: Value): string => {
    if (!item.odds.otv) {
        return item.odds.ots == "T1"
            ? `${item.match.mhn} ${item.odds.on}`
            : `${item.match.man} ${item.odds.on}`;
    }
    if (/(3|69|71)/.test(item.hp.hpid)) return item.odds.otv.replace(" ", "");
    return item.odds.otv;
};

export const marketTypeFinally = (hsw: string): string => {
    const { sports } = storeToRefs(useAsync());
    const market = sports.value?.market;
    return !!~hsw.indexOf("2") ? (market == 2 ? "HK" : "EU") : "EU";
};

export const mscSplit = (msc?: string[]) =>
    msc?.reduce((prev: any, item) => {
        const [title, score] = item.split("|");
        prev[title] = score.split(":");
        return prev;
    }, {});

export const getScoresOrigin = (item: string[]) => {
    if (item && item?.length > 0) {
        const splitData = item?.[0]?.split("|");
        return splitData[1] || "";
    }
    return "";
};

export const durationTime = (time: string) => {
    if (!+time) return "";
    const ss = +time % 60;
    const mm = (+time - ss) / 60;
    const min = `${mm}`.padStart(2, "0");
    const sec = `${ss}`.padStart(2, "0");
    return `${min}:${sec}`;
};

export const transitionMatchType = (hmt: number = 3) => {
    const hmts: { [name: number]: number } = {
        0: 2,
        1: 1,
    };
    return hmts[hmt] || 3;
};

export const mcgToString = computed(() => (mcg: number) => {
    const types: { [name: number]: string } = {
        1: "滚球",
        2: "即将开赛",
        3: "今日赛事",
        4: "早盘",
    };
    return types[mcg] || "";
});

export const seriesType = (type: string): string => {
    const types: { [name: string]: string } = {
        "1": "单关",
        "2001": "2串1",
        "3001": "3串1",
        "3004": "3串4",
        "4001": "4串1",
        "40011": "4串11",
        "5001": "5串1",
        "50026": "5串26",
        "6001": "6串1",
        "60057": "6串57",
        "7001": "7串1",
        "700120": "7串120",
        "8001": "8串1",
        "800247": "8串247",
        "9001": "9串1",
        "900502": "9串502",
        "10001": "10串1",
        "10001013": "10串1013",
    };
    return types[type] || "";
};

export const isSame = (details: Datum, osn: string, item: HP) => {
    if (item.hpid == "4" && details?.mhn == osn.replace(" ", "")) return details.mhlu?.[0];
    if (item.hpid == "4" && details?.man == osn.replace(" ", "")) return details.malu?.[0];
};

export const betActive = computed(() => (oid: string) => {
    // 下注选中状态
    const { betList, isSeries, singleCast } = storeToRefs(useBets());
    return (!!betList.value.get(oid) && isSeries.value) || singleCast.value.get(oid);
});

export const hpid = (hpid: string) => {
    const regsList = [
        2, 10, 11, 15, 18, 26, 34, 38, 40, 42, 45, 47, 51, 53, 57, 59, 63, 65, 74, 75, 78, 87, 88,
        92, 97, 98, 114, 115, 116, 118, 122, 123, 124, 127, 134, 145, 146, 156, 157, 160, 164, 165,
        169, 173, 177, 178, 183, 187, 198, 199, 217, 229, 233, 240, 245, 246, 247, 250, 251, 252,
        254, 257, 258, 262, 263, 264, 274, 276, 279, 281, 282, 295, 307, 309, 312, 313, 314, 315,
        316, 317, 325, 328, 330, 331, 332, 335, 372, 373, 374, 377, 378, 20002, 20012, 20014, 20019,
        20031, 20039, 20040,
    ];
    const regs = new RegExp(`(${regsList.join("|")})`);
    return !regs.test(hpid);
};

export const mmpToString = computed(() => (csid: string, mmp: string) => {
    const stage: Istage = {
        "1": {
            // 足球
            "6": "上半场",
            "7": "下半场",
            "33": "加时休息",
            "41": "加时上半场",
            "42": "加时下半场",
            "34": "即将点球",
            "50": "点球大战",
            "100": "下半场结束",
            "120": "点球大战结束",
            "0": "未开赛",
            "32": "等待加时",
            "31": "中场休息",
            "40": "加时赛",
            "61": "比赛推迟",
            "80": "比赛中断",
            "90": "比赛放弃",
            "110": "加时赛结束",
            "999": "全场结束",
        },
        "2": {
            // 篮球
            "1": "上半场",
            "2": "下半场",
            "13": "第一节",
            "301": "第二节",
            "14": "第二节",
            "302": "第三节",
            "15": "第三节",
            "303": "第四节",
            "16": "第四节",
            "100": "第四节",
            "0": "未开赛",
            "32": "等待加时",
            "31": "中场休息",
            "40": "加时赛",
            "61": "比赛推迟",
            "80": "比赛中断",
            "90": "比赛放弃",
            "110": "加时赛结束",
            "999": "全场结束",
        },
        "4": {
            // 冰球
            "1": "第一节",
            "2": "第二节",
            "3": "第三节",
            "301": "第二节",
            "302": "第三节",
            "100": "完赛",
            "50": "点球大战",
            "34": "即将点球",
            "120": "点球大战结束",
            "0": "未开赛",
            "32": "等待加时",
            "31": "中场休息",
            "40": "加时赛",
            "61": "比赛推迟",
            "80": "比赛中断",
            "90": "比赛放弃",
            "110": "加时赛结束",
            "999": "全场结束",
        },
        "5": {
            // 网球
            "8": "第一盘",
            "9": "第二盘",
            "10": "第三盘",
            "11": "第四盘",
            "12": "第五盘",
            "301": "第二盘",
            "302": "第三盘",
            "303": "第四盘",
            "304": "第五盘",
            "305": "完赛",
            "800": "第一盘",
            "900": "第二盘",
            "1000": "第三盘",
            "1100": "第四盘",
            "1200": "第五盘",
            "100": "完赛",
            "0": "未开赛",
            "32": "等待加时",
            "31": "中场休息",
            "40": "加时赛",
            "61": "比赛推迟",
            "80": "比赛中断",
            "90": "比赛放弃",
            "110": "加时赛结束",
            "999": "全场结束",
        },
        "7": {
            // 斯诺克
            "21": "进行中",
            "30": "暂停",
            "445": "局间休息",
            "100": "已结束",
            "0": "未开赛",
            "32": "等待加时",
            "31": "中场休息",
            "40": "加时赛",
            "61": "比赛推迟",
            "80": "比赛中断",
            "90": "比赛放弃",
            "110": "加时赛结束",
            "999": "全场结束",
        },
        "8": {
            // 乒乓球
            "8": "第一局",
            "9": "第二局",
            "10": "第三局",
            "11": "第四局",
            "12": "第五局",
            "441": "第六局",
            "442": "第七局",
            "301": "第二局",
            "302": "第三局",
            "303": "第四局",
            "304": "第五局",
            "305": "第六局",
            "306": "第七局",
            "100": "完赛",
            "0": "未开赛",
            "32": "等待加时",
            "31": "中场休息",
            "40": "加时赛",
            "61": "比赛推迟",
            "80": "比赛中断",
            "90": "比赛放弃",
            "110": "加时赛结束",
            "999": "全场结束",
        },
        "9": {
            // 排球
            "8": "第一局",
            "301": "第二局",
            "9": "第二局",
            "302": "第三局",
            "10": "第三局",
            "303": "第四局",
            "11": "第四局",
            "304": "第五局",
            "12": "第五局",
            "305": "第六局",
            "441": "第六局",
            "306": "第七局",
            "442": "第七局",
            "17": "第三局",
            "37": "第三局",
            "130": "完赛",
            "100": "完赛",
            "0": "未开始",
            "32": "等待加时",
            "31": "中场休息",
            "40": "加时赛",
            "61": "比赛推迟",
            "80": "比赛中断",
            "90": "比赛放弃",
            "110": "加时赛结束",
            "999": "全场结束",
        },
    };
    return stage[csid]?.[mmp] || "未开赛";
});
