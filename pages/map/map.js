// 校园地图页 - 使用腾讯地图
Page({
  data: {
    latitude: 30.3147,
    longitude: 120.3517,
    scale: 16,
    markers: [
      {
        id: 1,
        title: '钱塘校区',
        latitude: 30.3147,
        longitude: 120.3517,
        iconPath: '/images/logo.png',
        width: 30,
        height: 30,
        callout: {
          content: '浙江水利水电学院（钱塘校区）\n杭州市钱塘区2号大街508号',
          display: 'ALWAYS',
          fontSize: 12,
          borderRadius: 8,
          padding: 8,
          bgColor: '#ffffff'
        }
      },
      {
        id: 2,
        title: '南浔校区',
        latitude: 30.8720,
        longitude: 120.4210,
        iconPath: '/images/logo.png',
        width: 30,
        height: 30,
        callout: {
          content: '浙江水利水电学院（南浔校区）\n湖州市南浔区联谊路68号',
          display: 'ALWAYS',
          fontSize: 12,
          borderRadius: 8,
          padding: 8,
          bgColor: '#ffffff'
        }
      }
    ],
    campusList: [
      {
        id: 1,
        name: '钱塘校区',
        address: '杭州市钱塘区2号大街508号',
        latitude: 30.3147,
        longitude: 120.3517,
        description: '学校主校区，设有图书馆、体育馆、水利实验楼、教学楼等设施'
      },
      {
        id: 2,
        name: '南浔校区',
        address: '湖州市南浔区联谊路68号',
        latitude: 30.8720,
        longitude: 120.4210,
        description: '学校新校区，2022年投入使用，环境优美，设施先进'
      }
    ],
    activeCampus: 0
  },

  onLoad() {
    // 默认显示钱塘校区
  },

  // 切换校区
  switchCampus(e) {
    const index = e.currentTarget.dataset.index;
    const campus = this.data.campusList[index];

    this.setData({
      activeCampus: index,
      latitude: campus.latitude,
      longitude: campus.longitude
    });
  },

  // 打开导航
  openNavigation(e) {
    const index = e.currentTarget.dataset.index;
    const campus = this.data.campusList[index];

    wx.openLocation({
      latitude: campus.latitude,
      longitude: campus.longitude,
      name: '浙江水利水电学院（' + campus.name + '）',
      address: campus.address,
      scale: 16
    });
  },

  // 标记点点击
  markertap(e) {
    const markerId = e.markerId;
    const campus = this.data.campusList.find(c => c.id === markerId);
    if (campus) {
      wx.showModal({
        title: campus.name,
        content: campus.address + '\n' + campus.description,
        confirmText: '导航',
        success(res) {
          if (res.confirm) {
            wx.openLocation({
              latitude: campus.latitude,
              longitude: campus.longitude,
              name: '浙江水利水电学院（' + campus.name + '）',
              address: campus.address,
              scale: 16
            });
          }
        }
      });
    }
  }
});
