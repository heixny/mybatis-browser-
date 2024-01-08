import request from '@/utils/request';
// 获取用户列表，并导出方法接口
export function getReceiptList( param ){
    return request(
        {
            url: '/WmsBoot/Receipt/list',
            method: 'post',
            data: param
        }
    );
 }
 export function commit( param ){
    return request(
        {
            url: '/WmsBoot/Receipt/commit',
            method: 'post',
            data: param
        }
    );
 }
 export function getMyorderList( param ){
    return request(
        {
            url: '/WmsBoot/Receipt/getMyorderList',
            method: 'post',
            data: param
        }
    );
 }