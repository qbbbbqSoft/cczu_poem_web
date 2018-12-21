// pages/addnew/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // src: 'http://image.weilanwl.com/img/3x4-1.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let tmp = {
    //   code: 'code',
    //   sysWxuserinfoEntity: {
    //     wxheadimageurl: '123',
    //     wxusername: '456',
    //     wxotheruserinfo: '789'
    //   }
    // }
    // wx.request({
    //   url: 'http://localhost:8080/admin//poem/api/wxLogin',
    //   method: 'POST',
    //   data: tmp
    // })
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
  delSrc: function() {
    this.setData({
      src: ''
    })
  },
  addNewPic: function() {
    this.setData({
      src: 'https://bbqbb.oss-cn-beijing.aliyuncs.com/cczu_poem/1541603359426.jpg'
    })
  },
  contentInput: function(e) {
    console.log(e.detail.value)
    let content = e.detail.value
    this.setData({
      content
    })
  },
  submitTitle: function(e) {
    console.log(e.detail.formId)
    wx.request({
      url: 'http://localhost:8080/admin/poem/api/postsmt',
      method: 'POST',
      data: {
        content: this.data.content
      }
    })
  }
})