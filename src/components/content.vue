<template>
  <div>
    <el-container>
      <el-header><Header/></el-header>
      <el-container>
        <el-main>
          <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane v-for="item in items" :label="item.name" :key="item.path">
              <el-row>
                <el-col :span="18" class="text-left">
                  <a href="">{{item.name}}</a>
                  <span>{{author}}</span>
                  <div>
                    <span></span>
                    <a href=""></a>
                  </div>
                </el-col>
                <el-col :span="6">{{item.path}}</el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-main>
        <el-aside width="300px"><div class="right">aside</div></el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './header.vue'
import Footer from './footer.vue'
export default {
  name: 'Content',
  components: {Header, Footer},
  data() {
    return {
      activeName: 'first',
      items: [
        {
          path: '/all',
          name: '全部'
        },
        {
          path: '/good',
          name: '精华'
        },
        {
          path: '/share',
          name: '分享'
        },
        {
          path: '/ask',
          name: '问答'
        },
        {
          path: '/job',
          name: '招聘'
        },
        {
          path: '/dev',
          name: '客户端测试'
        }
      ]
    }
  },
  computed: {
    author() {
      return this.$store.state.author
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab)
      this.axios.get('/api/topics').then((response) => {
        console.log(response.data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .right {
    padding: 20px;
  }
  .el-row {
    font-size: 16px;
    line-height: 30px;
    & .text-left {
      text-align: left;
    }
  }
</style>
