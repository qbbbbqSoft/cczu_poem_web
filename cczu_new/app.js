//app.js
//本地存储中userinfo key
const USERINFOKEY = "userinfo";
const OPENIDKEY = "openid";

let app = {
  globalData: {
    userInfoKey: USERINFOKEY,
    openidKey: OPENIDKEY,
    hasOpenid: !!wx.getStorageSync(OPENIDKEY),
    hasUserInfo: !!wx.getStorageSync(USERINFOKEY), //是否获取用户信息成功标志
    userInfo: wx.getStorageSync(USERINFOKEY), //用户信息
    openid: wx.getStorageSync(OPENIDKEY),
    url: "https://www.chenyaoyao.club/",
    url_mystation: "https://xuncha.bbqbb.top"
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  //获取用户信息
  setUserinfo: function (e,openidV) {
    //先判断缓存中时候存在用户信息
    let userinfo = wx.getStorageSync(USERINFOKEY);
    let openid = wx.getStorageSync(OPENIDKEY);
    if (!openid) {
      wx.setStorageSync(USERINFOKEY, e.detail.userInfo)
      wx.setStorageSync(OPENIDKEY, openidV)
      wx.reLaunch({
        url: '/pages/index/index'
      })
    } else {
      wx.reLaunch({
        url: '/pages/auth/auth'
      })
    }
  },
  getUserinfo: function() {
    return wx.getStorageSync(USERINFOKEY)
  }
};


App(app)