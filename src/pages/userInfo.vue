<!-- 个人资料 -->
<template>
    <div class="h-full bg-mainBg flex flex-col tlw_top_bg">
        <NavBar transparent :nav-bar-props="{ title: '个人资料' }">
            <template #right>
                <i class="icon-erji text-lg text-white" @click="toService()" />
            </template>
        </NavBar>
        <div class="flex-col overflow-hidden rounded-20px bg-mainBg flex-1">
            <div class="rounded-20px overflow-hidden border border-white border-solid">
                <van-cell-group :border="false" class="" style="--van-cell-line-height: 2.375rem">
                    <van-cell title="用户名" :value="user?.username" />
                    <van-cell
                        title="注册日期"
                        :border="false"
                        v-if="user?.createdAt"
                        :value="formatTime(user?.createdAt, 'YYYY-MM-DD')"
                    />
                </van-cell-group>
            </div>
            <div class="mt-2">
                <div class="rounded-20px overflow-hidden border border-white border-solid">
                    <van-cell-group :border="false" style="--van-cell-line-height: 2.375rem">
                        <van-cell
                            is-link
                            title="头像"
                            style="--van-cell-line-height: 2rem"
                            @click="init?.avatars?.avatars?.length && (showAvatar = !showAvatar)"
                        >
                            <template #value>
                                <div class="flex items-center justify-end">
                                    <img
                                        class="w-8 h-8 rounded-full"
                                        v-if="user?.avatar"
                                        v-lazy="user?.avatar"
                                        alt=""
                                    />
                                </div>
                            </template>
                        </van-cell>
                        <van-cell
                            title="昵称"
                            :is-link="user?.nicknameUpdate == 1"
                            @click="toSet('nickname')"
                        >
                            <template #value>
                                <div
                                    class="break-all justify-end overflow-hidden line-clamp-1 whitespace-nowrap"
                                >
                                    {{ user?.nickname || user?.username }}
                                </div>
                            </template>
                        </van-cell>
                        <van-cell
                            center
                            :is-link="!user?.birthday"
                            title="生日"
                            :label="!user?.birthday ? '完善信息，获取生日福利' : ''"
                            :value="user?.birthday || '未设置'"
                            @click="toSet('birthday')"
                        />
                        <van-cell
                            :is-link="!/(0|1)/.test(`${user?.sex}`)"
                            title="性别"
                            :border="false"
                            :value="sexValue"
                            @click="toSet('sex')"
                        />
                    </van-cell-group>
                </div>
            </div>
        </div>
        <SetAvatar v-model="showAvatar" @submit="setParams('avatar', $event)" />
        <SetNickName v-model="showNickName" @submit="setParams('nickname', $event)" />
        <SetBirthday v-model="showBirthday" @submit="setParams('birthday', $event)" />
        <SetRealName v-model="showRealName" @submit="setParams('realName', $event)" />
        <SetSex v-model="showSex" @submit="setParams('sex', $event)" />
    </div>
</template>

<script setup lang="ts">
import { API } from "@/api";
import type { IupdateUserProfile } from "@/api/user/interface";
import { useStore } from "@/stores";
import { useAsync } from "@/stores/useAsync";
import { formatTime, toService } from "@/utils";
import { storeToRefs } from "pinia";
import { showFailToast, showSuccessToast } from "vant";
import { ref, computed } from "vue";
import NavBar from "@/components/NavBar.vue";
import SetBirthday from "@/components/UserInfo/SetBirthday.vue";
import SetNickName from "@/components/UserInfo/SetNickName.vue";
import SetAvatar from "@/components/UserInfo/SetAvatar.vue";
import SetRealName from "@/components/UserInfo/SetRealName.vue";
import SetSex from "@/components/UserInfo/SetSex.vue";

const { user } = storeToRefs(useStore());
const { init } = storeToRefs(useAsync());
const { setLoading, setUser } = useStore();
const showAvatar = ref<boolean>(false);
const showNickName = ref<boolean>(false);
const showBirthday = ref<boolean>(false);
const showRealName = ref<boolean>(false);
const showSex = ref<boolean>(false);
const sex = ref<{ [name: number]: string }>({
    0: "女",
    1: "男",
});

const params = ref<IupdateUserProfile>({
    avatar: "",
    birthday: "",
    mobile: "",
    nickname: "",
    realName: "",
    sex: "",
});

const sexValue = computed(() => {
    return (/(0|1)/.test(`${user.value?.sex}`) && sex.value[user.value?.sex!]) || "未选择";
});

const setParams = (key: string, value: string | number) => {
    const data = Object.keys(params.value).reduce((prev: any, item) => {
        if (item === key) prev[item] = value;
        else prev[item] = undefined;
        return prev;
    }, {});
    params.value = data;
    updateUserProfile();
};

const toSet = (type: string) => {
    switch (type) {
        case "nickname":
            if (user.value?.nicknameUpdate == 0) return showFailToast("昵称180天内只可修改一次");
            showNickName.value = !showNickName.value;
            break;
        case "birthday":
            if (user.value?.birthday) return;
            showBirthday.value = !showBirthday.value;
            break;
        case "sex":
            if (/(0|1)/.test(`${user.value?.sex}`)) return;
            showSex.value = !showSex.value;
            break;
        default:
            break;
    }
};

const updateUserProfile = async () => {
    setLoading(true);
    const res = await API.updateUserProfile(params.value);
    setLoading(false);
    if (res.code === 0) {
        setUser(res.data);
        showSuccessToast("保存成功");
    }
};
</script>
