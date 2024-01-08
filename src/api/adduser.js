import request from '@/utils/request';
// 获取用户列表，并导出方法接口
export function saveUser( param ){
    return request(
        {
            url: '/WmsBoot/User/saveUser',
            method: 'post',
            data: param
        }
    );
 }