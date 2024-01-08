import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import userlist from '@/views/User/list'
import adduser from '@/views/User/adduser'
import Login from '@/views/login'
import meterial from '@/views/Data/meterial'
import store from '@/store'

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Login',
//       component: Login,
//     },
//     {
//       path: '/layout',
//       name: 'Layout',
//       component: Layout,
//       children:[
//         {
//           path:'/user/list',
//           component:userlist
//         },
//         {
//           path:'/user/adduser',
//           component:adduser
//         },
//         {
//           path:'/data/meterial',
//           component:meterial
//         },
//       ]
//     }
//   ]
// })

// 静态路由
const staticRoutes=[
  {
    path:'/',
    name:'Login',
    component:Login
  },
];
// 创建路由实例
const router =new Router({
  routes: staticRoutes,
});

function getToken(){
  console.log("[ROUTER] getToken()...");
  // var s=sessionStorage.getItem('token');
  // console.log(s);
  // if(s){
  //   return true;
  // }else{
  //   return false;
  // }
  return true;
}
router.beforeEach(async (to,from,next)=>{
  const token=getToken();
  if(!token){
    if(to.name!='Login'){
      next({name:'Login'});
      return;
    }
  }else{
    let hasRoute=store.state.hasRoute;
    console.log("[ROUTER]有Token,hasGetRoute:"+hasRoute);
    // hasRoute为空时，调用store的ACTION_GET_MENU方法，
    if(!store.state.hasRoute){
      console.log("[ROUTER]暂无Route数据(去store中获取)");
      await store.dispatch('ACTION_GET_MENU');
      next({...to,replace:true});
      return;
    }
  }
  console.log(to.name);
  next();
}
);
export default router;
