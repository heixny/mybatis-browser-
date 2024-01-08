import request from '@/utils/request';
// 获取用户列表，并导出方法接口
export function login( param ){
    return request(
        {
            url:'/WmsBoot/Common/login',
            method:'post',
            data:param
        }
    );
 }
 export async function getRouteList(){
    return await request(
        {
            url:'/WmsBoot/Common/getRouteList',
            method:'post'
        }
    );
 }
 export function logout(){
    return request(
        {
            url:'/WmsBoot/Common/logout',
            method:'post'
        }
    );
 }