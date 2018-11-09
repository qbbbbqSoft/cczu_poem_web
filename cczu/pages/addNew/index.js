var app = getApp();
var url_mystation = app.globalData.url_mystation;
var optionList = [
  {
    name: '选择城市',
    id: ''
  },
  {
    name: "北京市",
    id: '111'
  }

];
var type = [
  {
    name: '选择类型',
    id: ''
  },
  {
    name: "前四后八",
    id: '21'
  },
  {
    name: "托运车",
    id: '22'
  }
];
var size = [
  {
    name: '选择长度',
    id: ''
  },
  {
    name: "1222",
    id: '31'
  },
  {
    name: "1222",
    id: '32'
  }
];
var list = [
  {
    information: '心情',
    select: '此时此刻你的心情',
    bindBtn: 'addfeel',
    name: 'type',
    val: ''
  }
  // , {
  //   information: '目的地',
  //   select: '请选择地点',
  //   bindBtn: 'address',
  //   name: 'end',
  //   val: ''
  // }, {
  //   information: '车辆登记地点',
  //   select: '请选择地点',
  //   bindBtn: 'address',
  //   name: 'change',
  //   val: ''
  // }, {
  //   information: '货箱类型',
  //   select: '请选择货箱类型',
  //   bindBtn: 'carType',
  //   name: 'car_type',
  //   val: ''
  // }, {
  //   information: '货箱长度',
  //   select: '请选择货箱长度',
  //   bindBtn: 'carExtent',
  //   name: 'car_size',
  //   val: ''
  // }
];
Page({
  data: {
    textHint: "欢迎欢迎，热烈欢迎。",
    hiddenBoolean: true,
    inputHidden: true,
    className: ['header'],
    infoList: list,
    options: '',
    screenBtn: '',
    infoId: '',
    checkHtml: "",
    src: "",
    imageHidden: true,
    imageheight: 0,
    imagewidth: 0,
    openid: ''
  },
  addfeel: function(e) {
    this.setData({
      options: [
        {
          name: '选择心情',
          id: ''
        },
        {
          name: "伤心",
          id: 1,
          src: '../../img/index/1.png'
        },
        {
          name: "尴尬",
          id: 2,
          src: '../../img/index/2.png'
        },
        {
          name: "高兴",
          id: 3,
          src: '../../img/index/3.png'
        },
        {
          name: "波澜不惊",
          id: 4,
          src: '../../img/index/4.png'
        }
      ],
      hiddenBoolean: !this.data.hiddenBoolean,
      screenBtn: 'setVal'
    });
  },
  setVal: function(e) {
    console.log(e)
    this.data.infoList[0].val = e.currentTarget.dataset.val;
    this.data.infoList[0].select = e.currentTarget.dataset.name;

    var newInfo = this.data.infoList;
    this.setData({
      hiddenBoolean: true,
      infoList: newInfo
    })
  },
  address: function (e) {
    var addId = e.currentTarget.id;
    if (addId <= 2) {
      this.setData({
        infoId: addId,
        options: [
          {
            name: '选择心情',
            id: ''
          },
          {
            name: "伤心",
            id: 1
          },
          {
            name: "尴尬",
            id: 2
          },
          {
            name: "高兴",
            id: 3
          },
          {
            name: "波澜不惊",
            id: 4
          }
        ],
        hiddenBoolean: !this.data.hiddenBoolean,
        screenBtn: 'cityBtn'
      });

    }
  },
  carType: function (e) {
    var addId = e.currentTarget.id;
    if (addId == 3) {
      this.setData({
        infoId: addId,
        options: type,
        hiddenBoolean: !this.data.hiddenBoolean,
        screenBtn: 'carBtn'
      });
    }
  },
  carExtent: function (e) {
    if (e.currentTarget.id == 4) {
      this.setData({
        infoId: e.currentTarget.id,
        options: size,
        hiddenBoolean: !this.data.hiddenBoolean,
        screenBtn: 'carBtn'
      });
    }
  },
  hiddenBtn: function (e) {
    this.setData({
      hiddenBoolean: !this.data.hiddenBoolean
    })
  },
  cityBtn: function (e) {
    var dataId = e.currentTarget.id;
    console.log(1212121)
    if (dataId != '') {
      this.setData({
        options: optionList,
        screenBtn: 'overBtn'
      })
    }
  },
  overBtn: function (e) {
    var zone,
      dataId = e.currentTarget.id,
      num = this.data.infoId;
    for (var i = 0; i < optionList.length; i++) {
      if (optionList[i].id == dataId) {
        zone = optionList[i].name;
      }
    }
    if (dataId != '') {
      this.data.infoList[this.data.infoId].val = dataId;
      this.data.infoList[this.data.infoId].select = zone;

      var newInfo = this.data.infoList;
      this.setData({
        hiddenBoolean: !this.data.hiddenBoolean,
        screenBtn: '',
        infoList: newInfo
      });

      console.log(newInfo);
    }
  },
  carBtn: function (e) {
    var me, zone;
    var dataId = e.currentTarget.id,
      arr = this.data.infoList[this.data.infoId];
    if (this.data.infoId == 3) {
      me = type;
    } else {
      me = size;
    }
    for (var i = 0; i < me.length; i++) {
      if (me[i].id == dataId) {
        zone = me[i].name;
      }
    }
    this.data.infoList[this.data.infoId].val = dataId;
    this.data.infoList[this.data.infoId].select = zone;

    var newInfo = this.data.infoList;
    this.setData({
      hiddenBoolean: !this.data.hiddenBoolean,
      screenBtn: '',
      infoList: newInfo
    })
  },
  formReset: function () {
    this.setData({
      infoList: list
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var entity = {
      "adminstatus": 0,
      "author": "string",
      "avatarurl": "string",
      "content": "string",
      "delstatus": 0,
      "id": 0,
      "imageheight": 0,
      "imageurl": "string",
      "imagewidth": 0,
      "label": "string",
      "likecount": 0,
      "notlikecount": 0,
      "original": 0,
      "privatestatus": 0,
      "title": "string",
      "type": 0,
      "wxotherinfo": "string",
      "zoneid": 0
    };
    var keyword = {
      "keyword1":
        {
          "value": e.detail.value.title,
          "color": "#111"
        },
      "keyword2": {
        "value": "2018-12-12 00:00:00"
      }
    }
    wx.request({
      // url: 'http://localhost:8080/admin/poem/api/insertTitleDeatil',
      // url: url_mystation +"/admin/poem/api/postsmt",
      url: "http://localhost:8080/admin/poem/api/postsmt",
      method: 'POST',
      // header: {
      //   'content-type': 'application/x-www-form-urlcoded' // 默认值
      // },
      data: {
        "author": app.globalData.userInfo.nickName,
        "avatarurl": app.globalData.userInfo.avatarUrl,
        "content": e.detail.value.content,
        "delcode": e.detail.value.delcode,
        "imageheight": this.data.imageheight,
        "imageurl": this.data.src,
        "imagewidth": this.data.imagewidth,
        "privatestatus": 0,
        "title": e.detail.value.title,
        "type": e.detail.value.type,
        "openID": this.data.openid,
        "formID": e.detail.formId,
        "data": JSON.stringify(keyword)
      }
    })
  },
  upLoadImage: function() {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res.tempFilePaths)
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: url_mystation +'/cczu/headImgUpload', //仅为示例，非真实的接口地址
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
              src: res.data.data,
              imageheight: res.data.height,
              imagewidth: res.data.width,
              imageHidden: false
            })
            wx.showToast({
              title: '图片上传成功！',
              icon: 'success',
              duration: 1000
            })
            wx.hideLoading();
          }
        })
      }
    })
  },
  onLoad: function (options) {
    // console.log(app.globalData.userInfo)
    var _this = this;
    wx.login({
      success: function (res) {
        console.log(res)
        // 获取登录的临时凭证
        var code = res.code;
        // 调用后端，获取微信的session_key, secret
        wx.request({
          url: url_mystation + "/admin/poem/api/wxLogin?code=" + code,
          method: "POST",
          success: function (result) {
            console.log(result);
            _this.setData({
              openid: result.data.data.openid
            })
            // 保存用户信息到本地缓存，可以用作小程序端的拦截器
            // app.setGlobalUserInfo(e.detail.userInfo);
            // wx.redirectTo({
            //   url: '../index/index',
            // })
          }
        })


      }
    })
  }
})