// 风光设施页 - 成员B负责
Page({
  data: {
    sceneryList: []
  },

  onLoad() {
    this.loadScenery();
  },

  // 加载风光数据
  loadScenery() {
    const list = wx.getStorageSync('sceneryList') || [];
    this.setData({ sceneryList: list });
  },

  // 预览图片
  previewImage(e) {
    const index = e.currentTarget.dataset.index;
    const urls = this.data.sceneryList.map(item => item.image);
    
    wx.previewImage({
      urls: urls,
      current: urls[index]
    });
  },

  // 跳转详情（仅开放状态）
  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/scenery-detail/scenery-detail?id=${id}`
    });
  }
});
