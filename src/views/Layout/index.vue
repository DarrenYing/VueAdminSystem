<template>
  <div id="dashboard" :class="[menuStatus ? 'close' : 'open']">
    <Header></Header>
    <Main></Main>
    <SideNavbar></SideNavbar>
  </div>
</template>

<script>

  import Header from './Components/Header';
  import SideNavbar from "./Components/SideNavbar";
  import Main from "./Components/Main";
  import { useStore } from 'vuex';
  import { computed } from 'vue';

  export default {
    name: "Layout",
    components: {
      Header, SideNavbar, Main
    },

    setup(props, context) {
      const store = useStore();
      const menuStatus = computed(() => {
        return store.state.login.isCollapse;
      });

      return {
        menuStatus,
      }
    }
  }
</script>

<style scoped>
  #dashboard {
    background-color: #f7f7f7;
  }

</style>