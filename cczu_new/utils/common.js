const biggerImg = (e) => {
  console.log(e)
    wx.previewImage({
      urls: [e.currentTarget.dataset.url],
      // current: e.currentTarget.dataset.url
    })
}

module.exports = {
  biggerImg
}