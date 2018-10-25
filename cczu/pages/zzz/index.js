var appInstance = getApp();
var url = appInstance.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: [],
    tbodyHeight: 500, //tbody滚动高度
    flag:true,
    week: 'yi',
    num: 1,
    value: "wuli",
    userName: "",
    password:"",
    step1: true,
    step2: true,
    step3: true,
    gifUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    _this.setData({
      step1: false,
      step2: true,
      step3: true
    })
    var time1 = setTimeout(function () {
      _this.setData({
        step1: true,
        step2: false,
        step3: true
      })
    }, 5000)
    var time2 = setTimeout(function () {
      _this.setData({
        step1: true,
        step2: true,
        step3: false
      })
    }, 10000)
    
    
    wx.request({
      url: url + 'cczu/coursebyhtmlunit',
      data: {
        userName: options.userName,
        password: options.password
      },
      success: function(e) {
        clearTimeout(time1);
        clearTimeout(time2);
        wx.showModal({
          title: '课表创建成功',
          content: '部分文字可能被遮挡，点击可查看课程的详细内容，再次点击消失',
          showCancel:false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        _this.setData({
          course: e.data,
          step1: true,
          step2: true,
          step3: true
        })
        wx.hideLoading()
      }
    })
    wx.getSystemInfo({
      success: function (res) {

        //var height = res.windowHeight * 750 / res.windowWidth - 80;
        var height = res.windowHeight - 80 / 750 * res.windowWidth;
        //console.log(height);

        _this.setData({
          tbodyHeight: height.toFixed(0)
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
  allValue: function(e) {
    console.log(e);
    var _this = this;
    var num = _this.numToStr(e.target.dataset.item.order);
    this.setData({ 
      flag: false,
      week: _this.noo(e.target.dataset.index),
      num: num,
      value: e.target.dataset.item.value,
      gifUrl:'https://www.bbqbb.top/file/' + this.createNonceStr() + '.gif'
       })
  },
  hide: function () {
    this.setData({ flag: true })
  },
  numToStr: function(oldValue) {
    console.log("oldValue" + oldValue)
    switch(oldValue) {
      case 1:
        return "星期一";
      case 2:
        return "星期二";
      case 3:
        return "星期三";
      case 4:
        return "星期四";
      case 5:
        return "星期五";
      case 6:
        return "星期六";
      case 7:
        return "星期天";
    }
  },
  noo: function(e) {
    switch (e) {
      case 0:
        return "上午第一节课"
      case 1:
        return "上午第二节课";
      case 2:
        return "上午第三节课";
      case 3:
        return "上午第四节课";
      case 4:
        return "上午第五节课";
      case 5:
        return "下午第一节课";
      case 6:
        return "下午第二节课";
      case 7:
        return "下午第三节课";
      case 8:
        return "下午第四节课";
      case 9:
        return "晚上第一节课";
      case 10:
        return "晚上第二节课";
      case 11:
        return "晚上第三节课";
    }
  },
  createNonceStr: function () {
    var min = 1;
    var max = 4;
    var random = Math.floor(Math.random() * (max - min) + min);
    return random;
  }
})