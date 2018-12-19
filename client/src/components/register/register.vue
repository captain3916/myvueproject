<template>
  <div>
    <div id="content">
      <div class="logo"></div>
      <div class="sj">
        <input type="text" placeholder="手机号" v-model="phoneInput">
        <!-- <span>获取验证码</span> -->
      </div>
      <div class="yzm">
        <input type="text" placeholder="密码" v-model="codeInput">
      </div>
      <button :disabled="canRegister" @click="register">注册</button>
       <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade">
        {{regMsg}}
      </mt-popup>
    </div>
  </div>
</template>

<script>
import { Popup } from 'mint-ui';

export default {
  name: 'Login',

  data() {
    return {
      phoneInput: '',
      codeInput: '',
      popupVisible: false,
      regMsg: '',
    };
  },
  components: {
    'mt-popup': Popup,
  },

  computed: {
    canRegister() {
      if (this.phoneInput && this.codeInput) return false;
      return true;
    },
  },

  methods: {
    register() {
      const phoneReg = /^1\d{10}$/; // 手机号正则
      const pswReg = /^\w{6,20}$/; // 密码正则
      if (!phoneReg.test(this.phoneInput)) {
        this.regMsg = '手机号输入有误,请检查!';
        this.popupVisible = !this.popupVisible;
      } else if (!pswReg.test(this.codeInput)) {
        this.regMsg = '密码长度需要6-20位';
        this.popupVisible = !this.popupVisible;
      } else {
        this.$axios.post(this.$URL.userRegisterUrl, {
            userName: this.phoneInput,
            userPsw: this.codeInput,
        }).then((response) => {
          this.popupVisible = !this.popupVisible;
          this.regMsg = response.data.msg;
          if (response.data.code === 0) {
            this.$router.replace('/login');
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>

#content {
  height: 5rem;
  display: flex;
  flex-direction: column;
  font-size: 0.16rem;
  .logo {
    // flex: 1;
    width: 1rem;
    height: 1rem;
    background: url(/static/images/logo.jpg) no-repeat;
    background-size: 100%;
    margin: 1rem auto;
  }
  .sj,
  .yzm {
    display: flex;
    height: 0.55rem;
    margin: 0.1rem 0.25rem;
    border-bottom: 0.01rem solid #ccc;
    input {
      width: 70%;
      font-size: 0.18rem;
    }
    span {
      width: 30%;
      font-size: 0.18rem;
      color: #ccc;
      display: flex;
      align-self: center;
    }
  }
  button {
    display: flex;
    justify-content: center;
    height: 0.8rem;
    margin: 0.2rem 0.25rem;
    background: #ff5f16;
    font-size: 0.2rem;
    text-align: center;
    color: white;

    &[disabled]{
      background: #ccc;
    }
  }
  .mint-popup{
    width: 90%;
    height: 1rem;
    text-align: center;
    font-size: 0.2rem;
    line-height: 1rem;
    color: #ff5f16;
  }
}
</style>
