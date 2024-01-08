import request from '@/utils/request';
// 获取用户列表，并导出方法接口
export function getList( param ){
    return request(
        {
            url: '/WmsBoot/Inventory/list',
            method: 'post',
            data: param
        }
    );
 }
 export function save( param ){
    return request(
        {
            url: '/WmsBoot/Inventory/save',
            method: 'post',
            data: param
        }
    );
 }
 export function dele( param ){
    return request(
        {
            url: '/WmsBoot/Inventory/delete',
            method: 'post',
            data: param
        }
    );
 }