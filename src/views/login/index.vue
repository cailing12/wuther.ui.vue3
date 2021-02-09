
<template>
  <el-form id="loginForm" ref="form" :model="form" :rules="rules" class="ruleForm" status-icon label-width="80px">
    <div id="stage">
      <div id="inner">
        <div id="cover">
          <div id="text">
            <span style="color: cyan;">PIO</span><span style="color: white;">POWERED</span>
          </div>
        </div>
        <canvas id="live2d" class="mb-4" width="800" height="800" />
      </div>
      <a id="info" @click="info "><i class="fa fa-lg fa-info" /></a>
      <a id="refresh" @click="refresh"><i class="fa fa-lg fa-refresh" /></a>
    </div>
    <h2 class="title">wuther登陆平台</h2>
    <el-form-item label="用户名" prop="account">
      <el-input v-model="form.account" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" />
    </el-form-item>
    <el-form-item label="验证码" prop="verifyCode">
      <el-input v-model="form.verifyCode" type="text" />
    </el-form-item>
    <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="submitForm('form')">登陆</el-button>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex'
import '@/utils/live2d.min.js'
export default {
  name: 'Login',
  data() {
    return {
      form: {
        account: '',
        password: '',
        verifyCode: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        verifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      apiPath: 'https://live2d.fghrsh.net/api',
      state: 0
    }
  },
  created() {
    this.$nextTick(function() {
      var lett = this
      document.onkeydown = function() {
        var key = window.event.keyCode
        if (key === 13) {
          lett.submitForm('form')
        }
      }
    })
  },
  mounted() {
    this.$nextTick(function() {
      if (!CSS.supports('clip-path', 'circle(120px at center)') && !CSS.supports('-webkit-clip-path', 'circle(120px at center)')) {
        document.getElementById('stage').innerHTML = '<img src="../assets/screenshot-1.png">'
        return
      }

      var modelId = localStorage.getItem('modelId')
      var modelTexturesId = localStorage.getItem('modelTexturesId')
      if (modelId === null) {
        modelId = 1
        modelTexturesId = 53
      }
      this.loadModel(modelId, modelTexturesId)
    })
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    loadModel(modelId, modelTexturesId) {
      localStorage.setItem('modelId', modelId)
      if (modelTexturesId === undefined) modelTexturesId = 0
      localStorage.setItem('modelTexturesId', modelTexturesId)
      // eslint-disable-next-line no-undef
      loadlive2d('live2d', `${this.apiPath}/get/?id=${modelId}-${modelTexturesId}`, null)
      console.log('live2d', `模型 ${modelId}-${modelTexturesId} 加载完成`)
      setTimeout(() => {
        this.coverPosition('80%')
      }, 2000)
    },
    loadRandModel() {
      var lett = this
      var modelId = localStorage.getItem('modelId')
      var modelTexturesId = localStorage.getItem('modelTexturesId')
      fetch(`${lett.apiPath}/rand_textures/?id=${modelId}-${modelTexturesId}`)
        .then(response => response.json())
        .then(result => {
          lett.loadModel(modelId, result.textures.id)
          setTimeout(() => {
            lett.state = 2
            lett.coverPosition('80%')
            document.getElementById('refresh').setAttribute('href', 'javascript:refresh()')
          }, 1000)
        })
    },
    loadOtherModel() {
      var lett = this
      var modelId = localStorage.getItem('modelId')
      fetch(`${lett.apiPath}/switch/?id=${modelId}`)
        .then(response => response.json())
        .then(result => {
          lett.loadModel(result.model.id)
        })
    },
    coverPosition(pos) {
      document.getElementById('cover').style.bottom = pos
    },
    info() {
      fetch('https://v1.hitokoto.cn')
        .then(response => response.json())
        .then(result => {
          alert('「' + result.hitokoto + '」——' + result.from)
        })
    },
    refresh() {
      this.state = 0
      this.coverPosition('10%')
      document.getElementById('refresh').setAttribute('href', 'javascript:void(0)')
      setTimeout(this.loadRandModel, 1000)
    },
    handleClick() {
      if (this.state === 1) {
        this.state = 2
        this.coverPosition('80%')
      } else if (this.state === 2) {
        this.state = 1
        this.coverPosition('20%')
      }
    },
    pwdFocus() {
      if (this.state === 2) {
        this.state = 1
        this.coverPosition('20%')
      }
    },
    pwdBlur() {
      if (this.state === 1) {
        this.state = 2
        this.coverPosition('80%')
      }
    },
    submitForm(formName) {
      // console.log(this.$store.state.auth.count22)
      var lett = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = lett.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          // lett.form.account = lett.common.removeSpace(lett.form.account)
          // lett.form.password = lett.common.removeSpace(lett.form.password.trim())
          // lett.form.verifyCode = lett.common.removeSpace(lett.form.verifyCode.trim())
          this.login({
            account: lett.form.account,
            password: lett.form.password,
            verifyCode: lett.form.verifyCode
          }).then(() => {
            loading.close()
          }).catch(err => {
            console.warn(`获取数据失败。${err}`)
            loading.close()
          })
          lett.$router.push({ path: '/', query: {}})
        } else {
          lett.$message.error('请按照要求输入登陆信息！')
          return false
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
html, body {
  width: 100%;
	height: 100%;
}
#loginForm {
	//display: flex;
	align-items: center;
	justify-content: center;
	padding-top: 40px;
	padding-bottom: 40px;
	background-color: #f5f5f5;
}
.ruleForm {
	width: 100%;
	max-width: 330px;
	padding: 15px;
	margin: 0 auto;
}
.ruleForm .checkbox {
	font-weight: 400;
}
.ruleForm .form-control {
	position: relative;
	box-sizing: border-box;
	height: auto;
	padding: 10px;
	font-size: 16px;
}
.ruleForm .form-control:focus {
	z-index: 2;
}
.ruleForm input[type=text] {
	margin-bottom: -1px;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
}
.ruleForm input[type=password] {
	margin-bottom: 10px;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}
#stage {
	position: relative;
}
#stage img {
	width: 100%;
	margin-bottom: 20px;
	border-radius: 20px;
}
#stage a {
	position: absolute;
	width: 2em;
	height: 2em;
	border-radius: 50%;
}
#inner {
	position: relative;
	background-color: #999;
	clip-path: circle(120px at center);
	-webkit-clip-path: circle(120px at center);
}
#cover {
	position: absolute;
	background-color: #CB3837;
	width: 100%;
	height: 100%;
	bottom: 10%;
	transition: all 1s;
	box-shadow: 0 0 0 5px rgba(0, 0, 0, .1);
}
#text {
	position: absolute;
	bottom: 30%;
	font-size: 2em;
	left: 50%;
	transform: translateX(-50%);
	opacity: 0.4;
	font-weight: bold;
}
#detail {
	position: absolute;
	background: rgba(255, 255, 255, .1);
	width: 100%;
	height: 10px;
	bottom: 0;
}
#handle {
	position: absolute;
	background: #ccc;
	bottom: -2px;
	box-shadow: 0 1px 0 1px rgba(0, 0, 0, .1);
	height: 8px;
	left: 50%;
	margin-left: -15px;
	width: 30px;
	cursor: pointer;
}
#info {
	left: 40px;
	bottom: 20px;
}
#refresh {
	right: 40px;
	bottom: 20px;
}
#live2d {
	cursor: grab;
	height: 300px;
	width: 300px;
}
#live2d:active {
	cursor: grabbing;
}
</style>
