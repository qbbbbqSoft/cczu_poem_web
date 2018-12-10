Page({
  data: {
    title: ["扫码签到","我发起的签到","我参与的签到"],
    act: 0
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
  }
})