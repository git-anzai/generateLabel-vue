<template>
  <div style="float: right">
    <Dropdown class="userBox" slot='right'>
      <Avatar icon="person"/>
      <a href="javascript:void(0)">
        {{userName}}
        <Icon type="arrow-down-b"></Icon>
      </a>
      <Dropdown-menu slot="list" >
        <Dropdown-item @click.native="loginOut">退出登录</Dropdown-item>
      </Dropdown-menu>
    </Dropdown>
  </div>
</template>

<script>
  export default {
    name: "t-header",
    methods: {
      loginOut(){
        let params={
            data:{}
        }
        var I=this;
        this.$Modal.confirm({
          title:'退出登录',
          content:'确定要退出登录吗？',
          onOk(){
            I.$router.push({
              path: '/login',
            })
          }
        })
      }
    },
    data(){
      return {
        userName:''
      }
    },
    mounted() {
     this.userName = this.$route.query.userName;
    }

  }
</script>

<style scoped>

</style>
