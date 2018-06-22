import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/content'
import User from '@/components/user'
import Header from '@/components/header'
import Footer from '@/components/footer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Content',
      component: Content
    },
    {
      path: 'header',
      name: 'header',
      component: Header
    },
    {
      path: 'footer',
      name: 'footer',
      component: Footer
    },
    {
      path: '/user/:username',
      name: 'user',
      component: User
    }
  ]
})
