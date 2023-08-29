import CryptoJS from "crypto-js"; //引用AES源码js
import { useStore } from "@/stores";

const key = () => {
    //密钥
    const uuid = localStorage.getItem("uuid") || useStore().uuid;
    return CryptoJS.enc.Utf8.parse(uuid);
};

const iv = CryptoJS.enc.Utf8.parse(""); //偏移量

export const decrypt = (word: string) => {
    //解密方法
    let decryptedStr;
    let base64 = CryptoJS.enc.Base64.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(base64);
    let decrypt = CryptoJS.AES.decrypt(srcs, key(), {
        // iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    try {
        decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString().replace(/[\r\n]/g, "");
    } catch (error) {
        localStorage.clear();
    }
};

export const encrypt = (word: string) => {
    //加密方法
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key(), {
        // iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
};
