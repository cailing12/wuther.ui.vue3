import cookie from 'js-cookie'

const authToken = {
  getToken() {
    return cookie.get('token')
  },
  setToken(token) {
    cookie.set('token', token)
  },
  getLoginStatus() {
    return cookie.get('loginStatus')
  },
  setLoginStatus(status) {
    var maxAge = new Date(new Date().getTime() + 300 * 1000)
    cookie.set('loginStatus', status, {
      expires: maxAge
    })
  },
  removeToken() {
    cookie.remove('token')
  },
  removeLoginStatus() {
    cookie.remove('loginStatus')
    cookie.remove('token')
  }
}
export default authToken
