<!-- 全部规则 -->
<template>
    <div class="h-[calc(100%-55px)] overflow-hidden">
        <div class="h-full overflow-hidden">
            <SwiperBox ref="swiperRef">
                <van-collapse
                    accordion
                    v-model="activeNames"
                    @change="change"
                    style="--van-collapse-item-content-background: transparent"
                >
                    <van-collapse-item
                        :title="item.title"
                        :name="index"
                        v-for="(item, index) in list"
                        :key="index"
                    >
                        <div
                            class="text-black/60 transition-all leading-6"
                            v-html="item.content"
                        ></div>
                    </van-collapse-item>
                </van-collapse>
            </SwiperBox>
        </div>
    </div>
</template>

<script setup lang="ts">
import { timeOut } from "@/utils";
import { ref, shallowRef } from "vue";
import type { SwiperRef } from "../types";
import SwiperBox from "@/components/SwiperBox.vue";

const activeNames = ref(0);
const swiperRef = ref<SwiperRef>();

const list = shallowRef<{ title?: string; content?: string; name?: string }[]>([
    {
        title: "概述",
        content: `此规则与条款将适用于本公司所有的投注种类。会员们有责任确保您获知所有的规则与条款，我们保留随时修改条款的权利，并且会将修改的内容公布在本网站上。公布在网站公告上的信息可作为投注附加的规则与条款，若有任何差异或矛盾的地方，将以附加信息为准。
        <br/><br/>
        本公司对此条款视为公平公正的，若您有任何意见或疑问，您可以联络我们的客服部，我们的客服团队将热诚协助每位客户，并确保能及时友善的解决您的问题。对于任何错误或争论，我们的客服团队将竭力提供服务。<br/><br/>
        所有的条款用于在会员与公司之间建立一般的原则。对产生的任何争议，希望通过该条款让双方都得到满意的解决方案。`,
        name: "",
    },
    {
        title: "一般体育说明",
        content: `所有在本公司进行的投注都需要依照以下规则与条款处理。在个别体育项目里注明的规则将视为体育主要规则:<br/><br/>
        1.所有投注项目的最高和最低投注额将由公司决定，如有任何更改无需提前通知。<br/><br/>
        2.会员申请账户时需提供正确的个人信息，本公司对提供伪造或错误信息的账户将不负任何责任。<br/><br/>
        3.会员将全权负责账户提交的所有交易。在投注前请仔细检查选项，一旦投注提交成功后，将无法更改或取消。公司对会员自身原因造成的遗漏或重复投注不负任何责任。会员可以在"交易记录"中查看详情确保所有提交的注单已成功。<br/><br/>
        4.在任何投诉中，如果在公司的数据库中没有存储任何记录，公司将不接受也不认可任何会员提供的复印件或单据<br/><br/>
        5.公司保留在任何时候关闭或冻结会员账号的权利。<br/><br/>
        6.公司保留在任何时候暂停/中止会员对任何盘口进行投注的权利。<br/><br/>
        7.公司保留对已预先知道赛果的投注作出取消的权利。如果由于"滚球现场"延迟而引起盘口的赔率错误，此期间的注单将视为无效。<br/><br/>
        8.赛事时间,计时器和红牌等信息仅供会员参考，公司对提供此信息的准确性不负任何责任。<br/><br/>
        9.如果比赛或赛事取消，中断或延迟并且没有在官方指定开球时间的36小时内重新开始，所有该场赛事的投注即被视为无效且取消，除非在个别体育规则里另有指定注明。某些无条件终止的盘口将会相应地结算。单独的体育规则中对此类盘口的结算程序做了说明。 公司取消该赛事所有注单的结果被视为最终决定，无需参考官方赛事裁判或相关部门的决定。连串投注将会继续按照注单剩余赛事的赛果结算，该取消赛事的赔率将会按照1计算。<br/><br/>
        10.如果比赛或是赛事取消，所有该场赛事的投注即被视为无效且取消，除非在个别体育规则里另有指定注明。对于取消的定义和处理本公司拥有最终解释权。<br/><br/>
        11.如果对其它语言版本的信息或球赛队名有争议，请以英文网站的名称为准。<br/><br/>
        12.由以下事件造成的任何损失，公司不赋予任何责任:<br/><br/>
        a.公司的网站、服务器或网络中断。<br/><br/>
        b.公司数据库、服务器丢失信息或信息遭受破坏。<br/><br/>
        c.不法分子攻击网站、服务器或网络供应商。<br/><br/>
        d.进入网站时由于网络供应商原因造成的网络缓慢。<br/><br/>
        13.如果对此规则与条款的内容有任何疑义，请以公司的解释为准。`,
        name: "",
    },
    {
        title: "赛果与博彩",
        content: `1.赛果均在赛事结束后判定，除非在个别体育规则里另有注明。赛果公布72小时后，若对任何赛果有争议，本公司将不认可。在赛果公布72小时内,除了任何体育纪律委员会所重新裁决之赛果，本公司只会修正人为、系统或参考赛果的相关网页失误等原因的错误。<br/><br/>
        2.投注通常在赛事结束后派彩。但考虑到会员的利益，某些投注会在官方公布赛事结果之前就进行派彩。为此，公司保留对此而造成的错误进行更改的权利。<br/><br/>
        3.派彩是根据官方来源或相关体育权威机构判定的结果为准。<br/><br/>
        4.所有的交易将以公司最新备份数据记录为准，公司不接纳任何投诉或争议，除非会员提供交易记录的截图或影印证据，否则公司的数据记录将作为最终证明。`,
        name: "",
    },
    {
        title: "滚球类型投注规则",
        content: `滚球投注是指对正在进行比赛的赛事进行投注。注单会在赛事进行比赛后开始接收并且在盘口关盘后停止所有交易。个别体育会开出多个滚球种类的盘口供投注。<br/><br/>
        1.所有滚球投注均需要遵守系统验收程序。这可能会导致每笔投注延迟确认或出现投注失败的情况。,除了任何体育纪律委员会所重新裁决之赛果，本公司只会修正人为、系统或参考赛果的相关网页失误等原因的错误。<br/><br/>
        2.所有在注单上显示“待确认”的字眼则表示注单正在等待系统的判断投注是否成功。这表示注单在等待被确认或可能被取消。<br/><br/>
        3.在赛事有事件发生或出现其他特殊情况时，所有待确认中的注单将不被确认并视为投注失败。此事件可包含进球，红卡，点球或技术上问题等等。(其他例子并不一一详尽列出) 。<br/><br/>
        4.当有重大事件发生时，会应用电视裁判助理（VAR）来判定，这可能会导致之前已确定的注单被取消。注单被取消始于重大事件发生的开端直到VAR的最终官方判定已宣布。<br/><br/>
        5.在滚球投注中，本公司需强调以下条款，确保投注是按照正确的时间、金额和在正确的情况下进行:<br/><br/>
        a.比赛赛果和入球时间以本公司网站公布的为准，我们不参考任何其它官方网站，体育网站，或"即时比分"等网站公布的赛果或入球时间。<br/><br/>
        b.如果有合理的理由怀疑投注是在比赛时某个事件发生后才提交的，本公司将保留取消此注单且不需提供任何理由和证明的权利。<br/><br/>
        c.如果出现网站无法更新比分、赔率或盘口的情况，本公司保留权利取消所有未确认且处理中的注单。`,
        name: "",
    },
    {
        title: "有关时间规则",
        content: `如比赛在法定时间提前进行，在比赛开始前的投注依然有效，在比赛开始后的所有投注均视为无效(滚球投注另作别论)。<br/><br/>
        1.所有滚球投注均需要遵守系统验收程序。这可能会导致每笔投注延迟确认或出现投注失败的情况。,除了任何体育纪律委员会所重新裁决之赛果，本公司只会修正人为、系统或参考赛果的相关网页失误等原因的错误。<br/><br/>
        2.足球球赛的正常完场时间包括任何球员受伤的补时。<br/><br/>
        3.除非在个别体育规则另有注明，加时得分则不计算在正常完场时间内。`,
        name: "",
    },
    {
        title: "多冠军规则",
        content: `1. 一场赛事的盘口产生2名或者以上的获胜者，那么赢利金额将减少。计算方法是将本金除以获胜者人数，然后乘以原赔率。这部分本金及赢利将返还给会员，剩余的本金将输掉。<br/><br/>
        2.例如：<br/><br/>
        第一阶段-您投注5英镑，赔率15/1（可能的赢利金额为75英镑）。<br/><br/>
        第二阶段-您投注的对象与另一名对象同时获胜。<br/><br/>
        第三阶段-您本金的一半将会乘以原赔率计算，剩下的部分将输掉。因此2.5英镑乘以15/1=37.50英镑+2.5英镑的返还的本金就是总赢利。<br/><br/>
        如果有2名以上的获胜者，注金将会分成相应的等份。<br/><br/>
        实际上在2名获胜者的情况下，本金的一半（50%）将乘以原赔率，剩余的一半（50%）将输掉。<br/><br/>
        3.多冠军规则并不始终适用，如果我们最终决定赛事的冠军可由获得的比分决定。（例如小组赛事）`,
        name: "",
    },
    {
        title: "场地变更",
        content: `1.如果比赛场地有变更（主客队调换），所有此注单将被取消。<br/><br/>
        2.本公司保留权利取消因更换场地而可能对赛事结果有影响的注单，例如：网球比赛更换场地表面。<br/><br/>
        3.若比赛原定在中立场进行改为在非中立场进行且在本公司判定下对比赛没有影响，注单将继续保持有效。<br/><br/>
        4.在个别体育项目里若有特别注明将覆盖以上规则。`,
        name: "",
    },
    {
        title: "错误",
        content: `1.本公司力求错误发生的机率保持最低，但若有注单显然是在盘口有错误的情况下提交，我们将保留取消此注单的权利。错误的情况包括：<br/><br/>
        a.赔率错误 （和市场上提供的有明显差别）<br/><br/>
        b.盘口信息错误， 例如：让球数，大小数等；<br/><br/>
        c.赛事信息错误，例如：参赛队名或队员， 赛事日期或开赛时间。<br/><br/>
        2.若因遇到以上的情况而需取消任何注单，我们会尽可能的与客户取得联系，有关讯息也会及时在公告栏里发布。`,
        name: "",
    },
    {
        title: "异常投注行为",
        content: `1.对任何怀疑在投注时涉嫌作弊或破坏本公司投注平台的会员，公司有权在毫无警告或通知下取消此会员所有的注单并且冻结账户。异常行为包括使用任何设备，自动设备，软件，程序等方式干涉本网站的运作。`,
        name: "",
    },
    {
        title: "最高派彩金额",
        content: `1.所有比赛项目或投注种类，每日每位会员可得最高派彩金额是150万美金（不包括投注本金），或其他等值货币。以下列出个别体育的最高派彩金额为参考：
        a.足球与篮球 –150万美金或其他等值货币<br/><br/>
        b.网球，美式足球，棒球，冰球， 橄榄球，排球 –30万美金或其他等值货币<br/><br/>
        c.其他体育 – 20万美金或其他等值货币<br/><br/>
        d.新颖盘口 –2万5千美金或其他等值货币<br/><br/>
        2.连串过关如果涉及不同体育级别的限制，系统将以体育级别最低派彩金额限制为准。`,
        name: "",
    },
    {
        title: "接受更好的赔率",
        content: `术语“接受更好的赔率”“即添加到该选项的所有投注单，只要在选择的时间所提供的可能性表现出比最初显示更高的回报，就可以自动进行处理。 如果调整后的投注单盘口显示出比原先的返回值较低，那么该投注将不会被自动处理。 ”接受更好的赔率“这个功能可以通过勾选投注单中“选择“或是“取消选择“来开启或是关闭`,
        name: "",
    },
    {
        title: "更高赔率/复式过关",
        content: `1.本公司拥有提供以及随时撤回所有更高赔率/复式过关的权利。<br/><br/>
        2.所有更高赔率投注/复式过关的限额，可能在任何时间进行调整。<br/><br/>
        3.所有更高赔率/复式过关规则相同于一般规则及上述各体育规则中的规定。以足球为例- - 以足球为例- “曼联胜出及大/小2.5”将遵守“独赢盘和进球数大/小盘”足球规则。<br/><br/>
        4.足球的更高赔率/复式过关是计算在常规时间内，不包括额外时间或罚球（除非另有说明）。<br/><br/>
        5.对于复式过关，如果您投注的项目在无条件确定结果的情况下，则该投注根据结果相应的结算为“赢”或“输”。 - 以足球为例：如果您选择进球数超过2.5个，并且在暂停时比分是2：1，则您的投注将被视为“赢”。<br/><br/>
        6.对于复式过关，如果您投注的项目在结果未确定时被暂停，则将视为无效投注。 - 以足球为例：如果您选择的比分是2-2（全赛时），并且在暂停时比分为1-1，则您的投注将被视为无效。<br/><br/>
        7.对于复式过关，单一项目或多个项目是平局或无效的情况下，赔率会重新调整。`,
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
    .van-collapse-item {
        &:after {
            border-top: 1px solid #e5e7ee;
        }
        .van-cell {
            background: transparent;
            .van-cell__title {
                display: flex;
                align-items: center;
                &::before {
                    content: "";
                    width: 3px;
                    height: 13px;
                    display: inline-block;
                    border-radius: 4px;
                    background: transparent;
                    margin-right: 0px;
                    transition: all 0.3s;
                }
            }
        }
        .van-collapse-item__title--expanded {
            .van-cell__title {
                position: relative;
                font-size: 17px;
                color: #4b6cdb;
                font-weight: 500;
                display: flex;
                align-items: center;
                &::before {
                    background: #4b6cdb;
                    margin-right: 6px;
                }
            }
            .van-cell__right-icon {
                color: #4b6cdb;
            }
        }
    }
}
</style>
