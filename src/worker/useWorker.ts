import { Datum, MatchValue } from "@/api/obsportend/obMatches/types";

const mscSplit = (msc?: string[]) =>
    msc?.reduce((prev: any, item) => {
        const [title, score] = item.split("|");
        prev[title] = score.split(":");
        return prev;
    }, {});

export const getHotMatchesPageList = (
    resData: string,
    oldValue: string,
    cpn: string,
    receiveStatus: boolean = false
) => {
    // 首页|赛事
    const data: Datum[] = JSON.parse(resData);

    const oldObj: Map<string, MatchValue> = new Map(JSON.parse(oldValue));

    const list = data?.reduce((prev: Map<string, MatchValue>, item) => {
        const tid = item.tid + cpn;
        if (!prev.get(tid)) {
            prev.set(tid, {
                cpn,
                tid: tid,
                tn: item.tn,
                lurl: item.lurl,
                list: [{ ...item, mscs: mscSplit(item.msc) }],
                isHide: receiveStatus,
            });
        } else {
            if (prev.get(tid)?.list?.every(v => v.mid !== item.mid)) {
                prev.get(tid)?.list?.push({
                    ...item,
                    mscs: mscSplit(item.msc),
                    isHide: receiveStatus,
                });
            } else {
                prev.get(tid)?.list?.some((v, i) => {
                    if (v.mid == item.mid) {
                        prev.get(tid)!.list[i] = {
                            ...item,
                            left: v.left,
                            mscs: mscSplit(item.msc),
                            isHide: receiveStatus,
                        };
                        return true;
                    }
                });
            }
        }
        return prev;
    }, oldObj);
    return list;
};
