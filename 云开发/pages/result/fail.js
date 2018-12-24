Page({
  data: {
    icon: {
      type: 'warn',
      color: 'red'
    },
    buttons: [{
      type: 'assertive',
      block: true,
      text: '回到首页',
    },
    {
      type: 'light',
      block: true,
      text: '返回',
    },
    ],
  },
  onLoad: function (options) {
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

    index === 1 && wx.navigateBack()
  },
})