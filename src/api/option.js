import request from '@/utils/request';
// 获取用户列表，并导出方法接口
export function getMS(){
    return request(
        {
            url: '/WmsBoot/Option/getMS',
            method: 'post'
        }
    );
 }
 export function getMG(){
    return request(
        {
            url: '/WmsBoot/Option/getMG',
            method: 'post'
        }
    );
 }
 export function getMT(){
    return request(
        {
            url: '/WmsBoot/Option/getMT',
            method: 'post'
        }
    );
 }
 export function getwaretype(){
    return request(
        {
            url: '/WmsBoot/Option/getwaretype',
            method: 'post'
        }
    );
 }
 export function getware(){
    return request(
        {
            url: '/WmsBoot/Option/getware',
            method: 'post'
        }
    );
 }
 export function getarea(){
    return request(
        {
            url: '/WmsBoot/Option/getarea',
            method: 'post'
        }
    );
 }
 export function getposition(){
    return request(
        {
            url: '/WmsBoot/Option/getposition',
            method: 'post'
        }
    );
 }