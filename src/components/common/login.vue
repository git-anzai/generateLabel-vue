<template>
  <div class="login-form" style="width: 100%;height: 100%;display: flex;  align-items: center;justify-content: center;">
    <Form ref="formValidate" :model="loginForm" :rules="loginFormRule" :label-width="60"
          style="height: 210px;padding: 20px;border-radius: 10px;box-shadow: 0 2px 3px 2px rgba(255, 255, 255, .2);background: rgba(255,255,255,.8)">
      <h3 style="margin-bottom: 10px">后台管理系统</h3>
      <FormItem label="用户名" prop="comName">
        <Input v-model="loginForm.comName" placeholder="请输入用户名" style="width: 180px"></Input>
      </FormItem>

      <FormItem label="密码" prop="comPwd">
        <Input type="password" v-model="loginForm.comPwd" placeholder="请输入密码" style="width: 180px"  @keyup.enter.native="handleSubmit('formValidate')"></Input>
      </FormItem>
      <FormItem>
        <Button type="success" @click="handleSubmit('formValidate')">
          登录
        </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        loginForm: {
          comName: '',
          comPwd: '',
        },
        loginFormRule:{
          comName: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          comPwd: [
            {required: true, message: '请输入用户密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        const _this = this;

        _this.$refs[name].validate((valid) => {
          if (valid) {
            console.log( 11111)
            let params = {
                userName: _this.loginForm.comName,
                password:_this.loginForm.comPwd
            }
            _this.$http.post(_this.Api.LOGIN, params).then(res => {
              if (res.success) {
                  localStorage.setItem("token",res.token);
                  _this.$router.push({
                    path:'/orderExamine',
                    query: {
                      userName: res.data.userName
                    }
                  })
              }
            })
          }
        })
      },
    },
    mounted() {

    }
  }
</script>

<style scoped>
  .login-form {
    background-image: url('../../assets/login.jpg')
  }
</style>
