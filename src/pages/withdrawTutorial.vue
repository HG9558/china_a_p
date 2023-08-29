<!-- 提现教程 -->
<template>
    <div
        class="flex flex-col h-full overflow-hidden tlw_top_bg"
        :style="{ paddingTop: `${top || 0}px` }"
    >
        <NavBar class="flex-shrink-0" transparent :nav-bar-props="{ title: '提现教程' }">
            <template #right>
                <i class="z-10 text-white ml-2 icon-erji text-lg" @click="toService" />
            </template>
        </NavBar>
        <div class="flex-1 overflow-hidden rounded-t-20px bg-mainBg z-0">
            <SwiperBox ref="swiperRef" class="rounded-20px">
                <van-collapse
                    v-model="activeNames"
                    @change="change"
                    :border="false"
                    style="--van-collapse-item-content-background: transparent"
                >
                    <van-collapse-item
                        :name="index"
                        :key="index"
                        v-for="(item, index) in list"
                        class="last-of-type:rounded-b-20px overflow-hidden"
                    >
                        <template #title>
                            <div class="flex items-center">
                                <i class="iconfont icon-wenti-yuan text-base mr-1 text-txt_d"></i>
                                <p class="text-[15px] leading-[30px]">
                                    {{ item.title }}
                                </p>
                            </div>
                        </template>
                        <div
                            class="text-black/60 text-gz text-13px leading-6"
                            v-html="item.content"
                        ></div>
                    </van-collapse-item>
                </van-collapse>
            </SwiperBox>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { SwiperRef } from "@/components/types";
import { timeOut, toService } from "@/utils";
import { ref, shallowRef } from "vue";
import NavBar from "@/components/NavBar.vue";
import SwiperBox from "@/components/SwiperBox.vue";
import { useApp } from "@/stores/useApp";
import { storeToRefs } from "pinia";

const activeNames = ref([99]);
const swiperRef = ref<SwiperRef>();

const { top } = storeToRefs(useApp());

const list = shallowRef<{ title?: string; content?: string; name?: string }[]>([
    {
        title: "如何取款",
        content: `1、第一次取款请先绑定银行卡，绑定银行卡步骤：<br/>
        &nbsp a、登录账号 -- 我的页面 -- 账户管理--添加银行卡；<br/>
        &nbsp b、登录账号 -- 我的页面--点击取款-- 添加银行卡。<br/>
        2、 绑定完成后，在取款金额框中输入金额，点击立即取款。`,
        name: "",
    },
    {
        title: "可以使用别人的银行卡进行取款吗？",
        content: `为了确保客户的账户资金安全，取款需要使用账号本人的银行卡才可以进行取款哦，且取款银行卡姓名必须与注册姓名一致。`,
        name: "",
    },
    {
        title: "申请取款需要注意些什么？",
        content: `1、绑定的银行卡姓名需与当前账户的注册姓名一致。<br/>
        2、绑定的银行卡信息需要正确。<br/>
        3、若您未申请任何红利优惠，投注满一倍流水即可申请取款。<br/>
        4、若申请首存红利，则需要满足优惠活动写明的有效投注额要求。<br/>
        5、全天24小时都可发起取款申请。`,
        name: "",
    },
    {
        title: "游戏账户里有钱为什么无法取款？",
        content: `您需要先将资金从游戏平台钱包转至中心钱包后，才能进行取款操作。`,
        name: "",
    },
    {
        title: "可以绑定多张银行卡吗？",
        content: `每一个用户均可以绑定5张银行卡进行取款操作，在我的页面选择“账户管理”，按步骤添加银行卡即可。`,
        name: "",
    },
    {
        title: "取款为什么还需要审核？",
        content: `取款审核是相关部门在给您办理出款之前的一个简单的核实步骤，是为了确保客户资金安全，所以需要核实相关信息。`,
        name: "",
    },
    {
        title: "取款要求（例：流水）",
        content: `用户只要达到存款全额投注要求，即可随时申请取款。比如，您存100元，在该笔存款后，您累计下注达到100元的取款流水，即可办理取款！<br/>
        温馨提示：若会员有领取其他优惠，必须达到相对应的有效流水才能办理取款！`,
        name: "",
    },
    {
        title: "取款到账时间",
        content: `用户取款一般10分钟内到账，如果30分钟还未到账可以联系在线客服为您核查！`,
        name: "",
    },
    {
        title: "取款支持的银行",
        content: `目前为您提供15家取款银行：中国银行、工商银行、建设银行、交通银行、农业银行、招商银行、民生银行、平安银行、华夏银行、广东发展银行、邮政储蓄银行、中信银行、兴业银行、上海浦发银行、光大银行。系统不定时会有所调整，具体还请您以添加银行卡时提供的银行为准。`,
        name: "",
    },
    {
        title: "我流水还差多少？",
        content: `首先确认自己是否有申请优惠活动，找到对应优惠活动查看所
        需流水，无申请优惠活动情况下1倍流水即可出款。<br/>
        若无法确认自己所需流水倍数，可直接联系7*24小时在线客服。`,
        name: "",
    },
    {
        title: "取款输入金额无法提交申请？",
        content: `1.金额是否从场馆成功转出至中心钱包。
        2.若提示〝您有订单尚未核实成功“请联系客服进行咨询。若有其他取款问题请与7*24小时客服团队联系。`,
        name: "",
    },
    {
        title: "我取款未到账？",
        content: `用户取款一般10分钟内到账，如果30分钟还未到账可以联系在线客服为您核查`,
        name: "",
    },
]);

const change = async () => {
    await timeOut(300);
    swiperRef.value?.update?.();
};
</script>

<style lang="scss" scoped>
::v-deep(.van-collapse) {
    .van-collapse-item__content {
        padding-left: 12px;
        padding-right: 0;
    }
}
</style>
