import request from '@/utils/request';
// 获取用户列表，并导出方法接口
export function getTasktList( param ){
    return request(
        {
            url: '/WmsBoot/Inbound/list',
            method: 'post',
            data: param
        }
    );
 }
 export function getDetailList( param ){
    return request(
        {
            url: '/WmsBoot/Inbound/getTaskDetaillist',
            method: 'post',
            data: param
        }
    );
 }
 export function commit(param){
    return request(
        {
            url: '/WmsBoot/Inbound/commitTask',
            method: 'post',
            data: param
        }
    )
 }