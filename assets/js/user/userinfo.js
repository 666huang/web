
var form = layui.form
$(function () {
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1-6 个字符之间'
            }
        }
    })

    initUserInfo()
})


// 初始化用户信息
function initUserInfo() {
    $.ajax({
        methods: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            // console.log(res);

            // 调用from.val() 快速为表单赋值
            form.val('formUserInfo', res.data)
            console.log('1');
        }
    })
}

// 重置表单数据
$('#btnReset').on('click', function (e) {
    // 阻止表单默认提交行为
    e.preventDefault();

    // 实现表单重置
    initUserInfo()
})


var layer = layui.layer
// 监听表单的提交事件
$('.layui-form').on('submit', function (e) {
    console.log($(this).serialize());
    // console.log('1');
    e.preventDefault()
    // layer.msg('更新用户信息成功')
    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更新用户信息失败')
            }
            layer.msg('更新用户信息成功')

            // 调用父页面的方法,重新渲染用户的信息
            window.parent.getUserInfo()
        }
    })
})
