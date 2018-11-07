// pages/k f/index.js

var appInstance = getApp();
var url_mystation = appInstance.globalData.url_mystation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textDataList: [],
    currentPage: 1,
    scrollHeight: 0,
    scrollTop: 0,
    images: {},
    avatarUrl: '',
    nickName: '',
    wxOthrtInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.code);
      console.log(options.type);
      if (options.type == "public") {
        console.log(5678)
      }
      var _this = this;
      wx.request({
        url: url_mystation + '/sys/queryZoneCode/' + options.code,
      })
      wx.request({
        // url: 'http://api.budejie.com/api/api_open.php?a=list&c=data&type=29',
        url: url_mystation +'/admin/poem/api/getTitleList',
        success: function(res) {
          console.log(res)
          _this.setData({
            textDataList: res.data.data
          })
        }
      })
    
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
  loadMoreData: function() {
    var _this = this;
    var currentPage = _this.data.currentPage;
    _this.setData({
      currentPage: currentPage + 1
    })
    console.log(_this.data.currentPage)
    wx.request({
      url: 'http://api.budejie.com/api/api_open.php?a=list&c=data&type=29&page=' + currentPage,
      success: function (res) {
        var list = _this.data.textDataList;
        for (var i = 0; i < res.data.list.length; i++) {
          list.push(res.data.list[i])
        }
        _this.setData({
          textDataList: list
        })
      }
    })
    console.log(_this.data.textDataList.length)
  },
  refreshData: function() {
    console.log("asdasd")
  },
  biggerImg: function (e) {
    console.log(e);
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
    })
  },
  /**
   * 举报
   */
  report: function(e) {
    console.log(e.currentTarget.dataset.id)
  },
  toAdd: function() {
    wx.navigateTo({
      url: '/pages/addNew/index',
    })
  },
  getUserInfo: function(e) {
    var _this = this;
    var errMsg = e.detail.errMsg;
    console.log(errMsg)
    if (errMsg == 'getUserInfo:fail auth deny') {
      wx.navigateBack({ 
      })
    } else{
      _this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        wxOthrtInfo: e.detail.rawData
      })
    }
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    wx.login({
      success(res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          // wx.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})