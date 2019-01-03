const app = getApp()
import api from '../../../utils/util.js'
import api_N from '../../../utils/api.js'
import {
  $wuxNotification
} from '../../../utils/wuxui/dist/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    tabs: ["体育刷卡", "讲座刷卡", "期末成绩"],
    activeIndex: 0,
    JZlist: [],
  },
  tabClick: function(e) {
    this.setData({
      activeIndex: e.currentTarget.id
    })
  },
  stuNumInput: function(e) {
    this.setData({
      stuNum: e.detail.value
    })
  },
  stuNameInput: function(e) {
    this.setData({
      stuName: e.detail.value
    })
  },
  scoreStuNumInput: function(e) {
    this.setData({
      scoreStuNum: e.detail.value
    })
  },
  scorePasswordInput: function(e) {
    this.setData({
      scorePassword: e.detail.value
    })
  },
  // getLibList: function () {
  //   api.getLibList({
  //     success: (res) => {
  //       let info = res.data
  //       if (info.status == '1') {
  //         wx.showModal({
  //           content: '获取借阅排行榜失败',
  //           showCancel: false
  //         })
  //       } else {
  //         this.setData({ info })
  //       }
  //     }
  //   })
  // },
  searchTY: function() {
    wx.showModal({
      content: '官网无数据',
      showCancel: false
    })
  },
  searchJZ: function() {
    if (!this.data.stuName) {
      wx.showModal({
        content: '请输入学生姓名，例如：张三',
        showCancel: false
      })
    } else {
      api.getLectureTimes({
        query: {
          stuName: this.data.stuName
        },
        success: (res) => {
          console.log(res)
          let JZlist = res.data.data
          if (JZlist.length > 0) {
            this.setData({
              JZlist
            })
          } else {
            this.showNotification()
          }
        }
      })
    }
  },
  getScore: function() {
    if (!this.data.scoreStuNum || !this.data.scorePassword) {
      wx.showModal({
        content: '请补全内容',
        showCancel: false
      })
    } else {
      let data = {
        username: this.data.scoreStuNum,
        password: this.data.scorePassword
      }
      api_N.appGet('/cczu/getScore', data).then((res) => {
        console.log(res)
        this.setData({
          scoreList: res
        })
      }).catch((errMsg) => {
        console.log("errMsg" +errMsg)
        wx.showModal({
          title: '提示',
          content: errMsg,
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getLibList()
    // this.showNotification()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '期末查询',
      desc: '「常大课表+」期末一站式查询服务。',
      path: '/pages/core/lib/index'
    }
  },
  showNotification() {
    this.closeNotification = $wuxNotification().show({
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543335958288&di=983596a24f9db0d5c73ab7503b255195&imgtype=0&src=http%3A%2F%2Fwww.musicdu.com%2FUpload%2F2015New%2F12%2F12%2F6358551430270661665906301.png',
      title: '提示',
      text: '查询的用户暂无数据',
      data: {
        message: '逗你玩的!!!'
      },
      duration: 3000,
      // onClick(data) {
      //   console.log(data)
      // },
      // onClose(data) {
      //   console.log(data)
      // },
    })
  },
})