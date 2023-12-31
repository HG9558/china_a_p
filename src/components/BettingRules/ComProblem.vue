<!-- 常见问题 -->
<template>
    <div class="h-[calc(100%-55px)] overflow-hidden">
        <SwiperBox>
            <div v-for="(item, index) in list" :key="index" class="pb-3 px-10px border-b">
                <h3 class="text-17px font-medium leading-[50px] flex items-center text-txt">
                    <i class="w-[3px] h-3 rounded bg-txt mr-2"></i>
                    {{ item.title }}
                </h3>
                <p class="text-sm text-[#666] leading-6" v-html="item.content"></p>
            </div>
        </SwiperBox>
    </div>
</template>

<script setup lang="ts">
import { shallowRef } from "vue";
import SwiperBox from "@/components/SwiperBox.vue";

const list = shallowRef<{ title: string; content: string }[]>([
    {
        title: "赛事中断怎么办？",
        content: `如果赛事中断或延迟，并且没有在36小时内重新开始，所有该场赛事的投注即被视为无效且取消，除非在个别投注类型规则测里另有指定注明。如果赛事在指定时间开赛后的12小时内被暂停或中止，但比赛时间已完成至90%（例如规定40分钟的比赛进行了36分钟；或者规定48分钟的比赛进行了43分钟）的情况下，全场投注仍然有效。`,
    },
    {
        title: `多久可以结算？`,
        content: `
        1、单注派彩：正常情况下，单场赛事投注会在赛事结束后15到30分钟内完成确认赛果并返彩，一些赛事可能需要更长时间处理（比如腰斩，赛事中断等情况）。
        <br/><br/>
        2、上半场派彩：正常情况下，上半场投注会在赛事上半场结束后30分钟内完成确认赛果并返彩，一些赛事可能需要更长时间处理（比如腰斩，赛事中断等情况）。
        <br/><br/>
        3、连串过关派彩：正常情况下，连串过关将会在您该注单最后一场连串过关赛事结束2小时内，官方公布结果后进行派彩，一些赛事可能需要更长时间处理（比如腰斩，赛事中断等情况）。
        `,
    },
    {
        title: "危险球的定义？",
        content: `会员在投注滚球时，如果赛场中出现以下几种情况，会员的投注将会维持在“危险球-待确认””的状态。危险球的定义有:
        <br/><br/>
        1、12码罚球
        <br/><br/>
        2、自由球(攻方在守方禁区附近的自由球)。
        <br/><br/>
        3、角球 /掷入球(攻方靠近守方禁区的掷入球)。
        <br/><br/>
        4、A队向B队禁区附近进攻(或是B队在A队的禁区附近进攻)。
        <br/><br/>
        在以下的状况，会员所下注注单将会被取消，而会员所下注的金额将会全数退回：
        <br/><br/>
        1、进球。
        <br/><br/>
        2、红卡。
        <br/><br/>
        在以下这几种状况将会释放危险球，而会员在危险球下注的注单都会以当时下注的盘口、赔率和金额为准。
        <br/><br/>
        1、门将开球。
        <br/><br/>
        2、皮球重新去到中场线。
        <br/><br/>
        3、己方球员在自己的后场抢回控球权。
        <br/><br/>
        4、攻防转换，原来的防守一方在自己後场开出自由球 。`,
    },
    {
        title: `体育赛事中断？`,
        content: `1、如果比赛或赛事取消，中断或延迟并且没有在官方指定开球时间的36小时内重新开始，所有该场赛事的投注即被视为无效且取消，除非在个别体育规则里另有指定注明。某些无条件终止的盘口将会相应地结算。单独的体育规则中对此类盘口的结算程序做了说明。 公司取消该赛事所有注单的结果被视为最终决定，无需参考官方赛事裁判或相关部门的决定。连串投注将会继续按照注单剩余赛事的赛果结算，该取消赛事的赔率将会按照1计算。2、如果赛事中断前已有明确结果并且之后没有任何显著会影响赛事结果的情况，大/小盘注单才会被结算。`,
    },
    {
        title: `六、什么是并列名次（冠军）规则？`,
        content: `并列名次规则适用于所有多个获胜者或冠军的市场（以市场显示信息为准），例如一场赛事的盘口产生2名或者以上的获胜者，那么赢利金额将减少。计算方法是将本金除以获胜者人数，然后乘以原赔率。这部分本金及赢利将返还给会员，剩余的本金将输掉。`,
    },
    {
        title: `七、连串投注是指什么？`,
        content: `连串过关（Parlay）：采用欧洲赔率【包含本金】-- 选择二个或更多的赛事在一个单一的注单中，每一个选择连串投注的赛事必须获胜此连串的注单才视为赢，只要其中有一场赛事输，注单为输。`,
    },
    {
        title: `复式连串投注是指什么？`,
        content: `复式连串过关，是指将多场赛事串做多个单式连串过关，至少3场最多8场。复式连串过关可以容错，如果有一场比赛赛果为输，那么所有包含该比赛的单式连串全部算输扣除本金，其它单式连串继续计算输赢。`,
    },
]);
</script>
