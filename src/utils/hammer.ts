import Hammer from "hammerjs";
import { App, DirectiveBinding } from "vue";
import { Directive } from "@vue/runtime-core";

const hammerDirective: Directive<HTMLElement> = {
    mounted: (el: HTMLElement, binding: DirectiveBinding) => {
        const hammertime = new Hammer(el);
        const eventName = binding.arg || "swipe";
        hammertime.on(eventName, binding.value);
    },
};

const registerHammerDirective = {
    install: (app: App) => {
        app.directive("hammer", hammerDirective);
    },
};

export default registerHammerDirective;
