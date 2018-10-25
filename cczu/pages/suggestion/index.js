var appInstance = getApp();
var url_mystation = appInstance.globalData.url_mystation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  formSubmit: function (e) {
    var _this = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.suggestion != "") {
      wx.showLoading({
        title: '提交中',
      })
      wx.request({
        url: url_mystation + '/sys/writesuggestion',
        method: "POST",
        data: {
          email: e.detail.value.email,
          content: e.detail.value.suggestion,
          nickname: e.detail.value.nickname
        },
        success: function (e) {
          console.log(e);
          if (e.statusCode == 200 && e.data == true) {
            wx.hideLoading();
            wx.showModal({
              title: '提交成功',
              content: '感谢您的宝贵意见和优化建议！',
              success: function () {
                wx.switchTab({
                  url: '../menu/index'
                })
              }
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请输入内容',
        image: '../../img/error.png',
        success: function() {
          _this.setData({
              textareaFlag: true 
            })
        }
      })
    }
    
  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})