import request from '@/utils/request'

export async function login(data) {
  return request({
    url: 'api/login',
    method: 'post',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    data
  })
}

export async function socialLogin(data) {
  return request({
    url: '/socialLogin',
    method: 'post',
    data,
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function register() {
  return request({
    url: '/register',
    method: 'post',
  })
}
