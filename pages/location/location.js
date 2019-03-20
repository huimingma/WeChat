//location.js
//获取应用实例
var app = getApp()
Page({
    data: {
    markers: [{
      latitude: 23.099994,
      longitude: 90.324520,
      name: 'T.I.T 创意园',
      desc: '我现在的位置'
    }],
    covers: [{
      latitude: 23.099794,
      longitude: 113.324520,
      rotate: 10
    }, {
      latitude: 23.099298,
      longitude: 113.324129,
      rotate: 90
    }]
  },
  onShow: function () {
    // console.log('地图定位！')
    var that = this
    wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度   火星地理位置
        success: function (res) {
          console.log(res)
            var latitude = res.latitude; 
            var longitude = res.longitude; 
            wx.openLocation({
              latitude:latitude,
              longitude:longitude,
              scale:16
            })

          wx.switchTab({
            url: '/pages/map/map',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
    });
  },
})
