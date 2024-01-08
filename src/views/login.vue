<template>
    <div>
        <div id="topic">WMS 智能仓储管理系统</div>
        <div id="loginContainer">
          <h3>用户登录</h3>
          <el-form :rules="rules" ref="userForm" :model="userForm" 
            label-width="80px" size="mini">

            <el-form-item label="用户账号" prop="account">
            <el-input v-model="userForm.account" 
                placeholder="请输入账号"></el-input>
            </el-form-item>
            
            <el-form-item label="用户密码" prop="password">
            <!-- <el-input v-model="userForm.password" 
                placeholder="请输入密码"></el-input> -->
                <el-input type="password" prefix-icon="el-icon-lock" v-model="userForm.password" placeholder="请输入密码" 
                show-password></el-input>
            </el-form-item>
           

            <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">用户登录</el-button>
            <el-button>取消</el-button>
            </el-form-item>

        </el-form>
        </div> 
  </div> 
</template>

<script>
//Link: http://localhost:8080/#/login
import { login } from '@/api/common.js';
import  store  from '@/store/index';
export default {
	name:'login',
    data() {
      return {
		  userForm:{
            account:'andy',
            password:'123'
          },
          rules:{

          },
	  };
    },
    methods: {
		 //--填入代码--
         onSubmit(){
            this.doLogin();
         },
         doLogin(){
            login(this.userForm).then(
                resp=>{
                    var ret=resp.result;
                    console.log('resp:')
                    console.log(resp);
                    if(ret=='success'){
                        var role=resp.role;
                        var token=resp.token;
                        var userId=resp.userId;
                        // 把token保存到本地
                        window.sessionStorage.setItem('token',token);
                        window.sessionStorage.setItem('role',role);
                        // 把用户信息保存到[store]
                        store.dispatch('ACTION_SAVE_USERID', userId)
                        // 路由转发
                        this.$router.replace('/layout');
                    }else{
                        this.$message({
                            showClose: true,
                            message: '登录失败',
                            type: 'error'
                        })
                    }
                }
            )
            console.log("userId:"+store.state.userId);
         },
        deleteToken(){
            window.sessionStorage.removeItem('token');
        }
    },
    mounted () {
        this.deleteToken();
    }
};
</script>

<style scoped>
body{
	background: rgb(2, 2, 83);
}
#topic{
  color:#EAEAEA; font-size:25px;
  margin-top: 100px; text-align: center;
}
#loginContainer{
	  border-radius: 15px;
	  background-clip: padding-box;
	  margin: 50px auto;
	  width: 350px;
	  padding: 15px 35px 15px 35px;
	  background: #FAFAFA;
	  border: 1px solid #EAEAEA;
	  box-shadow: 0 0 25px #cac6c6;
}
</style>
