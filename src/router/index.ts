import HomeVue from "@/pages/home/index.vue";
import { createRouter, createWebHistory } from "vue-router";
import { routeTransition } from "./routeTransition";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "index",
            component: HomeVue,
            redirect: "/match",
            children: [
                {
                    path: "/home",
                    name: "home",
                    component: () => import("@/pages/home/home.vue"),
                    meta: {
                        keepAlive: true,
                    },
                },
                {
                    path: "/entertain",
                    name: "entertain",
                    component: () => import("@/pages/home/entertain.vue"),
                    meta: {
                        keepAlive: true,
                    },
                },
                {
                    path: "/match",
                    name: "match",
                    component: () => import("@/pages/home/match.vue"),
                    meta: {
                        keepAlive: true,
                    },
                },
                {
                    path: "/betslip",
                    name: "betslip",
                    component: () => import("@/pages/home/betslip.vue"),
                    meta: {
                        keepAlive: true,
                        auth: true,
                    },
                },
                {
                    path: "/profile",
                    name: "profile",
                    component: () => import("@/pages/home/profile.vue"),
                    meta: {
                        keepAlive: true,
                        auth: false,
                    },
                },
            ],
        },
        {
            path: "/about",
            name: "about",
            component: () => import("@/pages/about.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/aboutItd",
            name: "aboutItd",
            component: () => import("@/pages/aboutItd.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/aboutPrivacy",
            name: "aboutPrivacy",
            component: () => import("@/pages/aboutPrivacy.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/aboutUse",
            name: "aboutUse",
            component: () => import("@/pages/aboutUse.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/account",
            name: "account",
            component: () => import("@/pages/account.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/activityInvite",
            name: "activityInvite",
            component: () => import("@/pages/activityInvite.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/activityRoutine",
            name: "activityRoutine",
            component: () => import("@/pages/activityRoutine.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/activityVenue",
            name: "activityVenue",
            component: () => import("@/pages/activityVenue.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/bettingRules",
            name: "bettingRules",
            component: () => import("@/pages/bettingRules.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/contactUs",
            name: "contactUs",
            component: () => import("@/pages/contactUs.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/details/:csid/:mid",
            name: "details",
            component: () => import("@/pages/details.vue"),
            meta: {
                keepAlive: false,
                auth: true,
            },
        },
        {
            path: "/deviceInfo",
            name: "deviceInfo",
            component: () => import("@/pages/deviceInfo.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/download",
            name: "download",
            component: () => import("@/pages/download.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/findPasswordWith",
            name: "findPasswordWith",
            component: () => import("@/pages/findPasswordWith.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/forget",
            name: "forget",
            component: () => import("@/pages/forget.vue"),
            meta: {
                keepAlive: false,
            },
        },
        {
            path: "/funding",
            name: "funding",
            component: () => import("@/pages/funding.vue"),
            meta: {
                keepAlive: false,
                auth: true,
            },
        },
        {
            path: "/gamehall/:platListId/:id/:title",
            name: "gamehall",
            component: () => import("@/pages/gamehall.vue"),
            meta: {
                keepAlive: false,
                auth: true,
            },
        },
        {
            path: "/helpCenter",
            name: "helpCenter",
            component: () => import("@/pages/helpCenter.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/marketing",
            name: "marketing",
            component: () => import("@/pages/marketing.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/pages/login/index.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/matchNotice",
            name: "matchNotice",
            component: () => import("@/pages/matchNotice.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/matchSetting",
            name: "matchSetting",
            component: () => import("@/pages/matchSetting.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/messageCenter",
            name: "messageCenter",
            component: () => import("@/pages/messageCenter.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/password",
            name: "password",
            component: () => import("@/pages/password.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/passwordWith",
            name: "passwordWith",
            component: () => import("@/pages/passwordWith.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/recharge",
            name: "recharge",
            component: () => import("@/pages/recharge.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/rechargeTutorial",
            name: "rechargeTutorial",
            component: () => import("@/pages/rechargeTutorial.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/recordActivity",
            name: "recordActivity",
            component: () => import("@/pages/recordActivity.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/securityCenter",
            name: "securityCenter",
            component: () => import("@/pages/securityCenter.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/register",
            name: "register",
            component: () => import("@/pages/register/index.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/setting",
            name: "setting",
            component: () => import("@/pages/setting.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/transactionRecord",
            name: "transactionRecord",
            component: () => import("@/pages/transactionRecord.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/tutorial",
            name: "tutorial",
            component: () => import("@/pages/tutorial.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/userInfo",
            name: "userInfo",
            component: () => import("@/pages/userInfo.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/vip",
            name: "vip",
            component: () => import("@/pages/vip.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/vipDetail",
            name: "vipDetail",
            component: () => import("@/pages/vipDetail.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/wallet",
            name: "wallet",
            component: () => import("@/pages/wallet.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/withdraw",
            name: "withdraw",
            component: () => import("@/pages/withdraw.vue"),
            meta: {
                keepAlive: true,
                auth: true,
            },
        },
        {
            path: "/withdrawTutorial",
            name: "withdrawTutorial",
            component: () => import("@/pages/withdrawTutorial.vue"),
            meta: {
                keepAlive: true,
            },
        },
        {
            path: "/:error*",
            name: "error",
            component: () => import("@/pages/notFount.vue"),
        },
    ],
});

routeTransition(router);

export default router;
