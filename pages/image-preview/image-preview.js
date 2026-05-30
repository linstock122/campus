// 图片预览页
Page({
  data: {
    images: [],
    names: [],
    currentIndex: 0,
    currentName: ''
  },

  onLoad(options) {
    const index = parseInt(options.index) || 0;
    const images = decodeURIComponent(options.images || '[]');
    const names = decodeURIComponent(options.names || '[]');

    try {
      const imageList = JSON.parse(images);
      const nameList = JSON.parse(names);
      this.setData({
        images: imageList,
        names: nameList,
        currentIndex: index,
        currentName: nameList[index] || ''
      });
    } catch (e) {
      console.error('解析参数失败', e);
      wx.showToast({ title: '图片加载失败', icon: 'none' });
    }
  },

  onSwiperChange(e) {
    const current = e.detail.current;
    this.setData({
      currentIndex: current,
      currentName: this.data.names[current] || ''
    });
  },

  onTap() {
    wx.navigateBack();
  }
});
