var app = getApp()
Page({
  data: {
    logs: [],
    motto: 'Hello World',
    userInfo: {}
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
    app.getUserInfo(function(userInfo){
      console.log(userInfo)
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
