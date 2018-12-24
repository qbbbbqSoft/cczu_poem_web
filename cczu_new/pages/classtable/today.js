const app = getApp()
import api from '../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: '',
    tabs: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    activeIndex: 0
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  getToday: function (todayClassName) {
    api.getToday({
      query: {
        name: todayClassName
      },
      success: (res) => {
        let todayWeek = api.todayInfo(res.data.startTime)
        this.setData({ activeIndex: todayWeek.day - 1 })
      }
    })
  },
  getTable: function (options) {
    api.getTable({
      query: {
        action: options.action,
        dept: options.dept ? options.dept : options.action,
        name: options.name
      },
      success: (res) => {
        let listData = res.data
        if (listData.status == '1') {
          wx.showModal({
            content: '抱歉，未查询到当前课表信息',
            showCancel: false,
            complete: function () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        } else {
          this.setData({ listData })
        }
      }
    })
  },
  backIndex: function () {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name + ' 当日课表'
    })
    this.getToday('today')
    this.getTable(options)
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
    return {
      title: this.options.name + ' 当日课表',
      path: '/pages/search/table/today?action=' + this.options.action + '&dept=' + this.options.dept + '&name=' + this.options.name
    }
  }
})