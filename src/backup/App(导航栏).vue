<template>
  <div id="app">
  
	<el-container>
		<el-header class="head">
				<el-menu
					  :default-active="activeIndex2"
					  class="el-menu-demo"
					  mode="horizontal"
					  @select="handleSelect"
					  background-color="#545c64"
					  text-color="#fff"
					  active-text-color="#ffd04b">
					  
				  <el-menu-item index="1">处理中心</el-menu-item>
				  <el-submenu index="2">
					<template slot="title">我的工作台</template>
					<el-menu-item index="2-1">选项1</el-menu-item>
					<el-menu-item index="2-2">选项2</el-menu-item>
					<el-menu-item index="2-3">选项3</el-menu-item>						
				  </el-submenu>
				  <el-menu-item index="3" disabled>消息中心</el-menu-item>
				  <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
				</el-menu>	
		</el-header>
		<el-container>
			<el-aside class="aside">
			
				 <el-menu :default-openeds="['1', '3']" background-color="pink" text-color="#fff">
					  <el-submenu index="1">
						<template slot="title"><i class="el-icon-message"></i>导航一</template>
						<el-menu-item-group>						 
						  <el-menu-item index="1-1">选项1</el-menu-item>
						  <el-menu-item index="1-2">选项2</el-menu-item>
						</el-menu-item-group>						
					  </el-submenu>
					  <el-submenu index="2">
						<template slot="title"><i class="el-icon-menu"></i>导航二</template>
						<el-menu-item-group>						 
						  <el-menu-item index="2-1">选项1</el-menu-item>
						  <el-menu-item index="2-2">选项2</el-menu-item>
						</el-menu-item-group>						
					  </el-submenu>
					  <el-submenu index="3">
						<template slot="title"><i class="el-icon-setting"></i>导航三</template>
						<el-menu-item-group>						
						  <el-menu-item index="3-1">选项1</el-menu-item>
						  <el-menu-item index="3-2">选项2</el-menu-item>
						</el-menu-item-group>						
					  </el-submenu>
					</el-menu>

			</el-aside>
			<el-main width="800" class="main"></el-main>
		</el-container>
	</el-container>

  </div>
</template>

<script>
export default {
  name: 'App', 
}
</script>

<style>
body{ margin:0px; }
.head{ background:black; height:95px; }
.aside{ background:red; height:600px; }
.main{ background:orange; height:600px; }
</style>
