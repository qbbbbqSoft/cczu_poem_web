var appInstance = getApp();
var url = appInstance.globalData.url;
Page({
  data: {
    phone: '',
    password: '',
    showFlag: false,
    showFlag2: false,
    hiddenLoading: true
  },

  // 获取输入账号
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value,
      showFlag: true,
      showFlag2: false
    })
  },

  // 获取输入密码
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value,
      showFlag: false,
      showFlag2:true
    })
  },
  onLoad: function () {
   
    wx.connectSocket({
      url: 'wss://www.bbqbb.top/wss/websocket/22',
      
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
    })
    var _this = this;
    wx.getStorage({
      key: 'userName',
      success: function(res) {
        console.log(res.data)
        _this.setData({
          phone: res.data
        })
      },
    });
    wx.getStorage({
      key: 'password',
      success: function (res) {
        console.log(res.data)
        _this.setData({
          password: res.data
        })
      },
    });
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
  // 登录
  login: function () {
    var _this = this;
    _this.setData({
      showFlag: false,
      showFlag2: false,
      hiddenLoading: false
    })
    if (this.data.phone.length == 0 || this.data.password.length == 0) {
      wx.showModal({
        title: '提示',
        content: '用户名和密码不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      _this.setData({
        hiddenLoading: true
      })
    } else {
      // 这里修改成跳转的页面
      wx.request({
        url: url + '/cczu/check',
        data: {
          userName: _this.data.phone,
          password: _this.data.password
        },
        success: function(e) {
          _this.setData({
            hiddenLoading: true
          })
          if(e.data === false) {
            wx.showModal({
              title: '提示',
              content: '账号或密码错误',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
            // wx.showToast({
            //   title: '账号或密码错误',
            //   icon: 'fail',
            //   // image: '/img/error.png',
            //   duration: 2000
            // })
          } else {
            wx.setStorage({
              key: 'userName',
              data: _this.data.phone
            });
            wx.setStorage({
              key: 'password',
              data: _this.data.password
            })
              wx.navigateTo({
              url: '../zzz/index?userName=' + _this.data.phone + '&password=' + _this.data.password
            })
          }
        }
      })
    }
  },
  onShow: function() {
    // wx.showModal({
    //   title: "版本更新",
    //   content: "由于服务器负载原因，本周五晚（2018-10-12）至本周日（2018-10-14）进行服务器优化，届时程序服务将暂停，请见谅，我会继续优化带来更多功能和更好的用户体验！！！！"
    // })
  },
  onShareAppMessage: function() {
    return {
      title: '常大课表，课表获取',
      path: '/pages/login/index'
    }
  }
})