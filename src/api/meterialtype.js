import request from '@/utils/request';
// 获取用户列表，并导出方法接口
export function getList( param ){
    return request(
        {
            url: '/WmsBoot/MeterialType/list',
            method: 'post',
            data: param
        }
    );
 }
 export function saveType( param ){
    return request(
        {
            url: '/WmsBoot/MeterialType/save',
            method: 'post',
            data: param
        }
    );
 }
 export function delType( param ){
    return request(
        {
            url: '/WmsBoot/MeterialType/delete',
            method: 'post',
            data: param
        }
    );
 }