import { $wuxSelect } from '../../utils/wuxui/dist/index';
var api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '点击选择',
    time: '点击选择',
    title3: '点击此处进行选择',
    value3: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  onClick3() {
    $wuxSelect('#wux-select3').open({
      value: this.data.value3,
      multiple: true,
      toolbar: {
        title: '签到验证项',
        confirmText: '确认',
      },
      options: [{
        title: '姓名',
        value: '1',
      },
      {
        title: '学号',
        value: '2',
      },
      {
        title: '班级',
        value: '3',
      },
      {
        title: '手机号码',
        value: '4',
      },
      {
        title: '签到位置信息',
        value: '5',
      },
      ],
      onChange: (value, index, options) => {
        console.log('onChange', value, index, options)
        if (value.length > 3) {
          console.log(123);
        } else {
          this.setData({
            value3: value,
            title3: index.map((n) => options[n].title),
          })
        }
      },
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        this.setData({
          value3: value,
          title3: index.map((n) => options[n].title),
          activityConfiguration: JSON.stringify(value)
        })
      },
    })
  },
  // btnClick: function(e) {
  //   console.log(e.detail.formId)
    
  //   // wx.request({
  //   //   url: 'http://localhost:8080/admin//poem/api/wxLogin',
  //   //   method: 'POST',
  //   //   data: tmp
  //   // })
  //   wx.login({
  //     success(res) {
  //       let tmp = {
  //         code: res.code,
  //         sysWxuserinfoEntity: {
  //           wxheadimageurl: '123',
  //           wxusername: '456',
  //           wxotheruserinfo: '789'
  //         }
  //       }
  //       if (res.code) {
  //         // 发起网络请求
  //         wx.request({
  //           url: 'http://localhost:8080/admin//poem/api/wxLogin',
  //           method: 'POST',
  //           data: tmp
  //         })
  //       } else {
  //         console.log('登录失败！' + res.errMsg)
  //       }
  //     }
  //   })
  // },
  uploadPhoto: function() {
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
                src: src.replace('cczu_poem','file'),
                activityBackgroundPic: src
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
  activityNameInput: function(e) {
    this.setData({
      activityName: e.detail.value
    })
  },
  activityOrganizingPeopleInput: function (e) {
    this.setData({
      activityOrganizingPeople: e.detail.value
    })
  },
  activityPlaceInput: function (e) {
    this.setData({
      activityPlace: e.detail.value
    })
  },
  keep1Input: function (e) {
    this.setData({
      keep1: e.detail.value
    })
  },
  keep2Input: function (e) {
    this.setData({
      keep2: e.detail.value
    })
  },
  activityLabelInput: function (e) {
    this.setData({
      activityLabel: e.detail.value
    })
  },
  countInput: function (e) {
    this.setData({
      count: e.detail.value
    })
  },
  btnClick: function() {
    if (this.data.activityName == undefined || this.data.activityName == "" || this.data.activityOrganizingPeople == undefined || this.data.activityOrganizingPeople == "" ||
      this.data.activityPlace == undefined || this.data.activityPlace == "" || this.data.activityConfiguration == undefined || this.data.activityConfiguration == "" ||
      this.data.date == '点击选择' || this.data.time == '点击选择') {
      wx.showModal({
        title: '提示',
        content: '必填项不能为空',
      })
    } else {
      let postData = {
        activityName: this.data.activityName,
        activityOrganizingPeople: this.data.activityOrganizingPeople,
        activityPlace: this.data.activityPlace,
        keep1: this.data.keep1 == undefined ? "" : this.data.keep1,
        keep2: this.data.keep2 == undefined ? "" : this.data.keep2,
        activityLabel: this.data.activityLabel == undefined ? "" : this.data.activityLabel ,
        count: this.data.count == undefined ? 9999 : this.data.count,
        activityBackgroundPic: this.data.activityBackgroundPic == undefined ? "" : this.data.activityBackgroundPic,
        activityConfiguration: this.data.activityConfiguration == undefined ? "" : this.data.activityConfiguration,
        activityDate: this.data.date + ' ' + this.data.time + ':00',
        organizingPeopleOpenID: wx.getStorageSync('openid')
      }
      console.log(postData)
      api.appPost('https://xuncha.bbqbb.top/cczu/createWXQrCode', postData).then((res) => {
        wx.showToast({
          title: '创建成功',
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
    }
  }
})