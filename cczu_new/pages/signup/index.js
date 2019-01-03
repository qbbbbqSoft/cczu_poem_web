var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
const app = getApp();
var api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let activityID = options.scene
    // let activityID = '1545874989282';
    let _this = this;
    _this.setData({
      activityID
    })
    let data = {
      activityID: activityID
    };
    api.appGet("/cczu/getOneSysActivityByActivityID", data).then((res) => {
      console.log(res)
      if (res.activityStatus == 1) {
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
      } else {
        let data = {
          openid: wx.getStorageSync('openid'),
          activityID: this.data.activityID
        }
        api.appPost("https://www.bbqbb.top/cczu/signUp", data).then((res) => {
          console.log(res)
          wx.redirectTo({
            url: '/pages/result/success?info=' + res,
          })
        }).catch((errMsg) => {
          console.log(errMsg); //错误提示信息
          wx.navigateTo({
            url: '/pages/result/fail?info=' + errMsg,
          })
        });
      }
    }).catch((errMsg) => {
      console.log(errMsg); //错误提示信息
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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
        qqmapsdk.reverseGeocoder({ //地址解析
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            console.log(res);
            //获得地址
            that.setData({
              signAddress: res.result.address
            })
          },
          fail: function(res) {
            that.setData({
              signAddress: "失败，清重新获取"
            })
          },
          complete: function(res) {
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
    if (this.data.keep1 && e.detail.value.keep1 == "") {
      wx.showModal({
        title: '提示',
        content: '必填项不能为空'
      })
    } else if (this.data.keep2 && e.detail.value.keep2 == "") {
      wx.showModal({
        title: '提示',
        content: '必填项不能为空'
      })
    } else if (this.data.name && e.detail.value.name == "") {
      wx.showModal({
        title: '提示',
        content: '必填项不能为空'
      })
    } else if (this.data.stuNum && e.detail.value.stuNum == "") {
      wx.showModal({
        title: '提示',
        content: '必填项不能为空'
      })
    } else if (this.data.phone && e.detail.value.phone == "") {
      wx.showModal({
        title: '提示',
        content: '必填项不能为空'
      })
    } else if (this.data.classNum && e.detail.value.classNum == "") {
      wx.showModal({
        title: '提示',
        content: '必填项不能为空'
      })
    } else if (this.data.locationInfo && e.detail.value.locationInfo == "") {
      wx.showModal({
        title: '提示',
        content: '必填项不能为空'
      })
    } else {
      let data = {
        openid: wx.getStorageSync('openid'),
        activityID: this.data.activityID,
        name: e.detail.value.name,
        phone: e.detail.value.phone,
        signaddress: e.detail.value.locationInfo,
        classname: e.detail.value.classNum,
        stunum: e.detail.value.stuNum,
        keep1: e.detail.value.keep1,
        keep2: e.detail.value.keep2
      }
      api.appPost("https://www.bbqbb.top/cczu/signUp", data).then((res) => {
        console.log(res)
        wx.redirectTo({
          url: '/pages/result/success?info=' + res,
        })
      }).catch((errMsg) => {
        console.log(errMsg); //错误提示信息
        wx.navigateTo({
          url: '/pages/result/fail?info=' + errMsg,
        })
      });
    }
  }
})