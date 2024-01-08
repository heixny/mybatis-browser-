<template>
  <div id="Wmstop">
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="" target="_blank">订单管理</a></el-menu-item>
      <el-menu-item index="6">常见问题</el-menu-item>
      <el-menu-item index="5" style="float: right;" @click="logout()">登出</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { logout } from '@/api/common.js';
export default {
  name: 'Wmstop',
  methods: {
    handleSelect(index) {
      if (index == 5) {
        this.$confirm('是否继续退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          logout().then(
            resp => {
              console.log(resp);
              var ret = resp.result;
              if (ret == 'success') {
                this.$router.replace('/');
              } else {
                this.$message({
                  showClose: true,
                  message: '登出失败',
                  type: 'error'
                })
                // setTimeout(location.reload(), 2000);
              }
            }
          );
        }
        );
      }else if (index == 6) {
        this.$alert('点击侧边栏无效时，请刷新网页', '常见问题', {
          confirmButtonText: '确定'
        });
      }
    }
  },
  data() {
    return {
      activeIndex2: '1-1'
    }
  },

}
</script>