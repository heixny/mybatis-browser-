<template>
    <div>
        <el-menu 
        router
        :default-active="this.$router.path"
        background-color="#333" 
        text-color="#fff" 
        :default-openeds="['1']">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>用户管理</template>
                <el-menu-item index="/user/adduser">新增用户</el-menu-item>
                <el-menu-item index="/user/list">用户列表</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>角色管理</template>
                <el-menu-item index="2-1">新增角色</el-menu-item>
                <el-menu-item index="2-2">角色列表</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-setting"></i>部门管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/dept/adddept">部门列表</el-menu-item>
                    <el-menu-item index="/dept/list">组织机构图</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-setting"></i>菜单管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/menu/list">菜单列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
                <el-menu-item-group>
                    <el-menu-item index="5-1">系统初始化</el-menu-item>
                    <el-menu-item index="5-2">网络设置</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="6">
                <template slot="title"><i class="el-icon-orange"></i>数据管理</template>
                <el-menu-item-group>
                    <el-menu-item index="/data/meterial">物料主数据</el-menu-item>
                    <el-menu-item index="6-2">物料分类管理</el-menu-item>
                    <el-menu-item index="6-3">物料组管理</el-menu-item>
                    <el-menu-item index="6-4">子类别管理</el-menu-item>
                    <el-menu-item index="6-5">物料规则编制</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

        </el-menu>
    </div>
</template>

<script>
//这里暂时不用导入内容。。
//import { defineComponent } from '@vue/composition-api'
export default {
    name: 'Wmsnav',
}
</script>

<style scoped>

</style>