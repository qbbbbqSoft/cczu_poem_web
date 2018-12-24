const app = getApp()
import api from '../../../utils/util.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
    resetflag: true,
    openid: ''
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
  setTodayClassName: function () {
    if (!this.data.username || !this.data.password) {
      wx.showModal({
        content: '请输入学号，例如：18000000，密码：111111',
        showCancel: false
      })
    } else {
      api.checkUserAndBind({
        query:{
          username: this.data.username,
          password: this.data.password,
          openid: this.data.openid
        },
        success: (res) => {
          if (res.data.code == 0) {
            wx.setStorageSync('username', this.data.username);
            wx.setStorageSync('password', this.data.password);
            wx.setStorageSync('resetflag', "aaa");
            wx.setStorageSync("todayClassName", true);
            wx.navigateTo({
              url: '../result/success',
            })
          } else {
            wx.navigateTo({
              url: '../result/error?errorData=' + res.data.msg,
            })
          }
        },
        fail: (res) => {
          
        },
        complete: (res) => {
          
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let username = wx.getStorageSync('username');
    let password = wx.getStorageSync('password');
    let resetflag = wx.getStorageSync('resetflag') == "" ? true:false;
    let openid = wx.getStorageSync('openid')
    console.log(wx.getStorageSync('resetflag'))
    
      this.setData({ username,password,resetflag,openid });
    
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
      title: '课程绑定设置',
      desc: '「常大课表+」绑定课表后每日更方便的查看课表。',
      path: '/pages/core/set/today'
    }
  },
  resSetTodayClassName: function() {
    
    api.resSetTodayClassName({
      query: {
        openid: this.data.openid
      },
      success: (res) => {
        console.log(res.data)
        if (res.data.code == 0) {
          wx.setStorageSync("todayClassName", 'none');
          wx.setStorageSync('resetflag', false);
          wx.setStorageSync("username", "");
          wx.setStorageSync("password", "");
          wx.showToast({
            title: '设置成功',
            icon: 'success'
          })
          this.onLoad()
        }
      },
      fail: (res) => {

      },
      complete: (res) => {

      }
    })
  }
})