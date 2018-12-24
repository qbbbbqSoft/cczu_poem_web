const url_dev = "http://localhost:9900";
const url_f = "https://www.bbqbb.top";
const url_g = "https://www.chenyaoyao.club";
const appPost = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //init
    var that = this;
    var postData = data;
    /*
    //自动添加签名字段到postData，makeSign(obj)是一个自定义的生成签名字符串的函数
    postData.signature = that.makeSign(postData);
    */
    //网络请求
    wx.request({
      url: url,
      data: postData,
      method: 'POST',
      // header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {//服务器返回数据
        if (res.data.code == 0) {//res.data 为 后台返回数据，格式为{"data":{...}, "info":"成功", "status":1}, 后台规定：如果status为1,既是正确结果。可以根据自己业务逻辑来设定判断条件
          resolve(res.data.data);
        } else {//返回错误提示信息
          reject(res.data.msg);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
const appGet = (path, data) => {
  var promise = new Promise((resolve, reject) => {
    //init
    var that = this;
    var postData = data;
    /*
    //自动添加签名字段到postData，makeSign(obj)是一个自定义的生成签名字符串的函数
    postData.signature = that.makeSign(postData);
    */
    //网络请求
    wx.request({
      url: url_f + path,
      data: postData,
      method: 'GET',
      // header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {//服务器返回数据
        if (res.data.code == 0) {//res.data 为 后台返回数据，格式为{"data":{...}, "info":"成功", "status":1}, 后台规定：如果status为1,既是正确结果。可以根据自己业务逻辑来设定判断条件
          resolve(res.data.data);
        } else {//返回错误提示信息
          reject(res.data.msg);
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}

module.exports = {
  appPost: appPost,
  appGet: appGet
}
