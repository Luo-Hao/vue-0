<template>
  <div>
    <el-container>
      <el-main>
        <el-tabs type="border-card" @tab-click="handleClick">
          <el-tab-pane v-for="item in items" :label="item.name" :key="item.path"
                       v-loading="loading"
                       element-loading-text="拼命加载中"
                       element-loading-spinner="el-icon-loading">
            <el-row v-show="list.length" v-for="col in list" :key="col.id">
              <el-col :span="18" class="text-left">
                <router-link class="user-avatar" :to="'/user/'+col.author.loginname">
                  <img :src="col.author.avatar_url" :title="col.author.loginname">
                </router-link>
                <span class="reply_count">{{col.reply_count}}/{{col.visit_count}}</span>
                <span v-if="col.top" :class="'tab-label tab-top'">置顶</span>
                <span v-else-if="col.good" :class="'tab-label tab-good'">精华</span>
                <span v-else :class="'tab-label tab-'+col.tab">{{col.tab | tabFilter}}</span>
                <span class="topic_title" @click="user(col.author.loginname)" :title="col.title">{{col.title}}</span>
              </el-col>
              <el-col :span="6" class="text-right">
                <img :src="col.author.avatar_url" :title="col.author.loginname" width="18"><span class="reply_count">{{col.last_reply_at | timeFilter}}</span>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-aside width="300px">
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div class="card-header">
            <router-link to="/">登陆到CNODE</router-link>
          </div>
          <div class="card-input">
            <el-input
              placeholder="请输入Token"
              v-model="accesstoken">
            </el-input>
            <el-button type="success" @click="handleSignin">登陆</el-button>
          </div>
        </el-card>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Content',
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
      userInfo: '',
      accesstoken: '',
      loading: true
    }
  },
  mounted() {
    this.axios.get('/api/topics', {
      params: {
        tab: 'all'
      }
    }).then((response) => {
      this.list = response.data.data
      this.loading = false
    })
  },
  computed: {
    author() {
      return this.$store.state.author
    }
  },
  methods: {
    handleClick(tab, event) {
      this.loading = true
      this.axios.get('/api/topics', {
        params: {
          tab: this.itemsTurn[tab.label]
        }
      }).then((response) => {
        this.list = response.data.data
        this.loading = false
      })
    },
    user(name) {
      this.axios.get('/api/user/' + name).then((response) => {
        this.userInfo = response.data.data
      })
    },
    handleSignin() {
      this.$store.dispatch('signin', {accesstoken: this.accesstoken}).then(res => {
        console.log(res)
      })
    }
  },
  filters: {
    tabFilter: function (value) {
      if (!value) return ''
      let map = {
        'good': '精华',
        'share': '分享',
        'ask': '问答',
        'job': '招聘'
      }
      return map[value] ? map[value] : ''
    },
    timeFilter: function (value) {
      if (!value) return ''
      let d = new Date()
      let t = d - new Date(value)
      let x = parseInt(t / 1000 / 60 / 60 / 24 / 30 / 12) > 0 ? parseInt(t / 1000 / 60 / 60 / 24 / 30 / 12) + '年前' : (parseInt(t / 1000 / 60 / 60 / 24 / 30) > 0 ? parseInt(t / 1000 / 60 / 60 / 24 / 30) + '月前' : (parseInt(t / 1000 / 60 / 60 / 24) > 0 ? parseInt(t / 1000 / 60 / 60 / 24) + '天前' : (parseInt(t / 1000 / 60 / 60) > 0 ? parseInt(t / 1000 / 60 / 60) + '小时前' : (parseInt(t / 1000 / 60) > 0 ? parseInt(t / 1000 / 60) + '分钟前' : '1分钟前'))))
      return x
    }
  }
}
</script>

<style lang="less" scoped>
  .box-card{
    text-align: left;
    margin-bottom: 20px;
    .card-header{
      padding-left: 20px;
      background-color: #f5f7fa;
      border-bottom: 1px solid #e4e7ed;
      line-height: 38px;
      color: #ccc;
      a{
        color: #80bd01;
        &:hover{
          text-decoration: underline;
        }
      }
      p{
        color: #333;
      }
    }
    .card-body{
      padding: 10px 20px;
      line-height: 30px;
    }
    .card-input{
      padding: 10px 20px;
      line-height: 50px;
      text-align: center;
    }
  }
  .el-aside{
    padding: 20px 20px 0 0
  }
  .right {
    margin: 20px;
  }
  .el-row {
    font-size: 16px;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    .text-left {
      text-align: left;
      .user-avatar{
        float: left;
        line-height: 10px;
        img{
          width: 30px;
          height: 30px;
          border-radius: 3px;
        }
      }
      .reply_count{
        display: inline-block;
        width: 70px;
        font-size: 14px;
        text-align: center;
      }
      .topic_title{
        max-width: 70%;
        display: inline-block;
        vertical-align: middle;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 16px;
        color: #333;
        &:hover{
          text-decoration: underline;
        }
        &:link{
          color: #888;
        }
      }
      .tab-label{
        background-color: #e5e5e5;
        padding: 2px 4px;
        color: #999;
        border-radius: 3px;
        font-size: 12px;
        &.tab-top,&.tab-good{
          background-color: #80bd01;
          color: #fff;
        }
      }
    }
    .text-right{
      text-align: right;
      color: #778087;
      img{
        vertical-align: middle;
      }
      .reply_count{
        display: inline-block;
        min-width: 60px;
        font-size: 12px;
        line-height: 30px;
      }
    }
  }
</style>
