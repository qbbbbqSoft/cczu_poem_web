import { $wuxKeyBoard } from '../../utils/wuxui/dist/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.openWithPromiseCallback()
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
  openWithPromiseCallback() {
    const http = (obj) => {
      return new Promise((resolve, reject) => {
        obj.success = (res) => resolve(res)
        obj.fail = (res) => reject(res)
        wx.request(obj)
      })
    }
    $wuxKeyBoard().show({
      callback(value) {
        console.log(`输入的密码是：${value}`)

        wx.navigateTo({
          url: '/pages/kf/index?type=private&code=' + value,
        })
      //   wx.showLoading({
      //     title: '验证支付密码'
      //   })

      //   return http({
      //     url: 'https://www.skyvow.cn/api/user/sign/in',
      //     method: 'POST',
      //     data: {
      //       username: 'admin',
      //       password: value
      //     }
      //   })
      //     .then(res => {
      //       const data = res.data

      //       console.log(data)

      //       wx.hideLoading()

      //       wx.showToast({
      //         title: data.meta.message,
      //         duration: 3000,
      //       })

      //       if (data.meta.code !== 0) {
      //         return Promise.reject(data.meta.message)
      //       }
      //     })
      },
    })
  },

})