var util = require('../../utils/util.js')
var _ = require( '../../libs/underscore-min.js' );

var app = getApp()

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        list: [
          {alphabet: 'Top', datas: []},
          {alphabet: 'B', datas: ['北京']},
          {alphabet: 'G', datas: ['广州']},
          {alphabet: 'H', datas: ['杭州']},
          {alphabet: 'N', datas: ['南京']},
          {alphabet: 'S', datas: ['上海','深圳']},
          {alphabet: 'W', datas: ['武汉']},
        ],
        alpha: '',
        windowHeight: '',
        tabs: ["推荐", "城市", "我"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        logs: [],
        motto: 'Hello World',
        userInfo: {}
    },
    //事件处理函数
    bindCityViewTap: function(event) {
      var city_name = event.target.id
      wx.navigateTo({
        url: '../city/city?city_name=' + city_name
      })
    },
    bindLogViewTap: function() {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    bindNewViewTap: function() {
      wx.navigateTo({
        url: '../new/new'
      })
    },

    onLoad: function () {
      console.log('onLoad')
      var that = this

      app.getUserInfo(function(userInfo){
        console.log('userInfo')
        console.log(userInfo)

        var nickname = userInfo['nickName']
        var avatarurl = userInfo['avatarUrl']
        var check_user_request_url = "http://1f344f39.ngrok.io/api/v1/check_user/" + nickname + "/?format=json"
        wx.request({
          url: check_user_request_url,
          header: {
              'content-type': 'application/json'
          },
          success: function(res) {
            if (_.isEmpty(res.data)) {
              var create_user_request_url = "http://1f344f39.ngrok.io/api/v1/create_weixin_user/?format=json"
              wx.request({
                method: 'POST',
                data: {
                   'weixin_nickName': nickname,
                   'weixin_avatarUrl': avatarurl
                },
                url: create_user_request_url,
                header: {
                  'content-type':'application/x-www-form-urlencoded'
                },
                success: function(res) {
                  var user_data = res.data
                  console.log('user_data')
                  console.log(user_data)
                  wx.setStorageSync('user_data', user_data)
                }
              })
            } else {
              var user_data = res.data
              console.log('user_data')
              console.log(user_data)
              wx.setStorageSync('user_data', user_data)
            }
          }
        })

        that.setData({
          userInfo:userInfo
        })
      })

      wx.getSystemInfo({
          success: function(res) {
              that.setData({
                  sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                  sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
              });
          }
      });

      try {
        var res = wx.getSystemInfoSync()
        this.pixelRatio = res.pixelRatio;
        // this.apHeight = 32 / this.pixelRatio;
        // this.offsetTop = 160 / this.pixelRatio;
        this.apHeight = 16;
        this.offsetTop = 80;
        this.setData({windowHeight: res.windowHeight + 'px'})
      } catch (e) {

      }
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    handlerAlphaTap(e) {
      let {ap} = e.target.dataset;
      this.setData({alpha: ap});
    },
    handlerMove(e) {
      let {list} = this.data;
      let moveY = e.touches[0].clientY;
      let rY = moveY - this.offsetTop;
      if(rY >= 0) {
        let index = Math.ceil((rY - this.apHeight)/ this.apHeight);
        if(0 <= index < list.length) {
          let nonwAp = list[index];
          nonwAp && this.setData({alpha: nonwAp.alphabet});
        }
      }
    }
});


