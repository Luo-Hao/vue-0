/**
 * Created by hao.luo on 2018/6/5.
 */
import Vue from 'vue'
import * as types from './mutations'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const actions = {
  signin (context, data) {
    return axios.post('/api/accesstoken', data).then(res => {
      context.commit(types.SIGN_IN, res.data)
      return Promise.resolve(res.data)
    })
  },
  getUser (context, data) {
    return axios.post('/api/accesstoken', data).then(res => {
      context.commit(types.SIGN_IN, res.data)
      return Promise.resolve(res.data)
    })
  }
}

export default actions
