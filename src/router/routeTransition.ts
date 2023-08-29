import { Router } from "vue-router";
import { useStore } from "@/stores";
import NProgress from "nprogress";
import { storeToRefs } from "pinia";
import { useAsync } from "@/stores/useAsync";
import { useMatch } from "@/stores/useMatch";
import { showFailToast } from "vant";

let isInitRouter = true;

NProgress.configure({ showSpinner: false });

export type InjectPosition = "before" | "after";

export enum DirectionType {
  In = "in",
  Out = "out",
  None = "",
}

function inject<T extends (...args: any) => any>(
  position: InjectPosition,
  func: T,
  handler?: (...args: Parameters<T>) => void
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    if (position === "before") handler?.(...args);
    const result = func(...(args as []));
    if (position === "after") handler?.(...args);
    return result;
  }) as T;
}

export const routeTransition = (router: Router) => {
  let isIosJump = true;
  let direction = DirectionType.None;

  router.replace = inject("before", router.replace, () => {
    isIosJump = false;
    direction = DirectionType.Out;
  });

  router.push = inject("before", router.push, () => {
    isIosJump = false;
    direction = DirectionType.In;
  });

  router.go = inject("before", router.go, data => {
    isIosJump = false;
    if (data >= 0) {
      direction = DirectionType.In;
      return;
    }
    direction = DirectionType.Out;
  });

  router.back = inject("before", router.back, () => {
    isIosJump = false;
    direction = DirectionType.Out;
  });

  router.beforeEach((to, from, next) => {
    if (isIosJump) direction = DirectionType.None;
    to.meta.direction = direction;
    NProgress.start();
    const { setShowSetMobile } = useStore();
    const { user } = storeToRefs(useStore());
    setShowSetMobile(false);
    if (!isInitRouter) useStore()?.cancelRequest();
    isInitRouter = false;
    const nc = document.getElementById("nc");
    if (to.name == "home") useMatch().setSwipeActive(0);
    if (nc) nc.remove();
    useStore()?.setPath(to.path);
    if (/(\/recharge|\/withdraw)/.test(to.path) && user.value?.accountState == 4) {
      showFailToast("账号已被锁定,无法进行充值,请联系客服咨询!");
      return;
    }
    if (to.meta?.auth) {
      if (useStore().token) {
        next();
        return;
      }
      next("/login");
    } else {
      next();
    }
  });

  router.afterEach(async () => {
    isIosJump = true;
    NProgress.done();
    const { oneTime } = storeToRefs(useStore());
    if (oneTime.value) useStore()?.oneTimeStart();
  });
};
