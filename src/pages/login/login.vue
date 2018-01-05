<template lang="html">
  <div id="login-page" @keyup.enter="login">
    <div class="login-form">
      <div class="input-group">
        <div class="title">OIB Dashboard</div>
        <el-input
          :autofocus="true"
          placeholder="请输入用户名"
          icon="time"
          v-model="username">
        </el-input>
      </div>
      <div class="input-group">
        <el-input
          placeholder="请输入密码"
          type="password"
          icon="time"
          v-model="password">
        </el-input>
      </div>
      <div class="input-group">
        <label>记住我？</label>
        <el-switch
          v-model="rememberMe"
          on-text=""
          off-text="">
        </el-switch>
      </div>
      <div class="input-group">
        <el-button @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  import API from '../../api';

  export default {
    data() {
      return {
        username: '',
        password: '',
        rememberMe: false,
        isBtnLoading: false
      };
    },
    computed: {
      btnText() {
        if (this.isBtnLoading) return '登录中...';
        return '登录';
      }
    },
    created() {
      this.username = localStorage.getItem('username');
    },
    methods: {
      login() {
        if (!this.username) {
          this.$message.error('请填写用户名！！！');
          return;
        }
        if (!this.password) {
          this.$message.error('请填写密码');
          return;
        }
        const { username, password } = this;
        this.isBtnLoading = true;
        API.requestLogin({ username, password }).then((data) => {
          this.isBtnLoading = false;
          localStorage.setItem('user', JSON.stringify({
            id: data.id,
            username
          }));
          if (this.rememberMe) {
            localStorage.setItem('username', username);
          } else {
            localStorage.removeItem('username');
          }
          if (this.$route.query.redirect) {
            this.$router.push({ path: this.$route.query.redirect });
          } else {
            this.$router.push({ path: '/works/list' });
          }
        }).catch(() => {
          this.isBtnLoading = false;
        });
      }
    }
  };
</script>

<style lang="scss" type="text/scss">
  #login-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #efeeee;

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 500px;
      height: 400px;
      border-radius: 10px;
      background: white;
      border: 1px #eaeaea solid;
      box-shadow: 0px 0px 25px #cac6c6;

      .title {
        color: #20a0ff;
        font-weight: bold;
        font-size: 40px;
        text-align: center;
        line-height: 2.2;
        font-family: sans-serif;
      }

      .input-group {
        margin-top: 30px;
        width: 80%;
        button {
          width: 100%;
        }
      }
    }
  }
</style>
