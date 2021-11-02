<template>
    <div class="main">
        <div class="nav">
            <router-link to="/">主页</router-link>
            <router-link to="/yohero">YOHERO</router-link>
        </div>

        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

a,
a:link,
a:visited,
a:hover,
a:active {
    text-decoration: none;
    color: inherit;
}

.nav {
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
        font-weight: bold;
        color: #2c3e50;
        line-height: 40px;
        padding: 0 20px;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
