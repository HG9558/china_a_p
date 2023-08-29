<!-- 用户隐私协议 -->
<template>
    <div class="flex flex-col h-full tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '用户隐私协议' }" />
        <div class="flex-1 bg-mainBg rounded-t-20px overflow-y-auto z-0">
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

const APP_NAME = ref<string>(import.meta.env.VITE_APP_NAME);
const list = ref<{ title: string; content: string }[]>([
    {
        title: "【资料收集】",
        content: `   不论您访问${APP_NAME.value}或${APP_NAME.value}代理的网站、注册一个账号、订阅任何我们的产品和服务、填写一份表格、回答调查问卷、开立银行账户、承诺为我们任何游戏捐赠奖金，还是参与我们促销活动，${APP_NAME.value}都将保留收集可识别资讯的权利。
        当在网站上交易时，将要求您提供以下个人资讯：姓名、电子邮箱、电话号码。
        当存款或取款时，将会要求输入您的真实姓名、银行卡号、开户行地址。尽管如此，您仍可匿名访问我们网站。`,
    },
    {
        title: "【保密性及安全性】",
        content: `   我们实施了一套严格的安全措施，以保障您个人资料的保密性。提供给我们的信用资料，通过国家最先进的SSL技术进行传输，并加密进我们合法的支付系统供应商资料库，只有授权的个人可以对它进行访问。`,
    },
    {
        title: "【什么是cookie】",
        content: `   Cookies就是小型文档，由网站或其服务供应商通过浏览器传输到您电脑的硬盘（您应允许它），让网站或服务供应商有资格识别您的浏览器并获取以及记忆一些资料。供您参考：为了未来再次访问、监测广告、收集流量资料以及网站互动，${APP_NAME.value}使用cookies理解并记住您的喜好，以便于提高我们的工具及结构。`,
    },
    {
        title: "【备注】",
        content: `   根据${APP_NAME.value}自主决定，资讯信息可能时时弹出，用户可选择禁用此功能。
        另一方面，${APP_NAME.value}保留其权利向您提供服务相关的资讯，如服务通告和管理资讯，这些都被视为您账号的一部分，故用户不能禁用。
        若您决定删除${APP_NAME.value}的账号，请联系我们客户服务部。不过，删除的账号可能会留在我们档案中。`,
    },
    {
        title: "【保密】",
        content: `   除了信任和授权的协力厂商，即确保网站及我们整体商业的平稳运作的合作伙伴外，${APP_NAME.value}限制所有方式的销售、交易或转移我们客户的个人资讯到外界各方。同样地，这些协力厂商公司也承诺维护您个人资讯的保密性。`,
    },
    {
        title: "【用户同意】",
        content: `   已经注册并提交您的个人资讯给我们，就视为您同意我们的隐私政策。`,
    },
    {
        title: "【隐私申明的更改】",
        content: `   ${APP_NAME.value}在必要时，有权更新隐私申明。一旦更新，我们将通过邮件发送通知或通告，并张贴在主页上。 任何反馈，请通过填写表格或使用我们客户邮件服务。`,
    },
]);
</script>
