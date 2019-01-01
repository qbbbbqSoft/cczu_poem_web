Page({
  data: {
    buttons: [{
      type: 'balanced',
      block: true,
      text: '回到首页',
    },
    {
      type: 'balanced',
      block: true,
      text: '随便看看',
    },
    ],
  },
  onLoad: function(options) {
    setTimeout(function () {
      wx.setNavigationBarTitle({
        title: '签到成功',
      })
    }, 1000)
    let info = options.info;
    this.setData({
      info
    })
  },
  onClick(e) {
    console.log(e)
    const { index } = e.detail

    index === 0 && wx.redirectTo({
      url: '/pages/index/index',
    })

    index === 1 && wx.redirectTo({
      url: '/pages/poem/index',
    })
  },
})