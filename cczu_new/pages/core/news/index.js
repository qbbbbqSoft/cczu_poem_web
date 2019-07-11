const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsData: [],
    page: '1',
    tabs: ["常大要闻", "媒体常大", "校园快讯"],
    activeIndex: 0,
    tab1: [],
    tab2: [],
    tab3: []
  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    })
  },
  getNewsList: function (options) {
    api.getNewsList({
      query: {
        page: options.page
      },
      success: (res) => {
        let newsData = res.data
        if (newsData.status == '1') {
          wx.showModal({
            content: '获取新闻失败',
            showCancel: false,
            complete: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          this.setData({ newsData, page: options.page })
        }
      }
    })
  },
  getNextNewsList: function (options) {
    api.getNewsList({
      query: {
        page: options.page
      },
      success: (res) => {
        let newsData = this.data.newsData
        let nextNewsData = res.data
        this.setData({ newsData: newsData.concat(nextNewsData), page: options.page })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    // this.getNewsList(this.data)
    wx.request({
      url: 'https://xuncha.bbqbb.top/cczu/getInfoAboutSchool/6',
      success: function (res) {
        let tmp = JSON.parse(res.data.data)
        // WxParse.wxParse('c2Content', 'html', tmp.data.content, that, 5);
        let tab1 = tmp.jsonp.data
        that.setData({ tab1 })
      }
    })
    wx.request({
      url: 'https://xuncha.bbqbb.top/cczu/getInfoAboutSchool/7',
      success: function (res) {
        let tmp = JSON.parse(res.data.data)
        let tab2 = tmp.jsonp.data
        that.setData({ tab2 })
      }
    })
    wx.request({
      url: 'https://xuncha.bbqbb.top/cczu/getInfoAboutSchool/8',
      success: function (res) {
        let tmp = JSON.parse(res.data.data)
        let tab3 = tmp.jsonp.data
        that.setData({ tab3 })
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
    // this.setData({ page: parseInt(this.data.page) + 1 })
    // let arr = { page: this.data.page }
    // this.getNextNewsList(arr)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '常大新闻',
      path: '/pages/core/news/index'
    }
  },
  getNewsDetail: function(e) {
    console.log(e)
    wx.navigateTo({
      url: 'detail?id=' + e.currentTarget.dataset.id,
    })
  }
})