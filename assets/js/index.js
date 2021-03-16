$(function () {
    getUserInfo()

    var layer = layui.layer
    // 退出
    $('#btnLogout').on('click', function () {
        console.log('ok');
        // 提示用户是否退出
        layer.confirm('确定退出登录', { icon: 3, title: '提示' },
            function (index) {
                // 清空本地储存的token
                localStorage.removeItem('token')
                // 重新跳转到登录页面
                location.href = './login.html'

                // 关闭询问框
                layer.close(index)
            });
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // hesders 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 渲染用户头像
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     console.log(res);
        //     if (res.responseJSON.status == 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 清空本地储存的token
        //         localStorage.removeItem('token')
        //         // 重新跳转到登录页面
        //         location.href = './login.html'
        //     }
        // }
    })
}
function renderAvatar(user) {
    // 获取用户的名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        // 将第一个字符大写
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}