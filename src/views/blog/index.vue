<template>
  <el-form ref="form" :model="form" label-width="5em">
    <el-form-item label="标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="类别">
      <el-radio-group v-model="form.menuId">
        <el-radio
          v-for="menu in menuList"
          :key="menu.item.id"
          :label="menu.item.id"
          :value="menu.item.id"
        >{{menu.item.name}}</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
  <div id="editContent" ref="editor"></div>
  <!-- <button @click="syncHTML">同步内容</button> -->
  <el-button type="primary" id="blogSubmit" @click="submit">提交</el-button>
  <div :innerHTML="content.html"></div>
</template>

<script>
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
import { addBlog } from '@/api/blog'
import WangEditor from "wangeditor";
import { mapGetters } from "vuex";
export default {
  name: "app",
  data() {
    return {
      //menuList: this.$store.state.menu.verticalNavList,
      form: {
        title: "",
        menuId: "",
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
      Object.assign(instance.config, {
        onchange() {
          console.log("change");
        },
        height:500
      });
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
    submit() {
      var entity = {
        userId:'1',
        title:this.form.title,
        menuId:this.form.menuId,
        content:this.content.html
      }
      const { data } =  addBlog(entity)
      console.log(data);
    },
  },
};
</script>
<style lang="less" scoped>
#blogSubmit{
  margin: 1em;
  float: right;
}
</style>
