import request from '@/utils/request';
// 获取用户列表，并导出方法接口
export function getList( param ){
    return request(
        {
            url: '/WmsBoot/Request/list',
            method: 'post',
            data: param
        }
    );
 }
 export function saveDetail( param ){
    return request(
        {
            url: '/WmsBoot/Request/saveDetail',
            method: 'post',
            data: param
        }
    );
 }
 export function delDetail( param ){
    return request(
        {
            url: '/WmsBoot/Request/delDetail',
            method: 'post',
            data: param
        }
    );
 }
 export function startProc( param ){
    return request(
        {
            url: '/WmsBoot/Request/startProc',
            method: 'post',
            data: param
        }
    );
 }
 export function getUser(){
    return request(
        {
            url: '/WmsBoot/Request/getUser',
            method: 'post'
        }
    );
 }
 