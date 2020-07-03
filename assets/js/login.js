$(function () {
    // 点击去注册的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取form对象
    var form = layui.form
    // // 通过form.verify()函数自定义校验规则
    form.verify({
        //     // 自定义一个叫做PWD校验规则
        // [\S]非空格字符,S要大写

        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致
        repwd: function (value) {
            // 通过value拿到的是确认密码框中的内容

            // 还需要拿到密码框中的内容
            var pwd = $('.reg-box [name = password]').val()

            console.log(pwd)
            console.log(value)
            // 然后进行一次判断
            if (pwd !== value) {
                // 如果失败,return一个提示消息
                return '两次密码不一致'
            }
        }

    })
})
