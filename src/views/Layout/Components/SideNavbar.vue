<template>
  <div id="nav-wrap">
    <h1 class="logo">
      <img src="../../../assets/logo.png" alt="">
    </h1>

    <el-menu
      :default-active="defalutActive"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color	="#fff"
      router
    >
      <template v-for="(item, index) in routes">
        <el-submenu v-if="!item.meta.hidden" :key="item.id" :index="index+''">
          <template #title>
<!--            <i class="el-icon-location"></i>-->
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"></svg-icon>
            <span>{{ item.meta.name }}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">
            {{ subItem.meta.name }}
          </el-menu-item>
        </el-submenu>
      </template>

    </el-menu>

<!--    <svg-icon iconClass="menu" className="menu"></svg-icon>-->

  </div>
</template>

<script>
  import { useRouter } from 'vue-router';
  import { reactive, computed } from 'vue';
  import { useStore } from 'vuex';

  export default {
    name: "SideNavbar",

    setup(props, context) {

      const store = useStore();

      // 通过VueX监听isCollapse
      const isCollapse = computed(() => {
        return store.state.login.isCollapse;
      })

      // 路由
      const router = useRouter();
      const routes = reactive(router.getRoutes());

      // 监听路由变化
      const defalutActive = computed(() => {
        const route = router.currentRoute;
        // console.log(route.value.path);
        return route.value.path;
      })

      return {
        isCollapse,
        routes,
        defalutActive,
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../styles/config.scss";
  #nav-wrap {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    background-color: #344a5f;
    @include webkit(transition, all .3s ease 0s);
    svg {
      font-size: 20px;
      margin-right: 10px;
    };
  }

  .logo {
    text-align: center;
    img {
      margin: 28px auto 25px;
      width: 92px;
      @include webkit(transition, all .3s ease 0s);
    }
  }

  .open {
    #nav-wrap {
      width: $navMenu;
    }
  }

  .close {
    #nav-wrap {
      width: $navMenuMin;
    }
    .logo img {
      width: 60%;
    }
  }

</style>