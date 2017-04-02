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
    //调用应用实例的方法获取全局数据
    wx.request({
      url: 'http://192.168.2.2:8000/api/v1/spot_list/?format=json', //仅为示例，并非真实的接口地址
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        var name_array = res.data.map(function (value, index) {
          return value['name']
        })
        that.setData({
          array:name_array
        })
      }
    })

    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
