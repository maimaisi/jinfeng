//引入axios
import axios from 'axios'

let cancel, promiseArr = {}
const CancelToken = axios.CancelToken;
//请求拦截器
// axios.interceptors.request.use(config => {
//     return config
// }, error => {
//     return Promise.reject(error)
// })

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '错误请求'
                break;
            case 401:
                err.message = '未授权，请重新登录'
                break;
            case 403:
                err.message = '拒绝访问'
                break;
            case 404:
                err.message = '请求错误,未找到该资源'
                break;
            case 405:
                err.message = '请求方法未允许'
                break;
            case 408:
                err.message = '请求超时'
                break;
            case 500:
                err.message = '服务器端出错'
                break;
            case 501:
                err.message = '网络未实现'
                break;
            case 502:
                err.message = '网络错误'
                break;
            case 503:
                err.message = '服务不可用'
                break;
            case 504:
                err.message = '网络超时'
                break;
            case 505:
                err.message = 'http版本不支持该请求'
                break;
            default:
                err.message = `连接错误${err.response.status}`
        }
    } else {
        err.message = "连接到服务器失败"
    }
    // message.err(err.message)
    return Promise.resolve(err.response)
})

// axios.defaults.baseURL = '/api'
//设置默认请求头
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.timeout = 10000

export default {
    //axios请求
    http(params) {
        return new Promise((resolve, reject) => {
            axios({
                method: params.method || 'post',
                url: params.url || '',
                data: params.data || {}
            }).then(res => {
                if (res.data.code == 0) {
                    resolve(res.data);
                } else {
                    reject(res.data.msg);
                }
            }).catch(err => {
                reject(err);
            });
        })
    }
}