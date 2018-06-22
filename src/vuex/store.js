/**
 * Created by hao.luo on 2018/5/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { saveLocalItem, getLocalItem, removeLocalItem } from '../common/unit'
import * as types from './mutations'
import actions from './actions'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

const state = {
  topicList: [],
  topic: {},
  user: {},
  loginname: getLocalItem('loginname') || '',
  accesstoken: getLocalItem('accesstoken') || '',
  avatar_url: getLocalItem('avatar_url') || ''
}

const mutations = {
  [types.SIGN_IN](state, user) {
    // 难不成Vue只能用这样赋值的方式来改变全局的store？
    // state = Object.assign({}, state, user);
    console.log(user)
    state.loginname = user.loginname
    state.accesstoken = user.accesstoken
    state.avatar_url = user.avatar_url

    // 本地存储
    saveLocalItem('loginname', user.loginname)
    saveLocalItem('accesstoken', user.accesstoken)
    saveLocalItem('avatar_url', user.avatar_url)
  },
  [types.SIGN_OUT](state) {
    state.loginname = ''
    state.accesstoken = ''
    state.avatar_url = ''
    // 删除本地存储
    removeLocalItem('loginname')
    removeLocalItem('accesstoken')
    removeLocalItem('avatar_url')
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
