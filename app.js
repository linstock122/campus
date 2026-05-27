App({
  onLaunch() {
    // 初始化本地存储
    this.initStorage();
  },

  // 初始化本地数据
  initStorage() {
    // 新闻数据（示例）
    const newsList = wx.getStorageSync('newsList');
    if (!newsList) {
      wx.setStorageSync('newsList', [
        {
          id: 1,
          title: '学校荣获省级优秀单位称号',
          time: '2024-01-15',
          views: 1280,
          image: '/images/news1.jpg',
          summary: '在2024年度省级评选中，我校荣获优秀单位称号...'
        },
        {
          id: 2,
          title: '春季运动会圆满落幕',
          time: '2024-03-20',
          views: 890,
          image: '/images/news2.jpg',
          summary: '为期三天的春季运动会圆满落幕，各学院积极参与...'
        }
      ]);
    }

    // 风光设施数据
    const sceneryList = wx.getStorageSync('sceneryList');
    if (!sceneryList) {
      wx.setStorageSync('sceneryList', [
        {
          id: 1,
          name: '图书馆',
          isOpen: true,
          image: '/images/lib.jpg',
          description: '藏书丰富，环境优雅'
        },
        {
          id: 2,
          name: '体育馆',
          isOpen: false,
          image: '/images/gym.jpg',
          description: '设施齐全，场地宽敞'
        }
      ]);
    }

    // 留言数据
    const messages = wx.getStorageSync('messages');
    if (!messages) {
      wx.setStorageSync('messages', []);
    }
  },

  globalData: {
    userInfo: null
  }
});
