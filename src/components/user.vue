<template>
  <div>
    <el-container v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading">
      <el-main>
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div class="card-header">
            <router-link to="/">主页</router-link>
          </div>
          <div class="card-body">
            <img :src="user.avatar_url" :title="user.loginname" width="30"><span>{{user.loginname}}</span>
            <p>{{user.score}}积分</p>
            <p>@{{user.githubUsername}}</p>
            <p>注册时间  {{user.create_at | timeFilter}}</p>
          </div>
        </el-card>
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div class="card-header">
            <p>最近创建的话题</p>
          </div>
          <div>
            <el-row v-for="col in user.recent_topics" :key="col.id">
              <el-col :span="18" class="text-left">
                <router-link class="user-avatar" :to="'/user/'+col.author.loginname">
                  <img :src="col.author.avatar_url" :title="col.author.loginname">
                </router-link>
                <span class="topic_title" @click="user(col.author.loginname)" :title="col.title">{{col.title}}</span>
              </el-col>
              <el-col :span="6" class="text-right">
                <img :src="col.author.avatar_url" :title="col.author.loginname" width="18"><span class="reply_count">{{col.last_reply_at | timeFilter}}</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card" :body-style="{ padding: '0px' }">
          <div class="card-header">
            <p>最近参与的话题</p>
          </div>
          <div>
            <el-row v-for="col in user.recent_replies" :key="col.id">
              <el-col :span="18" class="text-left">
                <router-link class="user-avatar" :to="'/user/'+col.author.loginname">
                  <img :src="col.author.avatar_url" :title="col.author.loginname">
                </router-link>
                <span class="topic_title" @click="user(col.author.loginname)" :title="col.title">{{col.title}}</span>
              </el-col>
              <el-col :span="6" class="text-right">
                <img :src="col.author.avatar_url" :title="col.author.loginname" width="18"><span class="reply_count">{{col.last_reply_at | timeFilter}}</span>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-main>
      <el-aside width="300px"><div class="right"></div></el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'user',
  data() {
    return {
      user: '',
      loading: true
    }
  },
  mounted() {
    this.getUser()
  },
  computed: {
  },
  methods: {
    getUser() {
      this.loading = true
      this.axios.get('/api/user/' + this.$route.params.username).then((response) => {
        this.user = response.data.data
        this.loading = false
      })
    }
  },
  watch: {
    '$route' (to, from) {
      this.getUser()
    }
  },
  filters: {
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
  }
  .right {
    padding: 20px;
  }
  .el-row {
    font-size: 16px;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    padding: 10px 20px;
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
        padding-left: 10px;
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
