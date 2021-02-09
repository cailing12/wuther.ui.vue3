import request from '@/utils/request'

export async function getBlogList() {
  return request({
    url: 'api/blogs',
    method: 'get',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/vnd.wuther.blogs.full.hateoas+json' }
  })
}

export async function addBlog(data) {
  return request({
    url: 'api/blogs',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/json'}
  })
}