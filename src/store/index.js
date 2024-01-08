import Vue from "vue";
import Vuex from "vuex"
import router from "../router";
import { getRouteList } from "../api/common";

const ROUTERS="ROUTES";
const MENUS="MENUS";
// 一级路由
const R1={
    path:'/layout',
    name:'Layout',
    component:()=> import('../views/Layout/index.vue'),
    children:[]
};
// 给R1添加子路由
function convertRoutes(_R,_arr){
    _R.children=[];
    console.log("_arr.array:"+_arr.array);
    _arr.forEach( (item) => {
        if(item.component!='none'){
            console.log("%s  %s",item.path,item.component);
            _R.children.push(
                {
                    path:item.path,
                    name:item.name,
                    component: ()=>import('../views'+item.component)
                }
            );
        }
    });
    console.log('_R');
    console.log(_R);
    return _R;
}

const actions={
    async ACTION_GET_MENU(context,value){
        console.log("[STORE]{06}获取路由列表...");
        // 获取session存储中MENUS
        let mStr=sessionStorage.getItem(MENUS);
        // 判断是否为空,空则跳过.在getRouteList中获取
        if(mStr){
            var mData=JSON.parse(mStr); //菜单JSON
            console.log(mData);
            let rData=convertRoutes(R1,mData); //路由JSON
            context.commit('MUTATION_GET_MENU',
                {
                    routeData:rData,           //添加子路由后的R1
                    menuData:mData             //转换为对象的MENUS即Route对象
                }
            );
            return;
        }
        await getRouteList().then(
            (resp)=>{
                console.log('getRoute')
                console.log(resp.data);
                let rData=convertRoutes(R1,resp.data);
                const _data={
                    routeData:rData,
                    menuData:resp.data
                }
                var rStr =JSON.stringify(rData);
                var mStr =JSON.stringify(resp.data);
                sessionStorage.setItem(MENUS,mStr);
                context.commit('MUTATION_GET_MENU',_data);
            }
        );
    },
    ACTION_SAVE_USERID(context,value){
        console.log("value:"+value);
        context.commit('MUTATION_SAVE_USERID',value);
    }
};
const mutations={
    //将数据保存在state中
    MUTATION_GET_MENU(state,obj){
        console.log("[STORE]{06}保存路由列表..");
        state.asynRouters=obj.routeData;    //动态路由
        state.menuData=obj.menuData;    //把数据存入store
        state.hasRoute=true;
        router.addRoute(state.asynRouters);
        console.log(state);
    },
    MUTATION_SAVE_USERID(state,obj){
        state.userId=obj;
        console.log("userId"+state.userId);
        console.log("state:"+this.state.userId);

    }
};

const state={
    menuData:[],    //存储数据的容器    
    hasRoute:false,  //默认为false。 false：为添加路由。true：已添加
    asynRouters:{},  //暂存路由的容器
    userId:'',
};

Vue.use(Vuex)
export default new Vuex.Store({ //创建Store共享数据容器
    actions:actions,
    mutations:mutations,    //挂载对象到Store
    state:state
});


