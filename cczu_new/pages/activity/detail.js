import { $wuxSelect } from '../../utils/wuxui/dist/index';
import { $wuxDialog } from '../../utils/wuxui/dist/index';
var api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act: {},
    count: 0,
    signUps: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let idStr = options.id;
    let idL = parseFloat(idStr)
    console.log(typeof(idStr))
      let id = {
        ID: idL
      };
      if (id) {
        api.appGet("/cczu/getOneActivityDetailByID?ID=" + idStr.replace('"','').replace('"','')).then((res) => {
          console.log(res)
          this.setData({
            act: res.act,
            count: res.count,
            signUps: res.signUp
          })
        }).catch((errMsg) => {
          console.log(errMsg); //错误提示信息
        });
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
  eMailInput: function(e ) {
    let eMail = e.detail.value;
    this.setData({
      eMail
    })
  },
  onClick3() {
    let _this = this;
    if (_this.data.eMail) {
      $wuxSelect('#wux-select3').open({
        // value: this.data.value3,
        multiple: true,
        toolbar: {
          title: '请选择一个或多个',
          confirmText: '发送',
        },
        options: [{
          title: '活动详情',
          value: '1',
        },
        {
          title: '签到详情',
          value: '2',
        }
        ],
        // onChange: (value, index, options) => {
        //   console.log('onChange', value, index, options)
        //   this.setData({
        //     value3: value,
        //     title3: index.map((n) => options[n].title),
        //   })
        // },
        onConfirm: (value, index, options) => {
          // console.log('onConfirm', value, index, options)
          console.log(index);
          // this.setData({
          //   value3: value,
          //   title3: index.map((n) => options[n].title),
          // })
          let data = {
            ID: _this.data.act.id,
            types: index,
            receiveEmail: _this.data.eMail
          }
          api.appGet("/cczu/sendMail",data).then((res) => {
            console.log(res)
            // this.setData({
            //   act: res.act,
            //   count: res.count,
            //   signUps: res.signUp
            // })
          }).catch((errMsg) => {
            console.log(errMsg); //错误提示信息
          });
        },
      })
    } else {
      this.alert("请输入邮箱")
    }
  },
  alert(content) {
    let _this = this;
    $wuxDialog().alert({
      resetOnClose: true,
      title: '提示',
      content: content,
      onConfirm(e) {
        let focusFlag = true;
        _this.setData({
          focusFlag
        })
      },
    })
  },
})