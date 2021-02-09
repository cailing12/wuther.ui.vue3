<template>
  <div class="wrapper">
    <el-row style="height:8%;width:100%;display:table">
      <el-col :span="4">
        <img src="@/assets/logo.png" style="width:100%;height:58px">
      </el-col>
      <el-col :span="20" style="100%">
        <navview />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" class="left-nav">
        <treemenu @leftMenuClick="leftMenuClick" />
      </el-col>
      <el-col id="blogContent" :span="14">
        <div v-for="blog in bloglist" :key="blog.id">
          <article class="post-item">
            <section class="post-item-body">
              <div class="post-item-text">
                <a class="post-item-title" :href="blog.path" target="_blank">{{ blog.title }}</a>
                <p class="post-item-summary">
                  <img src="@/assets/migan.jpg" class="avatar">
                  {{ blog.abstract }}
                </p>
              </div>
              <footer class="post-item-foot">
                <a href="https://www.cnblogs.com/huaweiyun/" class="post-item-author"><span>{{ blog.user.username }}</span></a>
                <span class="post-meta-item">
                  <span>{{ blog.createTime }}</span>
                </span>
                <a class="post-meta-item btn " href="javascript:void(0)" onclick="DiggPost('huaweiyun', 13878463, 602073, 1);return false;">
                  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <use xlink:href="#icon-dianzan" />
                  </svg>
                  <span id="digg_count_13878463">{{ blog.like }}</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/huaweiyun/p/13878463.html#commentform">
                  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <use xlink:href="#icon-pinglun" />
                  </svg>
                  <span>{{ blog.comment }}</span>
                </a>
                <a class="post-meta-item btn" href="https://www.cnblogs.com/huaweiyun/p/13878463.html">
                  <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <use xlink:href="#icon-shoucang" />
                  </svg>
                  <span>{{ blog.trend }}</span>
                </a>
              </footer>
            </section>
            <figure />
          </article>
        </div>
      </el-col>
      <el-col :span="6">
        <el-calendar v-model="currentDate" />
      </el-col>
    </el-row>
    <el-row>
      @2021 wuther
    </el-row>
  </div>
</template>

<script>
//import request from '@/utils/request'
import { getBlogList } from '@/api/blog'
// import treemenu from './components/tree-menu'
// import Auth from '@/utils/auth'
import navview from './components/nav-view'
import treemenu from './components/tree-menu'
import '@/utils/icon.js'
export default {
  name: 'Layout',
  components: {
    treemenu,
    navview
  },
  data() {
    return {
      isCollapse: false,
      name: 'Vue.js',
      tabIndex: 2,
      leftNavSty: {
        height: ''
      },
      currentDate: new Date(),
      bloglist: []
    }
  },
  beforeCreate() {
  },
  mounted() {
    // this.getMenuList()
    this.getBlogs()
    var height = window.getComputedStyle(document.getElementById('blogContent')).height
    this.leftNavSty.height = height
  },
  methods: {
    hideMenu() {
      this.isCollapse = !this.isCollapse
    },
    handleOpen(key, keyPath) {
       console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
       console.log(key, keyPath);
    },
    async getBlogs() {
      const { data } =  await getBlogList()
      if (data.value) {
          this.bloglist = data.value
          console.log(data.value)
        } else {
          console.log('获取菜单失败！')
        }
    },
    leftMenuClick(menuId) {
      alert(menuId)
    }
    // exitSystem() {
    //   Auth.removeLoginStatus()
    //   this.$router.push({ path: '/login', query: {}})
    // }
  }

}
</script>
<style lang="less">
  .wrapper{
    width: 100%;
    height: 100%;
  }
  .el-col{
    width: 100%;
  }
  .post-item{
    margin: 4%;
  }
  .post-item-text>.post-item-title {
    color: #005da6;
    font-weight: bold;
  }
  .post-item>.post-item-body>.post-item-foot>* {
    margin-right: 16px;
    vertical-align: middle;
  }
  .post-item>.post-item-body>.post-item-foot>.post-meta-item>*:not(:first-child) {
    margin-left: 6px;
  }
  .post-item>.post-item-body>.post-item-foot>a{
		color: #005da6;
		text-decoration: none;
  }
</style>
