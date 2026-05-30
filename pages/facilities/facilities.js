// 设施页面 - 图书馆和体育馆（含开放状态）
const app = getApp();

Page({
  data: {
    // 设施数据（来自学校官网）
    facilitiesList: [
      {
        id: 1,
        name: '图书馆（钱塘校区）',
        image: '/images/lib.jpg',
        description: '杭州市钱塘区2号大街508号。普通阅览室、书库开放至22:30，借还服务中心8:00-16:30。',
        openTime: '北门 7:00-22:30 | 南门 8:00-16:30',
        isOpen: true,
        location: '钱塘校区',
        notice: '密集书库、水利特藏库需预约开放'
      },
      {
        id: 2,
        name: '图书馆（南浔校区）',
        image: '/images/nx-lib.jpg',
        description: '湖州市南浔区联谊路68号。书库阅览区3-6楼开放至22:00，电子阅览室至22:30。',
        openTime: '北门 7:00-22:00 | 服务中心 8:00-17:30',
        isOpen: true,
        location: '南浔校区',
        notice: '研讨间需预约开放，电竞馆 8:00-21:30'
      },
      {
        id: 3,
        name: '体育馆',
        image: '/images/gym.jpg',
        description: '室内体育馆，配备篮球场、羽毛球场、乒乓球室、健身房等设施。',
        openTime: '周一至周日 8:00-21:00',
        isOpen: true,
        location: '南浔校区',
        notice: '请穿运动鞋入场'
      },
      {
        id: 4,
        name: '浙江水文化教育基地',
        image: '/images/center.jpg',
        description: '浙江省水文化研究平台，展示水利水电历史文化，免费向公众开放。',
        openTime: '每天 8:30-16:00',
        isOpen: true,
        location: '钱塘校区',
        notice: '参观需提前一天预约，双休日及寒暑假请电话确认（黄老师：13706710915）'
      }
    ]
  },

  // 预览图片
  previewImage(e) {
    const index = e.currentTarget.dataset.index;
    const urls = this.data.facilitiesList.map(item => item.image);

    wx.previewImage({
      urls: urls,
      current: urls[index]
    });
  }
});
