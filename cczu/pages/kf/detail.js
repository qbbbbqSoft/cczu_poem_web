const util = require("../../utils/util.js");
var appInstance = getApp();
var url_mystation = appInstance.globalData.url_mystation;

var data_id = 0;//帖子的ID
var page = 1;
var lastcid = 0;//最后一条评论的ID

Page({
  data:{
    item:{},
    hotcomemnt_hidden:false,
    commentModal: true,
    dataList: [],
    textDataList: {},
    scrollHeight: 0,
    scrollTop: -10,
    requsetBody: {
      sidx: '',
      page: 1,
      limit: 10,
      titleID: 0
    },
    showDataList: false,
    avatarUrl: '',
    nickName: '',
    wxOthrtInfo: '',
    comment: ''
  },
  onLoad:function(options){
    data_id = options.id;
    //页面初始化 options为页面跳转所带来的参数
    // this.refreshNewData();
    var _this = this;
    var tmp = _this.data.requsetBody;
    tmp.titleID = data_id;
    wx.request({
      url: url_mystation + '/admin/poem/api/getTitleByTitleID/' + data_id,
      success: function(res) {
        console.log(res.data.titleDetail)
        var list = [];
        list.push(res.data.titleDetail)
        _this.setData({
          textDataList: list
        })
      }
    });
    _this.getData(tmp);

  },
  getData: function (tmp) {
    var _this = this;
    wx.request({
      url: url_mystation + '/admin/poem/api/getCommentDetailByTitleID',
      method: 'POST',
      data: tmp,
      success: function (res) {
        console.log(res.data.commentDetailList.length)
        if (res.data.commentDetailList.length == 0) {
          _this.setData({
            showDataList: true
          })
        } else {
          _this.setData({
            showDataList: false,
            dataList: res.data.commentDetailList
          })
        }
      }
    })
  },
  //刷新数据
  refreshNewData:function(){
    //加载提示框
    util.showLoading();
    var that = this;
    var parameters = 'a=dataList&c=comment&data_id='+data_id+"&hot=1";
    console.log("parameters = "+parameters);
    util.request(parameters,function(res){
      page = 1;
      console.log("最热");
      
      var newObj = res.data.hot[0];
      console.log(newObj);
      that.setData({
        hotcomemnt_hidden: newObj ? false : true,
        item:newObj ? newObj : {},
        dataList: res.data.data
      })
      if (res.data.data.length > 0) {
        lastcid = res.data.data[res.data.data.length-1].id;
      }
      
      setTimeout(function(){
          util.hideToast();
          wx.stopPullDownRefresh();
        },1000);
      });
  },
  refreshData:function(){
    console.log("刷新数据");
  },
  //加载更多操作
  onReachBottom:function(){
    console.log("加载更多");
    //加载提示框
    util.showLoading();

    var that = this;
    var parameters = 'a=dataList&c=comment&data_id='+data_id + "&page="+(page+1) + "&lastcid="+lastcid;
    console.log("parameters = "+parameters);
    util.request(parameters,function(res){
      
      if (res.data.data) {
          page += 1;
          that.setData({
            dataList: that.data.dataList.concat(res.data.data)
          });
          lastcid = res.data.data[res.data.data.length-1].id;
          setTimeout(function(){
            util.hideToast();
            wx.stopPullDownRefresh();
          },1000);
      } else {
          util.showSuccess("没有新数据了",300);
      }
      });
      
    },
  zan: function (item_id) {
    var that = this;
    var show;//传递到数据库点赞的状态      
    var cookie_mid = wx.getStorageSync('zanComment') || [];//获取全部点赞的mid       
    var newmessage = [];

    for (var i = 0; i < that.data.dataList.length; i++) {
      if (that.data.dataList[i].id == item_id) {//遍历找到对应的id
        var num = that.data.dataList[i].greatcount;//当前赞数
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
            [`dataList[${i}].greatcount`]: num, //es6模板语法（反撇号字符）
            // [`dataList[${i}].favor_img`]: "../../img/index/zan.png",
          })
          wx.setStorageSync('zanComment', cookie_mid);
          wx.showToast({
            title: "取消点赞!",
            icon: 'none'
          })
          //console.log("前端取消点赞"+isshow)

        } else {
          isshow = 1;//点赞的状态
          ++num;
          that.setData({
            [`dataList[${i}].greatcount`]: num,//es6模板语法（反撇号字符）
            // [`dataList[${i}].favor_img`]: "../../image/favor_press.png",
          })
          cookie_mid.unshift(item_id);//新增赞的mid
          wx.setStorageSync('zanComment', cookie_mid);
          wx.showToast({
            title: "点赞成功!",
            icon: 'none'
          })
          //console.log("前端点赞成功" + isshow)
        }
        //console.log(cookie_mid); 
        //点赞数据同步到数据库
        wx.request({
          url: url_mystation + '/admin/poem/api/updateGreatCountByCommentID',
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
   * 点赞
   */
  favorclick: function (options) {
    var item_id = options.currentTarget.dataset.id;//此处找到列表的id
    //console.log(item_id);//列表id
    this.zan(item_id);
  },
  getUserInfo: function (e) {
    var _this = this;
    var errMsg = e.detail.errMsg;
    console.log(errMsg)
    if (errMsg == 'getUserInfo:fail auth deny') {
      
    } else {
      _this.setData({
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
        wxOthrtInfo: e.detail.rawData,
        commentModal: false
      })
    }
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)
    // wx.login({
    //   success(res) {
    //     console.log(res);
    //     if (res.code) {
    //       发起网络请求
    //       wx.request({
    //         url: 'https://test.com/onLogin',
    //         data: {
    //           code: res.code
    //         }
    //       })
    //     } else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  },
  setComment: function(e) {
    this.setData({
      comment: e.detail.value
    })
  },
  cancelComment: function() {
    this.setData({
      comment: '',
      commentModal: true
    })
  },
  confirmComment: function() {
    var _this = this;
    var requsetData = {
      titleid: this.data.requsetBody.titleID,
      comment: this.data.comment,
      nickname: this.data.nickName,
      avatarurl: this.data.avatarUrl,
      wxotherinfo: this.data.wxOthrtInfo,
      greatcount: 0
    };
    wx.request({
      url: url_mystation + '/admin/poem/api/insertSysComment',
      method: 'POST',
      data: requsetData,
      success: function(res) {
        console.log(res)
        if (res.data.result == 1) {
          _this.getData(_this.data.requsetBody);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 3000
          })
        }
      },
      complete: function() {
        _this.setData(
          {
            commentModal: true,
            comment: ''
          }
        )
      }
    })
  }
})