var appInstance = getApp();
var url_mystation = appInstance.globalData.url_mystation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textareaFlag: false,
    showtab: 0,  //顶部选项卡索引
    showtabtype: '', //选中类型
    showfootertab: 0,  //底部标签页索引
    tabnav: {},  //顶部选项卡数据
    questionsall: [],  //所有问题
    questions: [], //问题列表
    showquestionindex: null, //查看问题索引,
    uploadimgs: [], //上传图片列表
    uploadimgsStr: [],
    editable: false, //是否可编辑
    nickName: "",
    eMail: "",
    suggestion: "",
    picKey: ''
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
  // inputName: function(e) {
  //   this.setData({
  //     nickName: e.detail.value
  //   })
  // },
  inputEMail: function (e) {
    this.setData({
      eMail: e.detail.value
    })
  },
  inputSuggestion: function (e) {
    this.setData({
      suggestion: e.detail.value
    })
  },
  formSubmit: function (e) {
    var _this = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.suggestion != "") {
      wx.showLoading({
        title: '提交中',
      })
      wx.request({
        url: "http://localhost:9900" + '/sys/writesuggestion',
        method: "POST",
        data: {
          email: e.detail.value.email,
          content: e.detail.value.suggestion,
          nickname: _this.data.uploadimgs
        },
        success: function (e) {
          console.log(e);
          if (e.statusCode == 200 && e.data == true) {
            wx.hideLoading();
            wx.showModal({
              title: '提交成功',
              content: '感谢您的宝贵意见和优化建议！',
              success: function () {
                wx.switchTab({
                  url: '../index/index'
                })
              }
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请输入内容',
        image: '../../img/error.png',
        success: function() {
          _this.setData({
              textareaFlag: true 
            })
        }
      })
    }
    
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  chooseImage: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths)
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://xuncha.bbqbb.top/cczu/headImgUpload', //仅为示例，非真实的接口地址
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
            _this.setData({
              picKey: res.data.msg,
              uploadimgsStr: _this.data.uploadimgsStr.concat(res.data.data)
            })
            wx.showToast({
              title: '图片上传成功！',
              icon: 'success',
              duration: 1000
            })
            wx.hideLoading();
          }
        })
        _this.setData({
          uploadimgs: _this.data.uploadimgs.concat(res.tempFilePaths)
        })
        console.log(_this.data.uploadimgs)
      }
    })
  },
  editImage: function () {
    this.setData({
      editable: !this.data.editable
    })
  },
  deleteImg: function (e) {
    console.log(e.currentTarget.dataset.index);
    const imgs = this.data.uploadimgs
    // Array.prototype.remove = function(i){
    //   const l = this.length;
    //   if(l==1){
    //     return []
    //   }else if(i>1){
    //     return [].concat(this.splice(0,i),this.splice(i+1,l-1))
    //   }
    // }
    imgs.splice(e.currentTarget.dataset.index,1);
    this.setData({
      uploadimgs: this.data.uploadimgs
    })
  },
  suggestionSubmit: function() {
    var _this = this;
    if (_this.data.suggestion != "") {
      wx.showLoading({
        title: '提交中',
      })
      wx.request({
        url: url_mystation + '/sys/writesuggestion',
        method: "POST",
        data: {
          email: _this.data.eMail,
          content: _this.data.suggestion,
          nickname: _this.data.uploadimgsStr.toString()
        },
        success: function (e) {
          console.log(e);
          if (e.statusCode == 200 && e.data == true) {
            wx.hideLoading();
            wx.showModal({
              title: '提交成功',
              content: '感谢您的宝贵意见和优化建议！',
              success: function () {
                wx.switchTab({
                  url: '../index/index'
                })
              }
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请输入内容',
        image: '../../img/error.png',
        success: function () {
          _this.setData({
            textareaFlag: true
          })
        }
      })
    }
  }
})