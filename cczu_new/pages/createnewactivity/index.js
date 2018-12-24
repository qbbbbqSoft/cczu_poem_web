import { $wuxSelect } from '../../utils/wuxui/dist/index';
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
        })
      },
    })
  },
  btnClick: function(e) {
    console.log(e.detail.formId)
    
    // wx.request({
    //   url: 'http://localhost:8080/admin//poem/api/wxLogin',
    //   method: 'POST',
    //   data: tmp
    // })
    wx.login({
      success(res) {
        let tmp = {
          code: res.code,
          sysWxuserinfoEntity: {
            wxheadimageurl: '123',
            wxusername: '456',
            wxotheruserinfo: '789'
          }
        }
        if (res.code) {
          // 发起网络请求
          wx.request({
            url: 'http://localhost:8080/admin//poem/api/wxLogin',
            method: 'POST',
            data: tmp
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
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
          url: "https://www.bbqbb.top" + '/cczu/headImgUpload', //仅为示例，非真实的接口地址
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
                src
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
  }
})