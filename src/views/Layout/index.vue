<template>
    <div id="Layout">
      
      <el-container>
          <el-header class="head">
                <Wmstop></Wmstop>	
          </el-header>
          <el-container>
              <el-aside class="aside">
                <Wmsnav></Wmsnav>
              </el-aside>
              <el-main width="800" class="main">
                <router-view></router-view>
              </el-main>
          </el-container>
      </el-container>
  
    </div>
  </template>
<script>
import Wmsnav from './wmsnav.vue';
import Wmstop from './wmstop.vue';
export default {
    name: "Layout",
    methods: {
        
    },
    data() {
        return {
            
        };
    },
    components: { Wmstop, Wmsnav }
}
</script>
  <!--  scoped -->
<style>
  body{ margin:0px; }
  .head{ background:#545c64; height:95px; }
  .aside{ background:rgb(236, 253, 237); height:840px; }
  .main{ background:#ffffff; height:840px; }
</style>