import { useStore } from "@/stores";
import { useBets } from "@/stores/useBets";
import { encrypt, decrypt } from "./cryptoJS";
import { storeToRefs } from "pinia";
import { useMatch } from "@/stores/useMatch";

class Local {
    set(key: string, value: any) {
        if (!key.trim()) return;
        window.localStorage.setItem(key, encrypt(JSON.stringify(value)));
    }
    get(key: string) {
        if (!key.trim()) return;
        try {
            const json = <string>window.localStorage.getItem(key);
            if (!json) return;
            return JSON.parse(decrypt(json)!);
        } catch (error) {
            this.remove(key);
        }
    }
    remove(key: string) {
        if (!key.trim()) return;
        window.localStorage.removeItem(key);
    }
    clear() {
        const { clearMatch } = useMatch();
        const { loginInfo, uuid, homeDialogTip } = storeToRefs(useStore());
        const { setSOid, clearBetList } = useBets();
        const { setUser, setToken, setLoginInfo, setGameTip, setRecordTip, setHomeDialogTip } =
            useStore();
        const { setShowBetPopup } = useBets();
        const login = loginInfo.value;
        setUser(null);
        setToken(null);
        setLoginInfo(null);
        setShowBetPopup(false);
        setGameTip(false);
        setRecordTip(false);
        setSOid("");
        clearBetList();
        clearMatch();
        window.localStorage.clear();
        setLoginInfo(login);
        setHomeDialogTip(homeDialogTip.value);
        if (uuid.value) localStorage.setItem("uuid", uuid.value);
    }
}

export default new Local();
