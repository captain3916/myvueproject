<template>
  <div>
    <section class="main">
      <div class="logo"></div>
      <div class="sj">
        <input type="text" placeholder="账号" v-model="phoneInput">
        <!-- <span>获取验证码</span> -->
      </div>
      <div class="yzm">
        <input type="text" placeholder="密码" v-model="codeInput">
      </div>
      <button :disabled="canLogin" @click="login">登录</button>
      <button @click="$router.replace('/register')">注册</button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      phoneInput: '',
      codeInput: '',
    };
  },
  computed: {
    // 是否禁用登录框
    canLogin() {
      if (this.phoneInput && this.codeInput) return false;
      return true;
    },
  },

  methods: {
    login() {
      console.log(111);
      this.$axios.post(this.$URL.userLoginrUrl, {
        userName: this.phoneInput,
        userPsw: this.codeInput,
      }).then((response) => {
        console.log(response);
      });
    },
  },
};
</script>

<style lang="scss" scoped>

.main {
  height: 6rem;
  display: flex;
  flex-direction: column;
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
    height: 0.6rem;
    margin: 0.2rem 0.25rem;
    background: #ff5f16;
    font-size: 0.2rem;
    text-align: center;
    color: white;

    &[disabled]{
      background: #ccc;
    }
  }
}
</style>
