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
      <div style="line-height: 1.8; color: #333;">
        <p><strong>小组成员：</strong>A、B、C</p>
        <p><strong>项目介绍：</strong>本小程序是校园导览系统...</p>
        <p><strong>技术栈：</strong>微信小程序原生开发</p>
      </div>
    `
  },

  onLoad() {
    this.loadMessages();
  },

  // 加载留言列表
  loadMessages() {
    const messages = wx.getStorageSync('messages') || [];
    this.setData({ messages });
  },

  // 提交留言
  submitMessage(e) {
    const { name, location, content } = e.detail.value;
    
    // 简单验证
    if (!name.trim()) {
      wx.showToast({ title: '请输入姓名', icon: 'none' });
      return;
    }
    if (!content.trim()) {
      wx.showToast({ title: '请输入留言内容', icon: 'none' });
      return;
    }

    // 创建新留言
    const newMessage = {
      id: Date.now(),
      name: name.trim(),
      location: location.trim() || '未知位置',
      content: content.trim(),
      time: this.formatTime(new Date())
    };

    // 保存到本地
    const messages = [newMessage, ...this.data.messages];
    wx.setStorageSync('messages', messages);

    // 更新页面
    this.setData({ 
      messages,
      form: { name: '', location: '', content: '' }
    });

    wx.showToast({ title: '提交成功', icon: 'success' });
  },

  // 格式化时间
  formatTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }
});
