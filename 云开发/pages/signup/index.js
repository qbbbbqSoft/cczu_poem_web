var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp();
var api = require('../../utils/api.js')
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
    let _this = this;
    let data = {
      activityID: "1544170663617"
    };
    api.appGet("/cczu/getOneSysActivityByActivityID", data).then((res) => {
      console.log(res)
      _this.setData({
        keep1: res.keep1,
        keep2: res.keep2,
        name: res.activityConfiguration.indexOf(1) !== -1,
        stuNum: res.activityConfiguration.indexOf(2) !== -1,
        classNum: res.activityConfiguration.indexOf(3) !== -1,
        phone: res.activityConfiguration.indexOf(4) !== -1,
        locationInfo: res.activityConfiguration.indexOf(5) !== -1,
        entity: res
      })
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
    });
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
  },
  /**
   * 提交签到信息
   */
  submitSignupInfo: function(e) {
    console.log(e)
    let data = {
      openid: '1234567',
      activityID: "1544170663617",
      name: e.detail.value.name,
      phone: e.detail.value.phone,
      wxheadimageurl: 'wxheadimageurl',
      wxusername: 'wxusername',
      wxotherinfo: 'wxotherinfo',
      signaddress: e.detail.value.locationInfo,
      // status:
      classname: e.detail.value.classNum,
      stunum: e.detail.value.stuNum,
      keep1: e.detail.value.keep1,
      keep2: e.detail.value.keep2
    }
    api.appPost("http://localhost:9900/cczu/signUp",data).then((res) => {
        console.log(res)
        wx.redirectTo({
          url: '/pages/result/success?info=' + res,
        })
    }).catch((errMsg) => {
      console.log(errMsg);//错误提示信息
      wx.navigateTo({
        url: '/pages/result/fail?info=' + errMsg,
      })
    });
  }
})