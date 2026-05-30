// 首页 - 成员A负责
const app = getApp();

Page({
  data: {
    // 轮播图数据（学校重要活动/通知）
    swiperList: [
      {
        id: 8,
        image: '/images/news-digital-correct.jpg',
        title: '学校在2026世界数字教育大会上签署共建联合实验室合作协议'
      },
      {
        id: 5,
        image: '/images/news-faculty-correct.jpg',
        title: '第八届教职工代表大会、第十届工会会员代表大会第二次会议召开'
      },
      {
        id: 3,
        image: '/images/news1.jpg',
        title: '学校在浙江省第十五届"挑战杯"大学生创业计划竞赛中取得金奖突破'
      }
    ],

    // 学校信息
    schoolInfo: {
      name: '浙江水利水电学院',
      motto: '厚德 笃学 求实 创新',
      logo: '/images/logo.png',
      intro: '浙江水利水电学院是一所特色鲜明的应用型本科院校，前身可追溯到1953年的杭州水力发电学校。学校以水利水电为特色，工、管、理、经、文、艺等多学科协调发展。'
    },

    // 快速导航
    navList: [
      { id: 1, name: '校园新闻', icon: '/images/news.png', url: '/pages/news/news' },
      { id: 2, name: '风光设施', icon: '/images/scenery.png', url: '/pages/scenery/scenery' },
      { id: 3, name: '留言互动', icon: '/images/message.png', url: '/pages/message/message' },
      { id: 4, name: '校园地图', icon: '/images/map.png', url: '/pages/map/map' }
    ]
  },

  onLoad() {
    // 初始化完成
  },

  // 轮播图点击事件
  onSwiperTap(e) {
    const index = e.currentTarget.dataset.index;
    const item = this.data.swiperList[index];

    if (item.id) {
      wx.navigateTo({
        url: `/pages/news-detail/news-detail?id=${item.id}`
      });
    }
  },

  // 导航点击事件
  onNavTap(e) {
    const url = e.currentTarget.dataset.url;
    const tabBarPages = ['/pages/news/news', '/pages/scenery/scenery', '/pages/message/message'];
    if (tabBarPages.includes(url)) {
      wx.switchTab({ url });
    } else {
      wx.navigateTo({ url });
    }
  }
});
