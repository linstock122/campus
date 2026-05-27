// 新闻列表页 - 成员A负责
Page({
  data: {
    newsList: [],
    page: 1,
    hasMore: true
  },

  onLoad() {
    this.loadNews();
  },

  // 加载新闻列表
  loadNews() {
    // 从本地存储获取
    const allNews = wx.getStorageSync('newsList') || [];
    const pageSize = 5;
    const start = (this.data.page - 1) * pageSize;
    const end = start + pageSize;
    const news = allNews.slice(start, end);
    
    this.setData({
      newsList: this.data.page === 1 ? news : [...this.data.newsList, ...news],
      hasMore: end < allNews.length
    });
  },

  // 加载更多
  loadMore() {
    if (!this.data.hasMore) return;
    this.setData({ page: this.data.page + 1 });
    this.loadNews();
  },

  // 跳转详情
  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/news-detail/news-detail?id=${id}`
    });
  },

  // 触底加载
  onReachBottom() {
    this.loadMore();
  }
});
