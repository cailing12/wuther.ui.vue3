<template>
  <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="10em">
    <el-form-item label="标题" prop="title">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>
    <el-form-item label="类别" prop="menuId">
      <el-radio-group v-model="ruleForm.menuId">
        <el-radio
          v-for="menu in menuList"
          :key="menu.item.id"
          :label="menu.item.id"
          :value="menu.item.id"
          >{{ menu.item.name }}</el-radio
        >
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否公开" prop="isPublic">
      <el-radio-group v-model="ruleForm.isPublic">
        <el-radio key="0" label="0" value="0">是</el-radio>
        <el-radio key="1" label="1" value="0">否</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
  <div id="editContent" ref="editor"></div>
  <!-- <button @click="syncHTML">同步内容</button> -->
  <el-button type="primary" id="blogSubmit" @click="submit('ruleForm')"
    >提交</el-button
  >
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
import { addBlog } from "@/api/blog";
import WangEditor from "wangeditor";
import { mapGetters } from "vuex";
import { ElMessage } from "element-plus";
export default {
  name: "app",
  data() {
    return {
      //menuList: this.$store.state.menu.verticalNavList,
      ruleForm: {
        title: "",
        menuId: "",
        isPublic: "0",
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 3,
            max: 30,
            message: "长度在 3 到 30 个字符",
            trigger: "blur",
          },
        ],
        menuId: [{ required: true, message: "请选择类别", trigger: "change" }],
        isPublic: [
          { required: true, message: "请选择是否公开", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/verticalNavList",
    }),
  },
  setup() {
    const editor = ref();
    const content = reactive({
      html: "",
      text: "",
    });
    let instance;
    onMounted(() => {
      instance = new WangEditor(editor.value);
      instance.config.uploadImgServer = "https://localhost:6088/api/UploadFile";
      instance.config.uploadImgParams = {
        token: "xxxxx",
        x: 100,
      };
      instance.config.uploadImgHooks = {
        // 上传图片之前
        before: function (xhr) {
          console.log(xhr);

          // 可阻止图片上传
          // return {
          //   prevent: true,
          //   msg: "需要提示给用户的错误信息",
          // };
        },
        // 图片上传并返回了结果，图片插入已成功
        success: function (xhr) {
          console.log("success", xhr);
        },
        // 图片上传并返回了结果，但图片插入时出错了
        fail: function (xhr, editor, resData) {
          console.log("fail", resData);
        },
        // 上传图片出错，一般为 http 请求的错误
        error: function (xhr, editor, resData) {
          console.log("error", xhr, resData);
        },
        // 上传图片超时
        timeout: function (xhr) {
          console.log("timeout", xhr);
        },
        // 图片上传并返回了结果，想要自己把图片插入到编辑器中
        // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
        // customInsert: function (insertImgFn, result) {
        //   // result 即服务端返回的接口
        //   console.log("customInsert", result);

        //   // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        //   insertImgFn(result.data[0]);
        // },
      };

      // Object.assign(instance.config, {
      //   onchange() {
      //     console.log("change");
      //   },
      //   height:500
      // });
      instance.create();
    });
    onBeforeUnmount(() => {
      instance.destroy();
      instance = null;
    });
    const syncHTML = () => {
      content.html = instance.txt.html();
    };
    return {
      syncHTML,
      editor,
      content,
    };
  },
  methods: {
    submit(formName) {
      this.syncHTML();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var entity = {
            userId: "1",
            title: this.ruleForm.title,
            menuId: this.ruleForm.menuId,
            content: this.content.html,
          };
          const { data } = addBlog(entity);
          console.log("保存消息");
          console.log(data);
        } else {
          ElMessage.error("博客保存出错");
        }
      });
    },
  },
  resetForm(formName) {
    this.$refs[formName].resetFields();
  },
};
</script>
<style lang="less" scoped>
#blogSubmit {
  margin: 1em;
  float: right;
}
</style>
