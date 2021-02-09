<template>
  <ul id="nav-left" ul class="navbar-list navbar-left">
    <li v-for="menu in menulist" :key="menu.item.id" :index="String(menu.item.id)">
      <a @click="menuClick(menu.item.id)">
        <img class="nav-left-img" src="@/assets/kumiko.jpg">
        {{ menu.item.name }}
      </a>
    </li>
  </ul>
</template>
<script>
import {mapGetters } from "vuex";
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  computed: {
    ...mapGetters({
      menulist: "menu/verticalNavList"
    }),
  },
  beforeCreate() {
    this.$store.dispatch("menu/getVerticalNavList");
  },
  methods: {
    menuClick(id) {
      this.$emit('leftMenuClick', id)
    }
  }
};
</script>

<style lang="less">
#nav-left{
  height: 100%;
  display: table-cell;
  vertical-align: middle;
}
.navbar-list {
  list-style: none;
}
#nav-left li{
  //background-color: #fff;
    // box-shadow: rgba(200,200,200,.2) 1px 2px 4px 1px;
    margin: 0px 0 0 -40px;
    padding: 25px 0 15px 60px !important;
}
.nav-left-img{
  width: 15%;
  height: 15%;
}
</style>
