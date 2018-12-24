var appInstance = getApp();
var url = appInstance.globalData.url;
import api from '../../../utils/util.js'
import { $wuxToptips } from '../../../utils/wuxui/dist/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["已经绑定", "未绑定"],
    username: '',
    password: '',
    deptIndex: 0,
    activeIndex: 0,
    classTableList: []
  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    })
  },
  userNameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  getClassTabel: function() {
    var _this = this;
    if (!_this.data.username || !_this.data.password) {
      wx.showModal({
        content: '请输入学号，例如：18000000，密码：111111',
        showCancel: false
      })
    } else {
      _this.setData({
        spinning: !_this.data.spinning,
      })
      wx.request({
        url: url + '/cczu/check',
        data: {
          userName: _this.data.username,
          password: _this.data.password
        },
        success: function (e) {
          _this.setData({
            spinning: !_this.data.spinning,
          })
          if (e.data === false) {
            wx.showModal({
              title: '提示',
              content: '账号或密码错误',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  // _this.setData({
                  //   spinning: !_this.data.spinning,
                  // })
                } else if (res.cancel) {
                  // _this.setData({
                  //   spinning: !_this.data.spinning,
                  // })
                }
              }
            })
            // wx.showToast({
            //   title: '账号或密码错误',
            //   icon: 'fail',
            //   // image: '/img/error.png',
            //   duration: 2000
            // })
          } else {
            
            wx.navigateTo({
              url: '../../zzz/index?userName=' + _this.data.username + '&password=' + _this.data.password
            })
          }
        }
      })
    }
  },
  getClassTabelByOpenID: function() {
    api.getClassTableByOpenID({
      query: {
        openid: wx.getStorageSync('openid')
      },
      success: (res) => {
        console.log(res)
        if(res.data.code == 0) {
          let classTableList = res.data.data
          this.setData({ classTableList })
        } else {
          $wuxToptips().error({
            hidden: false,
            text: res.data.msg,
            duration: 3000,
            success() { },
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let className = wx.getStorageSync('className')
    let deptIndex = wx.getStorageSync('deptIndex') ? wx.getStorageSync('deptIndex') : 0
    let teacherName = wx.getStorageSync('teacherName')
    this.setData({ className, deptIndex, teacherName })
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
      desc: '「文经课表」提供烟台大学文经学院在校生班级与教师课表和空闲教室、图书馆藏及考试安排等查询服务。',
      path: '/pages/core/table/index'
    }
  }
})