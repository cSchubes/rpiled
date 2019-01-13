import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Posts from '@/components/Posts'
import Color from '@/components/Color'
import Animation from '@/components/animations/Layout'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    }, 
    {
      path: '/color',
      name: 'Color',
      component: Color
    },
    {
      path: '/animation',
      name: 'Animation',
      component: Animation
    }
    
  ]
})
