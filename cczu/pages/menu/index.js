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
      id: 'login',
      name: '课表',
      icon: 'kebiao'
    }, {
      id: 'classtime',
      name: '作息时间',
      icon: 'classtime'
    }, {
      id: 'xiaoli',
      name: '常大校历',
      icon: 'xiaoli'
      }, {
        id: 'lecture',
        name: '讲座刷卡',
        icon: 'lecture'
      }, {
        id: 'suggestion',
        name: '优化建议',
        icon: 'suggestion'
      },{
        id: "kf",
        name: "在线沟通",
        icon: "yh"
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
