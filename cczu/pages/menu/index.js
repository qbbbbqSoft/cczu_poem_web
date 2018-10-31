//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    imgUrls: [
      'http://file.bbqbb.top/cczu_file/classtime.png',
      'http://file.bbqbb.top/cczu_file/xiaoli_2018_01.png',
      'http://file.bbqbb.top/cczu_file/xiaoli_2018_01.png'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    logs: [],
    charts: [{
      icon: '../../img/kebiao.png',
      name: '课表',
      url: 'login'
    }, {
      url: 'classtime',
      name: '作息时间',
      icon: '../../img/classtime.png'
    }, {
      url: 'xiaoli',
      name: '常大校历',
      icon: '../../img/xiaoli.png'
      }, {
        url: 'lecture',
        name: '讲座刷卡',
        icon: '../../img/lecture.png'
      }, {
        url: 'suggestion',
        name: '优化建议',
        icon: '../../img/suggestion.png'
      },{
        url: "weixinqun",
        name: "微信群",
        icon: "../../img/weixin.png"
      }]
  },
  onLoad: function () {
  },
  open: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../' + e.target.dataset.chart.id + '/index'
      // url: '/pages/transfer/index?type=5555'
    });
  }
})
