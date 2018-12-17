var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
      wx.request({
        url: 'http://localhost:9900/cczu/getOneSysActivityByActivityID',
        data: {
          activityID: "1544170663617"
        },
        success: function(res) {
          console.log(res)
          _this.setData({
            keep1: res.data.data.keep1,
            keep2: res.data.data.keep2,
            name: res.data.data.activityConfiguration.indexOf(1) == -1 ? false:true,
            stuNum: res.data.data.activityConfiguration.indexOf(2) == -1 ? false : true,
            classNum: res.data.data.activityConfiguration.indexOf(3) == -1 ? false : true,
            phone: res.data.data.activityConfiguration.indexOf(4) == -1 ? false : true,
            locationInfo: res.data.data.activityConfiguration.indexOf(5) == -1 ? false : true,
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
  getLocationInfo: function() {
    let that = this;

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
        qqmapsdk = new QQMapWX({
          key: 'BQTBZ-M7RKI-M4NGF-5CDIF-6B4FE-DPBS7'
        });
        qqmapsdk.reverseGeocoder({//地址解析
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function (res) {
            console.log(res);
            //获得地址
            that.setData({
              signAddress: res.result.address
            })
          },
          fail: function (res) {
            that.setData({
              signAddress: "失败，清重新获取"
            })
          },
          complete: function (res) {
            // that.setData({
            //   address: "comasdasd"
            // })
          }
        });
      }
    })
  }
})