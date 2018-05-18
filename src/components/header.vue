<template>
  <div class="hello">
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="6">
        <el-aside width="300px">
          <a class="brand" href="/">
            <img src="../assets/logo.png" height="60">
          </a>VUE+CNODE
        </el-aside>
      </el-col>
      <el-col :span="12">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">未读消息</el-menu-item>
          <el-menu-item index="3">新手入门</el-menu-item>
          <el-menu-item index="4">API</el-menu-item>
          <el-menu-item index="5">关于</el-menu-item>
          <el-menu-item index="6">设置</el-menu-item>
          <el-menu-item index="7">退出</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .hello {
    height: 60px;
    border-bottom: 1px solid #ccc;
  }
</style>
