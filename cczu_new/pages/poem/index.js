//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: wx.getStorageSync(app.globalData.userInfoKey),
    hasUserInfo: app.globalData.hasUserInfo,
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 800,
    isShowUserPannel:false, //是否显示个人中心面板
  },
  onLoad: function () {
    let _this = this;
    wx.request({
      url: 'https://xuncha.bbqbb.top/cczu/poemIndex',
      success: function(res) {
        console.log(res)
        _this.setData({
          imgUrls: res.data.imgUrls,
          word: res.data.word
        })
      }
    })
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
      url: '/pages/kf/index?code=0&type=public',
    })
  }
})

