// ob加解密
import pako from "pako";

const to_Uint8Array = (b64Data: string) => {
    let ret = null;
    let strData = atob(b64Data);
    if (strData) {
        let charData = strData.split("").map(x => x.charCodeAt(0));
        if (charData) {
            let binData = new Uint8Array(charData);
            ret = binData;
        }
    }
    return ret;
};

export const matchDecrypt = (word: any) => {
    let res;
    try {
        if (word) {
            let binData = to_Uint8Array(word);
            if (binData) {
                word = pako.inflate(binData);
                if (word) {
                    res = new TextDecoder().decode(word);
                    if (res) {
                        res = JSON.parse(decodeURIComponent(res));
                    }
                }
            }
        } else {
            res = word;
        }
    } catch (error) {
        res = word;
    }

    return res;
};
