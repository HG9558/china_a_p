<template>
    <div class="overflow-hidden z-10 relative px-2">
        <div class="h-[33px] flex bg-white rounded-t-xl pr-10px">
            <div class="flex-1 h-full overflow-hidden p-[3px]">
                <div class="flex-1 w-full h-full overflow-hidden rounded-t-lg rounded-b-lg">
                    <div
                        class="w-full h-full skew-x-[-25deg] rounded-t-xl rounded-b-sm bg-[#EDEDED] flex items-center -translate-x-5 pl-5 tlw_skeleton"
                    ></div>
                </div>
            </div>
            <div class="p-0 flex items-center justify-center border-0 w-6 h-6"></div>
        </div>
        <div
            :key="index"
            v-for="(item, index) in 3"
            class="px-10px bg-white rounded-lg mt-[2px] flex flex-col justify-between h-[121px]"
        >
            <div class="flex flex-1 pb-2">
                <div class="flex-1 overflow-hidden flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between h-7">
                            <div
                                class="flex items-center w-28 tlw_skeleton bg-[#f2f2f2] h-[22px] px-2 rounded-[5px] rounded-br-xl"
                            ></div>
                        </div>
                        <div class="h-8 flex items-center text-mainText">
                            <div class="flex items-center flex-1 overflow-hidden">
                                <div class="w-5 h-5 rounded-full tlw_skeleton" />
                                <span class="text-13px flex-1 h-5 ml-10px tlw_skeleton rounded">
                                </span>
                            </div>
                            <span class="min-w-[22px] text-center text-lg"> </span>
                        </div>
                        <div class="h-8 flex items-center text-mainText">
                            <div class="flex items-center flex-1 overflow-hidden">
                                <div class="w-5 h-5 rounded-full tlw_skeleton" />
                                <span class="text-13px flex-1 h-5 ml-10px tlw_skeleton rounded">
                                </span>
                            </div>
                            <span class="min-w-[22px] text-center text-lg"> </span>
                        </div>
                    </div>
                    <div class="h-5 w-32 tlw_skeleton rounded"></div>
                </div>
                <div class="w-1/2 competition relative">
                    <div class="w-full h-full overflow-hidden relative">
                        <div
                            class="flex duration-300 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-thin scrollbar-none"
                        >
                            <div
                                :key="i"
                                v-for="(v, i) in 2"
                                class="w-[calc(50%-1px)] flex-shrink-0 box-border mr-[2px] last-of-type:mr-0"
                            >
                                <div class="h-7 overflow-hidden flex items-center">
                                    <p class="h-3 tlw_skeleton flex-1 rounded"></p>
                                </div>
                                <div
                                    :key="j"
                                    v-for="(k, j) in 2"
                                    class="h-8 flex-1 mb-[2px] rounded-md tlw_skeleton"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="-translate-y-4 flex items-center justify-center pointer-events-none"
                    >
                        <div class="w-7 h-[3px] bg-[#DEDEDE] rounded tlw_skeleton"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
