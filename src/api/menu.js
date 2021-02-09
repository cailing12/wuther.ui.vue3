import request from '@/utils/request'

export async function getHorizontalNavList() {
  return request({
    url: 'api/menus',
    method: 'get',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    params: {
      position: 'horizontal'
    }
  })
}

export async function getVerticalNavList() {
  return request({
    url: 'api/menus',
    method: 'get',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    params: {
      position: 'vertical'
    }
  })
}