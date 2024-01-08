import request from '@/utils/request';
// 获取用户列表，并导出方法接口
export function getList( param ){
    return request(
        {
            url: '/WmsBoot/MeterialGroup/list',
            method: 'post',
            data: param
        }
    );
 }
 export function save( param ){
    return request(
        {
            url: '/WmsBoot/MeterialGroup/save',
            method: 'post',
            data: param
        }
    );
 }
 export function dele( param ){
    return request(
        {
            url: '/WmsBoot/MeterialGroup/delete',
            method: 'post',
            data: param
        }
    );
 }