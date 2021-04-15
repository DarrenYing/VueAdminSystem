<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)">
          {{ item.txt }}
        </li>
      </ul>

      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form" size="medium">
        <el-form-item prop="username" class="item-form">
          <label for="username">邮箱</label>
          <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label for="password">密码</label>
          <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="password2" class="item-form" v-show="model === 'register'">
          <label for="password2">重复密码</label>
          <el-input id="password2" type="password" v-model="ruleForm.password2" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="getVCode()" :disabled="vcodeBtnStatus.status">{{ vcodeBtnStatus.text }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()" class="login-btn block" :disabled="loginBtnStatus">{{ loginText }}</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>

  import { getSms, userRegister, userLogin } from '@/api/login';
  import { reactive, ref, isRef, toRefs, onMounted, watch, onUnmounted } from 'vue';
  import { stripScript, validatePass, validateEmail, validateVCode } from '@/utils/validate';
  import { ElMessage } from 'element-plus';
  import sha1 from 'js-sha1'; //常用加密方式：base64，md5，sha1
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex';


  export default {
    name: "Login",

    setup(props, context) {

      // 验证用户名
      let validateUsername = (rule, value, callback) => {
        // console.log(value);
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){
          callback(new Error('用户名格式有误'));
        } else {
          callback(); //true
        }
      };
      // 验证密码
      let validatePassword = (rule, value, callback) => {
        ruleForm.password = stripScript(value);
        value = ruleForm.password;
        // console.log(stripScript(value));
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(validatePass(value)) {
          callback(new Error('密码为6至20位数字+字母'));
        } else {
          callback();
        }
      };
      // 验证重复密码
      let validatePassword2 = (rule, value, callback) => {
        //如果是登录页面，这个验证不需要被调用
        if(model.value === 'login') {
          callback();
        }
        ruleForm.password2 = stripScript(value);
        value = ruleForm.password2;
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if(value !== ruleForm.password) {
          callback(new Error('密码输入不一致'));
        } else {
          callback();
        }
      };
      // 验证验证码
      let validateCode = (rule, value, callback) => {
        // console.log(value);
        if (value === '') {
          return callback(new Error('请输入验证码'));
        }else if(validateVCode(value)){
          return callback(new Error('验证码格式有误'));
        }else{
          callback();
        }
      };

      const ruleForm = reactive({
          username: '12345621@qq.com',
          password: '123456a',
          password2: '123456a',
          code: '222333',
        }
      );

      const rules = reactive({
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        password2: [
          { validator: validatePassword2, trigger: 'blur'}
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      });

      const loginForm = ref(null);  // 和表单绑定，获取表单数据

      const menuTab = reactive([
        {txt: '登录', current: true, type: 'login'},
        {txt: '注册', current: false, type: 'register'}
      ]);

      const model = ref('login');

      const loginText = ref('登录');
      const loginBtnStatus = ref(true); //登录按钮是否被禁用

      const vcodeBtnStatus = reactive({
        status: false,    //验证码按钮是否被禁用
        text: '获取验证码'
      });

      // 计时器
      const timer = ref('null');

      // 路由
      const router = useRouter(); // vue3中没有$router了

      // store
      const store = useStore();

      // 生命周期示例
      onMounted(() => {
        //回调函数
      });

      // 更新按钮状态
      const updateButtonStatus = ((btn, params) => {
        btn.status = params.status;
        btn.text = params.text;
      })

      // 切换登录和注册页面
      const toggleMenu = data => {
        // console.log(data);
        menuTab.forEach((ele, index) => {
          ele.current = false;
        })
        data.current = true;
        model.value = data.type;
        loginText.value = data.type==='login' ? '登录' : '注册';

        //重置表单
        resetFormData();
        //清除计时
        clearCountDown();
      };

      //倒计时
      const countDown = (num) => {
        //判断是否已存在定时器，存在则清除
        if(timer.value) {
          clearInterval(timer.value);
        }

        timer.value = setInterval(() => {
          num--;
          if(num === 0) {
            clearInterval(timer.value);
            updateButtonStatus(vcodeBtnStatus, {
              status: false,
              text: '再次获取',
            });
          }
          else {
            vcodeBtnStatus.text = `${num}秒后重发`;
          }
        }, 1000)
      };

      //清除倒计时
      const clearCountDown = () => {
        updateButtonStatus(vcodeBtnStatus, {
          status: false,
          text: '获取验证码'
        });
        clearInterval(timer.value);
      }

      // 清除表单数据
      const resetFormData = () => {
        loginForm.value.resetFields();
      };

      //获取验证码
      const getVCode = () => {
        // 首先要检查用户是否已填写邮箱和密码
        if(ruleForm.username.length === 0) {
          ElMessage.error('邮箱不能为空！');
          return false;
        }
        if(ruleForm.password.length === 0) {
          ElMessage.error('请填写密码！');
          return false;
        }
        if(validateEmail(ruleForm.username) || validatePass(ruleForm.password)) {
          // ElMessage.error('邮箱格式有误！'); //不是很有必要
          return false;
        }

        let requestData = {
          username: ruleForm.username,
          module: model.value
        };

        //点击获取验证码后，状态变为禁用
        updateButtonStatus(vcodeBtnStatus, {
          status: true,
          text: '发送中',
        });

        getSms(requestData).then(response => {  //resolve
          let data = response.data;
          ElMessage.success({
            message: data.message,
            type: 'success'
          });

          //启用登录按钮
          loginBtnStatus.value = false;
          //倒计时60s，超时后验证码失效
          countDown(10);
        }).catch(error => { //reject
          console.log(error);
          loginBtnStatus.value = false;
          updateButtonStatus(vcodeBtnStatus, {
            status: false,
            text: '再次获取'
          });
        });
      };

      //注册
      const register = () => {
        let requestData = {
          username: ruleForm.username,
          password: sha1(ruleForm.password),
          code: ruleForm.code,
          module: 'register',
        };

        userRegister(requestData).then(response => {
          let data = response.data;
          ElMessage.success({
            message: data.message,
            type: 'success'
          });
          // 注册成功，自动切换到登录页
          toggleMenu(menuTab[0]);
          // 清除计时
          clearCountDown();
        }).catch(error => {
          console.log(error);
        });
      };

      //登录
      const login = () => {
        let requestData = {
          username: ruleForm.username,
          password: sha1(ruleForm.password),  //主要还是靠后端加密
          code: ruleForm.code,
        };

        // 通过vuex的actions异步调用接口
        store.dispatch('login/login', requestData).then(response => {
          let data = response.data;
          ElMessage.success({
            message: data.message,
            type: 'success'
          });
          //路由跳转
          router.push({
            name: 'Dashboard'
          })
        }).catch(error => {
          console.log(error);
        });

        // 直接调用接口
        // userLogin(requestData).then(response => {
        //   let data = response.data;
        //   ElMessage.success({
        //     message: data.message,
        //     type: 'success'
        //   });
        //   //路由跳转
        //   router.push({
        //     name: 'Dashboard'
        //   })
        //
        // }).catch(error => {
        //   console.log(error);
        // });
      };

      // 提交
      const submitForm = () => {
        loginForm.value.validate((valid) => {
          if (valid) {
            model.value === 'login' ? login() : register(); //注册或登录
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      };

      //销毁页面时
      onUnmounted(() => {
        clearInterval(timer.value);
      })

      return {
        ruleForm,
        loginForm,
        model,
        loginText,
        menuTab,
        rules,
        loginBtnStatus,
        vcodeBtnStatus,
        toggleMenu,
        submitForm,
        getVCode,
      }
    },



  }
</script>

<style lang="scss" scoped>
  #login {
    height: 100vh;
    background-color: #344a5f;
  }

  .login-wrap {
    width: 330px;
    margin: auto;
  }

  .menu-tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: white;
      border-radius: 2px;
      cursor: pointer;
    }
    .current {
      background-color: rgba(0, 0, 0, .1);
    }
  }
  .login-form {
    margin-top: 29px;
    label {
      display: block;
      margin-bottom: 3px;
      font-size: 14px;
      color: white;
    }
    .item-form {
      margin-bottom: 13px;
    }
    .block {
      display: block;
      width: 100%;
    }
    .login-btn {
      margin-top: 19px;
    }
  }
</style>