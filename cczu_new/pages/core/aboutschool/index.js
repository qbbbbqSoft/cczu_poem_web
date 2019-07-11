var WxParse = require('../../../utils/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["学校简介", "校史沿革", "院系介绍"],
    dept: ["管理系", "会计系", "机电工程系", "建筑工程系", "会计系", "经济系", "食品与生物工程系", "体教部", "外国语言文学系", "信息工程系", "中文与法律系"],
    deptIndex: 0,
    activeIndex: 0,
    yuans: [],
    times: []
  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    })
  },
  classNameInput: function (e) {
    this.setData({
      className: e.detail.value
    })
  },
  teacherDeptPicker: function (e) {
    this.setData({
      deptIndex: e.detail.value
    })
  },
  teacherNameInput: function (e) {
    this.setData({
      teacherName: e.detail.value
    })
  },
  searchToday: function () {
    if (this.data.activeIndex == 0) {
      if (!this.data.className) {
        wx.showModal({
          content: '请输入班级，例如：建1604-1',
          showCancel: false
        })
      } else {
        wx.setStorageSync('className', this.data.className)
        wx.navigateTo({
          url: '../../search/table/today?action=student&name=' + this.data.className
        })
      }
    } else {
      if (!this.data.teacherName) {
        wx.showModal({
          content: '请输入姓名，例如：张三',
          showCancel: false
        })
      } else {
        wx.setStorageSync('deptIndex', this.data.deptIndex)
        wx.setStorageSync('teacherName', this.data.teacherName)
        wx.navigateTo({
          url: '../../search/table/today?action=teacher&dept=' + this.data.dept[this.data.deptIndex] + '&name=' + this.data.teacherName
        })
      }
    }
  },
  searchAll: function () {
    if (this.data.activeIndex == 0) {
      if (!this.data.className) {
        wx.showModal({
          content: '请输入班级，例如：建1604-1',
          showCancel: false
        })
      } else {
        wx.setStorageSync('className', this.data.className)
        wx.navigateTo({
          url: '../../search/table/all?action=student&name=' + this.data.className
        })
      }
    } else {
      if (!this.data.teacherName) {
        wx.showModal({
          content: '请输入姓名，例如：张三',
          showCancel: false
        })
      } else {
        wx.setStorageSync('deptIndex', this.data.deptIndex)
        wx.setStorageSync('teacherName', this.data.teacherName)
        wx.navigateTo({
          url: '../../search/table/all?action=teacher&dept=' + this.data.dept[this.data.deptIndex] + '&name=' + this.data.teacherName
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let className = wx.getStorageSync('className')
    let deptIndex = wx.getStorageSync('deptIndex') ? wx.getStorageSync('deptIndex') : 0
    let teacherName = wx.getStorageSync('teacherName')
    this.setData({ className, deptIndex, teacherName })
    var that = this;
    wx.request({
      url: 'https://xuncha.bbqbb.top/cczu/getInfoAboutSchool/1',
      success: function (res) {
        let tmp = JSON.parse(res.data.data)
        WxParse.wxParse('c2Content', 'html', tmp.data.content, that, 5);
      }
    })
    wx.request({
      url: 'https://xuncha.bbqbb.top/cczu/getInfoAboutSchool/2',
      success: function(res) {
        let tmp = JSON.parse(res.data.data)
        let yuans = tmp.data.departsList;
        that.setData({yuans})
      }
    })
    wx.request({
      url: 'https://xuncha.bbqbb.top/cczu/getInfoAboutSchool/3',
      success: function (res) {
        let tmp = JSON.parse(res.data.data)
        let times = tmp.data
        console.log(tmp)
        that.setData({times})
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
    return {
      title: '课表查询',
      desc: '「常大课表+」不仅仅是课表。',
      path: '/pages/core/about/index'
    }
  },
  toDetail: function(e) {
    let content = e.currentTarget.dataset.content;
    wx.setStorageSync("content", content);
    wx.navigateTo({
      url: "detail",
    })
  }
})