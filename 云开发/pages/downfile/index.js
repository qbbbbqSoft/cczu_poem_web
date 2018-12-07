//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cardInfo: {
      avater: "https://bbqbb.oss-cn-beijing.aliyuncs.com/cczu_poem/1543910506313.png", //需要https图片路径
      qrCode: "https://bbqbb.oss-cn-beijing.aliyuncs.com/cczu_poem/1543975728247.png", //需要https图片路径
      TagText: "#校庆..#", //标签
      Name: '迎新晚会迎新晚会迎新晚会', //姓名
      Position: "若愚湖畔", //职位
      Mobile: "2018-12-10 17:00:00", //手机
      Company: "常州大学信息数理学院", //公司
    }
  },

  onLoad: function() {
    this.getAvaterInfo();
  },

  /**
   * 先下载头像图片
   */
  getAvaterInfo: function() {
    wx.showLoading({
      title: '生成中...',
      mask: true,
    });
    var that = this;
    wx.downloadFile({
      url: that.data.cardInfo.avater, //头像图片路径
      success: function(res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          var avaterSrc = res.tempFilePath; //下载成功返回结果
          wx.getImageInfo({
            src: that.data.cardInfo.avater,
            success(res) {
              console.log(res.width)
              console.log(res.height)
              that.getQrCode(avaterSrc, res.width, res.height); //继续下载二维码图片
            }
          })
          
        } else {
          wx.showToast({
            title: '头像下载失败！',
            icon: 'none',
            duration: 2000,
            success: function() {
              var avaterSrc = "";
              that.getQrCode(avaterSrc);
            }
          })
        }
      }
    })
  },

  /**
   * 下载二维码图片
   */
  getQrCode: function(avaterSrc,width,height) {
    wx.showLoading({
      title: '生成中...',
      mask: true,
    });
    var that = this;
    wx.downloadFile({
      url: that.data.cardInfo.qrCode, //二维码路径
      success: function(res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          var codeSrc = res.tempFilePath;
          that.sharePosteCanvas(avaterSrc,width, height, codeSrc);
        } else {
          wx.showToast({
            title: '二维码下载失败！',
            icon: 'none',
            duration: 2000,
            success: function() {
              var codeSrc = "";
              that.sharePosteCanvas(avaterSrc, width, height, codeSrc);
            }
          })
        }
      }
    })
  },

  /**
   * 开始用canvas绘制分享海报
   * @param avaterSrc 下载的头像图片路径
   * @param codeSrc   下载的二维码图片路径
   */
  sharePosteCanvas: function (avaterSrc, widthOld, heightOld, codeSrc) {
    wx.showLoading({
      title: '生成中...',
      mask: true,
    })
    var that = this;
    var cardInfo = that.data.cardInfo; //需要绘制的数据集合
    const ctx = wx.createCanvasContext('myCanvas'); //创建画布
    var width = "";
    wx.createSelectorQuery().select('#canvas-container').boundingClientRect(function(rect) {
      console.log(rect)
      var height = rect.height;
      var right = rect.right;
      width = rect.width * 0.8;
      var left = rect.left + 5;
      var hh = heightOld * width / widthOld;
      let outH = hh + width*0.675;
        that.setData({
          outH
        })
      ctx.setFillStyle('#fff');
      ctx.fillRect(0, 0, rect.width, outH );

      //头像为正方形
      if (avaterSrc) {
        ctx.drawImage(avaterSrc, left, 20, width, hh);
        ctx.setFontSize(14);
        ctx.setFillStyle('#fff');
        ctx.setTextAlign('left');
      }

      //标签
      if (cardInfo.TagText) {
        ctx.fillText(cardInfo.TagText, left + 20, hh - 4);
        const metrics = ctx.measureText(cardInfo.TagText); //测量文本信息
        ctx.stroke();
        ctx.rect(left + 10, hh - 20, metrics.width + 20, 25);
        ctx.setFillStyle('rgba(255,255,255,0.3)');
        ctx.fill();
      }

      //姓名
      if (cardInfo.Name) {
        let fontSize = Math.floor(width / 250) == 0 ? 14 : Math.floor(width / 250) * 14;
        ctx.setFontSize(fontSize);
        ctx.setFillStyle('#000');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo.Name, left, hh + width/6);
      }
      
      //职位
      if (cardInfo.Position) {
        let fontSize = Math.floor(width / 250) == 0 ? 12 : Math.floor(width / 250) * 12;
        ctx.setFontSize(fontSize);
        ctx.setFillStyle('#666');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo.Position, left, hh + width/6 + fontSize * 2);
      }

      //电话
      if (cardInfo.Mobile) {
        let fontSize = Math.floor(width / 250) == 0 ? 12 : Math.floor(width / 250) * 12;
        ctx.setFontSize(fontSize);
        ctx.setFillStyle('#666');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo.Mobile, left, hh + width/6 + fontSize * 4);
      }

      // 公司名称
      if (cardInfo.Company) {
        let fontSize = Math.floor(width / 250) * 10 == 0 ? 8 : Math.floor(width / 250) * 10;
        const CONTENT_ROW_LENGTH = 24; // 正文 单行显示字符长度
        let [contentLeng, contentArray, contentRows] = that.textByteLength(cardInfo.Company, CONTENT_ROW_LENGTH);
        ctx.setTextAlign('left');
        ctx.setFillStyle('#000');
        ctx.setFontSize(fontSize);
        let contentHh = 22 * 1;
        for (let m = 0; m < contentArray.length; m++) {
          ctx.fillText(contentArray[m], left, hh + width / 3 + 60 + contentHh * m);
        }
      }

      //  绘制二维码
      if (codeSrc) {
        let fontSize = Math.floor(width / 250) * 10 == 0 ? 8 : Math.floor(width / 250) * 10;
        ctx.drawImage(codeSrc, left + width/0.8/2, hh + 40, width / 3, width / 3)
        ctx.setFontSize(fontSize);
        ctx.setFillStyle('#000');
        ctx.fillText("微信扫码或长按识别", left + width /0.8 / 2 + Math.floor(fontSize/30) * 30, hh + width/3 + 60);
      }

    }).exec()

    setTimeout(function() {
      ctx.draw();
      wx.hideLoading();
    }, 1000)

  },

  /**
   * 多行文字处理，每行显示数量
   * @param text 为传入的文本
   * @param num  为单行显示的字节长度
   */
  textByteLength(text, num) {
    let strLength = 0; // text byte length
    let rows = 1;
    let str = 0;
    let arr = [];
    for (let j = 0; j < text.length; j++) {
      if (text.charCodeAt(j) > 255) {
        strLength += 2;
        if (strLength > rows * num) {
          strLength++;
          arr.push(text.slice(str, j));
          str = j;
          rows++;
        }
      } else {
        strLength++;
        if (strLength > rows * num) {
          arr.push(text.slice(str, j));
          str = j;
          rows++;
        }
      }
    }
    arr.push(text.slice(str, text.length));
    return [strLength, arr, rows] //  [处理文字的总字节长度，每行显示内容的数组，行数]
  },

  //点击保存到相册
  saveShareImg: function() {
    var that = this;
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    setTimeout(function() {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function(res) {
          wx.hideLoading();
          var tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success(res) {
              // utils.aiCardActionRecord(19);
              wx.showModal({
                content: '图片已保存到相册，赶紧晒一下吧~',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#333',
                success: function(res) {
                  if (res.confirm) {}
                },
                fail: function(res) {}
              })
            },
            fail: function(res) {
              wx.showToast({
                title: res.errMsg,
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      });
    }, 1000);
  },

})