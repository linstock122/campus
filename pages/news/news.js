// 新闻列表页 - 成员A负责
const app = getApp();

Page({
  data: {
    // 当前显示的新闻列表（分页）
    displayList: [],
    page: 1,
    pageSize: 5,
    hasMore: true,
    isLoading: false
  },

  onLoad() {
    this.loadNews();
  },

  // 加载新闻（分页）
  loadNews() {
    if (this.data.isLoading) return;
    this.setData({ isLoading: true });

    setTimeout(() => {
      const allNews = app.globalData.newsList || [];
      const { page, pageSize } = this.data;
      const start = 0;
      const end = page * pageSize;
      const news = allNews.slice(start, end);

      this.setData({
        displayList: news,
        hasMore: end < allNews.length,
        isLoading: false
      });
    }, 300);
  },

  // 触底加载更多
  loadMore() {
    if (!this.data.hasMore || this.data.isLoading) return;
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
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({ page: 1, hasMore: true });
    this.loadNews();
    wx.stopPullDownRefresh();
  }
});
