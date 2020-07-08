$.ajaxPrefilter(function (options) {
    // 在发起真正的AJAX请求之前,统一拼接请求根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // 统一为有权限的接口,设置headers请求头,indexof索引号,indexOf() 方法对大小写敏感！bai如果要检索的字符串值没有出现，则该方法返回 -1。
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载 complete 回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token 
            localStorage.removeItem('token')
            // 2. 强制跳转到登录页面 
            location.href = '/login.html'
        }
    }


})