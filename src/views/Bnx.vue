<template>
    <div class="bnx">
        <div class="title">BNX 价格监控</div>

        <div class="limit">
            <label for="price">监控价格</label>
            <input type="number" id="price" v-model="inputVal" />
            <span class="save" v-on:click="limitPrice = inputVal">保存</span>
            <span
                >现在监控的价格： <span>{{ limitPrice }}</span> BNX</span
            >
        </div>

        <div class="start">
            <span :class="{ isStart: isStart }" v-on:click="runClick">{{ isStart ? '停止监控' : '开始监控' }}</span>
        </div>
        <div v-if="isStart">监控中......</div>

        <div class="list">
            <div class="list-item" v-for="hero in resList" :key="hero.order_id">
                <span>{{ careerMatch(hero) }}</span>
                <span>level: {{ hero.level }}</span>
                <span :class="{ limitPrice: resPrice(hero.price) <= limitPrice }">{{ resPrice(hero.price) }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Bnx',

    data() {
        return {
            isStart: false, // 是否监控中
            resList: [], // 数据列表
            timer: null, // 计时器
            careerList: [
                ['0x22F3E436dF132791140571FC985Eb17Ab1846494', '战士'],
                ['0xC6dB06fF6e97a6Dc4304f7615CdD392a9cF13F44', '法师'],
                ['0xF31913a9C8EFE7cE7F08A1c08757C166b572a937', '游侠'],
                ['0xaF9A274c9668d68322B0dcD9043D79Cd1eBd41b3', '盗贼'],
            ], // 职业地址
            inputVal: 0, // 限定价格框的值
            limitPrice: 0, // 限定价格
        }
    },

    methods: {
        // 监控按钮点击
        runClick() {
            this.isStart = !this.isStart
            if (this.isStart) {
                this.start()
            } else {
                this.stop()
            }
        },

        // 开始监控
        async start() {
            let timer = setInterval(async () => {
                const res = await this.$http.get('https://market.binaryx.pro/info/getSales', {
                    params: {
                        page: 1,
                        page_size: 20,
                        status: 'selling',
                        name: '',
                        sort: 'price',
                        direction: 'asc',
                        career: '',
                        value_attr: '',
                        start_value: '',
                        end_value: '',
                        pay_addr: '',
                    },
                })
                if (res && res.data && res.status === 200) {
                    const data = res.data
                    if (data.code === 0 && data.data && data.data.result) {
                        const result = data.data.result
                        if (result && result.items && result.items.length) {
                            this.resList = result.items
                            console.log('数据列表: ', this.resList)

                            if (this.resPrice(this.resList[0].price) <= this.limitPrice) {
                                this.$message.info({
                                    content: '预警！！！有符合监控价格的英雄，请注意！',
                                    duration: 5,
                                    maxCount: 5,
                                })
                            }
                        }
                    }
                }
            }, 3000)
            this.timer = timer
        },

        // 停止监控
        stop() {
            clearInterval(this.timer)
            this.timer = null
        },

        // 匹配职业
        careerMatch(hero) {
            let career = ''
            this.careerList.forEach((item) => {
                if (hero.career_address === item[0]) career = item[1]
            })
            return career
        },

        resPrice(price) {
            return parseFloat(price / 1000000000000000000)
        },
    },
}
</script>

<style lang="less" scoped>
.bnx {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        font-weight: bold;
        font-size: 30px;
        line-height: 1.5;
        padding-bottom: 20px;
    }

    .limit {
        display: flex;
        margin: 0 auto;
        width: fit-content;
        justify-content: center;
        align-items: center;
        label {
            margin-right: 10px;
        }
        input {
            line-height: 20px;
            width: 80px;
            border-radius: 4px;
        }
        .save {
            margin: 0 20px 0 10px;
            background: #42b983;
            color: #eeeeee;
            padding: 5px;
            border-radius: 4px;
            cursor: pointer;
            &:hover {
                background: #1c9b62;
            }
        }
        span {
            span {
                color: #ff0000;
            }
        }
    }

    .start {
        padding: 20px 0;
        span {
            display: inline-block;
            line-height: 40px;
            padding: 0 30px;
            border-radius: 4px;
            cursor: pointer;
            background: #42b983;
            color: #eeeeee;
            &:hover {
                background: #1c9b62;
            }
            &.isStart {
                background: #b94266;
                &:hover {
                    background: #8b1b3d;
                }
            }
        }
    }

    .list {
        display: flex;
        flex-wrap: wrap;
        width: 1000px;
        justify-content: space-between;

        .list-item {
            display: flex;
            flex-direction: column;
            padding: 20px 60px;
            align-items: center;

            .limitPrice {
                color: #ff0000;
            }
        }
    }
}
</style>
