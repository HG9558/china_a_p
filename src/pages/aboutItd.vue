<!-- 介绍 -->
<template>
    <div class="flex flex-col h-full tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: `${NAME}介绍` }" />
        <div class="flex-1 bg-mainBg rounded-t-20px overflow-y-auto">
            <SwiperBox>
                <ul class="bg-white rounded-20px">
                    <li
                        :key="index"
                        v-for="(item, index) in list"
                        class="border-b border-mainBg px-10px py-4 last-of-type:border-b-0"
                    >
                        <h4 class="text-17px font-bold text-txt mb-2">
                            {{ item.title }}
                        </h4>
                        <p class="text-13px text-txt_d indent-2">
                            {{ item.content }}
                        </p>
                    </li>
                </ul>
            </SwiperBox>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import NavBar from "@/components/NavBar.vue";
import SwiperBox from "@/components/SwiperBox.vue";

const NAME = ref<string>(import.meta.env.VITE_NAME);
const APP_NAME = ref<string>(import.meta.env.VITE_APP_NAME);

const list = ref<{ title: string; content: string }[]>([
    {
        title: `【${NAME.value}介绍】`,
        content: `   ${APP_NAME.value}含有产品${NAME.value}全站、${APP_NAME.value}、${NAME.value}电竞、${NAME.value}真人等，提供体育类、电竞类、真人现场类、竞猜类、选秀类服务的同时，${APP_NAME.value}还是目前全球范围内领先、华人市场最大的同类服务供应商。`,
    },
    {
        title: "【安全保障】",
        content: `   作为华人第一品牌，您一定从身边的朋友那里听说过${NAME.value}。朋友的口碑一定比文字更加能说服您。${NAME.value}大规模的赞助活动也是品牌实力的背书，曼联、拜仁慕尼黑、巴黎圣日尔曼、A
        C米兰、里昂、阿根廷国家队等等，这些品牌背后都有${NAME.value}的
        影子，带给您富有信心的安全保障。`,
    },
    {
        title: "【优良服务】",
        content: `   阿里云、Amazon亚马逊云对${NAME.value}不同线路的技术支持让用
        户能更加稳定的访问网站，分布式存储技术也能让${NAME.value}在高峰期更快的提供服务。${NAME.value}的不同的服务供应商在不同地区各有长处，他们为您提供优良的服务做出保证。`,
    },
    {
        title: "【高额优惠】",
        content: `   ${NAME.value}占据着庞大的市场份额，承担着社会服务者的角色，在${NAME.value}有大量的活动等您参与。低利润运作可以给您更多的优惠和最大的收益，这样的理念与${NAME.value}现有的成就相辅相成。`,
    },
]);
</script>
