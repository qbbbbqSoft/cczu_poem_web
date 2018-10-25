var appInstance = getApp();
var url = appInstance.globalData.url;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '加载中...', // 状态
    list: [], // 数据列表
    type: '', // 数据类型
    loading: true, // 显示等待框
    textList: [
      '数据来源常大教务系统，每一小时刷新数据',
      '大学毕业对刷卡讲座的次数有要求，大三大四可能没时间去刷，建议大一大二刷完',
      '讲座报名请移步常大教务处',
      '谢谢，希望多多宣传此小程序，觉得有用就分享哟~~~',
      '爱你，爱你。。。。'
    ],
    indicatorDots: false,
    autoplay: true,
    vertical: true,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { // options 为 board页传来的参数
    const _this = this;
    // 拼接请求url
    const url = 'https://www.chenyaoyao.club/' + '/cczu/getLectureInfo';

    wx.showLoading({
      title: '正在下载数据',
      mask: true,
      success: function() {
        wx.request({
          url: url,
          data: {},
          header: {
            'content-type': 'json' // 默认值
          },
          success: function (res) {
            console.log(res.data);
            // 赋值
            _this.setData({
              list: res.data.content
            })
            wx.hideLoading();
          }
        })
      }
    })
    // 请求数据
    
  },
  showAllInfo: function(e) {
    console.log(e)
  },
  onShareAppMessage: function () {
    return {
      title: '常大讲座时间表',
      path: '/pages/lecture/index',
    }
  }
})