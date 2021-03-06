const host = 'https://wechat.sangsir.com/timetable/api.php?action='
const url_dev = 'http://localhost:9900/cczu'
const url = 'https://xuncha.bbqbb.top/cczu'
const todayInfo = (start) => {
  var weekLen = 7, // 一周7天为常量
    weekInfo = { "week": null, "day": null }, // 初始化返回信息，默认第null周，星期null
    oneDay = 24 * 60 * 60 * 1000, // 一天的毫秒时长
    weekLeave, // 开学当天所在周剩余天数
    weekStart, // 开学当天start是星期几
    today, // 今天
    dateDiff, // 今天与开学当天日期差
    sDate; //开学之日，日期对象
  var rDateStr = /\d{4}[\/-]\d{1,2}[\/-]\d{1,2}/g; // 简单的日期格式校验：2017/8/28
  var weekday = new Array(7);
  weekday[1] = 0, weekday[2] = 1, weekday[3] = 2, weekday[4] = 3, weekday[5] = 4, weekday[6] = 5, weekday[0] = 6
  sDate = new Date(start.replace("-", "/"));
  weekStart = sDate.getDay();
  weekStart = weekStart === 0 ? 7 : weekStart; // JS中周日的索引为0，这里转换为7，方便计算
  weekLeave = weekLen - weekStart;
  today = new Date();
  weekInfo.day = today.getDay() === 0 ? 7 : today.getDay();
  today = new Date(today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate());
  dateDiff = today - sDate;
  dateDiff = parseInt(dateDiff / oneDay);
  weekInfo.week = Math.ceil((dateDiff - weekLeave) / weekLen) + 1;
  return weekInfo;
}
const wxRequest = (params, url) => {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  })
  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Content-Type': params.headerType || 'application/json'
    },
    success: (res) => {
      params.success && params.success(res)
      wx.hideToast()
    },
    fail: (res) => {
      wx.showToast({
        title: '网络连接失败',
        icon: 'loading'
      })
      params.fail && params.fail(res)
    },
    complete: (res) => {
      params.complete && params.complete(res)
    }
  })
}

// Index
const getToday = (params) => wxRequest(params, url + '/getIndexList?openid=' + params.query.openid)

// Table
const getTable = (params) => wxRequest(params, host + params.query.action + '&dept=' + params.query.dept + '&name=' + params.query.name)

// Search
const getRoom = (params) => wxRequest(params, host + 'freeroom&build=' + params.query.build + '&day=' + params.query.day + '&week=' + params.query.week + '&section=' + params.query.section)
const getExam = (params) => wxRequest(params, host + 'exam&class=' + params.query.class)
const getId = (params) => wxRequest(params, host + 'info&number=' + params.query.number)

// Lib
const getLibList = (params) => wxRequest(params, host + 'book_list')
const getLibSearch = (params) => wxRequest(params, host + 'book_search&name=' + params.query.name + '&page=' + params.query.page)
const getLibInfo = (params) => wxRequest(params, host + 'book_info&fbook=' + params.query.fbook)

// News
const getNewsList = (params) => wxRequest(params, host + 'news_list&page=' + params.query.page)
const getNewsDetail = (params) => wxRequest(params, url + '/newsGetDetail?id=' + params.query.id)

// Check
const wxLogin = (params) => wxRequest(params, host + 'wxlogin&code=' + params.query.code)
const joinCheck = (params) => wxRequest(params, host + 'join_check')
const getUserInfo = (params) => wxRequest(params, host + 'check_userinfo&openid=' + params.query.openid)
const userCheckIn = (params) => wxRequest(params, host + 'check_in')
const getCheckList = (params) => wxRequest(params, host + 'check_list' + '&page=' + params.query.page)
const getCheckInfo = (params) => wxRequest(params, host + 'check_info')
const userCheckUp = (params) => wxRequest(params, host + 'check_up&openid=' + params.query.openid + '&status=' + params.query.status)

//Time
const newDate = new Date()
const getDate = () => newDate.getFullYear() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getDate()
const getDay = () => " 星期" + "日一二三四五六".charAt(new Date().getDay())

const checkUserAndBind = (params) => wxRequest(params, url + "/checkUserAndBinding?username=" + params.query.username + "&password=" + 
params.query.password + "&openid=" + params.query.openid)

const resSetTodayClassName = (params) => wxRequest(params, url + "/relieveBinding?openid=" + params.query.openid)

//讲座次数查询
const getLectureTimes = (params) => wxRequest(params, url + "/getLectureTimes?stuName=" + params.query.stuName)

//绑定的课表查询
const getClassTableByOpenID = (params) => wxRequest(params, url + "/getClassTableByOpenID?openid=" + params.query.openid)
module.exports = {
  todayInfo,
  getToday,
  getTable,
  getRoom,
  getExam,
  getId,
  getLibList,
  getLibSearch,
  getLibInfo,
  getNewsList,
  getNewsDetail,
  wxLogin,
  joinCheck,
  getUserInfo,
  userCheckIn,
  getCheckList,
  getCheckInfo,
  userCheckUp,
  getDate,
  getDay,
  checkUserAndBind,
  resSetTodayClassName,
  getLectureTimes,
  getClassTableByOpenID
}