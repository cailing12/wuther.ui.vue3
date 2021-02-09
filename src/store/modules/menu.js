/**
 * @author cailing12
 * @description 获取垂直或水平菜单
 */
import { getHorizontalNavList,getVerticalNavList } from '@/api/menu'


const state = () => ({
  horizontalNavList: [],
  verticalNavList: []
})
const getters = {
  horizontalNavList: (state) => state.horizontalNavList,
  verticalNavList: (state) => state.verticalNavList
}
const mutations = {
  /**
   * @author cailing12
   * @description 设置水平菜单
   * @param {*} state
   * @param {*} accessToken
   */
  setHorizontalNavList(state, horizontalNavList) {
    state.horizontalNavList = horizontalNavList
  },
  /**
   * @author cailing12
   * @description 设置水平菜单
   * @param {*} state
   * @param {*} accessToken
   */
  setVerticalNavList(state, verticalNavList) {
    state.verticalNavList = verticalNavList
  }
}
const actions = {
  async getHorizontalNavList({ commit }) {
    const { data } =  await getHorizontalNavList()
    if (data.value.length>0) {
      commit('setHorizontalNavList', data.value)
    }
    else{
      console.error(`登录接口异常，未正确返回${data.value}...`)
    }
  },
  async getVerticalNavList({ commit }) {
    const { data } = await getVerticalNavList()
    if (data.value.length>0) {
      commit('setVerticalNavList', data.value)
    }
    else{
      console.error(`登录接口异常，未正确返回${data.value}...`)
    }
  }
}
export default { state, getters, mutations, actions }
