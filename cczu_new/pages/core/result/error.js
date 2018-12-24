import api from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buttons: [{
      type: 'assertive',
      block: true,
      text: '解除绑定',
    },
    {
      type: 'light',
      block: true,
      text: '返回首页',
    },
    ],
    icon:{
      "type": "warn",
      "color": "#eb4b3d"
    }
  },
  onClick(e) {
    console.log(e)
    const { index } = e.detail

    index === 0 && api.resSetTodayClassName({
      query: {
        openid: this.data.openid
      },
      success: (res) => {
        console.log(res.data)
        if (res.data.code == 0) {
          wx.setStorageSync("todayClassName", 'none');
          wx.setStorageSync('resetflag', false);
          wx.setStorageSync("username", "");
          wx.setStorageSync("password", "");
          wx.navigateBack()
        }
      },
      fail: (res) => {

      },
      complete: (res) => {

      }
    })

    index === 1 && wx.switchTab({
      url: '../../../pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let errorData = options.errorData
    let openid = wx.getStorageSync('openid')
    this.setData({errorData,openid})
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

  }
})