import { useStore } from "@/stores";
import { showToast } from "vant";
import { throttle } from ".";
import { storeToRefs } from "pinia";
import Local from "./Local";

(() => {
    const setRem = () => {
        let width = document.documentElement.clientWidth || document.body.clientWidth;
        throttle(() => {
            const { setGlobelKey } = useStore();
            setGlobelKey(width);
        }, 200)();
        if (width > 640) {
            document.documentElement.style.fontSize = 16 + "px";
            return;
        }
        const baseSize = 32;
        const scale = document.documentElement.clientWidth / 750;
        document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + "px";
    };
    setRem();
    window.addEventListener("resize", setRem);
    window.addEventListener("load", () => setRem());
    document.addEventListener("gesturestart", e => e.preventDefault());
    document.addEventListener("dblclick", e => e.stopPropagation());
    window.addEventListener("beforeunload", e => {
        const { oneTime } = storeToRefs(useStore());
        if (/[1-9]/.test(`${oneTime.value}`)) Local.set("oneTime", oneTime.value);
    });
    window.addEventListener("offline", e => {
        const { setLine } = useStore();
        showToast("您的网络似乎出现了问题");
        setLine(false);
    });
    window.addEventListener("online", e => {
        const { setLine } = useStore();
        showToast("网络已恢复");
        setLine(true);
    });
})();
