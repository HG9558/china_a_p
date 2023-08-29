import type { HP } from "@/api/obsportend/obMatches/types";
import type { BetAmountInfo, QueryLatestMarketInfoList } from "@/api/obsportend/obSport/types";
import type { GList, GameList } from "@/api/platform/types";
import { Value } from "@/stores/types";

export const queryLatestMarketInfoList = (betList: string, resData: string) => {
    // 下注 BetPopup
    const _betList: Map<string, Value> = new Map(JSON.parse(betList));
    const _resData: QueryLatestMarketInfoList[] = JSON.parse(resData);
    Array.from(_betList.values())?.forEach(item =>
        _resData?.some(v => {
            if (item?.hid === v?.id) {
                if (item.odds.oid === v.marketOddsList?.[0]?.id) {
                    item.odds = {
                        ...item.odds,
                        ov: v.marketOddsList?.[0]?.oddsValue.toString() || "0.00",
                        os: +v.marketOddsList?.[0]?.oddsStatus,
                    };
                    item.match = {
                        ...item.match,
                        mhs: +v.matchHandicapStatus,
                    };
                    item.hl = {
                        ...item.hl,
                        hs: +v.status,
                    };
                    item.oddsStatus = v.marketOddsList?.[0]?.oddsStatus;
                }
                return true;
            }
        })
    );
    return _betList;
};

export const countJointNumber = (betAmountInfo: string, resData: string) => {
    const _betAmountInfo: Map<string, BetAmountInfo> = new Map(JSON.parse(betAmountInfo));
    const _resData: BetAmountInfo[] = JSON.parse(resData);
    _resData?.forEach(item => {
        if (_betAmountInfo.get(item.type)) {
            const v = _betAmountInfo.get(item.type);
            _betAmountInfo.set(item.type, {
                ...item,
                minBet: v?.minBet!,
                orderMaxPay: v?.orderMaxPay!,
                betAmount: v?.betAmount || "",
            });
        } else {
            _betAmountInfo.set(item.type, item);
        }
    });
    return _betAmountInfo;
};

export const getMatchOddsInfoPB = (resData: string, oldValue: string) => {
    // 赛事详情
    const _resData: HP[] = JSON.parse(resData);
    const _oldValue: HP[] = JSON.parse(oldValue);

    const mergedArray: HP[] = _resData?.map((item: HP) => {
        const existingItem: HP | undefined = _oldValue.find(i => i.hpn === item.hpn);
        if (existingItem) {
            const isHide: boolean = existingItem.isHide!;
            return { ...item, isHide };
        }
        return item;
    });
    return mergedArray;
};

export const getMatchOddsInfoPBSort = (resData: string) => {
    const _resData: HP[] = JSON.parse(resData);
    _resData?.sort((a, b) => +b.hton! - +a.hton!);
};

export const getBetListByGame = (gameList: string, resData: string) => {
    // 注单 -> 游戏
    const _gameList: GameList[] = JSON.parse(gameList);
    const _resData: GList[] = JSON.parse(resData);

    const data = _gameList?.reduce((acc: any[], item) => {
        const data = _resData?.find(v => +item.platListId == v.gamePlatId && item.id == v.gameId);
        if (data) {
            acc.push({ ...item, ...data });
            return acc;
        }
        acc.push({ ...item, totalAmount: "0.00", totalBet: "0", totalProfit: "0.00" });
        return acc;
    }, []);

    return data;
};
