var api = require('../../utils/api.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // src: 'http://image.weilanwl.com/img/3x4-1.jpg'
    reqData: {},
    zoneid: 0,
    privatestatus: 0
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
    var _this = this;
    // console.log(app.globalData.userInfo)
    var zoneID = options.zoneID;
    console.log(zoneID)
    if(zoneID != 0 ) {
      _this.setData({
        zoneid: zoneID,
        privatestatus: 1
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
    console.log(e)
    let date = new Date();
    let keyword = {
      "keyword1":
      {
        "value": e.detail.value.title,
        "color": "#EE1289"
      },
      "keyword2": {
        "value": "删除码为" + e.detail.value.delcode + "是你删除此word的唯一凭证",
        "color": "#9AFF9A"
      },
      "keyword3": date
    }
    let postData = {
      formID: e.detail.formId,
      title: e.detail.value.title,
      content: e.detail.value.content,
      delcode: e.detail.value.delCode,
      zoneid: this.data.zoneid,
      data: JSON.stringify(keyword),
      openID: wx.getStorageSync('openid'),
      author: app.globalData.userInfo.nickName,
      avatarurl: app.globalData.userInfo.avatarUrl,
      privatestatus: this.data.privatestatus
    }
    api.appPost('https://www.bbqbb.top/admin/poem/api/postsmt', postData).then((res) => {
      console.log(res)
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
    });
  }
})