//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: wx.getStorageSync(app.globalData.userInfoKey),
    hasUserInfo: app.globalData.hasUserInfo,
    imgUrls: [
      'http://bbqbb.oss-cn-beijing.aliyuncs.com/cczu_file/fm1.jpg',
      'http://bbqbb.oss-cn-beijing.aliyuncs.com/cczu_file/fm2.jpg',
      'http://bbqbb.oss-cn-beijing.aliyuncs.com/cczu_file/fm3.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 800,
    isShowUserPannel:false, //是否显示个人中心面板
  },
  onLoad: function () {
    this.setData({
      userInfo: app.getUserinfo()
    })
  },
  showUserPannel: function(){
    let isShow = this.data.isShowUserPannel
    if (!isShow) {
      isShow = true
    } else {
      isShow = false
    }
    this.setData({
      isShowUserPannel: isShow
    })
  },
  //跳转详情页
  gotoDetail: function() {
    wx.navigateTo({
      url: '/pages/pageopen/pageopen',
    })
  }
})

