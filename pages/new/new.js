var app = getApp()
Page({
  data: {
    markers: [{
      iconPath: "/image/location.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 40.5,
      height: 40.5
    }],
    array: [],
    motto: 'Hello World',
    userInfo: {}
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this

  }
})
