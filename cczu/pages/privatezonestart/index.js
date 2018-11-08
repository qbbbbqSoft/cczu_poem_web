// pages/privatezonestart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      privateZoneCode: '',
      focus: true
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
  inputPrivateCode: function(e) {
      this.setData({
        privateZoneCode: e.detail.value
      })
  },
  ENTER: function() {
    var _this = this;
    if (_this.data.privateZoneCode.length == 6) {
      wx.navigateTo({
        url: '/pages/kf/index?type=private&code=' + _this.data.privateZoneCode,
      })
    } else {
      wx.showModal({
        title: 'ERROR!',
        content: 'PLEASE ENTER SIX NUMBER',
        success: function() {
          _this.setData({
            focus: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    var errMsg = e.detail.errMsg;
    console.log(errMsg)
    if (errMsg == 'getUserInfo:fail auth deny') {
      wx.navigateBack({
      })
    } else {
      this.ENTER();
    }
  }
})