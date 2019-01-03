import { $wuxSelect } from '../../utils/wuxui/dist/index';
var api = require('../../utils/api.js')
const app = getApp()
Page({
  data: {
    title: ["扫码签到", "我发起的签到", "我参与的签到"],
    act: 0,
    userinfo: app.globalData.userInfo,
    title2: '',
    value2: '',
    myAct: [],
    myTakePartInAct: [],
    msg1: {
      title: '空空如也',
      text: '暂时没有相关数据',
    },
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
  },
  showModal: function (e) {
    var showName = e.currentTarget.dataset.modal;
    this.setData({
      modalName: showName
    })
  },
  closeModal: function (e) {
    this.setData({
      modalName: null
    })
  },
  scanQrCode: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        let path = res.path.replace('pages', '/pages');
        wx.navigateTo({
          url: path
        })
      }
    })
  },
  onLoad: function (query) {
    // var scene = decodeURIComponent('sdasd')
    console.log(this.data.userinfo)
    let titleTop = this.data.title[this.data.act];
    this.setData({
      titleTop
    })
  },
  clickTab: function (e) {
    console.log(e.currentTarget.dataset.type)
    let act = e.currentTarget.dataset.type;
    let titleTop = this.data.title[act];
    this.setData({
      titleTop,
      act
    })
    this.closeModal();
    let data = {
      openid: wx.getStorageSync('openid'),
    };
    if (act == 1) {
      api.appGet("/cczu/getSysActivityListByOpenid", data).then((res) => {
        console.log(res)
        this.setData({
          myAct: res
        })
      }).catch((errMsg) => {
        console.log(errMsg); //错误提示信息
      });
    } else if (act == 2) {
      api.appGet("/admin/poem/api//queryTakePartInActivityByOpenid", data).then((res) => {
        console.log(res)
        this.setData({
          myTakePartInAct: res
        })
      }).catch((errMsg) => {
        onsole.log(errMsg); //错误提示信息
      })
    }
  },
  onClick2(e) {
    console.log(e)
    $wuxSelect('#wux-select2').open({
      value: this.data.value2,
      options: [{
        title: '开始签到',
        value: 1,
      },
      {
        title: '结束签到',
        value: 2,
      },
      {
        title: '开始签退',
        value: 3,
      },
      {
        title: '结束签退（可修改状态）',
        value: 4,
      },
      {
        title: '结束活动（一旦结束，将无法再设置活动状态）',
        value: 5,
      },
      ],
      onConfirm: (value, index, options) => {
        console.log('onConfirm', value, index, options)
        if (index !== -1) {
          this.setData({
            value2: value,
            title2: options[index].title,
          })
          let data = {
            ID: e.target.dataset.id,
            status: value
          }
          api.appGet('/cczu/setActivityStatusByID', data).then((res) => {
            wx.showToast({
              title: '设置成功！',
            })
            let data = {
              openid: wx.getStorageSync('openid'),
            };
            api.appGet("/cczu/getSysActivityListByOpenid", data).then((res) => {
              console.log(res)
              this.setData({
                myAct: res
              })
            })
          }).catch((errMsg) => {
            wx.showToast({
              title: '设置失败',
            })
          })
        }
      },
    })
  },
})