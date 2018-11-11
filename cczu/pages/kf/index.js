// pages/k f/index.js

var appInstance = getApp();
var url_mystation = appInstance.globalData.url_mystation;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textDataList: [],
    currentPage: 1,
    scrollHeight: 0,
    scrollTop: 0,
    images: {},
    avatarUrl: '',
    nickName: '',
    wxOthrtInfo: '',
    privateCode: '',
    hiddenmodalput: true,
    searchmodalput: true,
    searchArea: true,
    reportModal: true,
    zoneName: '',
    requsetPageBody: {
      sidx: '',
      page: 1,
      limit: 10,
      privateStatus: 0,
      zoneID: 0,
      search: '',
    },
    zoneID: 0,
    tmpSearch: '',
    // items: [
    //   { name: '举报', value: '1' },
    //   { name: '删除', value: '2', checked: 'true' }
    // ],
    // is_modal_Hidden: false,
    // is_modal_Msg: '我是一个自定义组件'
    report: {
      titleID: 0,
      title: '删除word',
      confirmText: '确认删除',
      placeholder: '请输入删除码',
      inputType: 'digit',
      type: 1,//1删除2举报
      inputContent: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.code);
      console.log(options.type);
      var _this = this;
      var type = options.type;
      var privateCode = options.code;
      if (options.type == "public") {
        _this.refreshData(1);
      } else {
        _this.setData({
          privateCode: privateCode
        })
        wx.request({
          url: url_mystation + '/admin/poem/api/checkZoneExistByZoneCode/' + privateCode,
          success: function(res) {
            console.log(res)
            if(res.data.data == null) {
                _this.setData({
                  hiddenmodalput: false
                })
            } else {
              wx.setNavigationBarTitle({
                title: res.data.data.zonename,
              })
              var tmp = _this.data.requsetPageBody;
              tmp.privateStatus = 1
              tmp.zoneID = res.data.data.id;
              _this.setData({
                requsetPageBody: tmp,
                zoneID : res.data.data.id
              })
              _this.requestData();
            }
          }
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
  // onPullDownRefresh: function () {

  // },

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
  /**
   * 下拉加载更多
   */
  loadMoreData: function() {
    var _this = this;
    var requsetPageBody = _this.data.requsetPageBody;
    requsetPageBody.page = _this.data.requsetPageBody.page + 1
    _this.setData({
      requsetPageBody: requsetPageBody
    })
    console.log(_this.data.currentPage)
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: url_mystation + '/admin/poem/api/getTitleList',
      method: 'POST',
      data: _this.data.requsetPageBody,
      success: function (res) {
        if (res.data.data.length == 0) {
          wx.hideLoading();
          wx.showToast({
            title: '已经到底了',
            image: '../../img/end.png',
            duration: 2000
          })
        } else {
          var list = _this.data.textDataList;
          for (var i = 0; i < res.data.data.length; i++) {
            list.push(res.data.data[i])
          }
          _this.setData({
            textDataList: list
          })
          wx.hideLoading();
          wx.showToast({
            title: '刷新' + res.data.data.length + '条数据。',
          })
        }
      }
    })
    console.log(_this.data.textDataList.length)
  },
  /**
   * 顶部刷新数据
   */
  refreshData: function(type) {
    wx.showNavigationBarLoading()
    var tmp = this.data.requsetPageBody;
    tmp.page = 1;
    var list = [];
    this.setData({
      requsetPageBody: tmp,
      textDataList: list
    });
    this.requestData();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
    if (type !== 1) {
      wx.showToast({
        title: '已刷新',
      })
    }
  },
  /**
   * 图片点击放大查看
   */
  biggerImg: function (e) {
    console.log(e);
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
    })
  },
  /**
   * 举报
   */
  // report: function(e) {
  //   console.log(e.currentTarget.dataset.id)
  // },
  /**
   * 新增
   */
  toAdd: function() {
    wx.navigateTo({
      url: '/pages/addNew/index?zoneID=' + this.data.zoneID,
    })
  },
  /**
   * 获取用户微信信息
   */
  getUserInfo: function(e) {
    var _this = this;
    var errMsg = e.detail.errMsg;
    console.log(errMsg)
    if (errMsg == 'getUserInfo:fail auth deny') {
      wx.navigateBack({ 
      })
    } else{
      _this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        wxOthrtInfo: e.detail.rawData
      })
    }
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    wx.login({
      success(res) {
        console.log(res);
        if (res.code) {
          //发起网络请求
          // wx.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  setZoneName: function(e) {
    this.setData({
      zoneName: e.detail.value
    })
  },
  //取消按钮
  cancel: function () {
    wx.navigateBack({
    })
  },
  //确认
  confirm: function () {
    var _this = this;
    wx.request({
      url: url_mystation +'/admin/poem/api/insertZoneDetail',
      method: 'POST',
      data: {
        "nickname": appInstance.globalData.userInfo.nickName,
        "avatarurl": appInstance.globalData.userInfo.avatarUrl,
        "zonename": _this.data.zoneName,
        "wxotherinfo": JSON.stringify(appInstance.globalData.userInfo),
        "zonecode": _this.data.privateCode
      },
      success: function(res) {
        wx.request({
          url: url_mystation + '/admin/poem/api/checkZoneExistByZoneCode/' + _this.data.privateCode,
          success: function(res) {
            wx.setNavigationBarTitle({
              title: res.data.data.zonename,
            })
            _this.setData({
              zoneID: res.data.data.id
            })
          }
        });
        _this.setData({
          hiddenmodalput: true
        })
      }
    })
  },
  requestData: function(e) {
    var _this = this;
    wx.request({
      url: url_mystation + '/admin/poem/api/getTitleList',
      method: 'POST',
      data: _this.data.requsetPageBody,
      success: function (res) {
        console.log(res)
        _this.setData({
          textDataList: res.data.data
        })
      }
    })
  },
  zanEvent: function (options) {
    var item_id = options.currentTarget.dataset.id;//此处找到列表的id
    //console.log(item_id);//列表id
    this.zan(item_id);
  },
  caiEvent: function (options) {
    var item_id = options.currentTarget.dataset.id;//此处找到列表的id
    //console.log(item_id);//列表id
    this.cai(item_id);
  },
  zan: function (item_id) {
    var that = this;
    var show;//传递到数据库点赞的状态      
    var cookie_mid = wx.getStorageSync('zanTitle') || [];//获取全部点赞的mid       
    var newmessage = [];

    for (var i = 0; i < that.data.textDataList.length; i++) {
      if (that.data.textDataList[i].id == item_id) {//遍历找到对应的id
        var num = that.data.textDataList[i].likecount;//当前赞数
        var isshow; //点赞的状态

        if (cookie_mid.includes(item_id)) {//说明已经点过赞,取消赞   
          for (var j = 0; j < cookie_mid.length; j++) {
            if (cookie_mid[j] == item_id) {
              cookie_mid.splice(j, 1);//删除取消赞的mid 
            }
          }
          --num;
          isshow = 0;//点赞的状态
          that.setData({
            [`textDataList[${i}].likecount`]: num, //es6模板语法（反撇号字符）
            // [`dataList[${i}].favor_img`]: "../../img/index/zan.png",
          })
          wx.setStorageSync('zanTitle', cookie_mid);
          wx.showToast({
            title: "取消怜惜!",
            icon: 'none'
          })
          //console.log("前端取消点赞"+isshow)

        } else {
          isshow = 1;//点赞的状态
          ++num;
          that.setData({
            [`textDataList[${i}].likecount`]: num,//es6模板语法（反撇号字符）
            // [`dataList[${i}].favor_img`]: "../../image/favor_press.png",
          })
          cookie_mid.unshift(item_id);//新增赞的mid
          wx.setStorageSync('zanTitle', cookie_mid);
          wx.showToast({
            title: "怜惜成功!",
            icon: 'none'
          })
          //console.log("前端点赞成功" + isshow)
        }
        //console.log(cookie_mid); 
        //点赞数据同步到数据库
        wx.request({
          url: url_mystation + '/admin/poem/api/updateLikeCountByTitleID',
          method: 'POST',
          // header: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
            ID: item_id,
            type: isshow,
          },
          success: function (res) {
            // console.log("show:" +show)
            console.log(res);
          }
        })
      }
    }
  },
  cai: function (item_id) {
    var that = this;
    var show;//传递到数据库点赞的状态      
    var cookie_mid = wx.getStorageSync('caiTitle') || [];//获取全部点赞的mid       
    var newmessage = [];

    for (var i = 0; i < that.data.textDataList.length; i++) {
      if (that.data.textDataList[i].id == item_id) {//遍历找到对应的id
        var num = that.data.textDataList[i].notlikecount;//当前赞数
        var isshow; //点赞的状态

        if (cookie_mid.includes(item_id)) {//说明已经点过赞,取消赞   
          for (var j = 0; j < cookie_mid.length; j++) {
            if (cookie_mid[j] == item_id) {
              cookie_mid.splice(j, 1);//删除取消赞的mid 
            }
          }
          --num;
          isshow = 0;//点赞的状态
          that.setData({
            [`textDataList[${i}].notlikecount`]: num, //es6模板语法（反撇号字符）
            // [`dataList[${i}].favor_img`]: "../../img/index/zan.png",
          })
          wx.setStorageSync('caiTitle', cookie_mid);
          wx.showToast({
            title: "取消哈哈攻击!",
            icon: 'none'
          })
          //console.log("前端取消点赞"+isshow)

        } else {
          isshow = 1;//点赞的状态
          ++num;
          that.setData({
            [`textDataList[${i}].notlikecount`]: num,//es6模板语法（反撇号字符）
            // [`dataList[${i}].favor_img`]: "../../image/favor_press.png",
          })
          cookie_mid.unshift(item_id);//新增赞的mid
          wx.setStorageSync('caiTitle', cookie_mid);
          wx.showToast({
            title: "哈哈攻击成功!",
            icon: 'none'
          })
          //console.log("前端点赞成功" + isshow)
        }
        //console.log(cookie_mid); 
        //点赞数据同步到数据库
        wx.request({
          url: url_mystation + '/admin/poem/api/updateNotLikeCountByTitleID',
          method: 'POST',
          // header: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
            ID: item_id,
            type: isshow,
          },
          success: function (res) {
            // console.log("show:" +show)
            console.log(res);
          }
        })
      }
    }
  },
  /**
   * search
   */
  search: function(e) {
    this.setData({
      searchmodalput: false
    })
  },
  /**
   * 设置搜索的内容
   */
  setSearchContent: function(e) {
    this.setData({
      tmpSearch: e.detail.value
    })
  },
  /**
   * 搜索
   */
  confirmSearch: function() {
    var _this = this;
    var tmp = _this.data.requsetPageBody;
    tmp.search = _this.data.tmpSearch;
    _this.setData({
      requsetPageBody: tmp,
      searchArea: false,
      searchmodalput: true
    });
    _this.requestData();
  },
  /**
   * 取消搜索
   */
  cancelSearch: function(e) {
    this.setData({
      searchmodalput: true
    })
  },
  comment: function(e) {
    wx.navigateTo({
      url: 'detail?id=' + e.currentTarget.dataset.id,
    })
  },
  resetSearchContent: function() {
    var _this = this;
    var tmp = _this.data.requsetPageBody;
    tmp.search = '';
    _this.setData({
      requsetPageBody: tmp,
      searchArea: true,
      tmpSearch: ''
    });
    _this.requestData();
  },
  /**
   * 举报或者删除
   */
  report: function(e) {
    console.log(e.currentTarget.dataset.id)
    var tmp = {};
    tmp = this.data.report;
    tmp.titleID = e.currentTarget.dataset.id;
    this.setData({
      reportModal: false,
      report: tmp
    })
  },
  switch2Change: function(e) {
    console.log(e)
    var titleID = this.data.report.titleID;
    var tmp = {};
    if (e.detail.value) {
      tmp = {
        titleID: titleID,
        title: '举报word',
        confirmText: '确认举报',
        placeholder: '请输入举报内容',
        inputType: 'text',
        type: 2,
        ipnutContent: ''
      };
    } else {
      tmp = {
        titleID: titleID,
        title: '删除word',
        confirmText: '确认删除',
        placeholder: '请输入删除码',
        inputType: 'digit',
        type: 1,
        ipnutContent: ''
      }
    }
    this.setData({
      report: tmp
    })
  },
  setReport: function(e) {
    var tmp = this.data.report;
    tmp.inputContent = e.detail.value;
    this.setData({
      report: tmp
    })
  },
  /**
   * 取消举报
   */
  cancelReport: function() {
    this.setData({
      reportModal: true
    })
  },
  confirmReport: function() {
    var _this = this ;
    wx.request({
      url: url_mystation + '/admin/poem/api/delOrReportTitle',
      method: 'POST',
      data: _this.data.report,
      success: function(res) {
        var icon = 'success';
        if(res.data.result == 1 ) {
          _this.refreshData(0);
        } else if (res.data.result == 2) {
         icon = 'none'
        }
        wx.showToast({
          title: res.data.message,
          icon: icon
        })
      },
      complete: function() {
        _this.setData({
          reportModal: true
        })
      }
    })
  }
})