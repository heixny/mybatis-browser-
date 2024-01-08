<template>
    <div id="Wmsnav">
        <el-menu 
        router
           :default-active="this.$router.path" 
            :default-openeds="['1', '3']" 
            background-color="pink">
            <el-submenu v-for="(item,index) in menuList"
                v-bind:index="item.path"
                :key="index">
                <template slot="title"><i v-bind:class="item.icon"></i>
                    {{item.menuName}}</template>						 
                <el-menu-item v-bind:index="link.path"
                    v-for="(link,index) in item.routers"
                    :key="index">{{link.menuName}}</el-menu-item>					
            </el-submenu>
            <!-- <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>角色管理</template>
                    <el-menu-item index="/role/addrole">新增角色</el-menu-item>
                    <el-menu-item index="/role/list">角色列表</el-menu-item>				
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-setting"></i>导航三</template>
                <el-menu-item-group>						
                    <el-menu-item index="3-1">选项1</el-menu-item>
                    <el-menu-item index="3-2">选项2</el-menu-item>
                </el-menu-item-group>						
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-orange"></i>数据管理</template>
                <el-menu-item-group>						
                    <el-menu-item index="/data/meterial">物料主数据</el-menu-item>
                    <el-menu-item index="3-2">物料分类管理</el-menu-item>
                </el-menu-item-group>						
            </el-submenu> -->
        </el-menu>
    </div>
</template>
<script>
    import store from "../../store/index"
    export default{
        name: 'Wmsnav',
        methods:{
            getMenuList(){
                const menuData=store.state.menuData;    //获取菜单
                menuData.forEach(
                    (item)=>{
                        if(item.parentId=='top'){
                            console.log(item.menuName);
                            this.menuList.push(item);
                        }
                    }
                );
                this.menuList.forEach(
                    (P)=>{
                        P.routers=[];
                        for(var j=0;j<menuData.length;j++){
                            var item=menuData[j];
                            console.log(item.parentId);
                            if(item.parentId==P.id){
                                P.routers.push(item);
                            }
                        }
                    }
                );
            }
        },
        data(){
            return {
                menuList:[]
            }
        },
        mounted(){
            this.menuList=[];
            this.getMenuList();
        }
    }
</script>
