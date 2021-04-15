<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="changeNavState">
      <svg-icon iconClass="menu" className="menu">
      </svg-icon>
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="../../../assets/avatars/luffy.jpg" alt="">
        {{ username }}
      </div>
      <div class="header-icon pull-left" @click="logout">
        <svg-icon iconClass="exit" className="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { computed } from 'vue';
  import {ElMessage} from "element-plus";

  export default {
    name: "Header",
    setup(props, context) {

      const store = useStore();
      const router = useRouter();

      const username = computed(() => store.state.login.username);  //不加{}，就可以不写return

      const logout = () => {
        store.dispatch('login/logout').then(response => {
          // if(response.resCode === 0) {
            ElMessage.success({
              message: '登出成功',
              type: 'success'
            });
            //回到登录页面
            router.push({
              name: 'Login'
            })
          // }
        }).catch(error => {
          console.log(error);
        })
      }

      const changeNavState = () => {
        store.commit('login/SET_COLLAPSE');
      };

      return {
        changeNavState,
        username,
        logout
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";

#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  height: $headerHeight;
  background-color: #fff;
  line-height: 75px;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, .1));
  @include webkit(transition, all .3s ease 0s);
}

.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}

.open {
    #header-wrap { left: $navMenu; }
}
.close {
    #header-wrap { left: $navMenuMin; }
}

.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50px;
    width: 36px;
    height: 36px;
  }
}

</style>