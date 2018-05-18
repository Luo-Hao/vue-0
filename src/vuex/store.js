/**
 * Created by hao.luo on 2018/5/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    author: 'Wise Wrong'
  }
})

export default store
