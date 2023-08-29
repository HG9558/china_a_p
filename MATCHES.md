code 　　 String 　　成功响应码："0000000"
msg 　　 String 　　响应信息帮助 ："成功"
ts 　　 Number 　　服务器当前时间戳
data 　　 Object 　　响应具体数据
data.mcid 　　 String 　　玩法集 id
data.csna 　　 String 　　赛种名称
data.csid 　　 String 　　赛种 id
data.tid 　　 String 　　联赛 id
data.tn 　　 String 　　联赛名称
data.tlev 　　 Integer 　　联赛等级
data.mhid 　　 String 　　主队 id
data.mid 　　 String 　　赛事 id
data.mst 　　 String 　　赛事进行时间
data.mcg 　　 Integer 　　栏目类型 1：滚球，2：即将开赛，3：今日赛事，4：早盘
data.mmp 　　 String 　　比赛阶段，参考附录 赛事阶段比对
data.mms 　　 Integer 　　视频状态 -1：没有配置视频源 ，0：已配置但不可用，1：已配置可用但暂未播放，2：已配置可用并播放中
data.mhlu 　　 Array 　　主队 logo 图标的 url 地址，默认取 0，双打球队取 0、1 元素
data.malut 　　 String 　　客队 logo 缩略图的 url 地址
data.mgt 　　 String 　　赛事开始时间
data.man 　　 String 　　客队名称
data.maid 　　 String 　　客队 id
data.mct 　　 String 　　当前是第几盘或者第几局
data.mhlut 　　 String 　　主队 logo 缩略图的 url 地址
data.mat 　　 String 　　发球方 主：home，客：away
data.mo 　　 Integer 　　比赛是否结束
data.mp 　　 Integer 　　是否支持赛前盘
data.ms 　　 Integer 　　是否支持赛前盘赛事状态，参考附录 赛事状态
data.mng 　　 Integer 　　是否中立场 1：中立场，0：非中立场
data.mle 　　 Integer 　　赛节配置 足球： 0：default（默认 90 分钟）2 x 45 minutes，1：2 x 40 minutes， 9：2 x 35 minutes，10：2 x 30 minutes， 11：2 x 25 minutes，46：2 x 45 minutes with ABBA shootout format 篮球：0： default（默认）4 x 10 minutes， 7：4 x 12 minutes，17：2 X 20 minutes 上下半场各 20 分钟
data.mvs 　　 Integer 　　动画状态 -1：没有配置动画源 ，0 ： 已配置但不可用 ，1： 已配置可用但暂未播放，2：已配置可用并播放中
data.malu 　　 Array 　　客队 logo 图标的 url 地址
data.mhn 　　 String 　　主队名称
data.mfo 　　 String 　　赛制
data.mhs 　　 Integer 　　盘口状态
data.mft 　　 Integer 　　总局数
data.msc 　　 Array 　　[{S1|21:30}，{S2|21:30}，{S3|21:30}] --比分（比分类型|比分）详情参考比分档案 ：比分定义
data.msts 　　 Object 　　 PC 端特有足球各个进球对应的时间戳记： { S5:{//角球主客队进球时间, home:[45567845]，//主队, away:[4599526]//客对 }, S12:{黄牌 home:[45567845]，//主队, away:[4599526]//客队 }, S11:{//红牌 home:[45567845]//主队, away:[4599526]//客队 }, S10:{//点球 home:[45567845],//主队, away:[4599526]//客队 }， S1:{//进球数 home:[45567845]，//主队, away:[4599526]//客队 } }
Data.hps 　　 Array 　　玩法集合
hps[0].hids 　　 Integer 　　是否支持串关 1 支持，0 不支持
hps[0].hlid 　　 String 　　所属玩法集 id
hps[0].hmm 　　 Integer 　　是否多玩法
hps[0].hpid 　　 String 　　玩法 id
hps[0].hpn 　　 String 　　玩法名称
hps[0].hpon 　　 Integer 　　玩法排序值
hps[0].hpt 　　 Integer 　　玩法展示模板 id，目前玩法模版不对外提供，可以结合此 id 设计展示类型
hps[0].hshow 　　 String 　　是否展示，默认 Yes
hps[0].hsw 　　 String 　　支持赔率类型 1：支持欧式、英式、美式、香港、马来、印尼赔率，2：支持欧式、英式、美式赔率
hps[0].hton 　　 String 　　置顶排序值
hps[0].mid 　　 Long 　　赛事 id
hps[0].title 　　 Array 　　展示 title
title[0].osn 　　 String 　　模板需要展示的内容
title[0].otd 　　 Long 　　模板 id 和投注项 otd 对应
hps[0].hl 　　 Array 　　盘口集合
hl[0].hid 　　 String 　　盘口 id
hl[0].hmt 　　 Integer 　　盘口类型：0-滚球，1-早盘
hl[0].hon 　　 String 　　盘口级别
hl[0].hs 　　 Integer 　　盘口状态
hl[0].hn 　　 Integer 　　盘口坑位
hl[0].hv 　　 String 　　盘口值
hl[0].ol 　　 Array 　　投注项集合
ol[0].cds 　　 String 　　数据源
ol[0].oid 　　 String 　　投注项 id
ol[0].on 　　 String 　　投注项投注名称展示值
ol[0].onb 　　 String 　　投注项列表页名称展示值
ol[0].os 　　 Integer 　　投注项状态
ol[0].ot 　　 String 　　投注项类型
ol[0].otd 　　 Integer 　　投注项展示模板 id 和 titile 的 otd 对应
ol[0].ots 　　 String 　　投注给那一方 T1：主队，T2：客队
ol[0].otv 　　 String 　　投注时展示的内容
ol[0].ov 　　 Long 　　赔率
data.mlet 　　 String 　　获取赛事时长，获取每节比赛的时长
data.srid 　　 Long 　　第三方赛事 id
data.cmec 　　 String 　　事件编码
data.seid 　　 String 　　赛季 id
data.frman 　　 Array 　　客队名称首字母
data.lurl 　　 String 　　联赛 logo
data.cds 　　 String 　　数据源
data.frmhn 　　 Array 　　主队名称首字母
data.mess 　　 Integer 　　开始结束状态 1：start，0：stop（此字段只适用于特定事件编码），篮球暂停事件编码：time_start
data.th 　　 Integer 　　联赛是否热门 1：是，0：否
mo 　　 Integer 　　比赛是否结束 0：未结束， 1：结束
mp 　　 Integer 　　是否支持赛前盘 1：开放，0：不开放
mc 　　 Integer 　　赛事盘口总数量
