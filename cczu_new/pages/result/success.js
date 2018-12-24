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
    let info = options.info;
    this.setData({
      info
    })
  },
  onClick(e) {
    console.log(e)
    const { index } = e.detail

    index === 0 && wx.redirectTo({
      url: '/pages/suggestion/index',
    })

    index === 1 && wx.redirectTo({
      url: '',
    })()
  },
})