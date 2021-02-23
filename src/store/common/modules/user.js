import { http } from '@/lib/http/index.js'
// 定义action type
export const LOGIN = 'LOGIN'
// 指定对应api
export const api = {
  [LOGIN]: `/login`, // 登录
}
// 初始化store对象
const state = {
  userInfo: {
    orgId: '1',
  },
  userTheme: 'default',
}

// 异步操作放到action handler里
const actions = {
  doLogin({ commit }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const rst = await http.post(api[LOGIN], payload)
        if (rst.code === '200') {
          const { sessionId, user } = rst.data // eslint-disable-line
          commit('SET_USER_INFO', user)
          resolve(rst)
        }
      } catch (error) {
        reject(error)
      }
    })
  },
}

// 根据commit更新store
const mutations = {
  SET_USER_INFO(state, info) {
    state.userInfo = info
  },
  SET_USER_THEME(state, theme) {
    state.userTheme = theme
  },
}

const getters = {
  userInfo(state) {
    return state.userInfo
  },
  userTheme(state) {
    return state.userTheme
  },
}

// 导出vuex模块
export default {
  // 模块开启命名空间
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
