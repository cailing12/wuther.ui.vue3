<template>
  <ul id="nav_top" class="navbar-list navbar-top">
    <li
      v-for="menu in menulist"
      :key="menu.item.id"
      :index="String(menu.item.id)"
    >
      <router-link :to="menu.item.path">{{ menu.item.name }}</router-link>
      <!-- <a :href="menu.item.path">{{ menu.item.name }}</a> -->
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
      menulist: "menu/horizontalNavList"
    }),
  },
  beforeCreate() {
    this.$store.dispatch("menu/getHorizontalNavList");
  }
};
</script>

<style lang="less">
.navbar-list {
  list-style: none;
}
#nav_top li {
  display: inline;
  margin-left: 3%;
}
#nav_top li a {
  color: #666;
  text-decoration: none;
}
</style>
