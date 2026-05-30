// 留言页 - 成员C负责
Page({
  data: {
    form: {
      name: '',
      location: '',
      content: ''
    },
    messages: [],
    teamIntro: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333;">
        <!-- 项目标题卡片 -->
        <div style="background: linear-gradient(135deg, #1AAD19 0%, #2ecc71 100%); border-radius: 16rpx; padding: 30rpx; margin-bottom: 24rpx; color: #fff; box-shadow: 0 4rpx 20rpx rgba(26,173,25,0.3);">
          <div style="font-size: 36rpx; font-weight: bold; margin-bottom: 12rpx;">🏫 浙江水利水电学院</div>
          <div style="font-size: 28rpx; opacity: 0.95;">校园导览小程序</div>
          <div style="margin-top: 16rpx; padding-top: 16rpx; border-top: 1rpx solid rgba(255,255,255,0.3); font-size: 24rpx; opacity: 0.9;">
            为师生提供便捷的校园信息服务
          </div>
        </div>

        <!-- 小组信息 -->
        <div style="background: #f8f9fa; border-radius: 12rpx; padding: 24rpx; margin-bottom: 24rpx;">
          <div style="font-size: 32rpx; font-weight: bold; color: #1AAD19; margin-bottom: 20rpx; display: flex; align-items: center;">
            <span style="margin-right: 12rpx;">👥</span> 开发团队
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 20rpx; font-size: 28rpx;">
            <span style="background: #fff9c4; color: #f9a825; padding: 12rpx 24rpx; border-radius: 8rpx; font-weight: bold;">林姗彤</span>
            <span style="background: #e3f2fd; color: #1976d2; padding: 12rpx 24rpx; border-radius: 8rpx;">李远康</span>
            <span style="background: #e8f5e9; color: #2e7d32; padding: 12rpx 24rpx; border-radius: 8rpx;">赖兆民</span>
          </div>
        </div>

        <!-- 功能特性 -->
        <div style="margin-bottom: 24rpx;">
          <div style="font-size: 32rpx; font-weight: bold; color: #333; margin-bottom: 20rpx;">
            ✨ 核心功能
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 16rpx;">
            <span style="background: #e8f5e9; color: #2e7d32; padding: 12rpx 20rpx; border-radius: 24rpx; font-size: 26rpx;">📰 校园新闻</span>
            <span style="background: #e3f2fd; color: #1565c0; padding: 12rpx 20rpx; border-radius: 24rpx; font-size: 26rpx;">🏞️ 风光设施</span>
            <span style="background: #fff3e0; color: #e65100; padding: 12rpx 20rpx; border-radius: 24rpx; font-size: 26rpx;">💬 留言互动</span>
            <span style="background: #f3e5f5; color: #7b1fa2; padding: 12rpx 20rpx; border-radius: 24rpx; font-size: 26rpx;">🗺️ 校园地图</span>
            <span style="background: #e0f2f1; color: #00695c; padding: 12rpx 20rpx; border-radius: 24rpx; font-size: 26rpx;">🔍 图片预览</span>
          </div>
        </div>

        <!-- 技术栈 -->
        <div style="background: #263238; border-radius: 12rpx; padding: 24rpx; margin-bottom: 24rpx; color: #fff;">
          <div style="font-size: 32rpx; font-weight: bold; margin-bottom: 20rpx; color: #80cbc4;">
            🛠️ 技术架构
          </div>
          <div style="font-size: 26rpx; line-height: 2; color: #b0bec5;">
            <div>• 微信小程序原生框架</div>
            <div>• WXML + WXSS + JavaScript</div>
            <div>• 本地存储 wx.setStorageSync</div>
            <div>• 腾讯地图 SDK 定位导航</div>
            <div>• rich-text 富文本渲染</div>
          </div>
        </div>

        <!-- 感谢语 -->
        <div style="text-align: center; padding: 30rpx; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); border-radius: 12rpx;">
          <div style="font-size: 28rpx; color: #666; margin-bottom: 12rpx;">感谢您的使用与支持！</div>
          <div style="font-size: 24rpx; color: #999;">欢迎留下宝贵意见，帮助我们持续改进</div>
        </div>
      </div>
    `
  },

  onLoad() {
    this.loadMessages();
  },

  onShow() {
    // 每次显示页面时刷新数据
    this.loadMessages();
  },

  // 加载留言列表
  loadMessages() {
    const messages = wx.getStorageSync('messages') || [];
    // 按时间倒序排列
    messages.sort((a, b) => b.timestamp - a.timestamp);
    this.setData({ messages });
  },

  // 表单输入处理
  onInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [`form.${field}`]: e.detail.value
    });
  },

  // 提交留言
  submitMessage(e) {
    const { name, location, content } = e.detail.value;
    
    // 表单验证
    if (!this.validateForm(name, location, content)) {
      return;
    }

    // 创建新留言
    const now = new Date();
    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      location: location.trim() || '未知位置',
      content: content.trim(),
      time: this.formatTime(now),
      timestamp: now.getTime()
    };

    // 保存到本地
    const messages = [newMessage, ...this.data.messages];
    wx.setStorageSync('messages', messages);

    // 更新页面
    this.setData({ 
      messages,
      form: { name: '', location: '', content: '' }
    });

    wx.showToast({ 
      title: '提交成功', 
      icon: 'success',
      duration: 2000
    });
  },

  // 表单验证
  validateForm(name, location, content) {
    // 验证姓名
    if (!name || !name.trim()) {
      wx.showToast({ title: '请输入姓名', icon: 'none' });
      return false;
    }
    if (name.trim().length < 2) {
      wx.showToast({ title: '姓名至少2个字', icon: 'none' });
      return false;
    }
    if (name.trim().length > 20) {
      wx.showToast({ title: '姓名不能超过20个字', icon: 'none' });
      return false;
    }

    // 验证位置（可选字段，但如果填写了需要验证长度）
    if (location && location.trim().length > 50) {
      wx.showToast({ title: '位置不能超过50个字', icon: 'none' });
      return false;
    }

    // 验证留言内容
    if (!content || !content.trim()) {
      wx.showToast({ title: '请输入留言内容', icon: 'none' });
      return false;
    }
    if (content.trim().length < 5) {
      wx.showToast({ title: '留言内容至少5个字', icon: 'none' });
      return false;
    }
    if (content.trim().length > 500) {
      wx.showToast({ title: '留言内容不能超过500字', icon: 'none' });
      return false;
    }

    return true;
  },

  // 格式化时间
  formatTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  },

  // 删除留言
  deleteMessage(e) {
    const id = Number(e.currentTarget.dataset.id);
    
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条留言吗？',
      success: (res) => {
        if (res.confirm) {
          const messages = this.data.messages.filter(item => item.id !== id);
          wx.setStorageSync('messages', messages);
          this.setData({ messages });
          wx.showToast({ title: '删除成功', icon: 'success' });
        }
      }
    });
  },

  // 清空所有留言
  clearAllMessages() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有留言吗？此操作不可恢复！',
      success: (res) => {
        if (res.confirm) {
          wx.removeStorageSync('messages');
          this.setData({ messages: [] });
          wx.showToast({ title: '清空成功', icon: 'success' });
        }
      }
    });
  }
});
