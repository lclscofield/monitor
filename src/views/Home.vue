<template>
    <div class="home">
        <img class="logo" alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Monitor!" />
        <div class="menu">
            <div>
                <span v-on:click="to('Yohero')">YOHERO 价格监控</span>
            </div>
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
    .logo {
        width: 300px;
        height: 300px;
    }

    .menu {
        line-height: 40px;
        color: #193ddd;

        span {
            cursor: pointer;
            display: inline-block;
        }
    }
}
</style>
