//赛事
mhid: String,//主队 id
mhn: String,//主队名
mid: String,//赛事 id
mess: Int,//开始结束状态 1、start 0、stop（此字段只适用于特定事件编码）篮球暂停事件编码=time_start
mhs: Int,////赛事关盘状态 0:active 开, 1:suspended 封, 2:deactivated 关, 11:锁
csna: String,//赛种名称
tid: String,//联赛 id
lurl: String,//联赛图标
tn: String,//联赛名称
tf: Boolean,//联赛是否收藏
mst: Int,//赛事进行时 单位秒
srid: String,//第三方赛事 ID
mcg: String,//栏目类型 1 滚球 2 即将开赛 3 今日 4 早盘 菜单中的 type
mmp: Int,//比赛阶段 0 未開始 6 上半場 31 中場休息 7 下半場 41 加時賽上半場 100 全場結束 32 即將加時
mms: Int,//视频状态 -1 没有配置视频源 ，0 ： 已配置，但是不可用 1： 已配置，可用,暂未播放 2：已配置，可用，播放中
mvs: Int,////动画状态 -1 没有配置视频源 ，0 ： 已配置，但是不可用 1： 已配置，可用,暂未播放 2：已配置，可用，播放中
mc: Int,//赛事玩法总数
mhlu: MutableList<String>?,//主隊 logo。圖標的 url 地址 有多个
frmhn: MutableList<String>,//主队名称首字母
malu: MutableList<String>?,//客队 logo。圖標的 url 地址 有多个
mhlut: String,//主隊 logo 縮略圖的 url 地址
malut: String,//客队 logo 縮略圖的 url 地址
seid: String,//赛季 id
mf: Boolean,//赛事是否收藏
mgt: Long,//赛事开始时间
man: String,//客队名称
maid: String,//客队 id
frman: MutableList<String>,//客队名称首字母 可能有多个
mct: Int,//当前第几盘或第几局
tlev: String,//联赛等级
mat: String,//发球放 主 home 客 away
mo: Int,//比赛是否结束
mp: Int,//是否支持赛前盘
csid: Int,//赛种 id
ms: Int,//赛事状态 //赛事状态 0、赛事未开始（not_started） 1、滚球阶段（live） 2、暂停（suspended） 3、结束（ended） 4、关闭（closed） 5、取消（cancelled） 6、比赛放弃（abandoned） 7、延迟（delayed） 8、未知（unknown） 9、延期（postponed） 10、比赛中断（interrupted）
cmec: String?,//事件编码
mng: Int,//是否中立场 1 中立 0 非中立
mfs: Int,//局数
th: Int,//联赛是否热门 1 是 0 否
mfo: String?,//赛制 五局三胜
mft: Int,//总局数
mlet: String,//赛事时长
mbhn: String,//好球数 棒球字段
mbkn: String,//坏球数 棒球字段
mbcn: String,//出局数 棒球字段
mbolp: String,//一垒 0、未占用 1、已占用 棒球字段
mbtlp: String,//二垒 0、未占用 1、已占用 棒球字段
mbthlp: String,//三垒 0、未占用 1、已占用 棒球字段
msc: MutableList<String>,//各种比分["S1:1-2","S2:1-2"]
hps: MutableList<XmPlayModel>?,
//賽節配寘足球：0 = default（默認 90 分鐘），
// 1 = 2 x 40 minutes，9 = 2 x 35 minutes，
// 10 = 2 x 30 minutes， 11 = 2 x 25 minutes， 46 = 2 x 45 minutes with ABBA shootout format，
// 籃球：0 = default（默認）四節每節 10 分鐘，7=12 munutes periods 四節每節 12 分鐘，17=2 X 20 minutes 上下半場各 20 分鐘
mle: Int?,
//冠军玩法字段 hps 只有两层 数据字段需要注意
onTn: String,//"葡萄牙足球超级联赛 20/21"
med: Long, mgif: String?,//直播赛事图片
plnum: String?,//直播视频播放时间
tnS: String?

//投注项分类
osn: String,//投注项显示名称，空则不需要显示
otd: Int//投注項展示範本 ID,和 titile 的 otd 對應

//玩法
mid: String? = null//赛事 id
hpid: String = ""//玩法 id
hpon: Int? = null//玩法排序值
hshow: String? = null//是否展示 默认 Yes
hpn: String? = null//玩法名称
hpt: Int? = null//玩法展示模板 id
hsw: String? = null//支持赔率类型?=null 1 欧洲赔率 2 香港赔率 3 马来赔率 4 英式赔率 5 美式赔率 6 印尼赔率
hmm: String? = null//是否多玩法
hl: MutableList<XmHandicapModel>? = null

//冠军玩法字段 融合了盘口字段
hmed: Long? = null//冠军结束时间
hmgt: Long? = null//冠军开始时间
hid: String? = null
hs: Int? = null
hv: String? = null
hmt: Int? = null//0 滚球 1 早盘 3 冠军 4 虚拟赛事 投注对应字段 matchType
hn: String? = null
ol: MutableList<XmOddOptionModel>? = null//冠军玩法 没有盘口层 直接到投注项
hps: String? = null//欧洲冠军联赛 - 冠军
hton: Long? = null//置顶排序 时间戳 0 为非置顶状态
topKey: String? = null//置顶 key
title: MutableList<XmMatchModel.XmHandicapTitle>? = null
plid: MutableList<String>? = null//所属玩法集 id 集合
event: XmMatchModel? = null

//mathType 需要明确赋值（1 早盘，2 滚球，3 冠军，4 虚拟）

//hmt 3 是冠军

//盘口
hid: String? = null//盘口 id
hs: Int? = null//盘口状态 0:active 开, 1:suspended 封, 2:deactivated 关, 11:锁
hv: String? = null//盘口值
hmt: Int? = null//盘口类型 0
hn: String? = null//坑位字段 1 主盘 主副盘标识
ol: MutableList<XmOddOptionModel>? = null

//具体投注项
oid: String? = null//投注项 id
os: Int? = null//投注项状态 //1.开盘，2 封盘，3 关盘 ，4 锁盘
otd: Int? = null//投注項展示範本 ID,和 titile 的 otd 對應
ot: String? = null//投注项类型
ov: Int? = null//赔率
obv: Int? = null//断档赔率
on: String? = null//投注項投注名稱展示值
cds: String? = null//数据源
ots: String? = null//投注給那一方 T1 主隊 T2 客隊
otv: String? = null//投注時展示的內容
ott: String? = null//投注项对应的 title

//赛果:0-无结果 1-不知道,2-走水 ,3-输 ,4-赢,5-赢半,6-输半
result: Int? = null
