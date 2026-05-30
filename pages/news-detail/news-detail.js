// 新闻详情页 - 成员A负责
const app = getApp();

Page({
  data: {
    news: {}
  },

  onLoad(options) {
    const id = parseInt(options.id);
    this.loadNewsDetail(id);
  },

  // 加载新闻详情
  loadNewsDetail(id) {
    // 从全局获取新闻数据
    const newsList = app.globalData.newsList || [];
    const news = newsList.find(item => item.id === id);

    if (news) {
      this.setData({ news });

      // 更新标题
      wx.setNavigationBarTitle({
        title: news.title
      });
    } else {
      wx.showToast({
        title: '新闻不存在',
        icon: 'none'
      });
    }
  }
});
