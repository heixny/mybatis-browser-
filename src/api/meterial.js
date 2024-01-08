import request from '@/utils/request';
// 获取用户列表，并导出方法接口
export function getMeterialList( param ){
    return request(
        {
            url: '/WmsBoot/Meterial/list',
            method: 'post',
            data: param
        }
    );
 }
 export function saveMeterial( param ){
    return request(
        {
            url: '/WmsBoot/Meterial/saveMeterial',
            method: 'post',
            data: param
        }
    );
 }
 export function delMeterial( param ){
    return request(
        {
            url: '/WmsBoot/Meterial/delMeterial',
            method: 'post',
            data: param
        }
    );
 }
 export function getMetList( param ){
    return request(
        {
            url: '/WmsBoot/Meterial/getMeterialList',
            method: 'post',
            data: param
        }
    );
 }