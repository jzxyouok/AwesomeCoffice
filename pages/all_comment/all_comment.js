var _ = require( '../../libs/underscore-min.js' );

Page({
  data: {
    spot_name: '',
    spot_id: ''
  },
  onLoad: function (options) {
    console.log('onLoad')
    var that = this
    var spot_id = options.spot_id
    var spot_name = options.spot_name

    wx.setNavigationBarTitle({
      title: spot_name
    })
    var request_url = "http://1f344f39.ngrok.io/api/v1/all_spot_comment_list/" + spot_id + "/"
    wx.request({
      url: request_url,
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        var all_comment_list = res.data.map(function (value, index) {
          return value
        })
        if (_.isEmpty(all_comment_list)) {
          all_comment_list = '1'
        }
        that.setData({
          all_comment_list: all_comment_list,
          spot_id: spot_id
        })
      }
    })


  }
})
