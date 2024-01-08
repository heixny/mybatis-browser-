<template>
    <div>
        <h1>我是:/User/adduser</h1>
        <input type="button" @click="testHello1" value="测试hello1"/>
        <input type="button" @click="testHello2" value="测试hello2"/>
    </div>
</template>

<script>
import {viewHello1,viewHello2} from '../../api/dept'
    export default{
        name:'adduser',
        methods:{
            testHello1(){
                viewHello1().then(
                    resp=>{
                        console.log(resp);
                    }
                );
            },
            testHello2(){
                viewHello2().then(
                    resp=>{
                        console.log(resp);
                    }
                );
            }
        }
    }
</script>