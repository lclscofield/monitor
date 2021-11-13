<template>
    <div class="yohero">
        <div class="title">YOHERO 价格监控</div>

        <div class="limit">
            <label for="price">监控价格</label>
            <input type="number" id="price" v-model="inputVal" />
            <span class="save" v-on:click="limitPrice = inputVal">保存</span>
            <span
                >现在监控的价格： <span>{{ limitPrice }}</span> BNB</span
            >
        </div>

        <div class="sort yohero-item">
            <input type="radio" id="up" value="up" v-model="sortValue" />
            <label for="up">价格升序</label>
            <input type="radio" id="down" value="down" v-model="sortValue" />
            <label for="down">价格降序</label>
        </div>

        <div class="num yohero-item">
            <span>召唤次数</span>
            <input type="number" v-model="minCallNum" min="0" max="7" />
            ----------
            <input type="number" v-model="maxCallNum" min="0" max="7" />
        </div>

        <div class="profession">
            <span v-for="(occn, idx) in occns" :key="occn">
                <input type="checkbox" :id="idx + 1" :value="idx + 1" v-model="professionList" />
                <label :for="idx + 1">{{ occn }}</label>
            </span>
        </div>

        <div class="start">
            <span :class="{ isStart: isStart }" v-on:click="runClick">{{ isStart ? '停止监控' : '开始监控' }}</span>
        </div>
        <div v-if="isStart">监控中......</div>

        <div class="list">
            <div class="list-item" v-for="res in resList" :key="res.id">
                <span>{{ res.id }}</span>
                <span>{{ occns[res.occn - 1] }}</span>
                <span>{{ res.callNum }} / 7</span>
                <span :class="{ limitPrice: resPrice(res.price) <= limitPrice }">{{ resPrice(res.price) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Yohero',

    data() {
        return {
            sortValue: 'up', // 价格升序还是降序
            minCallNum: 0, // 最小召唤次数
            maxCallNum: 7, // 最大召唤次数
            professionList: [], // 职业选择
            isStart: false, // 是否监控中
            resList: [], // 数据列表
            timer: null, // 计时器
            occns: ['炼气士', '萨满', '法师', '战士', '祭司', '术士', '骑士', '刺客'], // 职业列表
            inputVal: 0, // 限定价格框的值
            limitPrice: 0, // 限定价格
        }
    },

    methods: {
        resPrice(price) {
            return parseFloat(price / 1000000000000000000)
        },

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
                let orders = {
                    up: '4',
                    down: '3',
                }
                let occns = this.professionList.map((item) => {
                    return parseInt(item)
                })
                let res = await this.$http.post('https://www.yohero.fi/api', {
                    code: 1096,
                    playerId: '',
                    message: {
                        occns,
                        minCallNum: this.minCallNum,
                        maxCallNum: this.maxCallNum,
                        order: orders[this.sortValue],
                        page: 1,
                    },
                })
                if (res && res.data && res.status === 200) {
                    let data = res.data
                    if (data.errorCode === '0') {
                        let message = data.message.replace('\\', '')
                        let list = JSON.parse(message).list
                        this.resList = list
                        console.log(list)
                        if (this.resPrice(list[0].price) <= this.limitPrice) {
                            this.$message.info({
                                content: '预警！！！有符合监控价格的英雄，请注意！',
                                duration: 5,
                                maxCount: 5,
                            })
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
    },
}
</script>

<style lang="less" scoped>
.yohero {
    display: flex;
    flex-direction: column;
    align-items: center;

    .yohero-item {
        padding: 10px;
    }

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

    .sort {
        label {
            margin-right: 20px;
        }
    }

    .num {
        display: flex;
        margin: 0 auto;
        width: fit-content;
        justify-content: center;
        align-items: center;
        span {
            margin-right: 10px;
        }
        input {
            line-height: 20px;
            width: 50px;
            border-radius: 4px;
        }
    }

    .profession {
        label {
            margin-right: 10px;
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
        width: 1000px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
        .list-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 10px 36px;
            span {
                padding: 2px 0;
                &.limitPrice {
                    color: #ff0000;
                }
            }
        }
    }
}
</style>
