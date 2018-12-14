import { $wuxSelect } from '../../utils/wuxui/dist/index';
Page({
  data: {
    title: ["扫码签到","我发起的签到","我参与的签到"],
    act: 0,
    title2: '',
    value2: ''
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
  scanQrCode: function() {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
      }
    })
  },
  onLoad: function(query) {
    // var scene = decodeURIComponent('sdasd')
    // console.log(scene)
    let titleTop = this.data.title[this.data.act];
    this.setData({
      titleTop
    })
  },
  clickTab: function(e ){
    console.log(e.currentTarget.dataset.type)
    let act = e.currentTarget.dataset.type;
    let titleTop = this.data.title[act];
    this.setData({
      titleTop,
      act
    })
    this.closeModal()
  },
  onClick2() {
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
        }
      },
    })
  },
})