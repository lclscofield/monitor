<template>
    <div class="home">
        <img class="logo" alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Monitor!" />
        <div class="menu">
            <span v-on:click="to('Yohero')">YOHERO 价格监控</span>
            <span v-on:click="to('Bnx')">BNX 价格监控</span>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: 'Home',
    components: {
        HelloWorld,
    },

    methods: {
        to(name) {
            this.$router.push({
                name,
            })
        },
    },
}
</script>

<style lang="less" scoped>
.home {
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo {
        width: 300px;
        height: 300px;
    }

    .menu {
        color: #193ddd;
        display: flex;
        flex-direction: column;
        align-items: center;

        span {
            cursor: pointer;
            display: inline-block;
            line-height: 40px;
        }
    }
}
</style>
