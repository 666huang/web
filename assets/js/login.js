$(function () {
  // 点击去注册账号的链接
  $('#link-reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击去登录的链接
  $('#link-login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 从layui.js中获取from对象
  var form = layui.form
  // 通过 form.verify()函数自定义校验规则
  form.verify({
    // 自定义一个叫做pwd的校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],

    // 校验两次密码是否一致
    repwd: function (value) {
      // 通过形参来到的是确认密码框的值   因为它调用了这个规则
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致!'
      }
    }
  })

  // 监听注册表单的提交事件
  var form = layui.layer;
  $('#form-reg').on('submit', function (e) {
    e.preventDefault();
    var data = { username: $('#form-reg [name=username]').val(), password: $('#form-reg [name=password]').val() }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg('注册成功');

      // 模拟点击操作
      $('#link-login').click()
    })
  })

  // 监听登录表单的提交事件
  var form = layui.layer;
  $('#form-login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),

      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败!');
        }
        layer.msg('登录成功')
        // 将登录成功后得到的 token字符串,保存到localStorage中
        localStorage.setItem('token', res.token)
        // console.log(res.token);
        // 跳转到后台主页
        location.href = './index.html'
      }
    })
  })
})


