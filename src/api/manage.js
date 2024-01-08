import request from '@/utils/request';
// 获取用户列表，并导出方法接口
export function getList( param ){
    return request(
        {
            url: '/WmsBoot/Warehouse/list',
            method: 'post',
            data: param
        }
    );
 }
 export function saveWarehouse( param ){
    return request(
        {
            url: '/WmsBoot/Warehouse/saveWarehouse',
            method: 'post',
            data: param
        }
    );
 }
 export function delWarehouse( param ){
    return request(
        {
            url: '/WmsBoot/Warehouse/delWarehouse',
            method: 'post',
            data: param
        }
    );
 }
 export function getUserId(){
    return request(
        {
            url: '/WmsBoot/Warehouse/getUserId',
            method: 'post'
        }
    );
 }