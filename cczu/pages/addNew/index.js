var optionList = [
  {
    name: '选择城市',
    id: ''
  },
  {
    name: "北京市",
    id: '111'
  }

];
var type = [
  {
    name: '选择类型',
    id: ''
  },
  {
    name: "前四后八",
    id: '21'
  },
  {
    name: "托运车",
    id: '22'
  }
];
var size = [
  {
    name: '选择长度',
    id: ''
  },
  {
    name: "1222",
    id: '31'
  },
  {
    name: "1222",
    id: '32'
  }
];
var list = [
  {
    information: '心情',
    select: '此时此刻你的心情',
    bindBtn: 'addfeel',
    name: 'start',
    val: ''
  }, {
    information: '目的地',
    select: '请选择地点',
    bindBtn: 'address',
    name: 'end',
    val: ''
  }, {
    information: '车辆登记地点',
    select: '请选择地点',
    bindBtn: 'address',
    name: 'change',
    val: ''
  }, {
    information: '货箱类型',
    select: '请选择货箱类型',
    bindBtn: 'carType',
    name: 'car_type',
    val: ''
  }, {
    information: '货箱长度',
    select: '请选择货箱长度',
    bindBtn: 'carExtent',
    name: 'car_size',
    val: ''
  }
];
Page({
  data: {
    textHint: "欢迎卡友添加您的车辆相关信息，以便于我们帮您更精准的配货和让货主更加了解您。",
    hiddenBoolean: true,
    inputHidden: true,
    className: ['header'],
    infoList: list,
    options: '',
    screenBtn: '',
    infoId: '',
    checkHtml: ""
  },
  addfeel: function(e) {
    this.setData({
      options: [
        {
          name: '选择心情',
          id: ''
        },
        {
          name: "伤心",
          id: 1,
          src: '../../img/index/1.png'
        },
        {
          name: "高兴",
          id: 2,
          src: '../../img/index/3.png'
        },
        {
          name: "尴尬",
          id: 3,
          src: '../../img/index/2.png'
        },
        {
          name: "波澜不惊",
          id: 4,
          src: '../../img/index/4.png'
        }
      ],
      hiddenBoolean: !this.data.hiddenBoolean,
      screenBtn: 'setVal'
    });
  },
  setVal: function(e) {
    console.log(e)
    this.data.infoList[0].val = e.currentTarget.dataset.val;
    this.data.infoList[0].select = e.currentTarget.dataset.name;

    var newInfo = this.data.infoList;
    this.setData({
      hiddenBoolean: true,
      infoList: newInfo
    })
  },
  address: function (e) {
    var addId = e.currentTarget.id;
    if (addId <= 2) {
      this.setData({
        infoId: addId,
        options: [
          {
            name: '选择心情',
            id: ''
          },
          {
            name: "伤心",
            id: 1
          },
          {
            name: "高兴",
            id: 2
          },
          {
            name: "尴尬",
            id: 3
          },
          {
            name: "波澜不惊",
            id: 4
          }
        ],
        hiddenBoolean: !this.data.hiddenBoolean,
        screenBtn: 'cityBtn'
      });

    }
  },
  carType: function (e) {
    var addId = e.currentTarget.id;
    if (addId == 3) {
      this.setData({
        infoId: addId,
        options: type,
        hiddenBoolean: !this.data.hiddenBoolean,
        screenBtn: 'carBtn'
      });
    }
  },
  carExtent: function (e) {
    if (e.currentTarget.id == 4) {
      this.setData({
        infoId: e.currentTarget.id,
        options: size,
        hiddenBoolean: !this.data.hiddenBoolean,
        screenBtn: 'carBtn'
      });
    }
  },
  hiddenBtn: function (e) {
    this.setData({
      hiddenBoolean: !this.data.hiddenBoolean
    })
  },
  cityBtn: function (e) {
    var dataId = e.currentTarget.id;
    console.log(1212121)
    if (dataId != '') {
      this.setData({
        options: optionList,
        screenBtn: 'overBtn'
      })
    }
  },
  overBtn: function (e) {
    var zone,
      dataId = e.currentTarget.id,
      num = this.data.infoId;
    for (var i = 0; i < optionList.length; i++) {
      if (optionList[i].id == dataId) {
        zone = optionList[i].name;
      }
    }
    if (dataId != '') {
      this.data.infoList[this.data.infoId].val = dataId;
      this.data.infoList[this.data.infoId].select = zone;

      var newInfo = this.data.infoList;
      this.setData({
        hiddenBoolean: !this.data.hiddenBoolean,
        screenBtn: '',
        infoList: newInfo
      });

      console.log(newInfo);
    }
  },
  carBtn: function (e) {
    var me, zone;
    var dataId = e.currentTarget.id,
      arr = this.data.infoList[this.data.infoId];
    if (this.data.infoId == 3) {
      me = type;
    } else {
      me = size;
    }
    for (var i = 0; i < me.length; i++) {
      if (me[i].id == dataId) {
        zone = me[i].name;
      }
    }
    this.data.infoList[this.data.infoId].val = dataId;
    this.data.infoList[this.data.infoId].select = zone;

    var newInfo = this.data.infoList;
    this.setData({
      hiddenBoolean: !this.data.hiddenBoolean,
      screenBtn: '',
      infoList: newInfo
    })
  },
  formReset: function () {
    this.setData({
      infoList: list
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }
})