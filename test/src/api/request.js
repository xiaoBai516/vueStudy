import axios from 'axios';
import * as api from './interfaces';
/**
 *  callback  回调函数
 * params  传递的参数
 * @returns data
 */
export function getPatiDetailByAppFn(callback, params) {
    // axios.post(api.getPatiDetailByApp, params).then(res => {
    //     if (res.data.success == true) {
    //         let data = res.data.data;
    //         callback(data);
    //     }else{
    //          callback(res.data);
    //     }
    // });
    axios.get("/query/rest/pc-direct/page/queryNavigators").then(res => {
        if (res.data.success == true) {
            let data = res.data.data;
            callback(data);
        }else{
             callback(res.data);
        }
    });
    // window.location.href ="/queryNavigators";
}
//请求本地的data文件下test.json数据
export function getTest(callback, params) {
    // axios.post(api.getPatiDetailByApp, params).then(res => {
    //     if (res.data.success == true) {
    //         let data = res.data.data;
    //         callback(data);
    //     }else{
    //          callback(res.data);
    //     }
    // });
    axios.get("/test").then(res => {
        console.log(res)
        // if (res.data.success == true) {
        //     let data = res.data.data;
        //     callback(data);
        // }else{
        //      callback(res.data);
        // }
    });
    // window.location.href ="/queryNavigators";
}
