/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                PFSC: ["PingFang SC"],
                OPPO: ["OPPOSansRegular"],
                OPPO_M: ["OPPOSansMedium"],
                OPPO_B: ["OPPOSansBold"],
                AVENIR: ["Avenir"],
                PFSCM: ["PingFang SC-Medium"],
                PFSCS: ["PingFang SC-Semibold"],
                PFSCR: ["PingFang SC-Regular"],
                Roboto: ["Roboto"],
                DIN: ["DINRegular"],
                DINAlternateBold: ["DINAlternateBold"],
                AH: ["Avenir-Heavy Avenir"],
                AM: ["Avenir-Medium Avenir"],
                pingFang: ["PingFangSC-Regular"],
                AbhayaLibreSemiBold: ["AbhayaLibre-SemiBold"],
            },
            colors: {
                header_bg: "#3F54C6",
                main: "#334ABF",
                main_t: "#495FCE",
                mainText: "#303033",
                // mainBg: "#F0F1F6",
                mainBg: "#F5f5f5",
                inputBorder: "#C3C3C3",
                profile: "#7E470D", //暂定
                tip: "#EB6665",
                // 辅色
                gz: "#6F737B",
                fz: "#B6A372",
                fz_t: "#D7C49A",
                fz_r: "#EC3232",
                fz_g: "#0CB54E",
                fz_b: "#EAEAF2",
                fz_b: "#F3F3F5",
                // 字体
                txt: "#4B6CDB",
                txt_t: "#475DCD",
                txt_i: "#ADB2BD",
                txt_d: "#9BA1AE",
                // 图标
                icon_d: "#9BA1AE",
                icon_d_t: "#C0C4CE",
                icon_a: "#475FD9",
                icon_a_t: "#5880E8",
                icon_b: "#6279EE",
                icon_b_t: "#7B89D1",
            },
            fontSize: {
                "10px": "10px",
                "13px": "13px",
                "15px": "15px",
                "17px": "17px",
            },
            spacing: {
                "10px": "10px",
                "15px": "15px",
                "17px": "17px",
            },
            borderRadius: {
                "20px": "20px",
                "10px": "10px",
            },
        },
    },
    plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
