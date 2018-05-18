<template>
  <div>
    <el-container>
      <el-header><Header/></el-header>
      <el-container>
        <el-main>
          <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane v-for="item in items" :label="item.name" :key="item.path">
              <el-row v-for="col in list" :key="col.id">
                <el-col :span="18" class="text-left">
                  <span class="user-avatar" @click="user(col.author.loginname)">
                    <img :src="col.author.avatar_url" :title="col.author.loginname">
                  </span>
                  <span class="reply_count">{{col.reply_count}}/{{col.visit_count}}</span>
                  <span></span>
                  <span class="topic_title" @click="user(col.author.loginname)">{{col.title}}</span>
                </el-col>
                <el-col :span="6">
                  <img :src="col.author.avatar_url" :title="col.author.loginname" width="18"><span class="reply_count">{{col.last_reply_at}}</span>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-main>
        <el-aside width="300px"><div class="right"></div></el-aside>
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
          path: 'all',
          name: '全部'
        },
        {
          path: 'good',
          name: '精华'
        },
        {
          path: 'share',
          name: '分享'
        },
        {
          path: 'ask',
          name: '问答'
        },
        {
          path: 'job',
          name: '招聘'
        }
      ],
      itemsTurn: {
        '全部': 'all',
        '精华': 'good',
        '分享': 'share',
        '问答': 'ask',
        '招聘': 'job'
      },
      list: [],
      userInfo: ''
    }
  },
  computed: {
    author() {
      return this.$store.state.author
    }
  },
  methods: {
    handleClick(tab, event) {
      this.axios.get('/api/topics', {
        params: {
          tab: this.itemsTurn[tab.label]
        }
      }).then((response) => {
        this.list = response.data.data
      })
    },
    user(name) {
      this.axios.get('/api/user/' + name).then((response) => {
        this.userInfo = response.data.data
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
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    & .text-left {
      text-align: left;
      & .user-avatar{
        float: left;
        line-height: 10px;
        img{
          width: 30px;
          height: 30px;
          border-radius: 3px;
        }
      }
      & .reply_count{
        display: inline-block;
        width: 70px;
        font-size: 14px;
        text-align: center;
      }
      & .topic_title{
        margin-left: 10px;
        font-size: 16px;
        color: #333;
        &:hover{
          text-decoration: underline;
        }
        &:link{
          color: #888;
        }
      }
    }
  }
</style>
