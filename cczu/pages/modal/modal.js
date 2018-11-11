Component({
  properties: {
    modalHidden: {
      type: Boolean,
      value: true
    }, //这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden
    modalMsg: {
      type: Array,
      value: ' ',
    }
  },
  data: {
    // 这里是一些组件内部数据
    text: "text",
    items: [
      { name: '举报', value: '1' },
      { name: '删除', value: '2', checked: 'true' }
    ]
  },
  methods: {
    // 这里放置自定义方法
    modal_click_Hidden: function () {
      this.setData({
        modalHidden: true,
      })
    },
    // 确定
    Sure: function () {
      console.log(this.data.text)
    }
  }
})
