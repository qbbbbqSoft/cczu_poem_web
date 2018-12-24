// pages/auth/auth.js
let app = getApp();
let url_mystation = app.globalData.url_mystation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: app.globalData.hasUserInfo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.hasOpenid)
    if (app.globalData.hasUserInfo && app.globalData.hasOpenid) {
      wx.reLaunch({
        url: "/pages/index/index",
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindGetUserInfo: function (e) {
    app.setUserinfo(e);
    wx.login({
      success: function (res) {
        console.log(res)
        // 获取登录的临时凭证
        var code = res.code;
        // 调用后端，获取微信的session_key, secret
        wx.request({
          url: url_mystation + "/admin/poem/api/wxLogin?code=" + code,
          method: "POST",
          success: function (result) {
            console.log(result);
            app.setUserinfo(e, result.data.data.openid)
            // _this.setData({
            //   openid: result.data.data.openid
            // })
            // 保存用户信息到本地缓存，可以用作小程序端的拦截器
            // app.setGlobalUserInfo(e.detail.userInfo);
            // wx.redirectTo({
            //   url: '../index/index',
            // })
          }
        })


      }
    })
  }
})