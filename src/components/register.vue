<template>
  <div class="modal fade" id="modalRegister" tabindex="-1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel">注册</h4>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="reg-username">用户名：</label><input type="text" name="reg-username" class="form-control" @keyup="checkName"><span class="tip"></span>
              <label for="reg-password">密码：</label><input type="password" name="reg-password" class="form-control" @keyup="checkPwd"><span class="tip"></span>
              <label for="reg-pwdConfirm">确认密码：</label><input type="password" name="reg-pwdConfirm" class="form-control" @keyup="pwdConfirm"><span class="tip"></span>
              <label for="">请输入验证码</label><input type="text" name="verfiCode" class="form-control" @keyup="checkVerfiCode"><span class="tip"></span>
              <span @click="getVerfiCode" class="svgCode" v-html="svg"></span><span>看不清？点击图片切换</span>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="confirmReg">确认注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        svg: '',
        text: ''
      }
    },
    mounted: function () {
      let that = this;
      $("#modalRegister").on('show.bs.modal', function() {
        that.getVerfiCode();
      }).on('hide.bs.modal', function() {
        that.resetInput();
      })
    },
    methods: {

      // 获取验证码
      getVerfiCode: function () {
        let that = this;
        $.ajax({
          url: 'http://localhost:3000/api/captcha',
          dataType: 'json',
        })
        .done(function(data) {
          that.svg = data.code;
          that.text = data.text;
          console.log(that.text)
        })
        .fail(function() {
          console.log("error");
        });
      },

      
      // 验证用户名
      checkName: function (event) {
        let username = $(event.currentTarget).val();
        let $tip = $(event.currentTarget).next('.tip');
        let reg = /^[a-zA-Z0-9\_]{3,13}$/
        if (reg.test(username)) {
          // 验证通过
          $tip.removeClass('nameErr ERROR').addClass('checked');

          // 判断用户名唯一
          $.get('http://localhost:3000/api/uniqueUserName', {
            username: username
          }, function(data) {
            if (data.status == 'fail') {
              // 用户名存在
              $tip.removeClass('checked nameErr ERROR').addClass('nameExist ERROR')
            } else if (data.status == 'success') {
              // 用户名不存在
              $tip.removeClass('nameErr nameExist ERROR').addClass('checked')
            }
          });
        } else {
          $tip.removeClass('checked nameExist ERROR').addClass('nameErr ERROR');
        }

        if (username == '') {
          $tip.removeClass('checked nameErr nameExist ERROR').addClass('ERROR');
        }
      },

      // 验证密码
      checkPwd: function(event) {
        let password = $(event.currentTarget).val();
        let $tip = $(event.currentTarget).next('.tip');
        let reg = /^[a-zA-Z0-9\.\-\_\@\!]{6,16}$/
        if (reg.test(password)) {
          // 验证通过
          $tip.removeClass('pwdErr ERROR').addClass('checked');
        } else {
          $tip.removeClass('checked').addClass('pwdErr ERROR');
        }

        if (password == '') {
          $tip.removeClass('checked pwdErr ERROR').addClass('ERROR');
        }
      },

      // 验证确认密码
      pwdConfirm: function (event) {
        let password = $("[name='reg-password']").val();
        let pwdConfirm = $(event.currentTarget).val();
        let $tip = $(event.currentTarget).next('.tip');
        
        if (password == pwdConfirm) {
          $tip.removeClass('pwdConfirmErr ERROR').addClass('checked');
        } else {
          $tip.removeClass('checked').addClass('pwdConfirmErr ERROR');
        }

        if (pwdConfirm == '') {
          $tip.removeClass('checked pwdConfirmErr ERROR').addClass('ERROR');
        }
      },

      // 验证码
      checkVerfiCode: function (event) {
        let verfiCode = $(event.currentTarget).val().toLowerCase();
        let $tip = $(event.currentTarget).next('.tip');
        if (verfiCode == this.text.toLowerCase()) {
          $tip.removeClass('verfiCode ERROR').addClass('checked');
        } else {
          $tip.removeClass('checked').addClass('verfiCode ERROR');
        }

        if (verfiCode == '') {
          $tip.removeClass('checked verfiCode ERROR').addClass('ERROR');
        }

      },

      // 确认注册
      confirmReg: function () {
        let that = this;
        let username = $("[name='reg-username']").val();
        let password = $("[name='reg-password']").val();
        let pwdConfirm = $("[name='reg-password']").val();
        let verfiCode = $("[name='verfiCode']").val();

        if (verfiCode == '') {
          $(".verfiCode").next(".tip").addClass('verfiCode ERROR');
        }

        if (username == '' || password == ''  || pwdConfirm == '' || verfiCode == '') {
        } else {
            if ($(".tip").hasClass('ERROR')) {
            // console.log("不提交")
          } else {
            // console.log("提交");
              $.post('http://localhost:3000/api/regUser', {
                username: username,
                password: password,
                verfiCode: verfiCode
              }, function(data, textStatus, xhr) {
                if (data.status == 'success') {
                  alert("注册成功");
                  $(".close").trigger('click');
                }
              });
            }
          }  
        },

        // 清空输入框内容
        resetInput: function() {
          $("[name='reg-username']").val("");
          $("[name='reg-password']").val("");
          $("[name='reg-pwdConfirm']").val("");
          $("[name='verfiCode']").val("");
          $(".tip").removeClass('nameErr nameExist pwdErr pwdConfirmErr verfiCode checked ERROR');
        },
    },
  }
</script>

<style scoped>
  .form-control {
    width: 94% !important;
    display: inline-block;
  }
  .svgCode~span{
    font-size: 12px;
  }
  .tip {
    display: inline;
  }
  .checked::before {
    content: url(../assets/sign_check.png);
    position: relative;
    display: inline-block;
    margin-left: 8px;
  }
  .nameErr::before,
  .nameExist::before,
  .pwdErr::before,
  .pwdConfirmErr::before,
  .verfiCode::before {
    content: url(../assets/sign_error.png);
    position: absolute;
    display: inline-block;
    margin-top: 6px;
    margin-left: 8px;
  }

  .nameErr::after,
  .pwdErr::after,
  .pwdConfirmErr::after,
  .nameExist::after,
  .verfiCode::after {
    display: block;
    color: red;
    font-size: 14px;
  }
  .nameErr::after {
    content: '用户名格式错误 ,请输入由字母、数字或下划线组成的3-13位的用户名！';
  }
  .nameExist::after {
    content: '用户名已存在!';
  }
  .pwdErr::after {
    content: '密码格式错误，请输入由字母、数字或. - _ @ ! 字符组成的6-16位密码！'
  }
  .pwdConfirmErr::after {
    content: '两次密码不一致！'
  }
  .verfiCode::after {
    content: '验证码输入错误'
  }  
</style>