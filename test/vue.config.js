module.exports = {
    publicPath: process.env.NODE_ENV === 'production'?'/production-sub-path/':'/',
    devServer: {
        proxy: {
            '/query': {
                target: 'https://www.acfun.cn',//接口
                changeOrigin: true,//跨域  开启代理，在本地创建一个虚拟服务端
                pathRewrite: { 
                    '^/query': '',
                }
            }
        }
    
    }
}

/*
vue-cli 3.0之跨域请求代理配置及axios路径配置
接口是:https://www.acfun.cn/rest/pc-direct/page/queryNavigators
 proxy: {
        '/query': {
            target: 'https://www.acfun.cn',//接口
            changeOrigin: true,//跨域  开启代理，在本地创建一个虚拟服务端
            pathRewrite: { 
                '^/query': '',
            }
        }
    }
虽然请求发送到 http://192.168.1.113:8080/query/rest/pc-direct/page/queryNavigators时，但是已经代理到了地址:https://www.acfun.cn/rest/pc-direct/page/queryNavigators

axios.get("/query/rest/pc-direct/page/queryNavigators").then(res => {
        if (res.data.success == true) {
            let data = res.data.data;
            callback(data);
        }else{
             callback(res.data);
        }
    });
 */