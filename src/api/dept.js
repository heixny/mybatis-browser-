import request from '@/utils/request';
// 获取用户列表，并导出方法接口
export function viewHello1( param ){
    return request(
        {
            url: '/WmsBoot/hello1',
            method: 'get'
        }
    );
 }
 export function viewHello2( param ){
    return request(
        {
            url: '/WmsBoot/hello2',
            method: 'get'
        }
    );
 }