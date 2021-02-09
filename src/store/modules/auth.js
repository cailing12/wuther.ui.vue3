/**
 * @author cailing12
 * @description 登录、获取登录状态
 */
import { login } from '@/api/user'
import authToken from '@/utils/authToken'


const state = () => ({
  accessToken: "",
  loginStatus:"",
  username: ''
})
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username
}
const mutations = {
  /**
   * @author cailing12
   * @description 设置accessToken
   * @param {*} state
   * @param {*} accessToken
   */
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
    authToken.setToken(accessToken)
  },
  /**
   * @author cailing12
   * @description 设置登录状态
   * @param {*} state 
   * @param {*} loginStatus 
   */
  setLoginStatus(state, loginStatus) {
    state.loginStatus = loginStatus
    authToken.setLoginStatus(loginStatus)
  },
  /**
   * @author cailing12
   * @description 设置用户名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state, username) {
    state.username = username
  }
}
const actions = {
  /**
   * @author cailing12
   * @description 登录
   * @param {*} { commit }
   * @param {*} userInfo
   */
  async login({ commit }, userInfo) {
    const { data } = await login(userInfo)
    if (data.token) {
      commit('setAccessToken', data.token)
      commit('setLoginStatus', true)
    }
    else{
      console.error(`登录接口异常，未正确返回${data.token}...`)
    }
  },
  setAccessToken({ commit }, accessToken) {
    commit('setAccessToken', accessToken)
  },
}
export default { state, getters, mutations, actions }
