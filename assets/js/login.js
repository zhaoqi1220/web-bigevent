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
    var layer = layui.layer
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

    // 监听注册表单事件

    $('#form-reg').submit(function (e) {
        // 阻止默认提交事件
        e.preventDefault()
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=username]').val() },

            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                return layer.msg(res.message)

            }

        })
        // 模拟点击事件
        $('#link_login').click()
    })
    // 监听登录表单事件
    $('#form-login').submit(function (e) {
        // 阻止默认提交事件
        e.preventDefault()
        // 发起AJAX请求
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: { username: $('#form-login [name=username]').val(), password: $('#form-login [name=username]').val() },
            success: function (res) {
                if (res.status !== 0) {

                    return layer.msg('登录失败')
                }

                layer.msg('登录成功')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中 
                localStorage.setItem('token', res.token)
                location.href = '/index.html'

            }

        })

    })

})
