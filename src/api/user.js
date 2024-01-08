import request from '@/utils/request';
// 获取用户列表，并导出方法接口
export function getUserList( param ){
    return request(
        {
            url: '/WmsBoot/User/list',
            method: 'post',
            data: param
        }
    );
 }
 export function delUser( param ){
    return request(
        {
            url: '/WmsBoot/User/delUser',
            method: 'post',
            data: param
        }
    );
 }