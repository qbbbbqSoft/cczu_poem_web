const app = getApp()
import api from '../../utils/util.js'
var WxParse = require('../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: '', //今日课程
    todayWeek: '', //开学周期 week周 day星期
    theDay: '', //今日时间
    todayClassName: '', //今日课程班级
    infos: [],
    showAllCourse: true
  },
  getToday: function (todayClassName) {
    var that = this;
    api.getToday({
      query: {
        openid: todayClassName
      },
      success: (res) => {
        console.log(res)
        let today = res.data
        let tmp = [];
        let todayWeek = res.data.todayWeek
        WxParse.wxParse('c0Content', 'html', today.data[0].content, that, 5);
        WxParse.wxParse('c1Content', 'html', today.data[1].content, that, 5);
        WxParse.wxParse('c2Content', 'html', today.data[0].content, that, 5);
        // tmp = [{ title: today.info[0].title, node: "wxParseData:c0Content.nodes" }, { title: today.info[1].title, node: "wxParseData:c0Content.nodes" }, { title: today.info[2].title, node: "wxParseData:c0Content.nodes" }]
        that.setData({ today,
         todayWeek })
         console.log(that.data.today.course == null)
      },
      fail: (res) => {
        let today = 'error'
        that.setData({ today })
      },
      complete: (res) => {
        let theDay = api.getDate() + api.getDay()
        that.setData({ theDay })
      }
    })
  },
  toHelp: function () {
    wx.setStorageSync('help', '1')
    wx.navigateTo({
      url: '/pages/help/index'
    })
  },
  setTodayClassName: function () {
    wx.navigateTo({
      url: '../core/set/today'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let help = wx.getStorageSync('help') ? wx.getStorageSync('help') : 'none';
    let todayClassName = wx.getStorageSync('todayClassName') ? wx.getStorageSync('todayClassName') : 'none';
    let openid = wx.getStorageSync('openid')
    this.getToday(openid)
    this.setData({ help, todayClassName })
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
    wx.reLaunch({
      url: 'index'
    })
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
    return {
      title: '常大课表+',
      desc: '「常大课表+」“易如反掌” 看课表。',
      path: '/pages/index/index'
    }
  },
  showAllCourse: function() {
    let that = this;
    let flag = !this.data.showAllCourse;
    that.setData({
      showAllCourse: flag
    })
  }
})