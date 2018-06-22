<template>
  <div id="app">
    <el-container>
      <el-header><top></top></el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
import top from './components/header'
import foo from './components/footer'
export default {
  name: 'App',
  components: {
    top,
    foo
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
</style>
