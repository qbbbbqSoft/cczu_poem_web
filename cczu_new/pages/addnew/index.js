var api = require('../../utils/api.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // src: 'http://image.weilanwl.com/img/3x4-1.jpg'
    reqData: {},
    zoneid: 0,
    privatestatus: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let tmp = {
    //   code: 'code',
    //   sysWxuserinfoEntity: {
    //     wxheadimageurl: '123',
    //     wxusername: '456',
    //     wxotheruserinfo: '789'
    //   }
    // }
    // wx.request({
    //   url: 'http://localhost:8080/admin//poem/api/wxLogin',
    //   method: 'POST',
    //   data: tmp
    // })
    var _this = this;
    // console.log(app.globalData.userInfo)
    var zoneID = options.zoneID;
    console.log(zoneID)
    if(zoneID != 0 ) {
      _this.setData({
        zoneid: zoneID,
        privatestatus: 1
      })
    }
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
  delSrc: function() {
    this.setData({
      src: '',
      tmpSrc: ''
    })
  },
  addNewPic: function() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '图片上传中',
        });
        console.log(res.tempFilePaths)
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: "https://xuncha.bbqbb.top" + '/cczu/headImgUpload', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
            'Authorization': 'Bearer ..'    //若有token，此处换上你的token，没有的话省略
          },
          success: function (res) {
            console.log(res.data)
            var jsonStr = res.data;
            jsonStr = jsonStr.replace(" ", "");
            if (typeof jsonStr != 'object') {
              jsonStr = jsonStr.replace(/\ufeff/g, "");//重点
              var jj = JSON.parse(jsonStr);
              res.data = jj;
            }
            console.log(res.data.code)
            if (res.data.code == 0) {
              let src = res.data.data;
              _this.setData({
                src: src,
                tmpSrc: tempFilePaths[0]
              })
              wx.showToast({
                title: '图片上传成功！',
                icon: 'success',
                duration: 1500
              })
            } else {
              wx.showToast({
                title: '图片上传失败！',
                icon: 'success',
                duration: 1500
              })
            }
          },
          complete: function () {
            wx.hideLoading();
          }
        })
      }
    })
  },
  submitTitle: function(e) {
    console.log(e)
    if (e.detail.value.content && e.detail.value.title && e.detail.value.delcode) {
      let postData = {
        formID: e.detail.formId,
        title: e.detail.value.title,
        content: e.detail.value.content,
        delCode: e.detail.value.delcode,
        zoneid: this.data.zoneid,
        openID: wx.getStorageSync('openid'),
        author: app.globalData.userInfo.nickName,
        avatarurl: app.globalData.userInfo.avatarUrl,
        privatestatus: this.data.privatestatus,
        imageurl: this.data.src
      }
      api.appPost('https://xuncha.bbqbb.top/admin/poem/api/postsmt', postData).then((res) => {
        wx.showToast({
          title: '发表成功',
        })
        var time1 = setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 3000)
        
        console.log(res)
      }).catch((errMsg) => {
        console.log(errMsg);//错误提示信息
        wx.showModal({
          title: '提示',
          content: errMsg,
        })
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '请补全内容',
      })
    }
    
  }
})