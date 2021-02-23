import Screen from './index.vue'
import Home from '@/views/screen/children/home/index.vue'
export default () => ({
  path: '/screen',
  component: Screen,
  redirect: '/screen/home',
  children: [
    {
      path: '/screen/home',
      component: Home,
    },
  ],
})