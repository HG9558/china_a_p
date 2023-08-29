import { createApp } from "vue";
import { createPinia } from "pinia";
import { Lazyload } from "vant";

import App from "./App.vue";
import i18n from "./locales";
import router from "./router";
import logo from "@/assets/logo/logo_default.png";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import registerHammerDirective from "@/utils/hammer";

import "./cnzz";
import "./utils/orientation";
import "./utils/listeners";
import "./iconfont/iconfont.css";
import "./styles/vant.scss";
import "./styles/global.scss";
import "./styles/9patch.scss";
import "./styles/tailwindcss.scss";
import "./fontFamily/index.scss";
import "vant/es/toast/style";
import "vant/es/dialog/style";
import "swiper/css";
import "swiper/css/virtual";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "nprogress/nprogress.css";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
const app = createApp(App);

i18n(app);
app.use(registerHammerDirective);
app.use(Lazyload, {
    error: logo,
    loading: logo,
});
if (localStorage.getItem("uuid")?.length == 32) {
    app.use(router);
    app.use(createPinia());
    app.mount("#app");
} else {
    FingerprintJS.load().then(fp =>
        fp.get().then(({ visitorId }) => {
            localStorage.setItem("uuid", visitorId);
            app.use(router);
            app.use(createPinia());
            app.mount("#app");
        })
    );
}
